import React from 'react';
import { RefreshCw, Share2, Sparkles, MapPin, Wind, Droplets, Cloud, AlertCircle, ArrowUpRight } from 'lucide-react';
import { getTranslation } from '../translations';
import { WeatherEnvironmentAnimation } from './WeatherEnvironmentAnimation';

interface WeatherBarProps {
  weatherAdvisory: any;
  isWeatherLoading: boolean;
  weatherIsCached: boolean;
  profile: {
    state: string;
    district: string;
    crop?: string;
  };
  selectedLang: string;
  onRefresh: () => void;
  onShare: () => void;
  onOpenProfile: () => void;
  formatLocationDisplay: (district: string, state: string) => string;
}

export const AgreNovaWeatherBar: React.FC<WeatherBarProps> = React.memo(({
  weatherAdvisory,
  isWeatherLoading,
  weatherIsCached,
  profile,
  selectedLang,
  onRefresh,
  onShare,
  onOpenProfile,
  formatLocationDisplay,
}) => {
  const isHindi = selectedLang === 'hi';

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
  const cleanCond = (weatherAdvisory?.condition || (isHindi ? 'साफ़ और धूप भरा मौसम' : 'Clear & Sunny')).replace(/^[.\s•]+/, '').trim();
  const displayLoc = formatLocationDisplay(profile.district, profile.state);

  return (
    <section id="section-weather" className="w-full bg-slate-900 text-white relative overflow-hidden border-y border-slate-800">
      {/* Background Weather Environment Overlay */}
      <WeatherEnvironmentAnimation
        conditionMain={weatherAdvisory?.debugInfo?.condition}
        conditionDesc={weatherAdvisory?.debugInfo?.description}
        conditionHindi={weatherAdvisory?.condition}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left: Weather Status & Location */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Weather Icon Frame */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-3xl sm:text-4xl shadow-inner shrink-0">
              {weatherIcon}
            </div>

            {/* Temp, Condition & Location */}
            <div>
              <div className="flex items-baseline gap-2.5 flex-wrap">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none">
                  {cleanTemp}
                </span>
                <span className="text-sm sm:text-base font-bold text-emerald-300 flex items-center gap-1.5">
                  <span>•</span>
                  <span>{cleanCond}</span>
                </span>
              </div>

              {/* Location & OpenWeather API Tag */}
              <div className="flex items-center gap-2 mt-1.5 flex-wrap text-xs text-slate-300">
                <button
                  type="button"
                  onClick={onOpenProfile}
                  className="inline-flex items-center gap-1 text-emerald-300 hover:text-emerald-200 font-semibold transition"
                  title="स्थान बदलें"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{displayLoc}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-70" />
                </button>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="inline-flex items-center gap-1.5 text-slate-400 font-medium">
                  <span className={`w-1.5 h-1.5 rounded-full ${weatherIsCached ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`}></span>
                  {!weatherIsCached ? 'OpenWeather API · LIVE' : 'कैश्ड डेटा'}
                </span>
                {isWeatherLoading && (
                  <span className="text-[11px] text-emerald-400 font-semibold inline-flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    अपडेट हो रहा है...
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Middle: Micro-metrics (Humidity, Wind, Clouds) */}
          <div className="flex items-center justify-between sm:justify-start gap-6 sm:gap-8 py-3 lg:py-0 border-y lg:border-y-0 lg:border-x border-slate-800 lg:px-8">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-emerald-400">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                  {isHindi ? 'नमी (Humidity)' : 'Humidity'}
                </span>
                <strong className="text-sm font-extrabold text-white">
                  {weatherAdvisory?.humidity || '63%'}
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sky-400">
                <Wind className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                  {isHindi ? 'हवा (Wind)' : 'Wind'}
                </span>
                <strong className="text-sm font-extrabold text-white">
                  {weatherAdvisory?.windSpeed || '3.1 m/s'}
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-300">
                <Cloud className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                  {isHindi ? 'बादल (Clouds)' : 'Clouds'}
                </span>
                <strong className="text-sm font-extrabold text-white">
                  {weatherAdvisory?.clouds || '45%'}
                </strong>
              </div>
            </div>
          </div>

          {/* Right: Actions (Share & Refresh) */}
          <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-center">
            <button
              type="button"
              onClick={onShare}
              title={isHindi ? 'मौसम साझा करें' : 'Share Weather'}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-emerald-200 transition active:scale-95 cursor-pointer shadow-xs"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onRefresh}
              title={isHindi ? 'मौसम रिफ्रेश करें' : 'Refresh Weather'}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-emerald-200 transition active:scale-95 cursor-pointer shadow-xs"
            >
              <RefreshCw className={`w-4 h-4 ${isWeatherLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Integrated Bottom Crop Spraying & Soil Advisory Strip */}
        {weatherAdvisory && (
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2.5 text-xs text-slate-300">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <strong className="text-amber-300 font-bold shrink-0">
              {isHindi ? '🌾 छिड़काव व कृषि सलाह:' : 'Spray Advisory:'}
            </strong>
            <p className="text-slate-200 leading-normal truncate sm:whitespace-normal font-medium">
              {(() => {
                let adv = weatherAdvisory?.advisory || (isHindi ? 'आज का मौसम अनुकूल है। फसल छिड़काव, खाद प्रबंधन व अन्य कृषि कार्य किए जा सकते हैं।' : 'Weather is favorable for standard farming operations.');
                adv = adv.replace(/\s*\([^)]*आर्द्रता:[^)]*\)/g, '').replace(/\s*\([^)]*Humidity:[^)]*\)/g, '').trim();
                return adv;
              })()}
            </p>
          </div>
        )}
      </div>
    </section>
  );
});

AgreNovaWeatherBar.displayName = 'AgreNovaWeatherBar';
