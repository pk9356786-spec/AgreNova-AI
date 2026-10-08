/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, MicOff, X, Sparkles, AlertCircle, AlertTriangle, 
  CheckCircle2, RefreshCw, Volume2, ShieldAlert, Send, 
  CornerDownLeft, Radio, WifiOff, FileText
} from 'lucide-react';
import { getTranslation } from '../translations';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  isRecording: boolean;
  speechError: string;
  spokenQueryText: string;
  selectedLang: string;
  onToggleRecording: () => void;
  onClose: () => void;
  onSubmit: () => void;
  onClearSpokenText: () => void;
  onSetSpokenText: (text: string) => void;
  onRetryRecording: () => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = React.memo(({
  isOpen,
  isRecording,
  speechError,
  spokenQueryText,
  selectedLang,
  onToggleRecording,
  onClose,
  onSubmit,
  onClearSpokenText,
  onSetSpokenText,
  onRetryRecording
}) => {
  if (!isOpen) return null;

  const hasCapturedText = Boolean(spokenQueryText.trim());
  const isPermissionError = speechError.includes('अनुमति') || speechError.toLowerCase().includes('not-allowed') || speechError.toLowerCase().includes('permission');
  const isNoSpeechError = speechError.includes('सुनाई नहीं दी') || speechError.toLowerCase().includes('no-speech');
  const isNetworkError = speechError.includes('नेटवर्क') || speechError.toLowerCase().includes('network');

  const exampleQuestions = [
    getTranslation(selectedLang, 'voice_example_1'),
    getTranslation(selectedLang, 'voice_example_2'),
    getTranslation(selectedLang, 'voice_example_3'),
    getTranslation(selectedLang, 'voice_example_4')
  ];

  return (
    <AnimatePresence>
      <motion.div 
        id="voice-assistant-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div 
          id="voice-assistant-modal-container"
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            borderRadius: '16px',
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.28)'
          }}
          className="bg-white w-full max-w-lg overflow-hidden border border-slate-200/90 flex flex-col my-auto"
        >
          {/* 1. Header Bar: Solid Gradient Green */}
          <div className="bg-[#064e3b] bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#065f46] text-white px-5 py-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/25 shadow-inner shrink-0">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white leading-tight flex items-center gap-2">
                  <span>{getTranslation(selectedLang, 'voice_assistant_modal_title')}</span>
                </h3>
                <p className="text-xs text-emerald-100/90 font-medium mt-0.5">
                  {getTranslation(selectedLang, 'voice_assistant_modal_sub')}
                </p>
              </div>
            </div>
            <button 
              id="btn-close-voice-modal"
              type="button"
              onClick={onClose}
              aria-label="Close Voice Modal"
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* 2. Modal Body */}
          <div className="p-4 sm:p-6 flex flex-col gap-4 sm:gap-5 bg-slate-50/60 max-h-[calc(90vh-80px)] sm:max-h-[80vh] overflow-y-auto">
            
            {/* Step Hint Banner */}
            <div className="bg-emerald-100/80 border border-emerald-300/80 rounded-xl px-3 py-2 text-[11px] sm:text-xs font-bold text-emerald-950 text-center flex items-center justify-center gap-1.5 shadow-2xs">
              <span className="text-emerald-700">💡</span>
              <span className="leading-snug">{getTranslation(selectedLang, 'voice_step_hint')}</span>
            </div>

            {/* 3. Core Voice Pulse & Dynamic Equalizer Section */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col items-center justify-center text-center">
              
              {/* Mic Icon with Concentric Waves */}
              <div className="relative flex items-center justify-center mb-3">
                {isRecording && (
                  <>
                    <span className="animate-ping absolute inline-flex h-28 w-28 rounded-full bg-emerald-400 opacity-25" />
                    <span className="animate-pulse absolute inline-flex h-24 w-24 rounded-full bg-emerald-500 opacity-30" />
                  </>
                )}
                <button
                  id="btn-voice-modal-pulse-mic"
                  type="button"
                  onClick={onToggleRecording}
                  aria-label={isRecording ? getTranslation(selectedLang, 'voice_mic_stop') : getTranslation(selectedLang, 'voice_mic_start')}
                  className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center text-white transition-all shadow-lg active:scale-95 cursor-pointer ${
                    isRecording 
                      ? 'bg-gradient-to-br from-rose-600 via-rose-700 to-rose-800 shadow-rose-600/40 ring-4 ring-rose-300/70 scale-105' 
                      : hasCapturedText 
                      ? 'bg-gradient-to-br from-emerald-600 to-teal-700 shadow-emerald-700/30 hover:scale-105 ring-4 ring-emerald-200/60'
                      : 'bg-gradient-to-br from-emerald-700 to-[#064e3b] shadow-emerald-950/30 hover:scale-105'
                  }`}
                >
                  {isRecording ? (
                    <MicOff className="w-9 h-9 text-white animate-pulse" />
                  ) : (
                    <Mic className="w-9 h-9 text-emerald-100" />
                  )}
                </button>
              </div>

              {/* Dynamic Live Audio Equalizer Waveform during active listening */}
              {isRecording && (
                <div className="flex items-center justify-center gap-1.5 h-6 my-1.5" aria-hidden="true">
                  <span className="w-1.5 h-3 bg-emerald-500 rounded-full animate-pulse" style={{ animationDuration: '0.4s' }} />
                  <span className="w-1.5 h-5 bg-emerald-600 rounded-full animate-pulse" style={{ animationDuration: '0.6s' }} />
                  <span className="w-1.5 h-6 bg-teal-600 rounded-full animate-pulse" style={{ animationDuration: '0.3s' }} />
                  <span className="w-1.5 h-4 bg-emerald-600 rounded-full animate-pulse" style={{ animationDuration: '0.5s' }} />
                  <span className="w-1.5 h-6 bg-teal-500 rounded-full animate-pulse" style={{ animationDuration: '0.7s' }} />
                  <span className="w-1.5 h-4 bg-emerald-500 rounded-full animate-pulse" style={{ animationDuration: '0.4s' }} />
                  <span className="w-1.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" style={{ animationDuration: '0.55s' }} />
                </div>
              )}

              {/* Status Header Badge */}
              <div className="mt-1 flex flex-col items-center gap-1">
                {isRecording ? (
                  <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-800 border border-rose-200 px-3.5 py-1 rounded-full text-xs font-black">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping inline-block" />
                    <span>{getTranslation(selectedLang, 'voice_listening_status')}</span>
                  </div>
                ) : hasCapturedText ? (
                  <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1 rounded-full text-xs font-black">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{getTranslation(selectedLang, 'voice_captured_status')}</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 text-xs font-black text-slate-700">
                    <span>🎙️</span>
                    <span>{getTranslation(selectedLang, 'voice_tap_to_speak')}</span>
                  </div>
                )}

                <p className="text-[11px] text-slate-500 font-semibold max-w-xs mt-0.5 leading-relaxed">
                  {isRecording 
                    ? getTranslation(selectedLang, 'voice_recording_hint')
                    : hasCapturedText 
                    ? getTranslation(selectedLang, 'voice_captured_hint')
                    : getTranslation(selectedLang, 'voice_idle_hint')}
                </p>
              </div>

              {/* Instant Speak-Again button if text is already captured */}
              {!isRecording && hasCapturedText && (
                <button
                  type="button"
                  onClick={onRetryRecording}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-200/80 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95 min-h-[38px]"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{getTranslation(selectedLang, 'voice_speak_again_btn')}</span>
                </button>
              )}

              {/* 4. Structured Error State Cards */}
              {speechError && (
                <div className="mt-3.5 w-full text-left">
                  {isPermissionError ? (
                    <div className="bg-rose-50/90 border border-rose-200 p-3 rounded-xl flex items-start gap-2.5 text-xs text-rose-900 shadow-2xs">
                      <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <span className="font-black block">{getTranslation(selectedLang, 'voice_perm_err_title')}</span>
                        <p className="text-[11px] text-rose-800 mt-0.5 font-medium leading-relaxed">
                          {getTranslation(selectedLang, 'voice_perm_err_desc')}
                        </p>
                        <button
                          type="button"
                          onClick={onRetryRecording}
                          className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold bg-white text-rose-800 border border-rose-300 hover:bg-rose-100/60 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer min-h-[36px]"
                        >
                          <RefreshCw className="w-3 h-3 text-rose-700" />
                          <span>{getTranslation(selectedLang, 'voice_retry_perm_btn')}</span>
                        </button>
                      </div>
                    </div>
                  ) : isNoSpeechError ? (
                    <div className="bg-amber-50/90 border border-amber-200 p-3 rounded-xl flex items-start gap-2.5 text-xs text-amber-950 shadow-2xs">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <span className="font-black block">{getTranslation(selectedLang, 'voice_no_speech_title')}</span>
                        <p className="text-[11px] text-amber-900 mt-0.5 font-medium leading-relaxed">
                          {getTranslation(selectedLang, 'voice_no_speech_desc')}
                        </p>
                        <button
                          type="button"
                          onClick={onRetryRecording}
                          className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold bg-white text-amber-900 border border-amber-300 hover:bg-amber-100/60 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer min-h-[36px]"
                        >
                          <Mic className="w-3 h-3 text-amber-700" />
                          <span>{getTranslation(selectedLang, 'voice_try_again_btn')}</span>
                        </button>
                      </div>
                    </div>
                  ) : isNetworkError ? (
                    <div className="bg-amber-50/90 border border-amber-200 p-3 rounded-xl flex items-start gap-2.5 text-xs text-amber-950 shadow-2xs">
                      <WifiOff className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <span className="font-black block">{getTranslation(selectedLang, 'voice_network_err_title')}</span>
                        <p className="text-[11px] text-amber-900 mt-0.5 font-medium leading-relaxed">
                          {getTranslation(selectedLang, 'voice_network_err_desc')}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-xl flex items-center gap-2 text-xs text-rose-800">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span className="break-words">{speechError}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 5. Recognized Query Preview Box (Editable) */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{getTranslation(selectedLang, 'voice_captured_label')}</span>
                </label>
                {spokenQueryText && (
                  <button 
                    type="button" 
                    onClick={onClearSpokenText}
                    className="text-[11px] text-slate-400 hover:text-rose-600 font-bold cursor-pointer transition-colors p-1"
                  >
                    {getTranslation(selectedLang, 'voice_clear_btn')}
                  </button>
                )}
              </div>
              <div className="relative">
                <textarea
                  id="textarea-voice-spoken-preview"
                  rows={3}
                  value={spokenQueryText}
                  onChange={(e) => onSetSpokenText(e.target.value)}
                  placeholder={getTranslation(selectedLang, 'voice_preview_placeholder')}
                  className={`w-full p-3 text-xs sm:text-sm font-semibold rounded-xl border focus:outline-none focus:ring-2 bg-white text-slate-900 placeholder:text-slate-400 resize-none shadow-2xs transition-all ${
                    hasCapturedText 
                      ? 'border-emerald-400 ring-1 ring-emerald-400/30 focus:border-emerald-600 focus:ring-emerald-600/30' 
                      : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-600/30'
                  }`}
                />
              </div>
            </div>

            {/* 6. Agricultural Example Prompts (Quick Tap) */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-black text-slate-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{getTranslation(selectedLang, 'voice_examples_heading')}</span>
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {exampleQuestions.map((example, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSetSpokenText(example)}
                    className="text-left text-xs font-bold text-slate-700 bg-white hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 p-2.5 px-3 rounded-xl border border-slate-200/90 transition-all shadow-2xs cursor-pointer flex items-center gap-2 active:scale-[0.99] min-h-[44px]"
                  >
                    <span className="text-emerald-600 text-xs shrink-0">🌾</span>
                    <span className="flex-1 break-words">{example}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 7. Bottom Action Buttons: Cancel and Submit Side-by-Side */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2 border-t border-slate-200">
              <button
                id="btn-voice-modal-cancel"
                type="button"
                onClick={onClose}
                className="flex-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer min-h-[44px] text-center"
              >
                {getTranslation(selectedLang, 'voice_cancel_btn')}
              </button>
              <button
                id="btn-voice-modal-submit"
                type="button"
                onClick={onSubmit}
                disabled={!spokenQueryText.trim()}
                className="flex-1 bg-[#047857] hover:bg-[#065f46] disabled:bg-slate-200 disabled:text-slate-400 text-white py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer min-h-[44px] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 shrink-0" />
                <span className="truncate">{getTranslation(selectedLang, 'voice_submit_btn')}</span>
              </button>
            </div>

            {/* Privacy & Permission Reassurance */}
            <p className="text-[10px] text-slate-400 text-center font-medium leading-relaxed">
              {getTranslation(selectedLang, 'voice_privacy_note')}
            </p>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});
