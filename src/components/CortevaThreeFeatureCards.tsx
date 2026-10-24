import React from 'react';
import { TrendingUp, Award, RefreshCw, Share2, Sparkles, ArrowRight, Droplets, Wind, Cloud, MapPin } from 'lucide-react';
import { getTranslation } from '../translations';
import { getCortevaCardsStrings } from '../corteva_translations';
import mandiBhavImg from '../assets/images/01-mandi-bhav.jpeg';
import governmentSchemesImg from '../assets/images/02-government-schemes.jpeg';
import liveWeatherImg from '../assets/images/03-live-weather.jpeg';

interface ThreeFeatureCardsProps {
  selectedLang: string;
  onVoiceClick?: () => void;
  onCameraClick?: () => void;
  onMandiClick: () => void;
  onSchemesClick: () => void;
  weatherAdvisory: any;
  isWeatherLoading: boolean;
  weatherIsCached: boolean;
  profile: {
    district: string;
    state: string;
    crop?: string;
  };
  onRefreshWeather: () => void;
  onShareWeather: () => void;
  onOpenProfile: () => void;
  formatLocationDisplay: (district: string, state: string) => string;
  isVoiceActive?: boolean;
}

export const CortevaThreeFeatureCards: React.FC<ThreeFeatureCardsProps> = React.memo(({
  selectedLang,
  onVoiceClick,
  onCameraClick,
  onMandiClick,
  onSchemesClick,
  weatherAdvisory,
  isWeatherLoading,
  weatherIsCached,
  profile,
  onRefreshWeather,
  onShareWeather,
  onOpenProfile,
  formatLocationDisplay,
  isVoiceActive = false,
}) => {
  const t = getCortevaCardsStrings(selectedLang);

  // Card 1 string definitions
  const card1Title = t.card1Title || 'Live Mandi Bhav & MSP Rates';
  const card1Tag = t.card1Tag || 'MARKET INTELLIGENCE';
  const card1Desc = t.card1Desc || 'Track agricultural commodity prices and official Minimum Support Prices to make better-informed selling decisions.';
  const card1Detail1 = t.card1Detail1 || 'Crop-wise mandi prices';
  const card1Detail2 = t.card1Detail2 || 'Market-wise price information';
  const card1Detail3 = t.card1Detail3 || 'Official MSP information';
  const card1Btn = t.card1Btn || 'Check Mandi Bhav';

  // Card 2 string definitions
  const card2Title = t.card2Title || 'Government Schemes for Farmers';
  const card2Tag = t.card2Tag || 'GOVERNMENT AGRICULTURE SUPPORT';
  const card2Desc = t.card2Desc || 'Discover agricultural schemes, understand eligibility requirements, and explore the documents and application steps relevant to farmers.';
  const card2Detail1 = t.card2Detail1 || 'Agricultural government schemes';
  const card2Detail2 = t.card2Detail2 || 'Eligibility and required documents';
  const card2Detail3 = t.card2Detail3 || 'Application guidance and official links';
  const card2Btn = t.card2Btn || 'Explore Government Schemes';

  // Weather condition formatting
  const rawMain = (weatherAdvisory?.debugInfo?.condition || '').trim();
  const rawDesc = (weatherAdvisory?.debugInfo?.description || '').toLowerCase().trim();
  const rawCond = (weatherAdvisory?.condition || '').toLowerCase().trim();
  const mainLower = rawMain.toLowerCase();

  let weatherIcon = '☀️';
  if (mainLower === 'thunderstorm' || rawDesc.includes('thunderstorm') || rawCond.includes('thunder') || rawCond.includes('तूफान')) {
    weatherIcon = '⛈️';
  } else if (mainLower === 'drizzle' || rawDesc.includes('drizzle')) {
    weatherIcon = '🌦️';
  } else if (mainLower === 'rain' || rawDesc.includes('rain') || rawCond.includes('बारिश') || rawCond.includes('वर्षा')) {
    weatherIcon = '🌧️';
  } else if (mainLower === 'clouds' || rawDesc.includes('cloud') || rawCond.includes('बादल')) {
    if (rawDesc.includes('broken') || rawDesc.includes('overcast') || rawCond.includes('घने')) {
      weatherIcon = '☁️';
    } else {
      weatherIcon = '⛅';
    }
  } else if (
    mainLower === 'mist' || mainLower === 'fog' || mainLower === 'haze' || mainLower === 'smoke' ||
    rawDesc.includes('mist') || rawDesc.includes('fog') || rawDesc.includes('haze') || rawDesc.includes('smoke') ||
    rawCond.includes('धुंध') || rawCond.includes('कोहरा')
  ) {
    weatherIcon = '🌫️';
  } else {
    weatherIcon = '☀️';
  }

  const cleanTemp = (weatherAdvisory?.temp || '35°C').replace(/[\s.]*$/, '').trim();
  const cleanCond = (weatherAdvisory?.condition || t.card3Clear).replace(/^[.\s•]+/, '').trim();
  const displayLoc = formatLocationDisplay(profile.district, profile.state);

  return (
    <section id="section-feature-cards" className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header (Corteva Style) */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.sectionKicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.sectionTitleLine1} <span className="text-[#047857]">{t.sectionTitleAccent}</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {t.sectionDesc}
          </p>
        </div>

        {/* EXACTLY THREE MAIN FEATURE CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* CARD 1: LIVE MANDI BHAV & MSP RATES */}
          <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Agricultural Visual */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={mandiBhavImg}
                  alt={card1Title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/01-mandi-bhav.jpeg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-white/60 shadow-xs flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                  <span>{card1Tag}</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-semibold text-amber-200 uppercase tracking-wider block">
                    {t.card1Sub}
                  </span>
                  <p className="text-xs font-medium text-slate-100 truncate">
                    {t.card1Crops}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-emerald-800 transition-colors">
                  {card1Title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal mb-4">
                  {card1Desc}
                </p>

                {/* Supporting Details */}
                <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3.5">
                  <li className="flex items-center gap-2 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                    <span>{card1Detail1}</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                    <span>{card1Detail2}</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                    <span>{card1Detail3}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Interactive Working Action Button */}
            <div className="p-6 pt-0 border-t border-slate-100 mt-2">
              <button
                type="button"
                onClick={onMandiClick}
                className="w-full py-3.5 px-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2.5 bg-[#047857] hover:bg-[#036446] text-white shadow-emerald-900/10 transition-all active:scale-95 shadow-sm cursor-pointer"
                title={card1Btn}
              >
                <TrendingUp className="w-4 h-4 text-emerald-300" />
                <span>{card1Btn}</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </button>
            </div>
          </div>

          {/* CARD 2: GOVERNMENT SCHEMES FOR FARMERS */}
          <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Agricultural Visual */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={governmentSchemesImg}
                  alt={card2Title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/02-government-schemes.jpeg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-indigo-900 text-xs font-bold px-3 py-1 rounded-full border border-white/60 shadow-xs flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{card2Tag}</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-semibold text-indigo-200 uppercase tracking-wider block">
                    {t.card2Sub}
                  </span>
                  <p className="text-xs font-medium text-slate-100 truncate">
                    {t.card2Crops}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-emerald-800 transition-colors">
                  {card2Title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal mb-4">
                  {card2Desc}
                </p>

                {/* Supporting Details */}
                <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3.5">
                  <li className="flex items-center gap-2 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                    <span>{card2Detail1}</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                    <span>{card2Detail2}</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                    <span>{card2Detail3}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Interactive Working Action Button */}
            <div className="p-6 pt-0 border-t border-slate-100 mt-2">
              <button
                type="button"
                onClick={onSchemesClick}
                className="w-full py-3.5 px-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white transition-all active:scale-95 shadow-sm cursor-pointer"
                title={card2Btn}
              >
                <Award className="w-4 h-4 text-emerald-400" />
                <span>{card2Btn}</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </button>
            </div>
          </div>

          {/* CARD 3: LIVE WEATHER INTEGRATION */}
          <div className="bg-white text-white rounded-2xl border border-emerald-600/40 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative">
            {/* Live Weather Card Background Image with solid white base */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-white">
              <img
                src={liveWeatherImg}
                alt="Live Micro-Weather"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/03-live-weather.jpeg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-slate-950/55"></div>
            </div>

            <div className="p-6 relative z-10">
              
              {/* Header Badge & Action Controls */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{t.card3Tag}</span>
                </span>
                
                {/* Refresh and Share Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={onShareWeather}
                    title={getTranslation(selectedLang, 'share_whatsapp')}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-200 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={onRefreshWeather}
                    title={getTranslation(selectedLang, 'retry_weather')}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-200 transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isWeatherLoading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Main Weather Metric */}
              <div className="flex items-center gap-3.5 my-3">
                <div className="w-14 h-14 rounded-xl bg-white/10 border border-emerald-400/20 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                  {weatherIcon}
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {cleanTemp}
                    </span>
                    <span className="text-sm font-bold text-emerald-200">
                      • {cleanCond}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-emerald-300/90 mt-0.5">
                    <button
                      type="button"
                      onClick={onOpenProfile}
                      className="hover:underline flex items-center gap-1 text-left cursor-pointer"
                      title={t.card3ChangeLoc}
                    >
                      <MapPin className="w-3 h-3" />
                      <span>{displayLoc}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Micro-Metrics Row */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-emerald-800/60 my-3 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-emerald-300/80 uppercase font-semibold flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-emerald-400" />
                    {t.card3Humidity}
                  </span>
                  <strong className="text-xs font-black text-white mt-0.5">
                    {weatherAdvisory?.humidity || '63%'}
                  </strong>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-emerald-300/80 uppercase font-semibold flex items-center gap-1">
                    <Wind className="w-3 h-3 text-sky-400" />
                    {t.card3Wind}
                  </span>
                  <strong className="text-xs font-black text-white mt-0.5">
                    {weatherAdvisory?.windSpeed || '3.1 m/s'}
                  </strong>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-emerald-300/80 uppercase font-semibold flex items-center gap-1">
                    <Cloud className="w-3 h-3 text-slate-300" />
                    {t.card3Clouds}
                  </span>
                  <strong className="text-xs font-black text-white mt-0.5">
                    {weatherAdvisory?.clouds || '45%'}
                  </strong>
                </div>
              </div>

              {/* Verified Attribution Tag */}
              <div className="text-[11px] text-emerald-300/80 font-medium flex items-center gap-1.5 mb-2">
                <span className={`w-1.5 h-1.5 rounded-full ${weatherIsCached ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`}></span>
                <span>{!weatherIsCached ? t.card3Verified : t.card3Cached}</span>
              </div>
            </div>

            {/* Bottom Spray Advisory Strip */}
            <div className="p-4 bg-[#021810]/95 border-t border-emerald-800/80 text-xs relative z-10">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 font-bold block">
                    {t.card3SprayTitle}
                  </strong>
                  <p className="text-emerald-50 text-[11px] leading-relaxed mt-0.5 font-medium line-clamp-3">
                    {(() => {
                      let adv = weatherAdvisory?.advisory || t.card3SprayDefault;
                      adv = adv.replace(/\s*\([^)]*आर्द्रता:[^)]*\)/g, '').replace(/\s*\([^)]*Humidity:[^)]*\)/g, '').trim();
                      return adv;
                    })()}
                  </p>
                </div>
              </div>
            </div>

            {/* Background subtle glowing accent */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>
          </div>

        </div>

      </div>
    </section>
  );
});

CortevaThreeFeatureCards.displayName = 'CortevaThreeFeatureCards';
