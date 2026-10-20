import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Mic, Volume2, ShieldCheck, Sparkles, 
  Activity, CheckCircle2, TrendingUp, AlertTriangle, 
  Cpu, Leaf, Zap, BarChart3, ChevronRight, Play, Pause
} from 'lucide-react';

interface HeroProps {
  currentLang: 'en' | 'hi';
  onBookDemo: () => void;
  onExplore: () => void;
  onLaunchAssistant: () => void;
}

export const HeroIntelligenceSplit: React.FC<HeroProps> = ({
  currentLang,
  onBookDemo,
  onExplore,
  onLaunchAssistant,
}) => {
  const isHindi = currentLang === 'hi';

  // Voice widget dynamic prompt cycling
  const voiceQueries = [
    { lang: 'हिन्दी', text: '50 क्विंटल गेहूं का सरकारी समर्थन मूल्य क्या है?', answer: 'CACP 2026-27 के अनुसार गेहूं का न्यूनतम समर्थन मूल्य ₹2,425 प्रति क्विंटल है।' },
    { lang: 'English', text: 'Recommend organic treatment for Wheat Yellow Rust.', answer: 'Spray fermented sour buttermilk (5L/acre in 150L water) or 3000 PPM Neem Oil.' },
    { lang: 'ਪੰਜਾਬੀ', text: 'ਕਣਕ ਵਿੱਚ ਪੀਲੀ ਕੁੰਗੀ ਦੇ ਬਚਾਅ ਲਈ ਕੀ ਕਰੀਏ?', answer: 'ਪ੍ਰੋਪੀਕੋਨਾਜ਼ੋਲ 25% EC (200 ਮਿਲੀ ਪ੍ਰਤੀ ਏਕੜ) ਦਾ ਛਿੜਕਾਅ ਕਰੋ।' },
    { lang: 'मराठी', text: 'कापूस पिकातील बोंडअळी नियंत्रणासाठी काय उपाय आहे?', answer: 'फेरोमोन ट्रॅप आणि ट्रायकोडर्मा/एमामेक्टिन बेन्झोएटचा वापर करा.' },
    { lang: 'తెలుగు', text: 'వరిలో ఎరువుల మోతాదు ఎంత వాడాలి?', answer: 'ఎకరానికి 1 బస్తా డీఏపీ మరియు సిఫార్సు చేసిన యూరియా వాడండి.' }
  ];

  const [activeVoiceIdx, setActiveVoiceIdx] = useState(0);
  const [isPlayingVoice, setIsPlayingVoice] = useState(true);
  const [activeVisionTab, setActiveVisionTab] = useState<'diagnostic' | 'spectral'>('diagnostic');

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVoiceIdx((prev) => (prev + 1) % voiceQueries.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const currentVoice = voiceQueries[activeVoiceIdx];

  return (
    <section id="section-hero" className="relative pt-6 pb-20 lg:pt-10 lg:pb-28 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 border-b border-slate-800/80">
      
      {/* Background ambient mesh glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION 1: TRUST BADGE ROW (Directly below Nav / Above Main Headline) */}
        <div className="mb-8 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 p-3.5 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-lg shadow-black/20">
          {/* Star rating & trust text */}
          <div className="flex items-center gap-3">
            <div className="flex items-center text-amber-400 text-sm tracking-widest font-bold">
              <span>★★★★★</span>
            </div>
            <span className="text-xs sm:text-sm font-medium text-slate-200">
              {isHindi 
                ? 'अग्रणी कृषि-खाद्य उद्यमों और नवाचार नेटवर्क द्वारा विश्वसनीय'
                : 'Trusted by agri-food enterprises and premier innovation networks.'}
            </span>
          </div>

          {/* Active Glowing Tags */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {/* Tag 1: IIT Delhi */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-[11px] sm:text-xs font-medium shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Validated by IIT Delhi FITT</span>
            </div>

            {/* Tag 2: NVIDIA x T-Hub */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-teal-500/30 text-teal-300 text-[11px] sm:text-xs font-medium shadow-[0_0_12px_rgba(20,184,166,0.2)]">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              <span>Selected for NVIDIA x T-Hub</span>
            </div>

            {/* Tag 3: Kotak BizLabs */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-[11px] sm:text-xs font-medium shadow-[0_0_12px_rgba(245,158,11,0.2)]">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>Shortlisted for Kotak BizLabs Season 3</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: THE HERO INTELLIGENCE SPLIT (AGRIVI Core Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (Enterprise Value & Copy) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Enterprise Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider font-semibold">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Next-Gen Enterprise AgTech Platform</span>
            </div>

            {/* Bold Enterprise Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
              {isHindi ? (
                <>
                  कृषि उद्यम परिवर्तन के लिए <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400">डेटा और AI फाउंडेशन</span>
                </>
              ) : (
                <>
                  Data and AI Foundation for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400">Enterprise Agriculture Transformation</span>
                </>
              )}
            </h1>

            {/* Capitalized Anchors */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono font-bold tracking-widest text-emerald-400 uppercase">
              <span>AGRONOMY.</span>
              <span className="text-slate-600">•</span>
              <span>OPERATIONS.</span>
              <span className="text-slate-600">•</span>
              <span>ECONOMICS.</span>
              <span className="text-slate-600">•</span>
              <span className="text-teal-300 underline decoration-emerald-500 underline-offset-4">CONNECTED.</span>
            </div>

            {/* Premium Paragraph */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
              {isHindi ? (
                'एक प्रामाणिक फार्म डेटा बेस तैयार करें, कृषि अर्थशास्त्र में सुधार करें, सटीक निर्णय लें और शून्य-घर्षण AI द्वारा अपनी टीम की क्षमता का विस्तार करें।'
              ) : (
                'Build the trusted farm data foundation, improve economics, make better decisions, and extend team capacity with AI.'
              )}
            </p>

            {/* Two Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onBookDemo}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 rounded-lg shadow-[0_0_25px_rgba(52,211,153,0.4)] hover:shadow-[0_0_35px_rgba(52,211,153,0.6)] transition-all cursor-pointer"
              >
                <span>{isHindi ? 'डेमो बुक करें' : 'Book a Demo'}</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                type="button"
                onClick={onExplore}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/40 rounded-lg transition-all cursor-pointer"
              >
                <span>{isHindi ? 'AgreNova अन्वेषण करें' : 'Explore AgreNova'}</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400" />
              </button>
            </div>

            {/* Fast compliance & architecture reassurance pills */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-3">
              <div className="space-y-0.5">
                <span className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider">REGULATORY</span>
                <span className="text-xs font-semibold text-slate-200">ICAR & KVK Audited</span>
              </div>
              <div className="space-y-0.5">
                <span className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider">INFRASTRUCTURE</span>
                <span className="text-xs font-semibold text-slate-200">Scalable Render Cloud</span>
              </div>
              <div className="space-y-0.5">
                <span className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider">FARMER ACCESS</span>
                <span className="text-xs font-semibold text-slate-200">Zero-OTP Drop-off</span>
              </div>
            </div>

          </div>

          {/* Right Column: Immersive Graphical Farm Visualization with 3 Floating Glassmorphic Widgets */}
          <div className="lg:col-span-6 relative">
            
            {/* Visual Frame Container */}
            <div className="relative rounded-2xl bg-gradient-to-tr from-slate-900/90 via-slate-900/50 to-emerald-950/40 p-4 sm:p-6 border border-slate-800 shadow-2xl backdrop-blur-xl">
              
              {/* Background Digital Twin Farm Map Graphic */}
              <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800/90 mb-4 group">
                
                {/* Simulated Satellite & Soil Moisture GIS Layer */}
                <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>
                
                {/* Graphical Field Cadastral Polygons */}
                <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 600 300" fill="none">
                  <path d="M 40 50 L 190 30 L 260 120 L 110 160 Z" fill="#065f46" fillOpacity="0.35" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 270 125 L 420 80 L 460 210 L 310 240 Z" fill="#047857" fillOpacity="0.45" stroke="#34d399" strokeWidth="1.5" />
                  <path d="M 430 75 L 560 40 L 580 180 L 470 205 Z" fill="#064e3b" fillOpacity="0.3" stroke="#059669" strokeWidth="1.5" />
                  <path d="M 120 170 L 290 250 L 220 290 L 80 240 Z" fill="#065f46" fillOpacity="0.25" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" />
                  
                  {/* Field Telemetry Pin */}
                  <circle cx="365" cy="160" r="6" fill="#34d399" className="animate-ping" opacity="0.8" />
                  <circle cx="365" cy="160" r="4" fill="#10b981" />
                </svg>

                {/* Satellite Telemetry HUD Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>SENTINEL-2 NDVI • FIELD #408 • KARNAL</span>
                </div>

                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300">
                  <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Vegetation Vigour: 0.74 (Optimal)</span>
                </div>
              </div>

              {/* THREE INTERACTIVE FLOATING GLASSMORPHISM WIDGETS */}
              <div className="space-y-3.5">
                
                {/* WIDGET 1: [AI Companion Widget] Wave-form voice processor */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 backdrop-blur-md shadow-lg shadow-black/40 hover:border-emerald-500/50 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <Mic className="w-3.5 h-3.5 animate-pulse" />
                      </div>
                      <span className="text-xs font-bold text-white tracking-wide">
                        KisanMitra AI Voice Engine
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        10+ Dialects
                      </span>
                    </div>

                    {/* Dynamic Language Tag */}
                    <span className="text-xs font-semibold text-emerald-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                      {currentVoice.lang}
                    </span>
                  </div>

                  {/* Audio Waveform Graphic */}
                  <div className="flex items-center gap-1 h-6 px-2 bg-slate-950/80 rounded-md border border-slate-800 mb-2">
                    {[40, 75, 90, 50, 100, 65, 80, 45, 95, 70, 85, 30, 60, 90, 45, 80, 100, 60, 40, 70, 85, 50, 95, 60].map((h, i) => (
                      <span
                        key={i}
                        className="flex-1 bg-emerald-400 rounded-full transition-all duration-300"
                        style={{ 
                          height: `${isPlayingVoice ? Math.max(15, (h * ((i + activeVoiceIdx) % 5 + 1)) % 100) : 20}%`,
                          opacity: isPlayingVoice ? 0.9 : 0.3 
                        }}
                      />
                    ))}
                  </div>

                  {/* Prompt Text & Answer Preview */}
                  <div className="text-xs">
                    <p className="text-slate-200 font-medium truncate">
                      "{currentVoice.text}"
                    </p>
                    <p className="text-[11px] text-emerald-400/90 truncate mt-0.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{currentVoice.answer}</span>
                    </p>
                  </div>
                </div>

                {/* WIDGET 2: [Multimodal Vision Panel] Real-time foliar diagnostics */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-lg shadow-black/40 hover:border-emerald-500/40 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
                        <Cpu className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-white">
                        Multimodal Foliar Diagnostics
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>98% Accuracy</span>
                    </div>
                  </div>

                  {/* Diagnostic Alert Box */}
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-400">
                          Wheat Yellow Rust Detected
                        </span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          High Severity
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Puccinia striiformis • Foliar chlorosis with linear pustules
                      </p>
                      <p className="text-[11px] text-emerald-400 font-mono pt-1">
                        ICAR Standard: Propiconazole 25% EC @ 1ml/L water
                      </p>
                    </div>

                    {/* Foliar Target Mock Thumbnail */}
                    <div className="relative w-14 h-14 rounded bg-emerald-950/80 border border-emerald-500/40 shrink-0 overflow-hidden flex items-center justify-center">
                      <Leaf className="w-8 h-8 text-emerald-400 opacity-80" />
                      <div className="absolute inset-0 border border-amber-400/80 border-dashed rounded m-1"></div>
                    </div>
                  </div>
                </div>

                {/* WIDGET 3: [Supply Chain/Market Intel] Live CACP 2026-27 Government MSP */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-lg shadow-black/40 hover:border-emerald-500/40 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400">
                        <TrendingUp className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-white">
                        Supply Chain Intel: CACP 2026-27 Benchmark MSP
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      LIVE APMC SYNC
                    </span>
                  </div>

                  {/* MSP Data Ticker Rows */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 rounded bg-slate-950 border border-slate-800">
                      <span className="block text-[10px] text-slate-400">गेहूं (Wheat)</span>
                      <span className="text-xs font-bold text-white">₹2,425 / Qtl</span>
                      <span className="text-[10px] text-emerald-400 font-medium">+6.1% YoY</span>
                    </div>

                    <div className="p-2 rounded bg-slate-950 border border-slate-800">
                      <span className="block text-[10px] text-slate-400">धान (Paddy Com)</span>
                      <span className="text-xs font-bold text-white">₹2,320 / Qtl</span>
                      <span className="text-[10px] text-emerald-400 font-medium">+5.3% YoY</span>
                    </div>

                    <div className="p-2 rounded bg-slate-950 border border-slate-800">
                      <span className="block text-[10px] text-slate-400">सरसों (Mustard)</span>
                      <span className="text-xs font-bold text-white">₹5,950 / Qtl</span>
                      <span className="text-[10px] text-emerald-400 font-medium">+5.4% YoY</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
