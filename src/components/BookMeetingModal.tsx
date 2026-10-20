import React, { useState } from 'react';
import { 
  X, Calendar, Clock, Building2, User, Mail, 
  Phone, CheckCircle2, ArrowRight, Sparkles, MapPin, Rocket
} from 'lucide-react';

interface BookMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: 'en' | 'hi';
  onLaunchApp: () => void;
}

export const BookMeetingModal: React.FC<BookMeetingModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onLaunchApp,
}) => {
  if (!isOpen) return null;

  const isHindi = currentLang === 'hi';

  const [activeTab, setActiveTab] = useState<'meeting' | 'launch'>('meeting');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    orgType: 'Agri-Food Corporate / FMCG',
    email: '',
    phone: '',
    preferredDate: '2026-10-20',
    preferredTime: '11:00 AM IST',
    state: 'Punjab',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 text-slate-100">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>AgreNova AI Enterprise Portal</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            {isHindi ? 'मीटिंग बुक करें / लाइव ऐप शुरू करें' : 'Book an Enterprise Meeting / Launch App'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {isHindi 
              ? 'एंटरप्राइज डेमो, FPO पायलट रोलआउट या तुरंत फील्ड ऐप का अनुभव लें।' 
              : 'Schedule an executive architectural briefing or launch the live farmer decision engine.'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('meeting')}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'meeting'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{isHindi ? 'कॉर्पोरेट मीटिंग बुक करें' : 'Schedule Demo Meeting'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('launch')}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'launch'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Rocket className="w-4 h-4" />
            <span>{isHindi ? 'लाइव ऐप शुरू करें (Zero OTP)' : 'Launch Web App Instantly'}</span>
          </button>
        </div>

        {/* Tab 1: Meeting Form */}
        {activeTab === 'meeting' ? (
          isSubmitted ? (
            <div className="p-8 text-center rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white">
                {isHindi ? 'मीटिंग अनुरोध सफलतापूर्वक प्राप्त हुआ!' : 'Executive Briefing Requested!'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                {isHindi ? (
                  `धन्यवाद ${formData.name || ''}! हमारी एग्रीटेक सॉल्यूशंस टीम आपके पसंदीदा समय (${formData.preferredDate} ${formData.preferredTime}) पर संपर्क करेगी। एक कैलेंडर आमंत्रण भेजा गया है।`
                ) : (
                  `Thank you ${formData.name || ''}! An AgreNova enterprise architect will contact you regarding your ${formData.orgType} deployment on ${formData.preferredDate} at ${formData.preferredTime}.`
                )}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
                >
                  {isHindi ? 'डैशबोर्ड पर लौटें' : 'Return to Platform'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    {isHindi ? 'आपका नाम (Full Name) *' : 'Executive Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs sm:text-sm text-white focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    {isHindi ? 'संगठन / कंपनी (Organization) *' : 'Organization Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Sahyadri FPO / ITC Agri"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs sm:text-sm text-white focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    {isHindi ? 'ईमेल (Corporate Email) *' : 'Corporate Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@enterprise.com"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs sm:text-sm text-white focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    {isHindi ? 'फ़ोन नंबर (Mobile) *' : 'Phone / WhatsApp *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs sm:text-sm text-white focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  {isHindi ? 'संगठन का प्रकार (Organization Category)' : 'Enterprise Category'}
                </label>
                <select
                  value={formData.orgType}
                  onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs sm:text-sm text-white focus:border-emerald-500 outline-none"
                >
                  <option value="Agri-Food Corporate / FMCG">Agri-Food Corporate / FMCG</option>
                  <option value="Farmer Producer Org (FPO) / Federation">Farmer Producer Org (FPO) / Federation</option>
                  <option value="Agri-Input & Seed Manufacturer">Agri-Input & Seed Manufacturer</option>
                  <option value="Rural Bank / Agri FinTech / NBFC">Rural Bank / Agri FinTech / NBFC</option>
                  <option value="Government / Research Institution">Government / Research Institution</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    {isHindi ? 'पसंदीदा दिनांक' : 'Preferred Date'}
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs sm:text-sm text-white focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    {isHindi ? 'पसंदीदा समय' : 'Preferred Time'}
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs sm:text-sm text-white focus:border-emerald-500 outline-none"
                  >
                    <option value="10:00 AM IST">10:00 AM IST</option>
                    <option value="11:30 AM IST">11:30 AM IST</option>
                    <option value="02:30 PM IST">02:30 PM IST</option>
                    <option value="04:00 PM IST">04:00 PM IST</option>
                    <option value="05:30 PM IST">05:30 PM IST</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)] cursor-pointer"
              >
                {isHindi ? 'मीटिंग की पुष्टि करें' : 'Confirm Executive Briefing'}
              </button>
            </form>
          )
        ) : (
          /* Tab 2: Launch App Instantly */
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>{isHindi ? 'शून्य-घर्षण त्वरित फील्ड एक्सेस' : 'Zero-Friction Instant Field Access'}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isHindi ? (
                  'किसी पासवर्ड, लॉगिन या OTP की आवश्यकता नहीं है। आप सीधे AgreNova AI के निर्णय कार्यप्रवाह (वॉइस असिस्टेंट, कैमरा डायग्नोस्टिक्स, लाइव मौसम एवं MSP ट्रैकर) का तुरंत उपयोग कर सकते हैं।'
                ) : (
                  'No login friction. No OTP drop-offs. Instantly launch the decision workflow engine with full offline caching and vernacular voice recognition.'
                )}
              </p>
              
              <div className="space-y-2 pt-1 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>KisanMitra Multi-Dialect Voice Assistant Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Computer Vision Foliar Pathology Enabled</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>CACP 2026-27 Government Benchmarks Synced</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onLaunchApp();
              }}
              className="w-full py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(52,211,153,0.4)] cursor-pointer"
            >
              <Rocket className="w-4 h-4" />
              <span>{isHindi ? 'निर्णय कार्यप्रवाह पर जाएं (Scroll to Tools)' : 'Launch Decision Workflow Engine'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
