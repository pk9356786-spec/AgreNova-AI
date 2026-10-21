import React from 'react';
import { Camera, Mic, TrendingUp, Calculator, ShieldCheck, ArrowRight, Sparkles, FileText } from 'lucide-react';
import { getTranslation } from '../translations';

interface CapabilitiesProps {
  selectedLang: string;
  onCameraClick: () => void;
  onVoiceClick: () => void;
  onNavToTab: (tab: 'msp' | 'tools' | 'schemes' | 'history' | 'help') => void;
}

export const AgreNovaCapabilities: React.FC<CapabilitiesProps> = React.memo(({
  selectedLang,
  onCameraClick,
  onVoiceClick,
  onNavToTab,
}) => {
  const isHindi = selectedLang === 'hi';

  const capabilities = [
    {
      id: 'diagnosis',
      icon: <Camera className="w-6 h-6 text-emerald-600" />,
      badge: isHindi ? 'AI विज़न डायग्नोस्टिक्स' : 'Vision Diagnostics',
      title: isHindi ? 'फसल रोग व कीट की तत्काल पहचान' : 'Instant Crop Disease & Pest Identification',
      description: isHindi
        ? 'अपने खेत से पत्ती या तने की फोटो अपलोड करें। AgreNova विज़न मॉडल 100+ फसलों में लगने वाले रोगों, फंगस और कीटों का सटीक विश्लेषण कर जैविक और रासायनिक निदान बताता है।'
        : 'Snap a leaf or stem photo. Our visual models detect fungal infections, bacterial blight, and pest attacks across 100+ Indian crops with scientific treatment advisories.',
      actionLabel: isHindi ? 'फोटो जांचें' : 'Scan Leaf',
      onAction: onCameraClick,
      image: '/images/crop_leaf_inspection_1791980200042.jpg',
      stat: '98% Accuracy',
      statLabel: isHindi ? 'सटीक पहचान' : 'Field Validation',
    },
    {
      id: 'voice',
      icon: <Mic className="w-6 h-6 text-teal-600" />,
      badge: isHindi ? 'प्रादेशिक वाक् परामर्श' : 'Multilingual Voice',
      title: isHindi ? 'अपनी भाषा में बोलकर पूछें विशेषज्ञ सलाह' : 'Natural Voice Advisory in Regional Languages',
      description: isHindi
        ? 'टाइप करने की आवश्यकता नहीं। हिन्दी, पंजाबी, मराठी, गुजराती, तमिल, तेलुगु और बंगाली सहित 10+ भाषाओं में बोलकर मौसम, खाद और रोग निवारण के सवाल पूछें।'
        : 'Zero typing required. Speak naturally in Hindi, Punjabi, Marathi, Gujarati, Tamil, Telugu, and more to receive certified agronomic recommendations.',
      actionLabel: isHindi ? 'बोलकर पूछें' : 'Try Voice Assistant',
      onAction: onVoiceClick,
      image: '/images/precision_agriculture_farm_1791980201415.jpg',
      stat: '10+ Languages',
      statLabel: isHindi ? 'भारतीय भाषाएं' : 'Native Dialects',
    },
    {
      id: 'mandi',
      icon: <TrendingUp className="w-6 h-6 text-amber-600" />,
      badge: isHindi ? 'मंडी व MSP ट्रैकर' : 'Live Mandi Intelligence',
      title: isHindi ? 'सरकारी MSP व लाइव मंडी भाव तुलना' : 'Official CACP MSP & Real-Time APMC Mandi Rates',
      description: isHindi
        ? 'भारत सरकार के Agmarknet पोर्टल और CACP न्यूनतम समर्थन मूल्य (MSP) से सीधे जुड़ाव। अपनी नजदीकी मंडियों में मॉडल भाव, न्यूनतम दर और आवक की सटीक जानकारी प्राप्त करें।'
        : 'Direct synchronization with official Agmarknet and CACP MSP benchmarks. Compare real-time market arrivals, modal rates, and floor guarantees.',
      actionLabel: isHindi ? 'मंडी भाव देखें' : 'View Mandi Rates',
      onAction: () => onNavToTab('msp'),
      stat: 'Agmarknet API',
      statLabel: isHindi ? 'भारत सरकार डेटा' : 'Govt of India',
    },
    {
      id: 'calculators',
      icon: <Calculator className="w-6 h-6 text-emerald-700" />,
      badge: isHindi ? 'स्मार्ट कृषि कैलकुलेटर' : 'Precision Calculators',
      title: isHindi ? 'यूरिया, डीएपी व बीज दर का वैज्ञानिक अनुपात' : 'Scientific Fertilizer & Seed Rate Optimization',
      description: isHindi
        ? 'फसल और एकड़ के अनुसार सटीक उर्वरक (N-P-K), बीज दर और अनुमानित उत्पादन का हिसाब लगाएं। अधिक खाद के अनावश्यक खर्च से बचें और मिट्टी की सेहत सुरक्षित रखें।'
        : 'Input your acreage and crop to calculate exact Urea, DAP, MOP requirements and optimal seed seeding rates, cutting input costs while protecting soil health.',
      actionLabel: isHindi ? 'कैलकुलेटर खोलें' : 'Open Calculators',
      onAction: () => onNavToTab('tools'),
      stat: 'ICAR Norms',
      statLabel: isHindi ? 'प्रमाणित अनुपात' : 'Scientific Formula',
    },
  ];

  return (
    <section id="section-capabilities" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isHindi ? 'आधुनिक कृषि तकनीक समाधान' : 'Precision AgTech Capabilities'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isHindi ? (
              <>
                भारतीय किसानों के लिए <span className="text-[#047857]">पूर्ण कृषि प्रबंधन</span> मंच
              </>
            ) : (
              <>
                End-to-End <span className="text-[#047857]">Agronomic Intelligence</span> for Modern Farmers
              </>
            )}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {isHindi
              ? 'AgreNova AI पारंपरिक खेती के ज्ञान को आधुनिक उपग्रह डेटा, आर्टिफिशियल इंटेलिजेंस और आधिकारिक सरकारी डेटाबेस से जोड़कर हर कदम पर किसानों का मार्गदर्शन करता है।'
              : 'AgreNova AI bridges traditional agricultural wisdom with artificial intelligence, live meteorological tracking, and verified government market benchmarks.'}
          </p>
        </div>

        {/* 4 Open Product Feature Grid (AGRIVI Style: Clean, Open, Product-Focused) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {capabilities.map((item, index) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-slate-50/60 hover:bg-white border border-slate-200/80 hover:border-emerald-300 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50"
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center group-hover:scale-105 group-hover:border-emerald-300 transition-all">
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
                    {item.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-extrabold text-slate-900 mb-2.5 group-hover:text-emerald-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  {item.description}
                </p>

                {/* Optional Product Thumbnail */}
                {item.image && (
                  <div className="mb-6 rounded-xl overflow-hidden aspect-[16/9] border border-slate-200/80 shadow-inner bg-slate-100 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 right-2 bg-slate-950/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md border border-white/20">
                      {item.stat}: <span className="text-emerald-300">{item.statLabel}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <button
                  type="button"
                  onClick={item.onAction}
                  className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 group-hover:translate-x-1 transition-all"
                >
                  <span>{item.actionLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-xs font-semibold text-slate-400">
                  {item.stat}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Additional Utilities Row */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-900/5 via-teal-900/5 to-emerald-900/5 border border-emerald-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900">
                {isHindi ? 'सरकारी योजनाएं व सब्सिडी सहायता' : 'Government Schemes & Subsidies'}
              </h4>
              <p className="text-xs text-slate-600">
                {isHindi
                  ? 'PM-किसान, फसल बीमा योजना व मृदा स्वास्थ्य कार्ड की पात्रता और आवेदन प्रक्रिया'
                  : 'PM-Kisan, PMFBY crop insurance, and Soil Health Card eligibility guide'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavToTab('schemes')}
            className="px-4 py-2 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold transition shadow-2xs whitespace-nowrap"
          >
            {isHindi ? 'योजनाएं देखें' : 'View Schemes'} →
          </button>
        </div>
      </div>
    </section>
  );
});

AgreNovaCapabilities.displayName = 'AgreNovaCapabilities';
