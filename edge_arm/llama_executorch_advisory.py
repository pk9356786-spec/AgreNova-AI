
"""
AgreNova AI — Offline Arm Edge Agronomy Inference Engine
PS1: Bharat AI-SoC Challenge

Target deployment:
- Arm CPU / Android / Raspberry Pi 5
- ExecuTorch exported .pte model
- Llama 3.2 1B / 3B Instruct, INT4

IMPORTANT:
The actual generation adapter must match the exported PTE model's
tokenizer, input signature, KV-cache and decoding implementation.
Loading a .pte file alone does not perform inference.
"""

from __future__ import annotations

import json
import logging
import os
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Callable, Optional, Dict, Any


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("agrenova.edge")


# ---------------------------------------------------------
# 1. CONFIGURATION
# ---------------------------------------------------------

@dataclass(frozen=True)
class EngineConfig:
    model_path: str = "models/llama3_2_1b_agrenova_int4.pte"
    model_name: str = "Llama-3.2-1B-Instruct-INT4"
    max_new_tokens: int = 256
    min_confidence: float = 0.0
    max_prompt_chars: int = 6000


# ---------------------------------------------------------
# 2. INPUT SCHEMA
# ---------------------------------------------------------

@dataclass
class EdgeCropDiagnosisInput:
    crop_name: str
    detected_disease: str
    severity: str
    confidence: float
    language: str = "hi"

    def validate(self) -> None:
        if not self.crop_name.strip():
            raise ValueError("Crop name cannot be empty.")

        if not self.detected_disease.strip():
            raise ValueError("Disease name cannot be empty.")

        if self.severity.lower() not in {
            "low", "mild", "moderate", "high", "severe"
        }:
            raise ValueError("Unsupported severity value.")

        if not 0.0 <= self.confidence <= 1.0:
            raise ValueError("Confidence must be between 0 and 1.")


# ---------------------------------------------------------
# 3. LANGUAGE CONFIGURATION
# ---------------------------------------------------------

SUPPORTED_LANGUAGES = {
    "hi": "Hindi",
    "en": "English",
    "pa": "Punjabi",
    "mr": "Marathi",
    "gu": "Gujarati",
    "bn": "Bengali",
    "ta": "Tamil",
    "te": "Telugu",
    "kn": "Kannada",
    "ml": "Malayalam",
}


def normalize_language(language: str) -> str:
    key = language.strip().lower()

    if key in SUPPORTED_LANGUAGES:
        return key

    for code, name in SUPPORTED_LANGUAGES.items():
        if key == name.lower():
            return code

    raise ValueError(f"Unsupported language: {language}")


# ---------------------------------------------------------
# 4. PROMPT BUILDER
# ---------------------------------------------------------

class AgronomyPromptBuilder:

    @staticmethod
    def build(item: EdgeCropDiagnosisInput) -> str:
        language_code = normalize_language(item.language)
        language_name = SUPPORTED_LANGUAGES[language_code]

        return f"""<|begin_of_text|><|start_header_id|>system<|end_header_id|>
You are AgreNova AI, an offline agricultural advisory assistant.

Your responsibilities:
1. Explain the identified crop disease in simple language.
2. Give practical immediate management recommendations.
3. Suggest preventive measures.
4. Mention uncertainty when diagnosis confidence is limited.
5. Never invent pesticide doses or chemical application rates.
6. Recommend checking the locally approved product label and
   relevant agricultural expert guidance before chemical application.
7. Do not claim that a treatment is officially ICAR-approved unless
   that approval is verified from a reliable source.

Respond in {language_name}.

Use this response structure:
- Diagnosis
- Immediate Action
- Prevention
- Important Caution

Keep the response concise and farmer-friendly.
<|eot_id|><|start_header_id|>user<|end_header_id|>
Crop: {item.crop_name}
Detected Disease/Pest: {item.detected_disease}
Severity: {item.severity}
Detection Confidence: {item.confidence:.1%}

Provide an actionable agricultural advisory based on these details.
<|eot_id|><|start_header_id|>assistant<|end_header_id|>
"""


