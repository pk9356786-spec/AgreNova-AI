import React from 'react';
import { AgreNovaLogoIcon } from './AgreNovaLogo';
import { Menu } from 'lucide-react';
import { FarmerProfile } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  selectedLang: string;
  setSelectedLang: (lang: string) => void;
  profile: FarmerProfile;
  onOpenProfile: () => void;
  onOpenDrawer: () => void;
  onOpenVoiceModal: () => void;
}

export const AgTechHeader: React.FC<HeaderProps> = React.memo(({
  setActiveTab,
  onOpenDrawer
}) => {
  return (
    <header id="app-header" className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs z-[200] sticky top-0 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3 sm:gap-6">
          
          {/* Zone 1: Brand Wordmark */}
          <div 
            className="flex items-center gap-3 shrink-0 cursor-pointer select-none group"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0">
              <AgreNovaLogoIcon className="w-full h-full" alt="AgreNova Logo" variant="emerald" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                AgreNova <span className="text-emerald-700">AI</span>
              </span>
              <span className="text-xs sm:text-[13.5px] text-slate-600 font-semibold tracking-normal mt-1 sm:mt-1.5 leading-none">
                AI for Smarter Agriculture
              </span>
            </div>
          </div>

          {/* Hamburger Menu Action Button (Accessible across Desktop & Mobile) */}
          <div className="flex items-center shrink-0">
            <button
              id="hamburger-menu-btn"
              onClick={onOpenDrawer}
              aria-label="मेनू खोलें"
              title="मेनू (Menu)"
              className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer shrink-0 shadow-2xs"
            >
              <Menu className="w-5 h-5 text-slate-800" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
});

AgTechHeader.displayName = 'AgTechHeader';
