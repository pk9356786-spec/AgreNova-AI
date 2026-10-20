import React, { useState } from 'react';
import { 
  X, UserCheck, ShieldCheck, Building2, MapPin, 
  Smartphone, CheckCircle2, ArrowRight, Sparkles
} from 'lucide-react';
import { FarmerProfile } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: 'en' | 'hi';
  onProfileUpdated?: (profile: FarmerProfile) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onProfileUpdated,
}) => {
  if (!isOpen) return null;

  const isHindi = currentLang === 'hi';

  const [role, setRole] = useState<'farmer' | 'enterprise'>('farmer');
  const [farmerName, setFarmerName] = useState('रामपाल सिंह (Rampal Singh)');
  const [district, setDistrict] = useState('करनाल (Karnal)');
  const [crop, setCrop] = useState('wheat');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFarmerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    if (onProfileUpdated) {
      onProfileUpdated({
        name: farmerName,
        state: 'Haryana',
        district: district,
        crop: crop,
        landSize: 4.5,
        soilType: 'alluvial'
      });
    }
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-7 text-slate-100">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Zero-Friction Access</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            {isHindi ? 'AgreNova AI लॉगिन' : 'AgreNova AI Platform Access'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {isHindi 
              ? 'बिना OTP और बिना पासवर्ड के तत्काल डिजिटल किसान पहचान।' 
              : 'Passwordless & OTP-free instant authentication for Indian farmers and enterprise teams.'}
          </p>
        </div>

        {/* Role toggle */}
        <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 mb-5">
          <button
            type="button"
            onClick={() => setRole('farmer')}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              role === 'farmer' 
                ? 'bg-emerald-500 text-slate-950 shadow-sm' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isHindi ? 'किसान पहचान (Zero-OTP)' : 'Farmer (Instant)'}
          </button>
          <button
            type="button"
            onClick={() => setRole('enterprise')}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              role === 'enterprise' 
                ? 'bg-emerald-500 text-slate-950 shadow-sm' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isHindi ? 'एंटरप्राइज / FPO' : 'Enterprise / FPO'}
          </button>
        </div>

        {isSuccess ? (
          <div className="p-6 text-center space-y-3 bg-slate-950 rounded-xl border border-emerald-500/40">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-sm font-bold text-white">
              {isHindi ? 'सफलतापूर्वक प्रमाणीकृत!' : 'Successfully Authenticated!'}
            </h4>
            <p className="text-xs text-slate-400">
              {isHindi ? 'आपके खेत की प्रोफ़ाइल सक्रिय कर दी गई है।' : 'Local profile active. Zero drop-off guarantee.'}
            </p>
          </div>
        ) : role === 'farmer' ? (
          <form onSubmit={handleFarmerLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                {isHindi ? 'किसान का नाम' : 'Farmer Name'}
              </label>
              <input
                type="text"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs sm:text-sm text-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  {isHindi ? 'जिला' : 'District'}
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs sm:text-sm text-white focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  {isHindi ? 'मुख्य फसल' : 'Primary Crop'}
                </label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs sm:text-sm text-white focus:border-emerald-500 outline-none"
                >
                  <option value="wheat">गेहूं (Wheat)</option>
                  <option value="paddy">धान (Paddy)</option>
                  <option value="cotton">कपास (Cotton)</option>
                  <option value="mustard">सरसों (Mustard)</option>
                  <option value="sugarcane">गन्ना (Sugarcane)</option>
                </select>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                {isHindi 
                  ? 'शून्य-घर्षण आर्किटेक्चर: डिवाइस कैशिंग द्वारा 100% सत्र बनाए रखता है।' 
                  : 'Zero-drop guarantee: Device fingerprint and farm GPS eliminate SMS OTP drop-offs.'}
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)] cursor-pointer"
            >
              {isHindi ? 'तत्काल शुरू करें (बिना पासवर्ड)' : 'Enter Dashboard Instantly'}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span>Enterprise Single Sign-On (SSO)</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect using corporate credentials (Okta, Azure AD, Google Workspace) or enter with demo accounts:
              </p>

              <div className="space-y-1.5 pt-2">
                {[
                  { name: 'ITC MAARS Agronomist', email: 'agronomy@itcmaars.partner' },
                  { name: 'Sahyadri FPO Cluster Head', email: 'cluster@sahyadrifarms.in' },
                  { name: 'Field Scout Lead (Karnal)', email: 'scout@agrenovaai.in' }
                ].map((demo, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setIsSuccess(true);
                      setTimeout(() => {
                        setIsSuccess(false);
                        onClose();
                      }, 1000);
                    }}
                    className="w-full p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left text-xs text-slate-200 flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <span className="font-semibold block text-white group-hover:text-emerald-300">{demo.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{demo.email}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
