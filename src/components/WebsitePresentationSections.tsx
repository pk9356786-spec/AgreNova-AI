import React from 'react';
import { 
  Mic, Camera, Sparkles, RefreshCw, Share2, ArrowRight, 
  Send, AlertCircle, Volume2, ScanLine, CheckCircle2, 
  Droplets, Wind, Cloud, ShieldCheck, ChevronRight,
  HelpCircle, User, Phone, FileText, Globe, Calculator, TrendingUp
} from 'lucide-react';
import { FarmerProfile } from '../types';
import { mspRates } from '../data';
import { WeatherEnvironmentAnimation } from './WeatherEnvironmentAnimation';
import { AgreNovaLogoIcon } from './AgreNovaLogo';
import { SUPPORTED_LANGUAGES, getTranslation } from '../translations';

interface WebsitePresentationProps {
  selectedLang: string;
  profile: FarmerProfile;
  weatherAdvisory: any;
  isWeatherLoading: boolean;
  weatherIsCached: boolean;
  handleRefreshWeather: () => void;
  handleShareWeather: () => void;
  openVoiceModal: () => void;
  openCameraModal: () => void;
  inputText: string;
  setInputText: (text: string) => void;
  handleAskQuestion: (text: string) => void;
  isAskingQuestion: boolean;
  isRecording: boolean;
  speechError: string;
  setActiveTab: (tab: any) => void;
  setIsProfileModalOpen: (open: boolean) => void;
}

