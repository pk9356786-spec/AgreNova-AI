import React from 'react';
import { 
  Building2, Globe, ShieldCheck, Heart, ArrowUp, 
  Mail, MapPin, Phone, ExternalLink, CheckCircle2
} from 'lucide-react';
import { AgreNovaLogoIcon } from './AgreNovaLogo';

interface FooterProps {
  currentLang: 'en' | 'hi';
  onNavigateSection: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const EnterpriseFooter: React.FC<FooterProps> = ({
  currentLang,
  onNavigateSection,
  onOpenBooking,
}) => {
  const isHindi = currentLang === 'hi';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: isHindi ? 'उत्पाद (Products)' : 'Products',
      links: [
        { label: 'Farm Management Software (FMS)', href: '#section-enterprise-products' },
        { label: 'KisanMitra Multimodal Voice AI', href: '#section-decision-workflow' },
        { label: 'Foliar Vision Diagnostics', href: '#section-decision-workflow' },
        { label: 'CACP 2026-27 MSP Intelligence', href: '#section-decision-workflow' },
        { label: 'Satellite Biomass & NDVI Telemetry', href: '#section-hero' },
        { label: 'Offline Field Diagnostic Archive', href: '#section-history' }
      ]
    },
    {
      title: isHindi ? 'उद्योग (Industries)' : 'Industries',
      links: [
        { label: 'Agri-Food Corporates & FMCG', href: '#section-enterprise-products' },
        { label: 'Farmer Producer Orgs (FPOs)', href: '#section-metrics' },
        { label: 'Crop Input & Seed Manufacturers', href: '#section-enterprise-products' },
        { label: 'Rural Banking & Crop Insurers', href: '#section-enterprise-products' },
        { label: 'Government & Digital Public AgTech', href: '#section-hero' }
      ]
    },
    {
      title: isHindi ? 'संसाधन (Resources)' : 'Resources',
      links: [
        { label: 'ICAR & KVK Knowledge Graphs', href: '#section-enterprise-products' },
        { label: 'CACP 2026-27 Government Gazette', href: '#section-decision-workflow' },
        { label: 'IIT Delhi FITT Validation Paper', href: '#section-hero' },
        { label: 'NVIDIA Acceleration Case Study', href: '#section-hero' },
        { label: 'Zero-Network PWA User Manual', href: '#section-history' }
      ]
    },
    {
      title: isHindi ? 'कंपनी (Company)' : 'Company',
      links: [
        { label: 'About AgreNova AI', href: '#section-hero' },
        { label: 'Executive Leadership', href: '#section-hero' },
        { label: 'Careers & Field Agronomy Jobs', href: '#section-hero' },
        { label: 'Security & ISO 27001 Compliance', href: '#section-enterprise-products' },
        { label: 'Contact Enterprise Sales', href: '#section-hero', isBooking: true }
      ]
    }
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs sm:text-sm">
      
      {/* Top Pre-Footer / Newsletter Callout */}
      <div className="border-b border-slate-900 bg-slate-900/40 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <AgreNovaLogoIcon className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {isHindi ? 'AgreNova AI एंटरप्राइज नेटवर्क' : 'Connect with AgreNova AI Enterprise Network'}
              </h3>
              <p className="text-xs text-slate-400">
                {isHindi 
                  ? 'भारत के अग्रणी कृषि-खाद्य संगठनों और FPOs के लिए सटीक AI निर्णय प्रणाली।' 
                  : 'Empowering India’s agri-food value chains with zero-friction multimodal AI intelligence.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)] cursor-pointer"
            >
              {isHindi ? 'मीटिंग बुक करें / पार्टनर बनें' : 'Book a Meeting / Partner with Us'}
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand & Address Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <AgreNovaLogoIcon className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">
                AgreNova <span className="text-emerald-400">AI</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {isHindi ? (
                'भारतीय कृषि और एग्री-फूड सप्लाई चेन के लिए डेटा और AI फाउंडेशन। AGRIVI-ग्रेड एंटरप्राइज वास्तुकला और ग्रामीण छोटे किसानों के लिए शून्य-घर्षण डिजाइन।'
              ) : (
                'Enterprise Data and Multimodal AI Foundation for Indian Agriculture. Bridging AGRIVI-grade corporate enterprise architecture with zero-friction vernacular accessibility for smallholder farmers.'
              )}
            </p>

            <div className="space-y-1.5 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Incubated at IIT Delhi FITT • New Delhi, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Official Domain: agrenovaai.in</span>
              </div>
            </div>

            {/* Accelerator badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-emerald-500/30 text-emerald-300">
                IIT Delhi FITT
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-teal-500/30 text-teal-300">
                NVIDIA x T-Hub
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-amber-500/30 text-amber-300">
                Kotak BizLabs S3
              </span>
            </div>
          </div>

          {/* Nav Link Columns */}
          {footerSections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    {link.isBooking ? (
                      <button
                        type="button"
                        onClick={onOpenBooking}
                        className="text-xs text-slate-400 hover:text-emerald-400 transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          const target = link.href.replace('#', '');
                          onNavigateSection(target);
                        }}
                        className="text-xs text-slate-400 hover:text-emerald-400 transition-colors block"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* REGULATORY & COMPLIANCE DISCLAIMERS */}
        <div className="mt-14 pt-8 border-t border-slate-900 space-y-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 space-y-2 text-[11px] text-slate-500 leading-relaxed font-normal">
            <p>
              <strong className="text-slate-400 font-semibold mr-1">CACP MSP Benchmarks:</strong>
              Minimum Support Prices (MSP) displayed are sourced directly from the official notifications of the Commission for Agricultural Costs and Prices (CACP), Department of Agriculture & Farmers Welfare, Government of India for the Kharif and Rabi marketing season 2026-27. Actual market rates at local Agricultural Produce Market Committees (APMCs) fluctuate based on quality specifications, foreign matter, and moisture parameters.
            </p>
            <p>
              <strong className="text-slate-400 font-semibold mr-1">ICAR & CIB&RC Compliance:</strong>
              Foliar disease diagnostics and dosage recommendations strictly follow the scientific package of practices formulated by the Indian Council of Agricultural Research (ICAR) and Central Insecticides Board & Registration Committee (CIB&RC) safe waiting periods. Farmers are advised to consult designated Krishi Vigyan Kendra (KVK) scientists before initiating high-concentration chemical applications.
            </p>
            <p>
              <strong className="text-slate-400 font-semibold mr-1">Enterprise Data Sovereignty:</strong>
              AgreNova AI architecture adheres to ISO 27001 data protection protocols and Indian Digital Personal Data Protection (DPDP) statutory standards. Local diagnostic caches operate client-side to preserve rural privacy and offline accessibility.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 pt-2">
            <div>
              © 2026 AgreNova AI Inc. (agrenovaai.in). All rights reserved. Replicating AGRIVI enterprise rigor for Indian Agriculture.
            </div>
            <div className="flex items-center space-x-6">
              <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
              <span className="hover:text-slate-300 cursor-pointer">Security Whitepaper</span>
            </div>
          </div>
        </div>

      </div>

    </footer>
  );
};
