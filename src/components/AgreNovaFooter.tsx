import React from 'react';
import { AgreNovaLogoIcon } from './AgreNovaLogo';
import { Phone, Globe, Shield, ExternalLink, Heart } from 'lucide-react';
import { getTranslation } from '../translations';

interface FooterProps {
  selectedLang: string;
  onNavigateTab: (tab: any) => void;
  onOpenProfile: () => void;
}

export const AgreNovaFooter: React.FC<FooterProps> = React.memo(({
  selectedLang,
  onNavigateTab,
  onOpenProfile
}) => {
  const isHindi = selectedLang === 'hi';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#031d14] text-slate-300 border-t border-[#0e3a2b] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#0e3a2b]">
          
          {/* Column 1 & 2: Brand Lockup & Mission */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div 
              className="flex items-center gap-2.5 cursor-pointer" 
              onClick={() => onNavigateTab('home')}
            >
              <AgreNovaLogoIcon className="w-9 h-9" alt="AgreNova AI" variant="emerald" />
              <span className="text-xl font-black text-white tracking-tight">
                AgreNova <span className="text-emerald-400">AI</span>
              </span>
            </div>
            
            <p className="text-xs text-emerald-100/80 leading-relaxed max-w-sm font-medium">
              {isHindi
                ? 'भारतीय किसानों के लिए आधुनिक व समर्पित AI कृषि सहायक मंच। उन्नत कंप्यूटर विज़न से फसल रोग पहचान, लाइव स्थानीय मौसम पूर्वानुमान और आधिकारिक सरकारी मंडी भाव।'
                : 'A dedicated modern AI agricultural intelligence platform for Indian farmers. Precision crop vision diagnostics, localized live weather forecasting, and official government market rates.'}
            </p>

            {/* Helpline Badge */}
            <div className="pt-2">
              <a
                href="tel:18001801551"
                className="inline-flex items-center gap-2 bg-[#003d31] hover:bg-[#004e3e] text-emerald-200 border border-emerald-500/30 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>किसान कॉल सेंटर: 1800-180-1551 (टोल-फ्री)</span>
              </a>
            </div>
          </div>

          {/* Column 3: Platform Destinations */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400">
              {isHindi ? 'प्लेटफॉर्म सेवाएं' : 'Platform'}
            </h4>
            <ul className="flex flex-col gap-2 text-xs font-medium">
              <li>
                <button 
                  onClick={() => onNavigateTab('home')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {getTranslation(selectedLang, 'nav_home')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('diagnosis')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  फसल डॉक्टर (Crop Vision)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('home')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  लाइव मौसम (Weather Advisory)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('msp')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {getTranslation(selectedLang, 'nav_msp')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('tools')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {getTranslation(selectedLang, 'nav_tools')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Farmer Tools & Gov Resources */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400">
              {isHindi ? 'किसान संसाधन' : 'Resources'}
            </h4>
            <ul className="flex flex-col gap-2 text-xs font-medium">
              <li>
                <button 
                  onClick={() => onNavigateTab('schemes')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {getTranslation(selectedLang, 'nav_schemes')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('history')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {getTranslation(selectedLang, 'nav_history')}
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenProfile} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {getTranslation(selectedLang, 'change_profile_link')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('help')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {getTranslation(selectedLang, 'user_guidelines_link')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Official Data Attribution */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400">
              {isHindi ? 'सत्यापित डेटा स्त्रोत' : 'Verified Data'}
            </h4>
            <div className="flex flex-col gap-2 text-[11px] text-emerald-100/70 leading-relaxed font-medium">
              <p>
                🌐 <strong>Agmarknet (data.gov.in)</strong>: भारत सरकार कृषि एवं किसान कल्याण मंत्रालय।
              </p>
              <p>
                🌦️ <strong>OpenWeather API</strong>: लाइव स्थानीय तापमान, वायु वेग व आर्द्रता डेटा।
              </p>
              <p>
                🌾 <strong>ICAR-IIWBR / CACP</strong>: फसल पोषण व न्यूनतम समर्थन मूल्य दिशा-निर्देश।
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/60 font-medium">
          <p>
            © {currentYear} AgreNova AI • कृषक हित में जारी (Farmer Welfare Technology)
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <button 
              onClick={() => onNavigateTab('help')} 
              className="hover:text-emerald-300 transition-colors cursor-pointer"
            >
              उपयोग के नियम
            </button>
            <span>•</span>
            <button 
              onClick={() => onNavigateTab('help')} 
              className="hover:text-emerald-300 transition-colors cursor-pointer"
            >
              गोपनीयता नीति
            </button>
            <span>•</span>
            <button 
              onClick={onOpenProfile} 
              className="hover:text-emerald-300 transition-colors cursor-pointer"
            >
              किसान प्रोफ़ाइल
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
});