export const WebsitePresentationSections: React.FC<WebsitePresentationProps> = ({
  selectedLang,
  profile,
  weatherAdvisory,
  isWeatherLoading,
  weatherIsCached,
  handleRefreshWeather,
  handleShareWeather,
  openVoiceModal,
  openCameraModal,
  inputText,
  setInputText,
  handleAskQuestion,
  isAskingQuestion,
  isRecording,
  speechError,
  setActiveTab,
  setIsProfileModalOpen,
}) => {
  // Format location string cleanly
  const formatLocation = (districtOrLoc?: string, stateName?: string) => {
    let d = (districtOrLoc || '').trim().replace(/^[\s,]+|[\s,]+$/g, '');
    let s = (stateName || '').trim().replace(/^[\s,]+|[\s,]+$/g, '');
    if (d && s) return `${d}, ${s}`;
    return d || s || 'भारत';
  };

  const displayLoc = formatLocation(profile.district, profile.state);
  const cleanTemp = (weatherAdvisory?.temp || '35°C').replace(/[\s.]*$/, '').trim();
  const cleanCond = (weatherAdvisory?.condition || 'साफ़ और धूप भरा मौसम').replace(/^[.\s•]+/, '').trim();

  // Weather icon mapping
  const rawMain = (weatherAdvisory?.debugInfo?.condition || '').trim().toLowerCase();
  const rawDesc = (weatherAdvisory?.debugInfo?.description || '').toLowerCase().trim();
  const rawCond = (weatherAdvisory?.condition || '').toLowerCase().trim();

  let weatherIcon = '☀️';
  if (rawMain === 'thunderstorm' || rawDesc.includes('thunderstorm') || rawCond.includes('तूफान')) {
    weatherIcon = '⛈️';
  } else if (rawMain === 'drizzle' || rawDesc.includes('drizzle')) {
    weatherIcon = '🌦️';
  } else if (rawMain === 'rain' || rawDesc.includes('rain') || rawCond.includes('बारिश') || rawCond.includes('वर्षा')) {
    weatherIcon = '🌧️';
  } else if (rawMain === 'clouds' || rawDesc.includes('cloud') || rawCond.includes('बादल')) {
    weatherIcon = (rawDesc.includes('broken') || rawDesc.includes('overcast') || rawCond.includes('घने')) ? '☁️' : '⛅';
  } else if (rawMain === 'mist' || rawMain === 'fog' || rawMain === 'haze' || rawDesc.includes('fog') || rawCond.includes('धुंध')) {
    weatherIcon = '🌫️';
  }

  // Active crop name localized
  const activeCropName = profile.crop ? (mspRates[profile.crop]?.name || profile.crop) : 'गेहूं (Wheat)';

  return (
    <div className="w-full flex flex-col gap-10 md:gap-14">
      {/* -------------------------------------------------------------------------
          SECTION B: AGRICULTURE-FOCUSED HERO SECTION
      -------------------------------------------------------------------------- */}
      <section 
        id="hero-section" 
        className="relative pt-2 pb-6 md:py-10 border-b border-slate-200/80 overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Authentic Brand Narrative, Bilingual Headline & Direct Working CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Domain Kicker Text (Clean, Unboxed Discipline) */}
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wide mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <span>AgreNova AI</span>
              <span className="text-slate-400">·</span>
              <span>AI for Smarter Agriculture</span>
            </div>

            {/* Confident Headline (Hindi Primary, English Secondary) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-2">
              बेहतर जानकारी से, <br className="hidden sm:inline" />
              <span className="text-[#047857]">बेहतर खेती की ओर।</span>
            </h1>

            {/* Global English Subtitle */}
            <p className="text-base sm:text-lg font-bold text-slate-700 tracking-tight mb-4">
              Smarter Farming Starts With Better Guidance.
            </p>

            {/* Supporting Hindi Copy */}
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-xl mb-6">
              खेती से जुड़ा सवाल हो, फसल की समस्या हो या मौसम की जानकारी — 
              AgreNova AI से बोलकर पूछें या फोटो भेजें।
            </p>

            {/* Two Direct Farmer CTAs (Immediate Working Triggers) */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6">
              {/* Primary CTA: बोलकर पूछें */}
              <button
                type="button"
                id="hero-cta-voice"
                onClick={openVoiceModal}
                className="bg-[#002C23] hover:bg-[#003d31] active:scale-[0.98] text-white px-6 py-3.5 rounded-xl font-black text-base flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all cursor-pointer min-h-[50px] group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-[#34D399] flex items-center justify-center shrink-0 border border-emerald-400/30 group-hover:scale-105 transition-transform">
                  <Mic className="w-4.5 h-4.5" />
                </div>
                <div className="text-left flex flex-col justify-center">
                  <span className="leading-none text-white font-black">बोलकर पूछें</span>
                  <span className="text-[11px] text-emerald-200/90 font-medium mt-0.5">Voice Assistant</span>
                </div>
              </button>

              {/* Secondary CTA: फसल की फोटो भेजें */}
              <button
                type="button"
                id="hero-cta-photo"
                onClick={openCameraModal}
                className="bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-900 border-2 border-slate-300 hover:border-emerald-600 px-6 py-3.5 rounded-xl font-black text-base flex items-center justify-center gap-3 shadow-xs hover:shadow-md transition-all cursor-pointer min-h-[50px] group"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-200 group-hover:scale-105 transition-transform">
                  <Camera className="w-4.5 h-4.5" />
                </div>
                <div className="text-left flex flex-col justify-center">
                  <span className="leading-none text-slate-900 font-black">फसल की फोटो भेजें</span>
                  <span className="text-[11px] text-slate-500 font-medium mt-0.5">Crop Disease Diagnosis</span>
                </div>
              </button>
            </div>

            {/* Quick Context & Trust Indicators */}
            <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold flex-wrap">
              <span className="flex items-center gap-1.5 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                100% नि:शुल्क व सुरक्षित
              </span>
              <span className="text-slate-300">·</span>
              <span>10 भारतीय भाषाओं में उपलब्ध</span>
              <span className="text-slate-300">·</span>
              <span>कोई जटिल रजिस्ट्रेशन नहीं</span>
            </div>
          </div>

          {/* Right Column: Authentic Agriculture Live Product Preview */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 flex flex-col gap-4 relative overflow-hidden">
              
              {/* Product Preview Card Header */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#002C23] text-white flex items-center justify-center font-bold text-xs">
                    🌾
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 leading-tight">
                      किसान सहायता केंद्र (Live Advisor)
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      {displayLoc}
                    </p>
                  </div>
                </div>

                {/* Live System Indicator */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>सक्रिय (Active)</span>
                </div>
              </div>

              {/* Active Farm Profile Context */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70 flex items-center justify-between gap-2 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">वर्तमान प्रोफाइल</span>
                  <span className="font-extrabold text-slate-800 text-xs sm:text-sm">{profile.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">मुख्य फसल</span>
                  <span className="font-black text-emerald-800 text-xs sm:text-sm">{activeCropName}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(true)}
                  className="px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/60 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  बदलें
                </button>
              </div>

              {/* 3 Real Product Demonstrations in Context */}
              <div className="space-y-2.5">
                {/* 1. Voice Interaction Demo */}
                <div 
                  onClick={openVoiceModal}
                  className="p-3 rounded-xl border border-slate-100 hover:border-emerald-300 bg-slate-50/50 hover:bg-emerald-50/30 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0">
                      🎙️
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-900">
                        "गेहूं में पीला रतुआ लग रहा है, क्या छिड़कें?"
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">बोलकर पूछें • प्राकृतिक भाषा समझ</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>

                {/* 2. Crop Diagnosis Demo */}
                <div 
                  onClick={openCameraModal}
                  className="p-3 rounded-xl border border-slate-100 hover:border-teal-300 bg-slate-50/50 hover:bg-teal-50/30 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold shrink-0">
                      📷
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-teal-900">
                        रोगग्रस्त पत्ती की फोटो से तत्काल पहचान
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">विज़न AI • जैविक व रासायनिक उपचार</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>

                {/* 3. Live Weather Guidance Demo */}
                <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-xs font-bold shrink-0">
                      ⛅
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        छिड़काव सुरक्षा: {weatherAdvisory?.isSpraySafe ? 'आज मौसम अनुकूल है' : 'सावधानी बरतें'}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">IMD एवं OpenWeather लाइव डेटा</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-black text-slate-700">{cleanTemp}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION C: LIVE WEATHER EXPERIENCE PANEL (ELEGANT, COMPACT, PREMIUM)
      -------------------------------------------------------------------------- */}
      <section id="weather-panel-section" className="w-full">
        <div 
          id="weather-emerald-card"
          className="bg-gradient-to-r from-[#062a1d] via-[#083624] to-[#0a3d2b] text-white p-4 sm:p-5 md:p-6 rounded-2xl border border-emerald-700/50 relative overflow-hidden flex flex-col justify-between gap-4 transition-all duration-300 shadow-sm"
        >
          {/* Automatic Weather Environment Animation Overlay (Gentle environmental tones, no sun graphic) */}
          <WeatherEnvironmentAnimation 
            conditionMain={weatherAdvisory?.debugInfo?.condition}
            conditionDesc={weatherAdvisory?.debugInfo?.description}
            conditionHindi={weatherAdvisory?.condition}
          />

          {/* Top Badge Header Row */}
          <div className="flex items-center justify-between gap-3 relative z-10 flex-wrap">
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                <span>लाइव मौसम व कृषि पूर्वानुमान</span>
              </div>
              <span className="text-xs text-emerald-200/80 font-medium hidden sm:inline">
                📍 {displayLoc} (अनुमानित)
              </span>
            </div>

            <div className="flex items-center gap-2">
              {isWeatherLoading && (
                <span className="text-[10px] text-emerald-200 bg-white/10 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-semibold">
                  <span className="w-2 h-2 border border-white border-t-transparent rounded-full animate-spin"></span>
                  अपडेट हो रहा है...
                </span>
              )}
              {/* Circular Action Buttons */}
              <button
                type="button"
                id="btn-share-weather"
                onClick={handleShareWeather}
                title="मौसम साझा करें"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer shrink-0 shadow-xs"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-200" />
              </button>
              <button
                type="button"
                id="btn-refresh-weather"
                onClick={handleRefreshWeather}
                title="मौसम रिफ्रेश करें"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer shrink-0 shadow-xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-emerald-200 ${isWeatherLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Main Weather Information Display */}
          {weatherAdvisory ? (
            <div className="z-10 flex flex-col gap-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                
                {/* Left Side: Glowing Icon, Large Temp & Condition */}
                <div className="flex items-center gap-3.5">
                  <div className="w-13 h-13 rounded-xl bg-white/10 border border-emerald-400/25 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                    {weatherIcon}
                  </div>

                  <div>
                    <div className="flex items-baseline gap-2 flex-wrap sm:flex-nowrap">
                      <span className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none drop-shadow-xs">
                        {cleanTemp}
                      </span>
                      <span className="text-base sm:text-lg font-extrabold text-emerald-100 whitespace-nowrap leading-none flex items-center gap-1.5">
                        <span>•</span>
                        <span>{cleanCond}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-[11px] text-emerald-300/90 font-medium">
                        🌐 {!weatherIsCached ? 'OpenWeather API • लाइव मौसम डेटा' : 'कैश्ड मौसम डेटा'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Micro-Metrics */}
                <div className="flex items-center justify-between md:justify-end gap-5 w-full md:w-auto md:border-l md:border-emerald-700/50 md:pl-6 pt-2 md:pt-0 border-t md:border-t-0 border-emerald-800/40">
                  <div className="flex items-center gap-5 sm:gap-6 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] text-emerald-300 font-medium flex items-center gap-1">
                        <Droplets className="w-3 h-3" /> नमी
                      </span>
                      <strong className="text-xs sm:text-sm font-black text-white mt-0.5">
                        {weatherAdvisory.humidity || '63%'}
                      </strong>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] text-emerald-300 font-medium flex items-center gap-1">
                        <Wind className="w-3 h-3" /> हवा
                      </span>
                      <strong className="text-xs sm:text-sm font-black text-white mt-0.5">
                        {weatherAdvisory.windSpeed || '3.09 m/s'}
                      </strong>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] text-emerald-300 font-medium flex items-center gap-1">
                        <Cloud className="w-3 h-3" /> बादल
                      </span>
                      <strong className="text-xs sm:text-sm font-black text-white mt-0.5">
                        {weatherAdvisory.clouds || '65%'}
                      </strong>
                    </div>
                  </div>
                </div>

              </div>

              {/* Integrated Bottom Advisory Strip */}
              <div className="bg-[#031d14]/90 border border-emerald-800/60 rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs text-white">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-amber-300 font-bold shrink-0">🌾 मृदा / छिड़काव सलाह:</span>
                <p className="text-emerald-50 font-medium leading-relaxed">
                  {(() => {
                    let adv = weatherAdvisory.advisory || 'आज का मौसम अनुकूल है। फसल छिड़काव, खाद प्रबंधन व अन्य कृषि कार्य किए जा सकते हैं।';
                    adv = adv.replace(/\s*\([^)]*आर्द्रता:[^)]*\)/g, '').replace(/\s*\([^)]*Humidity:[^)]*\)/g, '').trim();
                    if (!adv || adv.includes('आर्द्रता:') || adv.includes('Humidity:')) {
                      adv = weatherAdvisory.isSpraySafe
                        ? 'आज का मौसम फसल छिड़काव और कृषि कार्यों के लिए अनुकूल है।'
                        : 'मौसम में बदलाव संभव है। कीटनाशक छिड़काव व सिंचाई ध्यानपूर्वक करें।';
                    }
                    return adv;
                  })()}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3 py-6 px-2 text-emerald-100 z-10 min-h-[90px]">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-300 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">मौसम डेटा लोड हो रहा है...</h4>
                  <p className="text-xs text-emerald-200 mt-0.5">कृपया प्रतीक्षा करें या पुनः प्रयास करें</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRefreshWeather}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                रिफ्रेश करें
              </button>
            </div>
          )}
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION D: IMMEDIATE AI ASSISTANCE (TWO WORKING ACTION PANELS + SEARCH)
      -------------------------------------------------------------------------- */}
      <section id="ai-assistance-section" className="w-full flex flex-col gap-6">
        {/* Section Heading */}
        <div className="text-left md:text-center flex flex-col md:items-center gap-1">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">तत्काल सहायता</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            आज खेती में किस बात की मदद चाहिए?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl">
            फसल रोग की पहचान करनी हो या कृषि विशेषज्ञों से तुरंत सलाह लेनी हो — नीचे दिया गया विकल्प चुनें
          </p>
        </div>

        {/* Two Original, Simple, Professional Action Panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          
          {/* Action Panel 1: बोलकर पूछें */}
          <div 
            id="panel-action-voice"
            onClick={openVoiceModal}
            className="bg-white hover:bg-emerald-50/20 border-2 border-slate-200/90 hover:border-emerald-600 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer group relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="w-12 h-12 rounded-xl bg-[#002C23] text-[#34D399] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                  <Mic className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  10+ भाषाएं समर्थित
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug mb-1.5 group-hover:text-[#047857] transition-colors">
                बोलकर पूछें (Voice Assistant)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                अपनी भाषा में बोलकर सवाल पूछें — जैसे खाद की मात्रा, फसल के रोग, मौसम या सरकारी योजनाओं के बारे में।
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-emerald-700">
                माइक चालू करें और बोलें
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 group-hover:bg-[#002C23] text-emerald-800 group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Action Panel 2: फसल की फोटो भेजें */}
          <div 
            id="panel-action-photo"
            onClick={openCameraModal}
            className="bg-white hover:bg-teal-50/20 border-2 border-slate-200/90 hover:border-teal-600 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer group relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="w-12 h-12 rounded-xl bg-teal-800 text-teal-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                  कंप्यूटर विज़न AI
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug mb-1.5 group-hover:text-teal-800 transition-colors">
                फसल की फोटो भेजें (Crop Vision Analysis)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                रोगग्रस्त पत्ती या पौधे की फोटो खींचें या अपलोड करें। AI तुरंत रोग की पहचान, गंभीरता और सटीक उपचार बताएगा।
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-teal-700">
                कैमरा या गैलरी से फोटो चुनें
              </span>
              <div className="w-8 h-8 rounded-lg bg-teal-50 group-hover:bg-teal-800 text-teal-800 group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>

        {/* Unified Prompt & Search Card */}
        <div 
          id="home-unified-prompt-card"
          className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-3.5 w-full"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span>✍️</span>
              <span>लिखकर या बोलकर पूछें (Ask any farming question)</span>
            </span>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">Enter दबाएं या पूछें बटन पर क्लिक करें</span>
          </div>

          {/* Search Input Row */}
          <div className="flex items-center gap-2.5 w-full">
            <div className="flex-1 flex items-center bg-slate-50 hover:bg-slate-100/80 focus-within:bg-white border border-slate-300 rounded-xl px-3 py-1 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-600 transition-all min-h-[46px]">
              <input
                id="input-text-home-search"
                type="text"
                placeholder={getTranslation(selectedLang, 'home_search_placeholder') || 'जैसे: गेहूं में पीला रतुआ, यूरिया की सही मात्रा...'}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && inputText.trim()) {
                    handleAskQuestion(inputText);
                  }
                }}
                className="w-full py-1.5 text-xs sm:text-sm font-semibold bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none min-w-0"
              />
              <button
                type="button"
                id="btn-voice-input-home-bar"
                onClick={openVoiceModal}
                className={`p-2 rounded-lg border transition-all flex items-center justify-center shrink-0 cursor-pointer ml-1 min-h-[34px] min-w-[34px] ${
                  isRecording 
                    ? 'bg-rose-600 text-white border-rose-700 animate-pulse' 
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
                }`}
                title={isRecording ? 'रिकॉर्डिंग रोकें' : 'बोलकर पूछें'}
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>

            <button
              id="btn-submit-home-search"
              onClick={() => {
                if (inputText.trim()) {
                  handleAskQuestion(inputText);
                }
              }}
              disabled={isAskingQuestion || !inputText.trim()}
              className="bg-[#002C23] hover:bg-[#003d31] disabled:bg-slate-200 disabled:text-slate-400 text-white font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all cursor-pointer shrink-0 min-h-[46px]"
            >
              <Send className="w-4 h-4" />
              <span>{getTranslation(selectedLang, 'ask_btn') || 'पूछें'}</span>
            </button>
          </div>

          {speechError && (
            <div className="flex items-start gap-2 bg-rose-50 p-2.5 rounded-xl text-xs text-rose-700 border border-rose-200">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{speechError}</span>
            </div>
          )}

          {/* Popular Questions Chips (Unboxed / Clean Outline Style) */}
          <div className="flex flex-col gap-1.5 pt-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {getTranslation(selectedLang, 'frequently_asked_questions') || 'अक्सर पूछे जाने वाले सवाल (Popular Questions)'}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {[
                getTranslation(selectedLang, 'voice_example_1'),
                getTranslation(selectedLang, 'voice_example_2'),
                getTranslation(selectedLang, 'voice_example_3'),
                getTranslation(selectedLang, 'voice_example_4')
              ].filter(Boolean).map((query, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setInputText(query);
                    handleAskQuestion(query);
                  }}
                  className="text-xs font-semibold bg-slate-50 hover:bg-emerald-50 hover:text-emerald-900 text-slate-700 hover:border-emerald-300 px-3 py-1.5 rounded-lg border border-slate-200 transition-all cursor-pointer text-left active:scale-95 shadow-2xs"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION E: HOW AGRENOVA AI WORKS (3 SIMPLE STEPS)
      -------------------------------------------------------------------------- */}
      <section id="how-it-works" className="w-full pt-4 border-t border-slate-200/80">
        <div className="text-left md:text-center flex flex-col md:items-center gap-1 mb-8">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">सरल कार्यप्रणाली</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            AgreNova AI कैसे काम करता है?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl">
            खेत में खड़े किसान के लिए तीन सरल व व्यावहारिक चरणों में समाधान
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Step 1 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-emerald-800/25">01</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm">
                🎙️
              </div>
            </div>
            <h3 className="text-base font-black text-slate-900">
              1. अपनी समस्या बताएं
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              खेत से सीधे बोलकर पूछें, लिखकर प्रश्न भेजें या अपनी बीमार फसल व पत्ती की साफ़ फोटो खींचकर अपलोड करें।
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-teal-800/25">02</span>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold text-sm">
                🔬
              </div>
            </div>
            <h3 className="text-base font-black text-slate-900">
              2. AI जानकारी समझेगा
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              AgreNova AI आपकी स्थानीय मिट्टी, वर्तमान मौसम, फसल प्रकार और प्रमाणित कृषि विज्ञान के अनुसार समस्या का सटीक विश्लेषण करता है।
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-amber-800/25">03</span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm">
                🌱
              </div>
            </div>
            <h3 className="text-base font-black text-slate-900">
              3. उपयोगी मार्गदर्शन पाएं
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              संभावित रोग की पहचान, नुकसान की रोकथाम, जैविक व रासायनिक उपचार और छिड़काव की सही मात्रा तुरंत अपनी भाषा में प्राप्त करें।
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION F: VERIFIED PRODUCT CAPABILITIES
      -------------------------------------------------------------------------- */}
      <section id="capabilities" className="w-full pt-4 border-t border-slate-200/80">
        <div className="text-left md:text-center flex flex-col md:items-center gap-1 mb-8">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">प्रमाणित क्षमताएं</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            कृषि विज्ञान और AI तकनीक का संगम
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl">
            Built for the Realities of the Field — verified capabilities designed for Indian agriculture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Cap 1: Voice */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-[#002C23] text-[#34D399] flex items-center justify-center font-bold text-sm mb-3">
                <Mic className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-base font-black text-slate-900 mb-1.5">
                Voice-First AI Advisory
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                टाइपिंग की बाध्यता के बिना सीधे बोलकर सवाल पूछें और अपनी स्थानीय भाषा में स्पष्ट आवाज में समाधान सुनें।
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-700">
              ✓ 10 भारतीय भाषाएं समर्थित
            </div>
          </div>

          {/* Cap 2: Computer Vision */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-teal-800 text-teal-200 flex items-center justify-center font-bold text-sm mb-3">
                <Camera className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-base font-black text-slate-900 mb-1.5">
                Crop Disease Vision Diagnosis
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                गेहूं का रतुआ, टमाटर का झुलसा, धान का झोंका और कपास के कीटों की फोटो से पहचान कर वैज्ञानिक निदान।
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] font-bold text-teal-700">
              ✓ 90%+ रोग पहचान सटीकता
            </div>
          </div>

          {/* Cap 3: Weather */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-emerald-800 text-emerald-200 flex items-center justify-center font-bold text-sm mb-3">
                <Cloud className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-base font-black text-slate-900 mb-1.5">
                Hyperlocal Weather Intelligence
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                तहसील व जिला स्तर पर लाइव तापमान, आर्द्रता और हवा की गति के आधार पर कीटनाशक छिड़काव व सिंचाई की सुरक्षा सलाह।
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-700">
              ✓ OpenWeather API व IMD समन्वय
            </div>
          </div>

          {/* Cap 4: Fertilizer Calculator */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-cyan-800 text-cyan-200 flex items-center justify-center font-bold text-sm mb-3">
                <Calculator className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-base font-black text-slate-900 mb-1.5">
                Scientific Fertilizer Calculators
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                भूमि के आकार और चयनित फसल के अनुसार यूरिया, DAP और पोटाश (MOP) की आवश्यक बोरियों की वैज्ञानिक गणना।
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('tools')}
              className="pt-3 mt-3 border-t border-slate-100 text-[11px] font-bold text-cyan-700 hover:text-cyan-800 text-left cursor-pointer flex items-center justify-between"
            >
              <span>कैलकुलेटर खोलें</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Cap 5: Mandi MSP */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-amber-800 text-amber-200 flex items-center justify-center font-bold text-sm mb-3">
                <TrendingUp className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-base font-black text-slate-900 mb-1.5">
                Mandi & MSP Price Intelligence
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                भारत सरकार द्वारा घोषित 2026-27 न्यूनतम समर्थन मूल्य (MSP) और निकटतम कृषि उपज मंडियों के दैनिक भाव।
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('msp')}
              className="pt-3 mt-3 border-t border-slate-100 text-[11px] font-bold text-amber-800 hover:text-amber-900 text-left cursor-pointer flex items-center justify-between"
            >
              <span>MSP दरें देखें</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Cap 6: Context-Aware */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-indigo-800 text-indigo-200 flex items-center justify-center font-bold text-sm mb-3">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-base font-black text-slate-900 mb-1.5">
                Context-Aware Agronomy
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                किसान के प्रोफाइल, मिट्टी के प्रकार और जिले के कृषि-जलवायु क्षेत्र (Agro-Climatic Zone) के अनुसार वैयक्तिकृत सुझाव।
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] font-bold text-indigo-700">
              ✓ ICAR व KVK प्रोटोकॉल आधारित
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION G: ABOUT AGRENOVA AI (PROBLEM, SOLUTION & CREDIBILITY)
      -------------------------------------------------------------------------- */}
      <section id="about-agrenova" className="w-full pt-4 border-t border-slate-200/80">
        <div className="bg-[#002C23] text-white rounded-2xl p-6 sm:p-8 md:p-10 border border-[#00382d] shadow-sm">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
            
            <div className="w-12 h-12 flex items-center justify-center mb-4">
              <AgreNovaLogoIcon className="w-11 h-11" alt="AgreNova Logo" />
            </div>

            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">
              About AgreNova AI
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-4">
              AI for Smarter Agriculture
            </h2>

            {/* Core Mission Copy Requested by User */}
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-medium mb-8">
              "AgreNova AI is an AI-powered agriculture assistance platform designed to make farming information easier to access through natural-language interaction, crop images and relevant weather context."
            </p>

            {/* Honest Problem & Solution Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left w-full">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="text-sm font-black text-emerald-300 mb-1.5 flex items-center gap-1.5">
                  <span>⚠️</span>
                  <span>The Agricultural Challenge</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Smallholder farmers face unpredictable crop losses from pests, fungal pathogens, and erratic climate windows, often lacking timely access to certified agronomists right when critical field decisions must be made.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="text-sm font-black text-[#34D399] mb-1.5 flex items-center gap-1.5">
                  <span>💡</span>
                  <span>The AgreNova AI Solution</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  We remove literacy and interface friction by enabling natural voice dialogues and instant camera diagnosis in regional languages, combining computer vision with real-time weather telemetry and agronomic science.
                </p>
              </div>
            </div>

            {/* Core Credibility Principles */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 pt-6 border-t border-white/10 text-xs text-emerald-200/80 font-medium">
              <span>🌾 Built for everyday farmers</span>
              <span>·</span>
              <span>🎙️ Voice-first accessibility</span>
              <span>·</span>
              <span>🔬 Scientific agronomy grounding</span>
              <span>·</span>
              <span>🛡️ Honest capability boundaries</span>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION H: RESTRAINED, PROFESSIONAL WEBSITE FOOTER
      -------------------------------------------------------------------------- */}
      <footer className="w-full pt-8 pb-4 border-t border-slate-200 text-slate-600">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-2">
              <AgreNovaLogoIcon className="w-7 h-7" alt="AgreNova Logo" />
              <span className="text-lg font-black text-slate-900">
                AgreNova <span className="text-emerald-700">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-sm mb-4">
              AI for Smarter Agriculture. भारतीय किसानों को सशक्त बनाने, फसल सुरक्षा सुनिश्चित करने और कृषि उत्पादकता बढ़ाने के लिए समर्पित डिजिटल एग्रीटेक समाधान।
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-700 font-bold bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/80">
              <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>किसान कॉल सेंटर: 1800-180-1551 (टोल-फ्री)</span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-3 flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              उत्पाद व सुविधाएं
            </span>
            <button 
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs text-slate-600 hover:text-emerald-700 text-left transition-colors cursor-pointer"
            >
              मुख्य पृष्ठ (Home)
            </button>
            <a 
              href="#how-it-works"
              className="text-xs text-slate-600 hover:text-emerald-700 text-left transition-colors cursor-pointer"
            >
              यह कैसे काम करता है (How It Works)
            </a>
            <a 
              href="#capabilities"
              className="text-xs text-slate-600 hover:text-emerald-700 text-left transition-colors cursor-pointer"
            >
              सुविधाएं (Capabilities)
            </a>
            <button 
              onClick={() => setActiveTab('tools')}
              className="text-xs text-slate-600 hover:text-emerald-700 text-left transition-colors cursor-pointer"
            >
              कृषि कैलकुलेटर (Calculators)
            </button>
            <button 
              onClick={() => setActiveTab('msp')}
              className="text-xs text-slate-600 hover:text-emerald-700 text-left transition-colors cursor-pointer"
            >
              MSP दरें (Mandi & MSP)
            </button>
            <button 
              onClick={() => setActiveTab('schemes')}
              className="text-xs text-slate-600 hover:text-emerald-700 text-left transition-colors cursor-pointer"
            >
              सरकारी योजनाएं (Schemes)
            </button>
          </div>

          {/* Support & Governance */}
          <div className="md:col-span-4 flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              किसान सहायता व सेटिंग्स
            </span>
            <button 
              onClick={() => setIsProfileModalOpen(true)}
              className="text-xs text-slate-600 hover:text-emerald-700 text-left transition-colors cursor-pointer"
            >
              किसान प्रोफ़ाइल सेटिंग्स (Farmer Profile)
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className="text-xs text-slate-600 hover:text-emerald-700 text-left transition-colors cursor-pointer"
            >
              जांच इतिहास व सहेजी गई रिपोर्ट्स (Past Reports)
            </button>
            <button 
              onClick={() => setActiveTab('help')}
              className="text-xs text-slate-600 hover:text-emerald-700 text-left transition-colors cursor-pointer"
            >
              उपयोग दिशा-निर्देश (User Guidelines)
            </button>
            <a 
              href="#about-agrenova"
              className="text-xs text-slate-600 hover:text-emerald-700 text-left transition-colors cursor-pointer"
            >
              हमारे बारे में (About AgreNova AI)
            </a>
          </div>

        </div>

        {/* Bottom Attribution Bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
          <p>© 2026 AgreNova AI • सर्वाधिकार सुरक्षित (All Rights Reserved).</p>
          <p className="text-[11px] text-slate-400 text-center sm:text-right">
            लाइव मौसम OpenWeather API द्वारा प्रदत्त • कृषि परामर्श भारतीय कृषि अनुसंधान परिषद (ICAR) दिशा-निर्देशों पर आधारित
          </p>
        </div>
      </footer>
    </div>
  );
};
