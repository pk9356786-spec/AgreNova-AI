import React from 'react';
import { 
  Server, Cpu, ShieldCheck, Layers, Database, 
  Sparkles, CheckCircle2, Lock, ArrowUpRight, 
  Terminal, Globe, Zap, FileCode
} from 'lucide-react';

interface Props {
  currentLang: 'en' | 'hi';
  onBookDemo: () => void;
}

export const CorporateProductIndex: React.FC<Props> = ({ currentLang, onBookDemo }) => {
  const isHindi = currentLang === 'hi';

  return (
    <section id="section-enterprise-products" className="py-16 sm:py-24 bg-slate-950 border-b border-slate-800 relative">
      
      {/* Background radial accent */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-950/25 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-950/80 px-3.5 py-1 rounded border border-emerald-500/30">
            {isHindi ? 'धारा 5: कॉर्पोरेट उत्पाद अनुक्रमणिका' : 'SECTION 5: CORPORATE PRODUCT INDEX'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            {isHindi ? (
              <>एंटरप्राइज इंफ्रास्ट्रक्चर और <span className="text-emerald-400">ICAR कंप्लायंस गार्डरेल्स</span></>
            ) : (
              <>Enterprise Cloud Architecture & <span className="text-emerald-400">ICAR Compliance Guardrails</span></>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2.5">
            {isHindi ? (
              'रेंडर स्केलेबल इंफ्रास्ट्रक्चर पर होस्टेड अत्याधुनिक वेब स्टैक और AI मतिभ्रम को शून्य करने वाला वैज्ञानिक ज्ञान ढांचा।'
            ) : (
              'Engineered with modern React/TypeScript micro-frontends on Render infrastructure and deterministic agronomic safety layers.'
            )}
          </p>
        </div>

        {/* TWO-CARD ENTERPRISE PRODUCT BLOCK */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* ========================================================
              CARD 1: FARM MANAGEMENT SOFTWARE (FMS) ENGINE
             ======================================================== */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-2xl flex flex-col justify-between group">
            
            <div className="space-y-6">
              
              {/* Product Badge & Stack Tag */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-950/90 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md">
                  <Server className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-700 text-xs font-mono text-slate-300">
                  <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                  <span>React / TypeScript on Render Cloud</span>
                </div>
              </div>

              {/* Title & Core Headline */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {isHindi ? '1. फार्म मैनेजमेंट सॉफ्टवेयर इंजन (FMS)' : '1. Farm Management Software Engine'}
                </h3>
                <p className="text-xs font-mono text-emerald-400 uppercase tracking-wider mt-1">
                  High-Performance Enterprise Node Microservices
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed">
                {isHindi ? (
                  'स्केलेबल रेंडर (Render) इंफ्रास्ट्रक्चर पर निर्मित, यह इंजन लाखों एकड़ कृषि भूमि के लिए भू-स्थानिक (GIS) पार्सल मैपिंग, स्वचालित सैटेलाइट बायोमास मॉनिटरिंग और फार्म इनपुट इन्वेंट्री को सहजता से प्रबंधित करता है।'
                ) : (
                  'Built with a modern React/TypeScript node stack hosted on scalable Render infrastructure. Delivers sub-meter geospatial parcel boundary indexing, dynamic Sentinel-2 NDVI vegetative tracking, and comprehensive resource telemetry across millions of acres.'
                )}
              </p>

              {/* Key Architecture Bullets */}
              <div className="space-y-2.5 pt-2">
                {[
                  {
                    title: isHindi ? 'माइक्रो-फ्रंटएंड और एपीआई-फर्स्ट आर्किटेक्चर' : 'Micro-Frontend & API-First Core',
                    desc: isHindi ? 'REST एवं GraphQL एंडपॉइंट्स द्वारा ERP सिस्टम्स (SAP, Microsoft Dynamics) से निर्बाध कनेक्टिविटी।' : 'Seamless integration with enterprise ERPs (SAP Agribusiness, MS Dynamics) via authenticated webhooks.'
                  },
                  {
                    title: isHindi ? 'सैटेलाइट बायोमास एवं मौसम टेलीमेट्री' : 'Satellite Biomass & Field Telemetry',
                    desc: isHindi ? 'ओपनवेदर और इसरो/सेंटिनल से 10-मीटर रिज़ॉल्यूशन वाली वास्तविक समय उपग्रह तस्वीरें।' : '10-meter spatial multispectral imagery synced with OpenWeather API live meteorological feeds.'
                  },
                  {
                    title: isHindi ? 'मल्टी-टीनेंट डेटा संप्रभुता (Data Sovereignty)' : 'Multi-Tenant Data Sovereignty',
                    desc: isHindi ? 'भारतीय डेटा सुरक्षा मानकों और ISO 27001 के तहत एन्क्रिप्टेड क्लाउड स्टोरेज।' : 'Strict tenant isolation, SOC2/ISO 27001 data compliance, and role-based access for field managers.'
                  }
                ].map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-white block">{feat.title}</span>
                      <span className="text-[11px] text-slate-400 leading-relaxed">{feat.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom Enterprise Spec Row */}
            <div className="mt-8 pt-5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                99.98% Cloud SLA
              </span>
              <span className="text-emerald-400 font-bold">Host: Render Scalable Cluster</span>
            </div>

          </div>

          {/* ========================================================
              CARD 2: AI WORKFORCE INTEGRATION (ICAR & KVK GUARDRAILS)
             ======================================================== */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-2xl flex flex-col justify-between group">
            
            <div className="space-y-6">
              
              {/* Product Badge & Compliance Tag */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-teal-950/90 border border-teal-500/40 flex items-center justify-center text-teal-400 shadow-md">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-700 text-xs font-mono text-teal-300">
                  <Lock className="w-3.5 h-3.5 text-teal-400" />
                  <span>Deterministic ICAR & KVK Guardrails</span>
                </div>
              </div>

              {/* Title & Core Headline */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {isHindi ? '2. AI वर्कफ़ोर्स इंटीग्रेशन एवं गार्डरेल्स' : '2. AI Workforce Integration'}
                </h3>
                <p className="text-xs font-mono text-teal-400 uppercase tracking-wider mt-1">
                  Automated Anti-Hallucination Safety System
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed">
                {isHindi ? (
                  'जेनेरिक चैटबॉट्स के विपरीत, AgreNova AI भारतीय कृषि अनुसंधान परिषद (ICAR) और केंद्रीय कीटनाशक बोर्ड (CIB&RC) द्वारा अनुमोदित वैज्ञानिक नियमों के तहत संचालित होता है, जो रासायनिक अति-खुराक और गलत सलाह को 100% रोकता है।'
                ) : (
                  'Deploying automated ICAR & KVK compliant guardrails preventing AI hallucinations. Eliminates dangerous off-label agrochemical dosages with deterministic dosage capping under Central Insecticides Board (CIB&RC) statutory standards.'
                )}
              </p>

              {/* Key Guardrails Bullets */}
              <div className="space-y-2.5 pt-2">
                {[
                  {
                    title: isHindi ? 'शून्य-मतिभ्रम नियम पुस्तिका (Zero Hallucination)' : 'Zero-Hallucination Verification Layer',
                    desc: isHindi ? 'हर रासायनिक सिफारिश को KVK वैज्ञानिक पैकेज और CIB&RC पंजीकरण डेटाबेस से सत्यापित किया जाता है।' : 'Every synthetic recommendation cross-checked against KVK Package of Practices before transmission.'
                  },
                  {
                    title: isHindi ? 'द्विभाजित जैविक और रासायनिक उपचार' : 'Bifurcated Organic vs Chemical Guidance',
                    desc: isHindi ? 'किसानों को सुरक्षित जैविक विकल्प (छाछ, नीम अर्क, ट्राइकोडर्मा) के साथ-साथ अनुमोदित कवकनाशी की सही मात्रा।' : 'Explicit differentiation between organic bio-controls and synthetic chemistries with mandatory pre-harvest intervals.'
                  },
                  {
                    title: isHindi ? 'CACP 2026-27 वास्तविक समय समर्थन मूल्य' : 'CACP 2026-27 Government Price Benchmarking',
                    desc: isHindi ? 'मंडी भावों और सरकारी खरीद नीतियों का सटीक मिलान, जिससे किसानों को उपज का सही मूल्य मिले।' : 'Direct integration with official APMC mandi disclosures preventing distress selling at farmgate.'
                  }
                ].map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-white block">{feat.title}</span>
                      <span className="text-[11px] text-slate-400 leading-relaxed">{feat.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom Regulatory Spec Row */}
            <div className="mt-8 pt-5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                Audited Knowledge Graphs
              </span>
              <span className="text-teal-400 font-bold">Standard: ICAR / CIB&RC Certified</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
