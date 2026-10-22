import React, { useState } from 'react';
import { Mic, Camera, Send, Sparkles, ArrowRight } from 'lucide-react';
import { getTranslation } from '../translations';
import { getCortevaHeroStrings } from '../corteva_translations';
import heroFarmerImg from '../assets/images/agritech_hero_field_1791980200141.jpg';

interface CortevaHeroProps {
  selectedLang: string;
  onVoiceClick: () => void;
  onCameraClick: () => void;
  onSubmitQuery: (query: string) => void;
  isVoiceActive?: boolean;
}

export const CortevaVideoHero: React.FC<CortevaHeroProps> = React.memo(({
  selectedLang,
  onVoiceClick,
  onCameraClick,
  onSubmitQuery,
  isVoiceActive = false,
}) => {
  const [inlineQuery, setInlineQuery] = useState('');
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const playAttemptedRef = React.useRef(false);
  const heroStrings = getCortevaHeroStrings(selectedLang);

  React.useEffect(() => {
    const video = videoRef.current;
    if (video && !playAttemptedRef.current) {
      playAttemptedRef.current = true;
      video.muted = true;
      video.defaultMuted = true;
      if (video.paused) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('Hero video autoplay play() caught:', err);
          });
        }
      }
    }
  }, []);

  const handleQuerySubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inlineQuery.trim()) {
      onSubmitQuery(inlineQuery.trim());
      setInlineQuery('');
    }
  };

  const sampleChips = heroStrings.chips;

  return (
    <section className="relative w-full min-h-[80vh] sm:min-h-[82vh] lg:min-h-[88vh] flex items-center overflow-hidden bg-slate-950 text-white">
      {/* 1. Main Dashboard Hero Background Video with Fallback Image */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        {!videoFailed ? (
          <video
            ref={videoRef}
            src="/videos/agrenova-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={(e) => {
              const v = e.currentTarget;
              if (v.paused) {
                v.play().catch(() => {});
              }
            }}
            onError={() => setVideoFailed(true)}
            className="w-full h-full object-cover object-[55%_35%] sm:object-[50%_40%] md:object-center"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src="/videos/agrenova-hero.mp4" type="video/mp4" />
          </video>
        ) : (
          <img
            src={heroFarmerImg}
            alt="Indian farmer holding a smartphone in a crop field - AgreNova AI"
            className="w-full h-full object-cover object-[55%_35%] sm:object-[50%_40%] md:object-center"
            loading="eager"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/agritech_hero_field_1791980200141.jpg';
            }}
          />
        )}

        {/* 2. Professional Dark Contrast Overlays (Corteva Style: Cinematic & High Readability) */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-950/45 to-slate-950/70 md:bg-gradient-to-r md:from-slate-950/80 md:via-slate-950/45 md:to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 z-10" />
      </div>

      {/* 3. Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 lg:py-28 w-full">
        <div className="max-w-3xl space-y-5 sm:space-y-6">
          
          {/* Corteva-style Kicker Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-bold tracking-wide backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>
              {heroStrings.kicker}
            </span>
          </div>

          {/* Large Hero Headline */}
          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight sm:leading-none drop-shadow-sm">
            {heroStrings.headingLine1} <span className="text-[#34D399]">{heroStrings.headingAccent}</span> <br />
            {heroStrings.headingLine2}
          </h1>

          {/* Supporting Description */}
          <p className="text-sm sm:text-lg lg:text-xl text-slate-200 leading-relaxed font-normal max-w-2xl text-shadow-sm">
            {heroStrings.description}
          </p>

          {/* Primary Farmer Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-1 sm:pt-2">
            {/* Voice Button */}
            <button
              type="button"
              onClick={onVoiceClick}
              className={`flex items-center justify-center gap-3 px-5 py-3.5 sm:px-6 sm:py-4 rounded-xl font-extrabold text-white shadow-xl transition-all duration-200 transform active:scale-95 cursor-pointer ${
                isVoiceActive
                  ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-900/50 animate-pulse'
                  : 'bg-[#047857] hover:bg-[#036446] shadow-emerald-950/60'
              }`}
              title="VOICE ASSISTANT"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <Mic className={`w-4 h-4 sm:w-5 sm:h-5 text-white ${isVoiceActive ? 'animate-bounce' : ''}`} />
              </div>
              <span className="text-xs sm:text-base leading-none font-extrabold tracking-wide uppercase">
                VOICE ASSISTANT
              </span>
            </button>

            {/* Camera Button */}
            <button
              type="button"
              onClick={onCameraClick}
              className="flex items-center justify-center gap-3 px-5 py-3.5 sm:px-6 sm:py-4 rounded-xl font-extrabold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 shadow-xl transition-all duration-200 transform active:scale-95 cursor-pointer"
              title="CROP DISEASE SCAN"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
              </div>
              <span className="text-xs sm:text-base leading-none font-extrabold text-white tracking-wide uppercase">
                CROP DISEASE SCAN
              </span>
            </button>
          </div>

          {/* Inline Prompt Query Bar */}
          <form onSubmit={handleQuerySubmit} className="pt-1 sm:pt-2">
            <div className="relative flex items-center shadow-lg rounded-xl border border-white/20 bg-slate-900/80 backdrop-blur-md focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-500/30 transition-all">
              <input
                type="text"
                value={inlineQuery}
                onChange={(e) => setInlineQuery(e.target.value)}
                placeholder={heroStrings.inputPlaceholder}
                className="w-full py-3 sm:py-3.5 pl-3.5 sm:pl-4 pr-20 sm:pr-24 text-xs sm:text-base text-white placeholder-slate-400 focus:outline-none bg-transparent"
              />
              <div className="absolute right-2 flex items-center gap-1 sm:gap-1.5">
                <button
                  type="button"
                  onClick={onVoiceClick}
                  className="p-1.5 sm:p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
                  title={getTranslation(selectedLang, 'tapToSpeak')}
                >
                  <Mic className="w-4 h-4 text-emerald-400" />
                </button>
                <button
                  type="submit"
                  disabled={!inlineQuery.trim()}
                  className="p-1.5 sm:p-2 rounded-lg bg-emerald-600 text-white disabled:opacity-40 hover:bg-emerald-500 transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Quick Chips */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2.5 sm:pt-3">
              <span className="text-[11px] sm:text-xs font-semibold text-slate-300">
                {heroStrings.quickLabel}
              </span>
              {sampleChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSubmitQuery(chip)}
                  className="text-[11px] sm:text-xs px-2.5 py-1 rounded-full bg-white/10 hover:bg-emerald-600/40 text-slate-200 border border-white/15 transition cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>
          </form>

        </div>
      </div>
    </section>
  );
});

CortevaVideoHero.displayName = 'CortevaVideoHero';
