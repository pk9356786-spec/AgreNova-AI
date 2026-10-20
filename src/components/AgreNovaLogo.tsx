import React from 'react';

interface LogoProps {
  className?: string;
  alt?: string;
  variant?: 'white' | 'dark' | 'emerald' | 'badge' | 'default';
}

export const AgreNovaStarIcon: React.FC<{ className?: string; color?: string }> = React.memo(({
  className = "w-8 h-8",
  color = "#002C23"
}) => (
  <svg 
    viewBox="0 0 200 200" 
    className={`${className} shrink-0`} 
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Center Dot */}
    <circle cx="100.0" cy="100.0" r="3.4" />

    {/* 8 Primary Radial Arms */}
    <circle cx="100.00" cy="84.00" r="4.30" />
    <circle cx="100.00" cy="66.00" r="6.30" />
    <circle cx="100.00" cy="45.00" r="8.60" />
    <circle cx="100.00" cy="22.00" r="11.20" />

    <circle cx="111.31" cy="88.69" r="4.30" />
    <circle cx="124.04" cy="75.96" r="6.30" />
    <circle cx="138.89" cy="61.11" r="8.60" />
    <circle cx="155.15" cy="44.85" r="11.20" />

    <circle cx="116.00" cy="100.00" r="4.30" />
    <circle cx="134.00" cy="100.00" r="6.30" />
    <circle cx="155.00" cy="100.00" r="8.60" />
    <circle cx="178.00" cy="100.00" r="11.20" />

    <circle cx="111.31" cy="111.31" r="4.30" />
    <circle cx="124.04" cy="124.04" r="6.30" />
    <circle cx="138.89" cy="138.89" r="8.60" />
    <circle cx="155.15" cy="155.15" r="11.20" />

    <circle cx="100.00" cy="116.00" r="4.30" />
    <circle cx="100.00" cy="134.00" r="6.30" />
    <circle cx="100.00" cy="155.00" r="8.60" />
    <circle cx="100.00" cy="178.00" r="11.20" />

    <circle cx="88.69" cy="111.31" r="4.30" />
    <circle cx="75.96" cy="124.04" r="6.30" />
    <circle cx="61.11" cy="138.89" r="8.60" />
    <circle cx="44.85" cy="155.15" r="11.20" />

    <circle cx="84.00" cy="100.00" r="4.30" />
    <circle cx="66.00" cy="100.00" r="6.30" />
    <circle cx="45.00" cy="100.00" r="8.60" />
    <circle cx="22.00" cy="100.00" r="11.20" />

    <circle cx="88.69" cy="88.69" r="4.30" />
    <circle cx="75.96" cy="75.96" r="6.30" />
    <circle cx="61.11" cy="61.11" r="8.60" />
    <circle cx="44.85" cy="44.85" r="11.20" />

    {/* 8 Intermediate Dots */}
    <circle cx="109.00" cy="78.29" r="4.80" />
    <circle cx="121.71" cy="91.00" r="4.80" />
    <circle cx="121.71" cy="109.00" r="4.80" />
    <circle cx="109.00" cy="121.71" r="4.80" />
    <circle cx="91.00" cy="121.71" r="4.80" />
    <circle cx="78.29" cy="109.00" r="4.80" />
    <circle cx="78.29" cy="91.00" r="4.80" />
    <circle cx="91.00" cy="78.29" r="4.80" />
  </svg>
));

export const AgreNovaLogoIcon: React.FC<LogoProps> = React.memo(({ 
  className = "w-9 h-9 sm:w-10 sm:h-10", 
  alt = "AgreNova AI Logo",
  variant = "emerald"
}) => {
  if (variant === "white") {
    return (
      <div className={`flex items-center justify-center shrink-0 ${className}`} title={alt}>
        <AgreNovaStarIcon className="w-full h-full" color="#FFFFFF" />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center shrink-0 ${className}`} title={alt}>
      <img 
        src="/agrenova-logo.png" 
        alt={alt} 
        className="w-full h-full object-contain" 
        loading="eager"
      />
    </div>
  );
});

export const AgreNovaLogoBadge: React.FC<LogoProps> = React.memo(({ className = "w-10 h-10", alt = "AgreNova AI" }) => {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <img 
        src="/agrenova-logo.png" 
        alt={alt} 
        className="w-full h-full object-contain" 
        loading="eager"
      />
    </div>
  );
});
