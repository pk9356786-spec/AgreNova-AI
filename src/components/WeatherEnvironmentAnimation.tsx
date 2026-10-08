import React from 'react';

export type WeatherAnimType =
  | 'clear'
  | 'partly_cloudy'
  | 'overcast'
  | 'rain'
  | 'drizzle'
  | 'thunderstorm'
  | 'mist';

interface WeatherEnvironmentAnimationProps {
  conditionMain?: string;
  conditionDesc?: string;
  conditionHindi?: string;
}

export function getWeatherAnimType(
  main?: string,
  desc?: string,
  hindiCond?: string
): WeatherAnimType {
  const mainLower = (main || '').toLowerCase().trim();
  const descLower = (desc || '').toLowerCase().trim();
  const condLower = (hindiCond || '').toLowerCase().trim();

  if (
    mainLower === 'thunderstorm' ||
    descLower.includes('thunderstorm') ||
    condLower.includes('thunder') ||
    condLower.includes('तूफान')
  ) {
    return 'thunderstorm';
  }

  if (mainLower === 'drizzle' || descLower.includes('drizzle')) {
    return 'drizzle';
  }

  if (
    mainLower === 'rain' ||
    descLower.includes('rain') ||
    condLower.includes('बारिश') ||
    condLower.includes('वर्षा')
  ) {
    return 'rain';
  }

  if (
    mainLower === 'clouds' ||
    descLower.includes('cloud') ||
    condLower.includes('बादल')
  ) {
    if (
      descLower.includes('few') ||
      descLower.includes('scattered') ||
      condLower.includes('आंशिक')
    ) {
      return 'partly_cloudy';
    }
    if (
      descLower.includes('broken') ||
      descLower.includes('overcast') ||
      condLower.includes('घने')
    ) {
      return 'overcast';
    }
    return 'partly_cloudy';
  }

  if (
    mainLower === 'mist' ||
    mainLower === 'fog' ||
    mainLower === 'haze' ||
    mainLower === 'smoke' ||
    descLower.includes('mist') ||
    descLower.includes('fog') ||
    descLower.includes('haze') ||
    descLower.includes('smoke') ||
    condLower.includes('धुंध') ||
    condLower.includes('कोहरा')
  ) {
    return 'mist';
  }

  return 'clear';
}

export const WeatherEnvironmentAnimation: React.FC<WeatherEnvironmentAnimationProps> = React.memo(({
  conditionMain,
  conditionDesc,
  conditionHindi,
}) => {
  const type = getWeatherAnimType(conditionMain, conditionDesc, conditionHindi);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0">
      {type === 'partly_cloudy' && (
        <>
          {/* Soft sky ambient movement */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 via-cyan-400/5 to-transparent animate-weather-sun-pulse" />
          {/* Drifting Cloud 1 */}
          <div className="absolute top-2 -left-8 w-48 h-20 opacity-25 animate-weather-cloud-slow">
            <svg viewBox="0 0 100 50" className="w-full h-full fill-white">
              <path d="M20 35 a15 15 0 0 1 28 -8 a12 12 0 0 1 22 2 a10 10 0 0 1 12 10 a10 10 0 0 1 -10 10 h-52 a12 12 0 0 1 0 -14 z" />
            </svg>
          </div>
          {/* Drifting Cloud 2 */}
          <div className="absolute top-10 right-4 w-56 h-24 opacity-20 animate-weather-cloud-fast">
            <svg viewBox="0 0 100 50" className="w-full h-full fill-teal-100">
              <path d="M25 38 a14 14 0 0 1 26 -6 a10 10 0 0 1 18 3 a8 8 0 0 1 11 8 a8 8 0 0 1 -8 8 h-47 a11 11 0 0 1 0 -13 z" />
            </svg>
          </div>
        </>
      )}

      {type === 'overcast' && (
        <>
          {/* Calm overcast atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-700/20 via-slate-800/15 to-transparent" />
          {/* Deep Cloud Layer 1 */}
          <div className="absolute -top-4 -left-10 w-72 h-32 opacity-30 animate-weather-cloud-slow">
            <svg viewBox="0 0 120 60" className="w-full h-full fill-slate-200">
              <path d="M15 45 a18 18 0 0 1 34 -10 a15 15 0 0 1 28 3 a12 12 0 0 1 15 12 h-77 z" />
            </svg>
          </div>
          {/* Deep Cloud Layer 2 */}
          <div className="absolute top-6 -right-8 w-80 h-36 opacity-25 animate-weather-cloud-fast">
            <svg viewBox="0 0 120 60" className="w-full h-full fill-teal-100">
              <path d="M20 48 a20 20 0 0 1 38 -12 a16 16 0 0 1 30 4 a12 12 0 0 1 14 12 h-82 z" />
            </svg>
          </div>
        </>
      )}

      {type === 'rain' && (
        <>
          {/* Soft wet/rain ambient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-sky-800/10 to-teal-900/20" />
          {/* Animated raindrops */}
          <div className="absolute inset-0">
            {[10, 22, 35, 48, 60, 72, 85, 93].map((leftPct, idx) => (
              <div
                key={idx}
                className="absolute w-[1.5px] h-5 bg-sky-200/60 rounded-full animate-weather-rain"
                style={{
                  left: `${leftPct}%`,
                  animationDelay: `${(idx * 0.18) % 1.2}s`,
                  animationDuration: `${1.1 + (idx % 3) * 0.2}s`,
                }}
              />
            ))}
          </div>
          {/* Gentle rain mist at bottom */}
          <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-sky-300/15 to-transparent" />
        </>
      )}

      {type === 'drizzle' && (
        <>
          {/* Soft drizzle background */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-900/15 via-teal-900/10 to-transparent" />
          {/* Lighter, finer raindrops falling slower */}
          <div className="absolute inset-0">
            {[12, 28, 42, 58, 74, 88].map((leftPct, idx) => (
              <div
                key={idx}
                className="absolute w-[1px] h-3 bg-blue-100/40 rounded-full animate-weather-drizzle"
                style={{
                  left: `${leftPct}%`,
                  animationDelay: `${(idx * 0.35) % 2.0}s`,
                  animationDuration: `${2.0 + (idx % 2) * 0.4}s`,
                }}
              />
            ))}
          </div>
        </>
      )}

      {type === 'thunderstorm' && (
        <>
          {/* Storm ambient dark gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/25 via-indigo-950/20 to-slate-950/30" />
          {/* Subtle occasional lightning flash */}
          <div className="absolute inset-0 bg-indigo-100/30 animate-weather-lightning" />
          {/* Rain overlay */}
          <div className="absolute inset-0">
            {[8, 20, 34, 46, 62, 75, 88, 95].map((leftPct, idx) => (
              <div
                key={idx}
                className="absolute w-[1.5px] h-6 bg-purple-100/70 rounded-full animate-weather-rain"
                style={{
                  left: `${leftPct}%`,
                  animationDelay: `${(idx * 0.15) % 1.0}s`,
                  animationDuration: `${0.9 + (idx % 3) * 0.2}s`,
                }}
              />
            ))}
          </div>
        </>
      )}

      {type === 'mist' && (
        <>
          {/* Subtle drifting mist layers */}
          <div className="absolute inset-x-0 top-2 h-16 bg-gradient-to-r from-transparent via-zinc-200/20 to-transparent animate-weather-mist" />
          <div
            className="absolute inset-x-0 bottom-4 h-20 bg-gradient-to-r from-transparent via-teal-100/15 to-transparent animate-weather-mist"
            style={{ animationDelay: '3s', animationDuration: '22s' }}
          />
        </>
      )}
    </div>
  );
});
