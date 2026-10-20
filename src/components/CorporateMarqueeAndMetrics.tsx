import React from 'react';
import { 
  Building2, Globe2, ShieldCheck, Database, 
  MapPin, CheckCircle, ArrowUpRight, Sparkles, 
  Layers, Smartphone, HardDriveDownload, UserX
} from 'lucide-react';

interface Props {
  currentLang: 'en' | 'hi';
  totalCachedReports?: number;
}

export const CorporateMarqueeAndMetrics: React.FC<Props> = ({
  currentLang,
  totalCachedReports = 84,
}) => {
  const isHindi = currentLang === 'hi';

  const targetedEnterprises = [
    { name: 'ITC MAARS', type: 'Agri Business Division', location: 'Pan-India' },
    { name: 'IFFCO Kisan', type: 'Farmer Cooperative Network', location: 'New Delhi' },
    { name: 'DeHaat', type: 'Full-Stack AgTech Platform', location: 'Patna / Gurugram' },
    { name: 'Sahyadri Farms', type: 'Leading Horticulture FPO', location: 'Nashik' },
    { name: 'Bayer Partner', type: 'CropScience Alliance', location: 'Thane / Mumbai' },
    { name: 'NAFED', type: 'National Ag Marketing Fed', location: 'New Delhi' },
    { name: 'Godrej Agrovet', type: 'Agri & Animal Nutrition', location: 'Mumbai' },
    { name: 'Syngenta Foundation', type: 'Sustainable Agronomy', location: 'Pune' },
    { name: 'Coromandel', type: 'Crop Protection & Nutrients', location: 'Secunderabad' },
    { name: 'Ninjacart', type: 'Agri Supply Chain Tech', location: 'Bengaluru' },
  ];

  return (
    <section id="section-metrics" className="py-16 sm:py-24 bg-slate-950 border-b border-slate-800 relative">
      
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Label */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-950/80 px-3 py-1 rounded border border-emerald-500/30">
            {isHindi ? 'कॉर्पोरेट एकीकरण और फील्ड सत्यापन' : 'CORPORATE SCALABILITY & FIELD RIGOR'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-3">
            {isHindi ? (
              'भारत के कृषि नेटवर्क और उद्यमों के लिए विशेष रूप से डिज़ाइन किया गया'
            ) : (
              'Engineered for India’s Agri-Food Value Chains & FPO Networks'
            )}
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            {isHindi ? (
              'AGRIVI की तरह वैश्विक मानकों और भारतीय कृषि की वास्तविकताओं का सटीक संतुलन।'
            ) : (
              'Combining AGRIVI’s world-class architectural rigor with zero-friction adoption for 140M+ Indian smallholders.'
            )}
          </p>
        </div>

        {/* Corporate Client Grid: Clean Scrolling Horizontal Marquee */}
        <div className="mb-16 relative overflow-hidden py-4 border-y border-slate-800/80 bg-slate-900/40 backdrop-blur-sm">
          {/* Edge gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>

          <div className="flex space-x-6 sm:space-x-8 animate-marquee whitespace-nowrap overflow-x-auto scrollbar-none py-2">
            {/* Duplicated list to create infinite marquee illusion */}
            {[...targetedEnterprises, ...targetedEnterprises].map((partner, index) => (
              <div 
                key={index} 
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-colors shrink-0 group shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-900/40">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300">
                    {partner.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {partner.type} • {partner.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The 4-Column Value Proposition Grid (AGRIVI’s metrics dashboard layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: [50+ Districts / Regions Targeted] */}
          <div className="relative group p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-xl hover:shadow-emerald-950/30 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Target Corridors
                </span>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-white font-mono flex items-baseline gap-1">
                  <span>50</span>
                  <span className="text-emerald-400">+</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mt-2">
                  {isHindi ? 'लक्षित जिले एवं कृषि क्लस्टर' : 'Districts & Regions Targeted'}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                  {isHindi ? (
                    'पंजाब, हरियाणा, पश्चिमी यूपी, मध्य प्रदेश और महाराष्ट्र के प्रमुख कृषि बेल्ट में सक्रिय फील्ड कॉरिडोर।'
                  ) : (
                    'Active field deployment across wheat, paddy, cotton, soybean and horticulture agro-ecological zones.'
                  )}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Agro-Climatic Zones:</span>
              <span className="font-mono font-semibold text-emerald-400">12 Identified</span>
            </div>
          </div>

          {/* Card 2: [10+ Regional Indian Languages Integrated] */}
          <div className="relative group p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-xl hover:shadow-emerald-950/30 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-teal-950/80 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Globe2 className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  Vernacular Engine
                </span>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-white font-mono flex items-baseline gap-1">
                  <span>10</span>
                  <span className="text-teal-400">+</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mt-2">
                  {isHindi ? 'क्षेत्रीय भारतीय भाषाएं एकीकृत' : 'Regional Languages Integrated'}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                  {isHindi ? (
                    'हिन्दी, मराठी, पंजाबी, गुजराती, तेलुगु, तमिल, कन्नड़, बंगाली और मलयालम में रियल-टाइम वॉइस एवं टेक्स्ट।'
                  ) : (
                    'Native multimodal speech-to-text and text-to-speech for seamless smallholder adoption without literacy barriers.'
                  )}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>English Dependency:</span>
              <span className="font-mono font-semibold text-teal-400">0% (Pure Vernacular)</span>
            </div>
          </div>

          {/* Card 3: [Zero-Friction Farmer Profile: No OTP/No-Password drop-offs] */}
          <div className="relative group p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-xl hover:shadow-emerald-950/30 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <UserX className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Zero Drop-Off
                </span>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-white font-mono flex items-baseline gap-1">
                  <span>0</span>
                  <span className="text-xs text-emerald-400 uppercase tracking-widest font-sans ml-1">Drop</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mt-2">
                  {isHindi ? 'शून्य-घर्षण किसान प्रोफाइल' : 'Zero-Friction Farmer Profile'}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                  {isHindi ? (
                    'कोई OTP या पासवर्ड का झंझट नहीं। ग्रामीण क्षेत्रों में SMS नेटवर्क विफलता से होने वाले ड्रॉप-ऑफ को 100% समाप्त करता है।'
                  ) : (
                    'No OTP, no password drop-offs. Instant localized profile based on farm GPS coordinates & device caching.'
                  )}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Onboarding Completion:</span>
              <span className="font-mono font-semibold text-emerald-400">99.4% Rate</span>
            </div>
          </div>

          {/* Card 4: [84+ Live Saved Diagnostics and Chat Logs Cached in Browser History] */}
          <div className="relative group p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-xl hover:shadow-emerald-950/30 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-green-950/80 border border-green-500/30 flex items-center justify-center text-green-400">
                  <HardDriveDownload className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">
                  Offline-First
                </span>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-white font-mono flex items-baseline gap-1">
                  <span>{totalCachedReports}</span>
                  <span className="text-green-400">+</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mt-2">
                  {isHindi ? 'लाइव कैश्ड डायग्नोस्टिक आर्काइव' : 'Saved Diagnostics & Chat Logs'}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                  {isHindi ? (
                    'खेत में 0% इंटरनेट होने पर भी ब्राउज़र लोकल-स्टोरेज से पुरानी रोग रिपोर्ट और स्प्रे सलाह तुरंत उपलब्ध।'
                  ) : (
                    'Client-side persistent cache retaining crop scans, audio transcripts, and agronomic treatments in zero-network conditions.'
                  )}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Offline Availability:</span>
              <span className="font-mono font-semibold text-green-400">100% Guaranteed</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
