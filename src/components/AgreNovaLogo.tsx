import React from 'react';

interface LogoProps {
  className?: string;
  alt?: string;
  variant?: 'white' | 'badge' | 'default';
}

export const AgreNovaStarIcon: React.FC<{ className?: string; color?: string }> = React.memo(({
  className = "w-8 h-8",
  color = "#FFFFFF"
}) => (
  <svg 
    viewBox="0 0 200 200" 
    className={`${className} shrink-0`} 
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Center Dot */}
    <circle cx="100" cy="100" r="3.2" />

    {/* Ring 1 (Inner dots) */}
    <circle cx="100" cy="84" r="4.2" />
    <circle cx="111.3" cy="88.7" r="4.2" />
    <circle cx="116" cy="100" r="4.2" />
    <circle cx="111.3" cy="111.3" r="4.2" />
    <circle cx="100" cy="116" r="4.2" />
    <circle cx="88.7" cy="111.3" r="4.2" />
    <circle cx="84" cy="100" r="4.2" />
    <circle cx="88.7" cy="88.7" r="4.2" />

    {/* Ring 2 (Middle-Inner dots) */}
    <circle cx="100" cy="66" r="6.2" />
    <circle cx="124" cy="76" r="6.2" />
    <circle cx="134" cy="100" r="6.2" />
    <circle cx="124" cy="124" r="6.2" />
    <circle cx="100" cy="134" r="6.2" />
    <circle cx="76" cy="124" r="6.2" />
    <circle cx="66" cy="100" r="6.2" />
    <circle cx="76" cy="76" r="6.2" />

    {/* Ring 3 (Middle-Outer dots) */}
    <circle cx="100" cy="45" r="8.5" />
    <circle cx="138.9" cy="61.1" r="8.5" />
    <circle cx="155" cy="100" r="8.5" />
    <circle cx="138.9" cy="138.9" r="8.5" />
    <circle cx="100" cy="155" r="8.5" />
    <circle cx="61.1" cy="138.9" r="8.5" />
    <circle cx="45" cy="100" r="8.5" />
    <circle cx="61.1" cy="61.1" r="8.5" />

    {/* Ring 4 (Outer dots) */}
    <circle cx="100" cy="22" r="11.2" />
    <circle cx="155.2" cy="44.8" r="11.2" />
    <circle cx="178" cy="100" r="11.2" />
    <circle cx="155.2" cy="155.2" r="11.2" />
    <circle cx="100" cy="178" r="11.2" />
    <circle cx="44.8" cy="155.2" r="11.2" />
    <circle cx="22" cy="100" r="11.2" />
    <circle cx="44.8" cy="44.8" r="11.2" />
  </svg>
));

export const AgreNovaLogoIcon: React.FC<LogoProps> = React.memo(({ 
  className = "w-9 h-9 sm:w-10 sm:h-10", 
  alt = "AgreNova AI Logo",
  variant = "white"
}) => {
  if (variant === "badge") {
    return (
      <div className={`relative flex items-center justify-center rounded-xl bg-white p-1 shadow-sm shrink-0 ${className}`}>
        <img 
          src="/agrenova-logo.svg" 
          alt={alt} 
          className="w-full h-full object-contain" 
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center shrink-0 ${className}`} title={alt}>
      <AgreNovaStarIcon className="w-full h-full" color="#FFFFFF" />
    </div>
  );
});

export const AgreNovaLogoBadge: React.FC<LogoProps> = React.memo(({ className = "w-10 h-10", alt = "AgreNova AI" }) => {
  return (
    <div className={`relative flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-xs p-1.5 shrink-0 ${className}`}>
      <AgreNovaStarIcon className="w-full h-full" color="#FFFFFF" />
    </div>
  );
});