# ---------------------------------------------------------
# 5. INFERENCE BACKEND CONTRACT
# ---------------------------------------------------------

class InferenceBackend:
    """
    Contract for the actual model-generation implementation.

    Implement this using the exact tokenizer, exported PTE method,
    input tensors, KV-cache and token-generation loop used by your
    model export pipeline.
    """

    def generate(
        self,
        prompt: str,
        max_new_tokens: int
    ) -> str:
        raise NotImplementedError(
            "Connect the model-specific ExecuTorch generation runner."
        )


# ---------------------------------------------------------
# 6. EXECUTION ENGINE
# ---------------------------------------------------------

class ArmOfflineAgronomyEngine:

    def __init__(
        self,
        config: EngineConfig,
        backend: InferenceBackend
    ):
        self.config = config
        self.backend = backend

        model_file = Path(config.model_path)

        if not model_file.is_file():
            raise FileNotFoundError(
                f"ExecuTorch model not found: {model_file}"
            )

        self.model_size_bytes = model_file.stat().st_size

        if self.model_size_bytes == 0:
            raise RuntimeError("Model file is empty.")

        logger.info(
            "Model artifact verified: %s",
            model_file
        )

    def generate_offline_advisory(
        self,
        item: EdgeCropDiagnosisInput
    ) -> Dict[str, Any]:

        item.validate()

        prompt = AgronomyPromptBuilder.build(item)

        if len(prompt) > self.config.max_prompt_chars:
            raise ValueError("Prompt exceeds configured size limit.")

        if item.confidence < self.config.min_confidence:
            return {
                "success": False,
                "inference_performed": False,
                "status": "LOW_DETECTION_CONFIDENCE",
                "message": (
                    "Detection confidence is too low for a reliable "
                    "automated advisory. Please verify the diagnosis."
                ),
            }

        try:
            # This is the actual model-generation call.
            response = self.backend.generate(
                prompt=prompt,
                max_new_tokens=self.config.max_new_tokens,
            )

            if not isinstance(response, str) or not response.strip():
                raise RuntimeError("Model returned an empty response.")

            return {
                "success": True,
                "inference_performed": True,
                "offline_mode": True,
                "runtime": "ExecuTorch",
                "model": self.config.model_name,
                "device_target": "Arm CPU",
                "model_size_bytes": self.model_size_bytes,
                "input": asdict(item),
                "advisory": response.strip(),
            }

        except Exception as exc:
            logger.exception("Offline inference failed.")

            return {
                "success": False,
                "inference_performed": False,
                "offline_mode": None,
                "status": "INFERENCE_FAILED",
                "error": str(exc),
            }


# ---------------------------------------------------------
# 7. JSON-SAFE OUTPUT
# ---------------------------------------------------------

def print_result(result: Dict[str, Any]) -> None:
    print(
        json.dumps(
            result,
            indent=2,
            ensure_ascii=False
        )
    )


# ---------------------------------------------------------
# 8. INTEGRATION ENTRY POINT
# ---------------------------------------------------------

if __name__ == "__main__":

    config = EngineConfig()

    sample = EdgeCropDiagnosisInput(
        crop_name="Wheat",
        detected_disease="Yellow Rust",
        severity="Moderate",
        confidence=0.92,
        language="Hindi",
    )

    # Replace this with your real ExecuTorch generation adapter.
    #
    # Do not mark the pipeline as operational until this adapter
    # performs real tokenization, PTE execution and token decoding.

    print(json.dumps({
        "project": "AgreNova AI",
        "pipeline": "Arm Offline Agronomy",
        "model_artifact": config.model_path,
        "model_exists": os.path.isfile(config.model_path),
        "inference_adapter_connected": False,
        "status": "MODEL_ADAPTER_REQUIRED",
        "message": (
            "The model artifact must be connected to its "
            "export-specific ExecuTorch generation runner."
        )
    }, indent=2))
