import React from 'react';
import { Phone, Linkedin, Twitter } from 'lucide-react';
import { StartupEcosystemSection } from './StartupEcosystemSection';
import { getCortevaCompanyStrings } from '../corteva_translations';

interface CompanySectionProps {
  selectedLang: string;
  onNavigateTab: (tab: any) => void;
  onOpenProfile: () => void;
}

export const CortevaCompanySection: React.FC<CompanySectionProps> = React.memo(({
  selectedLang,
  onNavigateTab,
  onOpenProfile
}) => {
  const t = getCortevaCompanyStrings(selectedLang);
  const currentYear = new Date().getFullYear();

  return (
    <footer id="section-company-about" className="w-full bg-[#002C23] text-slate-200 border-t border-emerald-950 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* A & B: AgreNova AI Company Introduction & Contact Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Brand Introduction */}
          <div className="lg:col-span-7 space-y-4">
            <div 
              className="flex items-center cursor-pointer select-none" 
              onClick={() => onNavigateTab('home')}
            >
              <span className="text-2xl font-black text-white tracking-tight">
                AgreNova <span className="text-[#34D399]">AI</span>
              </span>
            </div>

            <p className="text-sm text-emerald-100/90 leading-relaxed font-normal max-w-xl">
              {t.mission}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-emerald-200/80">
              <a
                href="https://www.linkedin.com/company/agrenova-ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-200 hover:text-white px-3 py-1.5 rounded-lg border border-emerald-700/50 hover:border-emerald-500/70 transition-colors shadow-2xs cursor-pointer"
                title="AgreNova AI on LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold">LinkedIn</span>
              </a>
              <a
                href="https://x.com/AgreNova_AI"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-200 hover:text-white px-3 py-1.5 rounded-lg border border-emerald-700/50 hover:border-emerald-500/70 transition-colors shadow-2xs cursor-pointer"
                title="AgreNova AI on X (Twitter)"
              >
                <Twitter className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold">X (Twitter)</span>
              </a>
            </div>
          </div>

          {/* Farmer Support & Contact */}
          <div className="lg:col-span-5 space-y-3 lg:pl-6">
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-[#34D399] leading-tight pt-1">
                {t.helplineTitle}
              </h4>
              <p className="text-xs text-emerald-100/80 leading-relaxed max-w-md mt-1.5">
                {t.helplineDesc}
              </p>
            </div>
            <div className="pt-1">
              <a
                href="tel:18001801551"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-black transition-colors shadow-sm cursor-pointer whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 fill-current shrink-0" />
                <span>{t.helplineBtn}</span>
              </a>
            </div>
          </div>

        </div>

        {/* C. Founder & Innovation Ecosystem Subsection (Strictly 3 Approved Entries) */}
        <StartupEcosystemSection selectedLang={selectedLang} />

        {/* D. Footer Copyright Strip */}
        <div className="pt-5 border-t border-emerald-800/60 text-xs text-emerald-200/70 font-medium text-center sm:text-left">
          <p>
            {t.copyright.replace('2026', String(currentYear))}
          </p>
        </div>

      </div>
    </footer>
  );
});

CortevaCompanySection.displayName = 'CortevaCompanySection';
