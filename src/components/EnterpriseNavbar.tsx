import React, { useState } from 'react';
import { 
  ChevronDown, Globe, Menu, X, ArrowRight, ShieldCheck, 
  Cpu, Layers, Building2, BookOpen, Handshake, Sparkles, 
  CheckCircle2, ExternalLink, Calendar, UserCheck
} from 'lucide-react';
import { AgreNovaLogoIcon } from './AgreNovaLogo';

interface EnterpriseNavbarProps {
  currentLang: 'en' | 'hi';
  onToggleLang: (lang: 'en' | 'hi') => void;
  onOpenBooking: () => void;
  onOpenLogin: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const EnterpriseNavbar: React.FC<EnterpriseNavbarProps> = ({
  currentLang,
  onToggleLang,
  onOpenBooking,
  onOpenLogin,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const isHindi = currentLang === 'hi';

  const navDropdowns = [
    {
      id: 'products',
      label: isHindi ? 'उत्पाद (Products)' : 'Products',
      items: [
        {
          title: isHindi ? 'फार्म मैनेजमेंट सॉफ्टवेयर (FMS)' : 'Farm Management Software (FMS)',
          desc: isHindi ? 'एंटरप्राइज ग्रेड फील्ड मैपिंग, एग्रोनॉमिक टेलीमेट्री और संसाधन प्रबंधन' : 'Enterprise parcel GIS mapping, agronomic telemetry & resource planning',
          icon: Layers,
          badge: 'Render Cloud',
          action: () => onNavigateSection('section-enterprise-products')
        },
        {
          title: isHindi ? 'किसानमित्र मल्टीमॉडल AI' : 'KisanMitra Multimodal AI',
          desc: isHindi ? '10+ क्षेत्रीय भाषाओं में वॉइस असिस्टेंट एवं रीयल-टाइम संवाद' : 'Vernacular voice assistant supporting 10+ regional Indian dialects',
          icon: Sparkles,
          badge: 'Zero-Friction',
          action: () => onNavigateSection('section-decision-workflow')
        },
        {
          title: isHindi ? 'AI फसल रोग डायग्नोस्टिक्स' : 'Foliar Vision Diagnostics',
          desc: isHindi ? 'पत्ती की स्कैनिंग से तुरंत रोग पहचान और ICAR अनुमोदित उपचार' : 'Real-time computer vision foliar disease detection with ICAR protocols',
          icon: Cpu,
          badge: '98% Accuracy',
          action: () => onNavigateSection('section-decision-workflow')
        },
        {
          title: isHindi ? 'CACP 2026-27 लाइव MSP ट्रैकर' : 'CACP 2026-27 MSP Intel',
          desc: isHindi ? 'न्यूनतम समर्थन मूल्य और प्रमुख मंडियों के लाइव भाव' : 'Live benchmark mandi prices & government procurement analytics',
          icon: ShieldCheck,
          badge: 'Official CACP',
          action: () => onNavigateSection('section-decision-workflow')
        }
      ]
    },
    {
      id: 'industries',
      label: isHindi ? 'उद्योग (Industries)' : 'Industries',
      items: [
        {
          title: isHindi ? 'कृषि खाद्य कंपनियां (Agri-Food Corporates)' : 'Agri-Food Corporates & FMCG',
          desc: isHindi ? 'सप्लाई चेन ट्रेसेबिलिटी, ESG अनुपालन और फार्म प्रोक्योरमेंट' : 'End-to-end farm traceability, ESG compliance & contract farming supply chain',
          icon: Building2,
          badge: 'Enterprise',
          action: () => onNavigateSection('section-enterprise-products')
        },
        {
          title: isHindi ? 'किसान उत्पादक संगठन (FPOs)' : 'Farmer Producer Orgs (FPOs)',
          desc: isHindi ? 'समूह स्तर पर इनपुट खरीद, फसल निगरानी और मंडी बिक्री प्रबंधन' : 'Aggregated input procurement, crop advisory & member farmer intelligence',
          icon: Handshake,
          badge: '50+ Districts',
          action: () => onNavigateSection('section-metrics')
        },
        {
          title: isHindi ? 'कृषि इनपुट एवं बीज निर्माता' : 'Agri-Input & Seed Enterprises',
          desc: isHindi ? 'फील्ड ट्रायल्स का डिजिटल डेटा एवं प्रमाणित एग्रोनॉमिक अनुशंसा' : 'Digital field trial validation, targeted agronomy & distributor reach',
          icon: Layers,
          badge: 'KVK Guardrails',
          action: () => onNavigateSection('section-enterprise-products')
        }
      ]
    },
    {
      id: 'resources',
      label: isHindi ? 'संसाधन (Resources)' : 'Resources',
      items: [
        {
          title: isHindi ? 'ICAR एवं KVK नॉलेज बेस' : 'ICAR & KVK Knowledge Base',
          desc: isHindi ? 'भारत सरकार द्वारा प्रमाणित वैज्ञानिक फसल सिफारिशें' : 'Deterministic agronomic decision protocols validated by ICAR & KVKs',
          icon: BookOpen,
          badge: 'Zero Hallucination',
          action: () => onNavigateSection('section-enterprise-products')
        },
        {
          title: isHindi ? 'ऑफलाइन डायग्नोस्टिक आर्काइव' : 'Offline Diagnostic Archive',
          desc: isHindi ? 'ब्राउज़र में सहेजी गई जांच रिपोर्ट बिना इंटरनेट के देखें' : 'Local browser cached history for 100% offline rural field scouting',
          icon: ShieldCheck,
          badge: '84+ Reports',
          action: () => onNavigateSection('section-history')
        }
      ]
    },
    {
      id: 'partners',
      label: isHindi ? 'साझेदार (Partners)' : 'Partners',
      items: [
        {
          title: 'IIT Delhi FITT',
          desc: isHindi ? 'डीप-टेक एग्री इनक्यूबेशन और वैज्ञानिक सत्यापन' : 'Deep-tech ag-incubation & algorithmic validation by IIT Delhi FITT',
          icon: Building2,
          badge: 'Incubated',
          action: () => onNavigateSection('section-hero')
        },
        {
          title: 'NVIDIA x T-Hub',
          desc: isHindi ? 'एडवांस्ड GPU एक्सेलरेटेड कंप्यूटर विज़न एवं AI इंफ्रास्ट्रक्चर' : 'Edge AI acceleration & high-performance vision compute cluster',
          icon: Cpu,
          badge: 'Cohort Alum',
          action: () => onNavigateSection('section-hero')
        },
        {
          title: 'Kotak BizLabs Season 3',
          desc: isHindi ? 'एग्री-फिनटेक एवं रूरल क्रेडिट स्कोरिंग इनोवेशन' : 'Shortlisted for agri-fintech & rural lending intelligence framework',
          icon: Handshake,
          badge: 'Shortlisted',
          action: () => onNavigateSection('section-hero')
        }
      ]
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand Identity with sharp geometric icon */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigateSection('section-hero')}>
            <div className="relative flex items-center justify-center w-11 h-11 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 group-hover:border-emerald-400 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all">
              <AgreNovaLogoIcon className="w-7 h-7 text-emerald-400" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  AgreNova
                </span>
                <span className="text-xl font-semibold text-emerald-400">AI</span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] uppercase font-mono tracking-wider font-semibold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ENTERPRISE
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-400 tracking-wide">
                agrenovaai.in
              </span>
            </div>
          </div>

          {/* Center: Desktop Navigation Dropdowns */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navDropdowns.map((menu) => (
              <div 
                key={menu.id} 
                className="relative"
                onMouseEnter={() => setActiveDropdown(menu.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-colors rounded-md ${
                    activeDropdown === menu.id 
                      ? 'text-emerald-400 bg-slate-900/80' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
                  }`}
                  onClick={() => setActiveDropdown(activeDropdown === menu.id ? null : menu.id)}
                >
                  <span>{menu.label}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === menu.id ? 'rotate-180 text-emerald-400' : 'text-slate-500'
                  }`} />
                </button>

                {/* Dropdown Card */}
                {activeDropdown === menu.id && (
                  <div className="absolute top-full left-0 w-80 sm:w-96 p-2 mt-1 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-xl shadow-2xl shadow-emerald-950/40 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="space-y-1">
                      {menu.items.map((item, idx) => {
                        const ItemIcon = item.icon;
                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              item.action();
                              setActiveDropdown(null);
                            }}
                            className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-800/80 cursor-pointer transition-colors"
                          >
                            <div className="w-8 h-8 rounded-md bg-emerald-950/80 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 group-hover:border-emerald-500/50 group-hover:bg-emerald-900/50">
                              <ItemIcon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1 mb-0.5">
                                <span className="text-xs font-semibold text-white group-hover:text-emerald-300 truncate">
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Action Stack */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector */}
            <div className="relative inline-flex items-center bg-slate-900/80 border border-slate-800 rounded-lg p-0.5 text-xs font-medium">
              <button
                type="button"
                onClick={() => onToggleLang('en')}
                className={`px-2.5 py-1.5 rounded-md flex items-center gap-1 transition-all ${
                  !isHindi 
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Switch to English"
              >
                <span>English</span>
              </button>
              <button
                type="button"
                onClick={() => onToggleLang('hi')}
                className={`px-2.5 py-1.5 rounded-md flex items-center gap-1 transition-all ${
                  isHindi 
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
                title="हिन्दी में बदलें"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>हिन्दी</span>
              </button>
            </div>

            {/* Log In (Zero friction modal) */}
            <button
              type="button"
              onClick={onOpenLogin}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-800"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isHindi ? 'लॉग इन' : 'Log In'}</span>
            </button>

            {/* Prominent Solid Green Button "Book a Meeting / Launch App" */}
            <button
              type="button"
              onClick={onOpenBooking}
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 rounded-lg transition-all shadow-[0_0_20px_rgba(52,211,153,0.35)] hover:shadow-[0_0_25px_rgba(52,211,153,0.55)] cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span className="whitespace-nowrap font-bold">
                {isHindi ? 'मीटिंग बुक करें / ऐप शुरू करें' : 'Book a Meeting / Launch App'}
              </span>
              <ArrowRight className="w-3.5 h-3.5 hidden sm:inline-block" />
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-4">
          <div className="space-y-2">
            {navDropdowns.map((menu) => (
              <div key={menu.id} className="py-2 border-b border-slate-900">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">
                  {menu.label}
                </span>
                <div className="grid grid-cols-1 gap-2 pl-2">
                  {menu.items.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        item.action();
                        setMobileMenuOpen(false);
                      }}
                      className="text-left py-1 text-sm text-slate-300 hover:text-white flex items-center justify-between"
                    >
                      <span>{item.title}</span>
                      {item.badge && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                onOpenLogin();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-slate-900 text-slate-200 text-sm font-medium border border-slate-800 flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>{isHindi ? 'लॉग इन (बिना पासवर्ड)' : 'Log In (No OTP / Password)'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-emerald-400 text-slate-950 text-sm font-bold flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>{isHindi ? 'मीटिंग बुक करें / ऐप शुरू करें' : 'Book a Meeting / Launch App'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
