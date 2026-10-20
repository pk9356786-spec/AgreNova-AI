import React from 'react';
import { Phone, Mic, Camera, ShieldCheck, ArrowRight } from 'lucide-react';

interface BrandCTAProps {
  selectedLang: string;
  onVoiceClick: () => void;
  onCameraClick: () => void;
}

export const AgreNovaBrandCTA: React.FC<BrandCTAProps> = React.memo(({
  selectedLang,
  onVoiceClick,
  onCameraClick,
}) => {
  const isHindi = selectedLang === 'hi';

  return (
    <section className="bg-[#002C23] text-white py-14 md:py-18 relative overflow-hidden border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Text */}
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isHindi ? 'निःशुल्क किसान सेवा' : '100% Free Public Farmer Advisory'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {isHindi ? (
                <>
                  भारत के प्रत्येक किसान के लिए <br className="hidden sm:inline" />
                  <span className="text-[#34D399]">आधुनिक कृषि तकनीक</span>
                </>
              ) : (
                <>
                  Modern Agriculture Intelligence <br className="hidden sm:inline" />
                  <span className="text-[#34D399]">for Every Farmer Across India</span>
                </>
              )}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal">
              {isHindi
                ? 'AgreNova AI बिना किसी शुल्क के सभी भारतीय किसानों के लिए 24 घंटे उपलब्ध है। अपनी फसल की सुरक्षा और बेहतर उपज के लिए अभी शुरू करें।'
                : 'AgreNova AI operates 24/7 at zero cost for Indian agriculturists. Empower your farming decisions with instant visual diagnostics and regional voice consultation.'}
            </p>
          </div>

          {/* Right Action Group */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              type="button"
              onClick={onVoiceClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-[#002C23] hover:bg-emerald-50 font-extrabold text-sm shadow-lg transition active:scale-95"
            >
              <Mic className="w-4 h-4 text-emerald-700" />
              <span>{isHindi ? 'बोलकर पूछें' : 'Voice Assistant'}</span>
            </button>
            <button
              type="button"
              onClick={onCameraClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#047857] hover:bg-[#036446] text-white border border-emerald-400/30 font-extrabold text-sm shadow-lg transition active:scale-95"
            >
              <Camera className="w-4 h-4" />
              <span>{isHindi ? 'फसल जांचें' : 'Scan Leaf'}</span>
            </button>
            <a
              href="tel:18001801551"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm shadow-lg transition active:scale-95"
            >
              <Phone className="w-4 h-4 fill-current text-slate-950" />
              <span>1800-180-1551</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

AgreNovaBrandCTA.displayName = 'AgreNovaBrandCTA';
