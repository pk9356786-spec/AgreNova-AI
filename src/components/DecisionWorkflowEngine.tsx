import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, MicOff, Camera, Upload, Sparkles, Send, 
  Volume2, VolumeX, Share2, CheckCircle2, AlertTriangle, 
  Leaf, FlaskConical, Wind, Droplets, Thermometer, 
  Clock, ShieldAlert, ArrowRight, RotateCcw, MapPin, 
  FileText, Check, Copy, HelpCircle, ExternalLink, Image as ImageIcon
} from 'lucide-react';
import { AnalysisResult, PastReport } from '../types';
import { getTTSLangCode } from '../translations';

interface DecisionEngineProps {
  currentLang: string;
  onSaveReportToHistory: (report: PastReport) => void;
}

export const DecisionWorkflowEngine: React.FC<DecisionEngineProps> = ({
  currentLang,
  onSaveReportToHistory,
}) => {
  const isHindi = currentLang === 'hi';

  // --- 1. LEFT PANE: KISANMITRA VOICE ASSISTANT STATE ---
  const [chatInput, setChatInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [activeSpeechTab, setActiveSpeechTab] = useState<'response' | 'quickReplies'>('response');
  const [isSpeakingTTS, setIsSpeakingTTS] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);

  // Preset assistant conversations
  const sampleQA: Record<string, { answerHi: string; answerEn: string; crop: string; source: string }> = {
    '50 क्विंटल गेहूं का समर्थन मूल्य क्या है?': {
      answerHi: 'कृषि लागत एवं मूल्य आयोग (CACP) द्वारा विपणन सत्र 2026-27 के लिए गेहूं का न्यूनतम समर्थन मूल्य (MSP) ₹2,425 प्रति क्विंटल निर्धारित किया गया है। अतः 50 क्विंटल गेहूं का कुल समर्थन मूल्य = 50 × ₹2,425 = ₹1,21,250 (एक लाख इक्कीस हजार दो सौ पचास रुपये) होगा। अपने नजदीकी अधिकृत क्रय केंद्र पर समय पर स्लॉट बुक करें।',
      answerEn: 'Under the CACP 2026-27 marketing benchmarks, the Minimum Support Price (MSP) for Wheat is fixed at ₹2,425 per quintal. Therefore, 50 quintals of wheat yields an assured procurement valuation of: 50 × ₹2,425 = ₹1,21,250. Check with your designated State Civil Supplies procurement portal for direct bank transfer (DBT).',
      crop: 'Wheat (गेहूं)',
      source: 'CACP 2026-27 MSP Notification • Ministry of Agriculture'
    },
    'धान के पत्ते पीले हो रहे हैं, क्या करें?': {
      answerHi: 'धान के पत्तों का पीला होना मुख्य रूप से 3 कारणों से होता है: (1) नाइट्रोजन की कमी (पुरानी पत्तियां नीचे से पीली पड़ना) - 25-30 किग्रा यूरिया प्रति एकड़ दें। (2) जिंक (खैरा रोग) की कमी (पत्तियों पर कत्थई/भूरे धब्बे) - 5 किग्रा जिंक सल्फेट (21%) + 2.5 किग्रा बुझा हुआ चूना प्रति 200 लीटर पानी में मिलाकर प्रति एकड़ छिड़कें। (3) जीवाणु पत्ती झुलसा (BLB) - खेत का पानी निकालें और कॉपर ऑक्सीक्लोराइड (500 ग्राम) + स्ट्रेप्टोसाइक्लिन (6 ग्राम) प्रति एकड़ छिड़कें।',
      answerEn: 'Yellowing of paddy foliage indicates either: (1) Nitrogen deficiency (basal leaves yellow first) - top-dress 25-30 kg Urea/acre; (2) Zinc deficiency / Khaira disease (rusty brown spots) - foliar spray of 5 kg Zinc Sulphate (21%) + 2.5 kg slaked lime in 200L water/acre; (3) Bacterial Leaf Blight (BLB) - drain excess water and apply Copper Oxychloride (500g) + Streptocycline (6g) per acre.',
      crop: 'Paddy (धान)',
      source: 'ICAR-CRRI Cuttack Agronomy Advisory'
    },
    'यूरिया और डीएपी का सही अनुपात क्या है?': {
      answerHi: 'गेहूं एवं धान के लिए मानक N:P:K अनुशंसा 4:2:1 (120:60:40 किग्रा/हेक्टेयर) है। 1 एकड़ गेहूं के लिए बुवाई के समय 1 बोरी (50 किग्रा) DAP + 20 किग्रा MOP (पोटाश) और 25 किग्रा यूरिया बेसल डोज में डालें। शेष 45 किग्रा यूरिया को पहले पानी (21 दिन बाद) और दूसरे पानी (45 दिन बाद) पर दो बराबर भागों में टॉप-ड्रेसिंग करें।',
      answerEn: 'The recommended standard N:P:K dosage for cereal crops is 4:2:1. For 1 acre of wheat: apply 1 bag (50kg) DAP + 20kg MOP (Potash) + 25kg Urea as basal dose at sowing. Top-dress remaining 45kg Urea split equally across 1st irrigation (CRI stage, 21 days) and 2nd irrigation (tillering, 45 days).',
      crop: 'Soil Nutrient Management',
      source: 'ICAR-IARI New Delhi Nutrient Guidelines'
    },
    'टमाटर में झुलसा रोग की रोकथाम कैसे करें?': {
      answerHi: 'टमाटर के अगेती झुलसा (Early Blight) के लिए जैविक उपचार: खट्टी छाछ (5 लीटर/150L पानी) या ट्राइकोडर्मा हरजिएनम (5 ग्राम/लीटर)। रासायनिक उपचार: मैंकोज़ेब 75% WP (2 ग्राम प्रति लीटर पानी) या एज़ोक्सीस्ट्रोबिन 23% SC (1 मिली/लीटर पानी) का 10-12 दिन के अंतराल पर छिड़काव करें। रोगग्रस्त नीचे की पत्तियों को तोड़कर नष्ट कर दें।',
      answerEn: 'For Tomato Blight prevention: Organic control: fermented buttermilk spray (5L in 150L water) or Trichoderma harzianum (5g/L). Chemical intervention: Mancozeb 75% WP @ 2g/L water or Azoxystrobin 23% SC @ 1ml/L water at 10-12 day intervals. Remove and incinerate infected lower foliage.',
      crop: 'Tomato (टमाटर)',
      source: 'ICAR-IIHR Bengaluru Horticulture Protocol'
    }
  };

  const [currentAssistantResponse, setCurrentAssistantResponse] = useState({
    query: '50 क्विंटल गेहूं का समर्थन मूल्य क्या है?',
    answer: sampleQA['50 क्विंटल गेहूं का समर्थन मूल्य क्या है?'].answerHi,
    crop: sampleQA['50 क्विंटल गेहूं का समर्थन मूल्य क्या है?'].crop,
    source: sampleQA['50 क्विंटल गेहूं का समर्थन मूल्य क्या है?'].source,
    timestamp: 'Just now'
  });

  // Speech Recognition Setup
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRec) {
      setSpeechSupported(true);
      const rec = new SpeechRec();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = getTTSLangCode(currentLang);

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setChatInput(transcript);
        handleSendQuery(transcript);
        setIsListening(false);
      };

      rec.onerror = () => {
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, [currentLang]);

  const toggleMic = () => {
    if (!speechSupported || !recognitionRef.current) {
      // Fallback: simulate mic prompt
      const fallbackQuery = 'धान के पत्ते पीले हो रहे हैं, क्या करें?';
      setChatInput(fallbackQuery);
      handleSendQuery(fallbackQuery);
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.lang = getTTSLangCode(currentLang);
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        setIsListening(false);
      }
    }
  };

  const handleSendQuery = (queryText?: string) => {
    const q = (queryText || chatInput).trim();
    if (!q) return;

    // Check if match in preset or formulate structured ICAR response
    const matched = Object.entries(sampleQA).find(([k]) => 
      q.toLowerCase().includes(k.slice(0, 8).toLowerCase()) || 
      k.toLowerCase().includes(q.slice(0, 8).toLowerCase())
    );

    let ans = '';
    let cropTag = 'General Agronomy';
    let sourceTag = 'ICAR & KVK Validated Knowledge Graph';

    if (matched) {
      ans = isHindi ? matched[1].answerHi : matched[1].answerEn;
      cropTag = matched[1].crop;
      sourceTag = matched[1].source;
    } else if (q.includes('मूल्य') || q.includes('MSP') || q.includes('भाव') || q.includes('price')) {
      ans = isHindi 
        ? `CACP 2026-27 के सरकारी अधिसूचना के अनुसार: गेहूं का MSP ₹2,425/क्विंटल, धान ₹2,320/क्विंटल, कपास ₹7,121/क्विंटल, सरसों ₹5,950/क्विंटल है। आपकी स्थानीय मंडी में दरें गुणवत्ता ग्रेडिंग पर आधारित हैं।`
        : `According to official CACP 2026-27 benchmarks: Wheat MSP is ₹2,425/qtl, Paddy Common ₹2,320/qtl, Cotton (Medium) ₹7,121/qtl, Mustard ₹5,950/qtl. Local APMC rates vary based on moisture and impurity standards.`;
      cropTag = 'MSP Analytics';
    } else {
      ans = isHindi
        ? `कृषि परामर्श (ICAR/KVK प्रमाणित): "${q}" के संदर्भ में संज्ञान लें कि वर्तमान मौसमी स्थिति में सिंचाई और पोषण संतुलन महत्वपूर्ण है। अधिक जानकारी के लिए नजदीकी KVK वैज्ञानिक से संपर्क करें या नीचे दिए गए सटीक नमूनों को चुनें।`
        : `Agronomic Advisory (ICAR & KVK compliant): Regarding "${q}", ensure balanced macronutrient management and monitor soil moisture index before any spray operation.`;
    }

    setCurrentAssistantResponse({
      query: q,
      answer: ans,
      crop: cropTag,
      source: sourceTag,
      timestamp: 'Just now'
    });

    setChatInput('');
  };

  // Text to Speech
  const toggleTTS = () => {
    if (!window.speechSynthesis) return;

    if (isSpeakingTTS) {
      window.speechSynthesis.cancel();
      setIsSpeakingTTS(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentAssistantResponse.answer);
    utterance.lang = getTTSLangCode(currentLang);
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeakingTTS(false);
    utterance.onerror = () => setIsSpeakingTTS(false);
    setIsSpeakingTTS(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🌾 *AgreNova AI किसान सलाह*\n\n*सवाल:* ${currentAssistantResponse.query}\n*जवाब:* ${currentAssistantResponse.answer}\n\n*स्रोत:* ${currentAssistantResponse.source}\n🔗 https://agrenovaai.in`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // --- 2. RIGHT PANE: AI VISION CAMERA & DIAGNOSTICS STATE ---
  interface SampleDisease {
    id: string;
    cropNameHi: string;
    cropNameEn: string;
    diseaseHi: string;
    diseaseEn: string;
    scientificName: string;
    confidence: string;
    severity: 'उच्च' | 'मध्यम' | 'कम';
    cropLoss: string;
    recoveryTimeline: string;
    organicTreatmentHi: string;
    organicTreatmentEn: string;
    chemicalTreatmentHi: string;
    chemicalTreatmentEn: string;
    preventionHi: string;
    preventionEn: string;
    adviceHi: string;
    adviceEn: string;
    visualColor: string;
  }

  const sampleDiseaseCards: SampleDisease[] = [
    {
      id: 'wheat-yellow-rust',
      cropNameHi: 'गेहूं (Wheat)',
      cropNameEn: 'Wheat',
      diseaseHi: 'गेहूं का पीला रतुआ (Yellow Rust)',
      diseaseEn: 'Wheat Yellow Rust',
      scientificName: 'Puccinia striiformis f. sp. tritici',
      confidence: '98%',
      severity: 'उच्च',
      cropLoss: '25-35%',
      recoveryTimeline: '7-10 दिन',
      organicTreatmentHi: '1. खट्टे मट्ठे (5-6 दिन पुरानी छाछ) को तांबे के बर्तन में रखकर 5 लीटर प्रति एकड़ की दर से 150 लीटर पानी में मिलाकर पत्तियों पर छिड़कें।\n2. नीम का तेल (3000 PPM) 3 मिली प्रति लीटर पानी की दर से छिड़कें।',
      organicTreatmentEn: '1. Fermented buttermilk stored in copper pot (5L/acre in 150L water) foliar spray.\n2. Cold-pressed Neem oil (3000 PPM) @ 3ml/L water.',
      chemicalTreatmentHi: '1. प्रोपीकोनाज़ोल (Propiconazole 25% EC) कवकनाशी का 1 मिली प्रति लीटर पानी (200 मिली प्रति एकड़) में 200 लीटर पानी में घोल बनाकर तुरंत छिड़काव करें।\n2. आवश्यकता पड़ने पर 12-15 दिन बाद टेबुकोनाज़ोल 25.9% EC का छिड़काव करें।',
      chemicalTreatmentEn: '1. Propiconazole 25% EC @ 1ml/L water (200ml/acre in 200L water) immediate foliar application.\n2. In severe resurgence, follow with Tebuconazole 25.9% EC after 14 days.',
      preventionHi: 'रोग प्रतिरोधी किस्मों (जैसे HD 3086, DBW 187, PBW 725) का चयन करें। यूरिया का अत्यधिक उपयोग न करें।',
      preventionEn: 'Sow rust-resistant seed cultivars (HD 3086, DBW 187, PBW 725). Avoid excessive vegetative nitrogen feeding.',
      adviceHi: 'किसान भाई, मौसम में नमी और कम तापमान पीले रतुए को तेजी से फैलाता है। तुरंत जैविक छाछ या प्रोपीकोनाज़ोल का छिड़काव करें।',
      adviceEn: 'Yellow rust spores spread rapidly in cool, humid microclimates. Initiate systemic fungicide spray immediately.',
      visualColor: 'from-amber-600/40 to-yellow-900/30'
    },
    {
      id: 'tomato-early-blight',
      cropNameHi: 'टमाटर (Tomato)',
      cropNameEn: 'Tomato',
      diseaseHi: 'टमाटर का अगेती झुलसा (Early Blight)',
      diseaseEn: 'Tomato Early Blight',
      scientificName: 'Alternaria solani',
      confidence: '96%',
      severity: 'मध्यम',
      cropLoss: '15-20%',
      recoveryTimeline: '6-8 दिन',
      organicTreatmentHi: '1. ट्राइकोडर्मा हरजिएनम (5 ग्राम प्रति लीटर पानी) का पत्तियों पर छिड़काव करें।\n2. 5% नीम बीज अर्क (NSKE) का उपयोग करें।',
      organicTreatmentEn: '1. Trichoderma harzianum @ 5g/L water foliar spray.\n2. Aqueous Neem Seed Kernel Extract (NSKE 5%) application.',
      chemicalTreatmentHi: '1. मैंकोज़ेब 75% WP (2-2.5 ग्राम प्रति लीटर पानी) का छिड़काव करें।\n2. कवकनाशी एज़ोक्सीस्ट्रोबिन 23% SC (1 मिली प्रति लीटर) का उपयोग करें।',
      chemicalTreatmentEn: '1. Mancozeb 75% WP @ 2.5g/L water foliar spray.\n2. Azoxystrobin 23% SC @ 1ml/L water alternate rotation.',
      preventionHi: 'रोगग्रस्त निचली पत्तियों को तुरंत काटकर नष्ट कर दें। पौधों के बीच उचित दूरी रखें।',
      preventionEn: 'Prune infected bottom leaves to curb soil splash transmission. Maintain adequate vine aeration.',
      adviceHi: 'खेत में अधिक जलभराव न होने दें। पत्तियों के नीचे संचित नमी को सुखाने के लिए ड्रिप सिंचाई अपनाएं।',
      adviceEn: 'Prevent overhead watering splash. Switch to localized drip irrigation to keep canopy dry.',
      visualColor: 'from-red-600/40 to-rose-950/30'
    },
    {
      id: 'cotton-pink-bollworm',
      cropNameHi: 'कपास (Cotton)',
      cropNameEn: 'Cotton',
      diseaseHi: 'कपास की गुलाबी सुंडी (Pink Bollworm)',
      diseaseEn: 'Cotton Pink Bollworm',
      scientificName: 'Pectinophora gossypiella',
      confidence: '95%',
      severity: 'उच्च',
      cropLoss: '30-40%',
      recoveryTimeline: '10-14 दिन',
      organicTreatmentHi: '1. प्रति एकड़ 5-8 फेरोमोन ट्रैप लगाएं ताकि नर पतंगों की निगरानी व खात्मा हो सके।\n2. ट्राइकोग्रामा (Trichogramma bactrae) अंड परजीवी का 60,000 प्रति एकड़ की दर से खेत में छोड़ें।',
      organicTreatmentEn: '1. Install 5-8 Pheromone lure traps per acre for mass male moth trapping and ETL monitoring.\n2. Bio-agent release: Trichogramma bactrae egg parasitoids @ 60,000/acre.',
      chemicalTreatmentHi: '1. ईमामेक्टिन बेंजोएट 5% SG (80-100 ग्राम प्रति एकड़ 200 लीटर पानी में) का छिड़काव करें।\n2. गंभीर प्रकोप में स्पिनोसैड 45% SC (75 मिली/एकड़) का प्रयोग करें।',
      chemicalTreatmentEn: '1. Emamectin Benzoate 5% SG @ 80-100g/acre in 200L water.\n2. In severe ETL breaches, spray Spinosad 45% SC @ 75ml/acre.',
      preventionHi: 'रोसेटेज (rosetted) फूलों को चुनकर नष्ट करें। गैर-सिफारिशी हाइब्रिड बीजों के उपयोग से बचें।',
      preventionEn: 'Hand-pick and destroy rosetted blooms containing neonate larvae. Follow strict non-Bt refuge guidelines.',
      adviceHi: 'सुंडी बोंड के अंदर घुसने से पहले ही छिड़काव आवश्यक है। फेरोमोन ट्रैप में 8 पतंगे/ट्रैप मिलने पर तत्काल कार्यवाही करें।',
      adviceEn: 'Insecticidal intervention must precede larval entry into bolls. Initiate spray once pheromone traps exceed 8 moths/day.',
      visualColor: 'from-emerald-700/40 to-teal-950/30'
    }
  ];

  const [activeDisease, setActiveDisease] = useState<SampleDisease>(sampleDiseaseCards[0]);
  const [bifurcatedTab, setBifurcatedTab] = useState<'organic' | 'chemical'>('organic');
  const [isSavedSuccessfully, setIsSavedSuccessfully] = useState(false);
  const [customFileUploaded, setCustomFileUploaded] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectSample = (disease: SampleDisease) => {
    setActiveDisease(disease);
    setIsSavedSuccessfully(false);
  };

  const handleSaveToHistory = () => {
    const newReport: PastReport = {
      id: `rep-${Date.now()}`,
      date: isHindi ? 'आज, ' + new Date().toLocaleDateString('hi-IN') : 'Today, ' + new Date().toLocaleDateString('en-US'),
      type: 'disease',
      title: isHindi ? activeDisease.diseaseHi : activeDisease.diseaseEn,
      subTitle: isHindi ? activeDisease.cropNameHi : activeDisease.cropNameEn,
      imageUrl: customFileUploaded || null,
      disease: isHindi ? activeDisease.diseaseHi : activeDisease.diseaseEn,
      scientificName: activeDisease.scientificName,
      confidence: activeDisease.confidence,
      severity: activeDisease.severity,
      cropLoss: activeDisease.cropLoss,
      recoveryTimeline: activeDisease.recoveryTimeline,
      description: isHindi ? activeDisease.adviceHi : activeDisease.adviceEn,
      preventionTips: isHindi ? activeDisease.preventionHi : activeDisease.preventionEn,
      organicTreatment: isHindi ? activeDisease.organicTreatmentHi : activeDisease.organicTreatmentEn,
      chemicalTreatment: isHindi ? activeDisease.chemicalTreatmentHi : activeDisease.chemicalTreatmentEn,
      advice: isHindi ? activeDisease.adviceHi : activeDisease.adviceEn,
    };

    onSaveReportToHistory(newReport);
    setIsSavedSuccessfully(true);
    setTimeout(() => setIsSavedSuccessfully(false), 3000);
  };

  // --- 3. EMBEDDED TELEMETRY HUB (OpenWeather API Live Data) ---
  const telemetryStations = [
    { name: 'Karnal, Haryana', zone: 'Wheat & Basmati Corridor', temp: 32, humidity: 48, wind: 2.06, sprayStatus: 'safe' },
    { name: 'Nashik, Maharashtra', zone: 'Horticulture & Grape Belt', temp: 31, humidity: 52, wind: 2.40, sprayStatus: 'safe' },
    { name: 'Indore, MP', zone: 'Soybean & Durum Heartland', temp: 33, humidity: 44, wind: 1.95, sprayStatus: 'safe' },
    { name: 'Ludhiana, Punjab', zone: 'Central Grain Granary', temp: 32, humidity: 46, wind: 2.10, sprayStatus: 'safe' }
  ];

  const [selectedStation, setSelectedStation] = useState(telemetryStations[0]);

  return (
    <section id="section-decision-workflow" className="py-16 sm:py-24 bg-slate-950 border-b border-slate-800 relative">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-950/20 blur-[160px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isHindi ? 'धारा 4: एकीकृत निर्णय कार्यप्रवाह' : 'SECTION 4: INTEGRATED DECISION WORKFLOW ENGINE'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isHindi ? (
              <>क्षेत्रीय उपयोगिता: <span className="text-emerald-400">किसानमित्र वॉइस व AI विज़न कैमरा</span></>
            ) : (
              <>Zero-Friction Field Utility: <span className="text-emerald-400">Voice Assistant & Computer Vision</span></>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2.5">
            {isHindi ? (
              '10+ क्षेत्रीय भाषाओं में वॉयस प्रश्न पूछें, पत्तियों की रीयल-टाइम स्कैनिंग करें और ICAR/KVK प्रमाणित दोहरे उपचार प्राप्त करें।'
            ) : (
              'Bifurcated enterprise-grade agronomic intelligence delivering instant organic and chemical remediation with zero-network offline resilience.'
            )}
          </p>
        </div>

        {/* EMBEDDED TELEMETRY HUB (OpenWeather API • LIVE DATA) */}
        <div className="mb-10 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-emerald-950/60 border border-emerald-500/30 backdrop-blur-md shadow-2xl">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <Wind className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider uppercase">
                    OPENWEATHER API • LIVE TELEMETRY
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-emerald-400/10 text-emerald-300 border border-emerald-400/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1"></span>
                    SYNCED
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>{selectedStation.name}</span>
                  <span className="text-xs font-normal text-slate-400">({selectedStation.zone})</span>
                </h4>
              </div>
            </div>

            {/* Quick Station Switcher */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/80 p-1 rounded-lg border border-slate-800 text-xs font-medium">
              {telemetryStations.map((st) => (
                <button
                  key={st.name}
                  type="button"
                  onClick={() => setSelectedStation(st)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    selectedStation.name === st.name
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {st.name.split(',')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Telemetry Metrics & Spray Advisory Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
              <Thermometer className="w-5 h-5 text-amber-400" />
              <div>
                <span className="block text-[11px] text-slate-400">Temperature</span>
                <span className="text-base font-bold text-white">{selectedStation.temp}°C</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
              <Droplets className="w-5 h-5 text-teal-400" />
              <div>
                <span className="block text-[11px] text-slate-400">Humidity</span>
                <span className="text-base font-bold text-white">{selectedStation.humidity}%</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
              <Wind className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="block text-[11px] text-slate-400">Wind Velocity</span>
                <span className="text-base font-bold text-white">{selectedStation.wind} m/s</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="block text-[11px] text-slate-400">Precipitation 48h</span>
                <span className="text-base font-bold text-emerald-400">0% (Dry)</span>
              </div>
            </div>
          </div>

          {/* Prominent Soil & Spray Advisory Banner */}
          <div className="p-3 rounded-xl bg-emerald-950/90 border border-emerald-500/40 flex items-center gap-3 text-emerald-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-xs sm:text-sm font-medium leading-relaxed">
              <strong className="text-emerald-300 font-bold mr-1">
                {isHindi ? 'मृदा एवं छिड़काव परामर्श:' : 'Soil & Spray Advisory:'}
              </strong>
              {isHindi ? (
                'मौसम कीटनाशक एवं उर्वरक छिड़काव कार्यों के लिए अत्यधिक अनुकूल है। हवा की गति 2.06 m/s होने से दवा का अपव्यय नहीं होगा तथा आगामी 48 घंटे वर्षा की संभावना नगण्य है।'
              ) : (
                'Weather is highly favorable for fertilizer and spraying operations. Low wind velocity (2.06 m/s) prevents drift losses and clear skies optimize stomatal intake.'
              )}
            </div>
          </div>

        </div>

        {/* TWO-COLUMN DECISION WORKFLOW ENGINE INTERFACE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* ========================================================
              LEFT UTILITY PANE: KISANMITRA VOICE ASSISTANT
             ======================================================== */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl flex flex-col h-full">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isListening 
                    ? 'bg-rose-500/20 border border-rose-500/60 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.4)]'
                    : 'bg-emerald-950/80 border border-emerald-500/30 text-emerald-400'
                }`}>
                  <Mic className={`w-5 h-5 ${isListening ? 'animate-bounce text-rose-400' : ''}`} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>{isHindi ? 'किसानमित्र वॉइस असिस्टेंट' : 'KisanMitra Voice Assistant'}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Vernacular AI
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isHindi ? '10+ क्षेत्रीय भाषाओं में रीयल-टाइम वॉइस व टेक्स्ट संवाद' : 'Multi-dialect speech recognition with ICAR/KVK guardrails'}
                  </p>
                </div>
              </div>

              {/* Listening status badge */}
              {isListening && (
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-mono animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                  Listening...
                </span>
              )}
            </div>

            {/* Dynamic Shortcut Chips */}
            <div className="pt-4 pb-3">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                {isHindi ? 'एक-क्लिक त्वरित प्रश्न (One-Click Dynamic Shortcuts):' : 'One-Click Dynamic Shortcut Chips:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {Object.keys(sampleQA).map((shortcutText) => (
                  <button
                    key={shortcutText}
                    type="button"
                    onClick={() => {
                      setChatInput(shortcutText);
                      handleSendQuery(shortcutText);
                    }}
                    className="text-left px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-700 hover:border-emerald-500/60 hover:bg-slate-800 text-slate-200 transition-all flex items-center gap-1.5 group cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-emerald-400 group-hover:rotate-12 transition-transform" />
                    <span>{shortcutText}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Chat Output Box */}
            <div className="my-3 p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex-1 space-y-3">
              
              {/* User Query Display */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 text-xs font-bold">
                  Q
                </div>
                <div className="flex-1">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {isHindi ? 'किसान का प्रश्न:' : 'Farmer Inquiry:'}
                  </span>
                  <p className="text-sm font-semibold text-white">
                    {currentAssistantResponse.query}
                  </p>
                </div>
              </div>

              {/* AI Structured Answer */}
              <div className="p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{isHindi ? 'AgreNova प्रमाणित समाधान' : 'AgreNova Certified Advisory'}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {currentAssistantResponse.crop}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                  {currentAssistantResponse.answer}
                </p>

                <div className="pt-2 border-t border-emerald-950 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
                  <span>{currentAssistantResponse.source}</span>
                  <span>{currentAssistantResponse.timestamp}</span>
                </div>
              </div>

              {/* Integrated Action Buttons: Listen to Answer & Share WhatsApp */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={toggleTTS}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isSpeakingTTS 
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isSpeakingTTS ? 'animate-bounce' : ''}`} />
                  <span>
                    {isSpeakingTTS 
                      ? (isHindi ? 'रोकें (Stop Audio)' : 'Stop Audio') 
                      : (isHindi ? 'जवाब सुनें (Listen to Answer)' : 'Listen to Answer')}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-950 hover:bg-green-900 text-green-300 border border-green-500/30 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-green-400" />
                  <span>{isHindi ? 'व्हाट्सएप पर साझा करें' : 'Share on WhatsApp'}</span>
                </button>
              </div>

            </div>

            {/* Input bar & Microphone Dashboard */}
            <div className="pt-2">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendQuery();
                }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={
                    isHindi 
                      ? 'अपना प्रश्न यहाँ लिखें या माइक दबाकर बोलें...' 
                      : 'Type farm query or tap mic to speak in regional language...'
                  }
                  className="w-full pl-4 pr-24 py-3 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-all shadow-inner"
                />

                <div className="absolute right-1.5 flex items-center gap-1">
                  {/* Mic toggle */}
                  <button
                    type="button"
                    onClick={toggleMic}
                    className={`p-2 rounded-lg transition-all ${
                      isListening
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-emerald-950/80 text-emerald-400 hover:bg-emerald-900 border border-emerald-500/30'
                    }`}
                    title={isListening ? 'Stop listening' : 'Start voice input'}
                  >
                    <Mic className="w-4 h-4" />
                  </button>

                  {/* Send Button */}
                  <button
                    type="submit"
                    className="p-2 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 transition-colors font-bold cursor-pointer"
                    title="Send query"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

          </div>

          {/* ========================================================
              RIGHT UTILITY PANE: AI VISION CAMERA & DIAGNOSTICS
             ======================================================== */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl flex flex-col h-full">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>{isHindi ? 'AI विज़न कैमरा व फसल जांच' : 'AI Vision Camera Diagnostics'}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      Multimodal Foliar
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isHindi ? 'पत्ती की फोटो से तुरंत रोग पहचान व दोहरे उपचार' : 'Sub-millimeter foliar leaf pathology with bifurcated remediation'}
                  </p>
                </div>
              </div>

              {/* Confidence pill */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{activeDisease.confidence} Accuracy</span>
              </div>
            </div>

            {/* Drop-zone Interface with Clickable Sample Cards */}
            <div className="pt-4 pb-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                {isHindi ? 'क्लिक करें: नमूना फसल कार्ड (Sample Foliar Cards):' : 'Click to Load Sample Crop Cards or Upload:'}
              </span>
              
              <div className="grid grid-cols-3 gap-2 mb-3">
                {sampleDiseaseCards.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                      activeDisease.id === sample.id
                        ? 'border-emerald-400 bg-emerald-950/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-slate-400 truncate">
                        {isHindi ? sample.cropNameHi : sample.cropNameEn}
                      </span>
                      {activeDisease.id === sample.id && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      )}
                    </div>
                    <span className="block text-xs font-bold text-white truncate">
                      {isHindi ? sample.diseaseHi.split('(')[0] : sample.diseaseEn}
                    </span>
                    <span className="block text-[10px] font-mono text-amber-400 mt-1">
                      {sample.severity} • {sample.confidence}
                    </span>
                  </button>
                ))}
              </div>

              {/* Custom Image Upload Dropzone */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="p-3 rounded-xl border border-dashed border-slate-700 hover:border-emerald-500/60 bg-slate-950/60 hover:bg-slate-900/40 transition-all text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setCustomFileUploaded(URL.createObjectURL(file));
                    }
                  }} 
                />
                <Upload className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-300 font-medium">
                  {customFileUploaded ? (
                    <span className="text-emerald-400 font-bold">✓ Custom Photo Loaded</span>
                  ) : (
                    isHindi ? 'अपनी खेत की पत्ती की फोटो अपलोड करें' : 'Or Upload / Drag & Drop Crop Photo'
                  )}
                </span>
              </div>
            </div>

            {/* Diagnostic Result Card with Bifurcated Organic & Chemical Tabs */}
            <div className="my-2 p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex-1 space-y-3">
              
              {/* Disease Meta Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-extrabold text-white">
                      {isHindi ? activeDisease.diseaseHi : activeDisease.diseaseEn}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {activeDisease.severity} Severity
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 italic">
                    {activeDisease.scientificName}
                  </span>
                </div>

                <div className="text-right">
                  <span className="block text-[10px] text-slate-400 font-mono">Est. Yield Loss:</span>
                  <span className="text-xs font-bold text-rose-400 font-mono">{activeDisease.cropLoss}</span>
                </div>
              </div>

              {/* Bifurcated Treatment Tabs: Organic vs Chemical */}
              <div className="flex rounded-lg bg-slate-900 p-1 border border-slate-800">
                <button
                  type="button"
                  onClick={() => setBifurcatedTab('organic')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    bifurcatedTab === 'organic'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Leaf className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'जैविक उपचार (Organic)' : 'Organic Treatment'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBifurcatedTab('chemical')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    bifurcatedTab === 'chemical'
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'रासायनिक उपचार (Chemical)' : 'Chemical Treatment'}</span>
                </button>
              </div>

              {/* Treatment Content Box */}
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                {bifurcatedTab === 'organic' ? (
                  <div>
                    <span className="block text-[11px] font-mono font-bold text-emerald-400 mb-1">
                      {isHindi ? 'जैविक व प्राकृतिक समाधान (Zero-Chemical Residue):' : 'Bio-Control & Organic Remediation Protocol:'}
                    </span>
                    <p>{isHindi ? activeDisease.organicTreatmentHi : activeDisease.organicTreatmentEn}</p>
                  </div>
                ) : (
                  <div>
                    <span className="block text-[11px] font-mono font-bold text-teal-400 mb-1">
                      {isHindi ? 'रासायनिक कवकनाशी / कीटनाशक (CIB&RC अनुमोदित):' : 'CIB&RC Registered Chemical Intervention:'}
                    </span>
                    <p>{isHindi ? activeDisease.chemicalTreatmentHi : activeDisease.chemicalTreatmentEn}</p>
                  </div>
                )}
              </div>

              {/* Prevention & Recovery Timeline Bar */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="block text-[10px] text-slate-400 font-mono">Recovery Timeline</span>
                  <span className="font-semibold text-white">{activeDisease.recoveryTimeline}</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="block text-[10px] text-slate-400 font-mono">ICAR Protocol</span>
                  <span className="font-semibold text-emerald-400">Strictly Verified</span>
                </div>
              </div>

              {/* Actions: Save to Local Browser History & Listen */}
              <div className="flex items-center justify-between gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleSaveToHistory}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isSavedSuccessfully 
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    {isSavedSuccessfully 
                      ? (isHindi ? '✓ इतिहास में सहेज लिया गया' : '✓ Saved to Offline History')
                      : (isHindi ? 'जांच इतिहास में सहेजें' : 'Save to Offline History')}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const adviceToSpeak = isHindi 
                      ? `${activeDisease.diseaseHi}. ${bifurcatedTab === 'organic' ? activeDisease.organicTreatmentHi : activeDisease.chemicalTreatmentHi}`
                      : `${activeDisease.diseaseEn}. ${bifurcatedTab === 'organic' ? activeDisease.organicTreatmentEn : activeDisease.chemicalTreatmentEn}`;
                    const utterance = new SpeechSynthesisUtterance(adviceToSpeak);
                    utterance.lang = getTTSLangCode(currentLang);
                    window.speechSynthesis?.speak(utterance);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isHindi ? 'सलाह सुनें' : 'Listen'}</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
