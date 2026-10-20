import React, { useState } from 'react';
import { Mic, Camera, Send, Sparkles, ArrowRight } from 'lucide-react';
import { getTranslation } from '../translations';

interface HeroProps {
  selectedLang: string;
  onVoiceClick: () => void;
  onCameraClick: () => void;
  onSubmitQuery: (query: string) => void;
  isVoiceActive?: boolean;
}

export const AgreNovaHero: React.FC<HeroProps> = React.memo(({
  selectedLang,
  onVoiceClick,
  onCameraClick,
  onSubmitQuery,
  isVoiceActive = false,
}) => {
  const [inlineQuery, setInlineQuery] = useState('');
  const isHindi = selectedLang === 'hi';

  const handleQuerySubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inlineQuery.trim()) {
      onSubmitQuery(inlineQuery.trim());
      setInlineQuery('');
    }
  };

  const sampleChips = isHindi ? [
    'गेहूं में पीला रतुआ कैसे रोकें?',
    'यूरिया और डीएपी का सही अनुपात',
    'कपास में गुलाबी सुंडी का उपचार',
    'आज का मौसम और छिड़काव सलाह',
  ] : [
    'How to prevent yellow rust in wheat?',
    'Recommended Urea & DAP ratio',
    'Pink bollworm control in cotton',
    'Today weather spray advisory',
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-white pt-6 pb-12 md:pt-10 md:pb-16 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Copy & Farmer Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>
                {isHindi ? 'भारतीय किसानों के लिए आधुनिक AI कृषि मंच' : 'Precision AI Farming Platform for Indian Agriculture'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-none">
              {isHindi ? (
                <>
                  फसल की सुरक्षा, <span className="text-[#047857]">सटीक सलाह</span> <br className="hidden sm:inline" />
                  और अधिक पैदावार AI के साथ
                </>
              ) : (
                <>
                  Precision Crop Protection &amp; <br className="hidden sm:inline" />
                  <span className="text-[#047857]">Smart Agronomy</span> with AI
                </>
              )}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {isHindi
                ? 'अपनी भाषा में बोलकर खेती की समस्या पूछें या अपनी फसल की पत्ती का फोटो भेजें। AgreNova AI आपको तुरंत प्रमाणित कृषि सलाह, मौसम चेतावनी और मंडी भाव देता है।'
                : 'Speak in your regional language or snap a crop photo. AgreNova AI instantly identifies diseases, recommends eco-safe treatments, tracks live weather advisories, and monitors APMC mandi prices.'}
            </p>

            {/* Primary Action Buttons - Farmer First */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {/* Voice Button */}
              <button
                type="button"
                onClick={onVoiceClick}
                className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-200 transform active:scale-95 ${
                  isVoiceActive
                    ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-200 animate-pulse'
                    : 'bg-[#047857] hover:bg-[#036446] shadow-emerald-200/60'
                }`}
                title="VOICE ASSISTANT"
              >
                <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                  <Mic className="w-5 h-5 text-white animate-bounce" />
                </div>
                <span className="text-sm sm:text-base leading-none font-extrabold tracking-wide uppercase">
                  VOICE ASSISTANT
                </span>
              </button>

              {/* Camera Button */}
              <button
                type="button"
                onClick={onCameraClick}
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-slate-800 bg-white border-2 border-emerald-500/80 hover:bg-emerald-50/50 hover:border-emerald-600 shadow-md transition-all duration-200 transform active:scale-95"
                title="CROP DISEASE SCAN"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                  <Camera className="w-5 h-5 text-emerald-700" />
                </div>
                <span className="text-sm sm:text-base leading-none font-extrabold text-slate-900 tracking-wide uppercase">
                  CROP DISEASE SCAN
                </span>
              </button>
            </div>

            {/* Inline Query Input Bar */}
            <form onSubmit={handleQuerySubmit} className="pt-2">
              <div className="relative flex items-center shadow-sm rounded-xl border border-slate-200 bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                <input
                  type="text"
                  value={inlineQuery}
                  onChange={(e) => setInlineQuery(e.target.value)}
                  placeholder={
                    isHindi
                      ? 'अपनी फसल या खाद से संबंधित सवाल यहाँ लिखें...'
                      : 'Ask any question about your crop, fertilizer, or soil...'
                  }
                  className="w-full py-3.5 pl-4 pr-24 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none rounded-xl"
                />
                <div className="absolute right-2 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={onVoiceClick}
                    className="p-2 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition"
                    title={getTranslation('tapToSpeak', selectedLang)}
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                  <button
                    type="submit"
                    disabled={!inlineQuery.trim()}
                    className="p-2 rounded-lg bg-emerald-600 text-white disabled:opacity-40 hover:bg-emerald-700 transition"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sample Quick Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-3">
                <span className="text-xs font-medium text-slate-500">
                  {isHindi ? 'सुझाव:' : 'Quick:'}
                </span>
                {sampleChips.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSubmitQuery(chip)}
                    className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200/80 transition"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </form>

          </div>

          {/* Right Column: Clean AGRIVI-style Product Composition */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Product Frame Showcase */}
              <div className="relative rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden">
                {/* Visual Header */}
                <div className="bg-[#002C23] px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                    <span className="ml-2 text-xs font-semibold text-emerald-100 tracking-wider">
                      AGRENOVA AI · CROP DIAGNOSTIC SUITE
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    Live Engine
                  </span>
                </div>

                {/* Hero Product Photo with Overlay */}
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                  <img
                    src="/src/assets/images/agritech_hero_field_1791980200141.jpg"
                    alt="AgreNova Precision Agriculture Field"
                    className="w-full h-full object-cover object-center filter brightness-95"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                  {/* Floating Crop Scan Result Badge inside visual */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-white/40">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                        {isHindi ? 'तत्काल फसल विश्लेषण' : 'Instant Crop Diagnosis'}
                      </span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        98% AI Precision
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 truncate">
                      {isHindi
                        ? 'पत्ती धब्बा व कीट संक्रमण की प्रारंभिक पहचान और जैविक उपचार'
                        : 'Early leaf spot & pest detection with organic management'}
                    </p>
                  </div>
                </div>

                {/* Quick Action Strip Below Image */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={onCameraClick}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{isHindi ? 'फसल जांचें' : 'Scan Crop'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={onVoiceClick}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-semibold hover:bg-slate-100 transition"
                  >
                    <Mic className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{isHindi ? 'बोलकर पूछें' : 'Ask Question'}</span>
                  </button>
                </div>
              </div>

              {/* Decorative accent element behind */}
              <div className="absolute -top-4 -right-4 -z-10 w-48 h-48 bg-emerald-200/40 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -bottom-4 -left-4 -z-10 w-48 h-48 bg-emerald-100/50 rounded-full blur-2xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

AgreNovaHero.displayName = 'AgreNovaHero';
