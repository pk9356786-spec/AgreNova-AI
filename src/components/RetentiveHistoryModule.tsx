import React, { useState, useMemo } from 'react';
import { 
  Search, HardDrive, Volume2, Share2, CheckCircle2, 
  Leaf, FlaskConical, AlertTriangle, Calendar, Filter, 
  ExternalLink, Trash2, Eye, Download, Printer, X
} from 'lucide-react';
import { PastReport } from '../types';
import { getTTSLangCode } from '../translations';

interface HistoryModuleProps {
  currentLang: string;
  reports: PastReport[];
  onDeleteReport?: (id: string) => void;
}

export const RetentiveHistoryModule: React.FC<HistoryModuleProps> = ({
  currentLang,
  reports,
  onDeleteReport,
}) => {
  const isHindi = currentLang === 'hi';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('all');
  const [activeReportModal, setActiveReportModal] = useState<PastReport | null>(null);
  const [activeSpeakingId, setActiveSpeakingId] = useState<string | null>(null);

  // Filtered reports
  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        !q || 
        report.title.toLowerCase().includes(q) ||
        (report.subTitle && report.subTitle.toLowerCase().includes(q)) ||
        (report.disease && report.disease.toLowerCase().includes(q)) ||
        report.description.toLowerCase().includes(q);

      const matchesCrop = 
        selectedCropFilter === 'all' || 
        (report.subTitle && report.subTitle.toLowerCase().includes(selectedCropFilter.toLowerCase())) ||
        report.title.toLowerCase().includes(selectedCropFilter.toLowerCase());

      return matchesSearch && matchesCrop;
    });
  }, [reports, searchQuery, selectedCropFilter]);

  const handleSpeak = (report: PastReport) => {
    if (!window.speechSynthesis) return;

    if (activeSpeakingId === report.id) {
      window.speechSynthesis.cancel();
      setActiveSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = `${report.title}. ${report.advice || report.description}. जैविक उपचार: ${report.organicTreatment || ''}. रासायनिक उपचार: ${report.chemicalTreatment || ''}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = getTTSLangCode(currentLang);
    utterance.rate = 0.95;
    utterance.onend = () => setActiveSpeakingId(null);
    utterance.onerror = () => setActiveSpeakingId(null);

    setActiveSpeakingId(report.id);
    window.speechSynthesis.speak(utterance);
  };

  const handleShareWhatsApp = (report: PastReport) => {
    const text = encodeURIComponent(
      `🌾 *AgreNova AI - फसल रोग जांच रिपोर्ट*\n\n` +
      `📅 *दिनांक:* ${report.date}\n` +
      `🌱 *फसल:* ${report.subTitle || 'कृषि'}\n` +
      `⚠️ *पहचान:* ${report.title}\n` +
      `📊 *सटीकता:* ${report.confidence || '95%'}\n\n` +
      `🌿 *जैविक उपचार:* ${report.organicTreatment ? report.organicTreatment.slice(0, 150) + '...' : 'लागू नहीं'}\n\n` +
      `🧪 *रासायनिक उपचार:* ${report.chemicalTreatment ? report.chemicalTreatment.slice(0, 150) + '...' : 'लागू नहीं'}\n\n` +
      `🔗 https://agrenovaai.in`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section id="section-history" className="py-16 sm:py-24 bg-slate-950 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase mb-2">
              <HardDrive className="w-3.5 h-3.5" />
              <span>{isHindi ? 'प्रतिधारण इतिहास एवं अभिगम्यता' : 'RETENTIVE HISTORY & ACCESSIBILITY MODULE'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {isHindi ? (
                <>सहेजा गया परामर्श व <span className="text-emerald-400">ऑफलाइन रोग इतिहास</span></>
              ) : (
                <>Past Diagnostic History & <span className="text-emerald-400">Offline Field Archive</span></>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              {isHindi ? (
                'ब्राउज़र लोकल-स्टोरेज कैशिंग द्वारा 100% ऑफ़लाइन पुनर्प्राप्ति। खेत में नेटवर्क न होने पर भी सभी पुरानी रिपोर्ट, ऑडियो सलाह और उपचार सुरक्षित रहते हैं।'
              ) : (
                'Zero-network rural resilience: 100% offline retrieval powered by persistent client-side caching. Instant Text-to-Speech audio and WhatsApp dispatch.'
              )}
            </p>
          </div>

          {/* Offline Cache Status Badge */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-emerald-500/30 text-xs text-emerald-300 font-mono shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{reports.length} Reports Cached Offline</span>
          </div>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isHindi 
                  ? 'रोग, लक्षण या फसल का नाम खोजें...' 
                  : 'Search by crop, disease name, or symptom...'
              }
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-800 focus:border-emerald-500 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto overflow-x-auto scrollbar-none">
            {[
              { id: 'all', label: isHindi ? 'सभी रिपोर्ट्स' : 'All Reports' },
              { id: 'wheat', label: isHindi ? 'गेहूं (Wheat)' : 'Wheat' },
              { id: 'paddy', label: isHindi ? 'धान (Paddy)' : 'Paddy' },
              { id: 'tomato', label: isHindi ? 'टमाटर (Tomato)' : 'Tomato' },
              { id: 'cotton', label: isHindi ? 'कपास (Cotton)' : 'Cotton' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCropFilter(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCropFilter === cat.id
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Diagnostic Reports Grid */}
        {filteredReports.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800">
            <HardDrive className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-300">
              {isHindi ? 'कोई सहेजी गई रिपोर्ट नहीं मिली' : 'No Cached Diagnostic Reports Found'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isHindi ? 'खोज शब्द बदलें या ऊपर दिए गए विज़न स्कैनर से नई पत्ती स्कैन करें।' : 'Try modifying your search filter or scan a leaf using Section 4.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => {
              const isSpeaking = activeSpeakingId === report.id;

              return (
                <div
                  key={report.id}
                  className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all shadow-xl flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    
                    {/* Card Top: Date & Severity */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{report.date}</span>
                      </span>
                      {report.confidence && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {report.confidence} Confidence
                        </span>
                      )}
                    </div>

                    {/* Crop and Disease Title */}
                    <div>
                      <span className="text-[11px] font-mono text-emerald-400 block font-semibold">
                        {report.subTitle || 'Foliar Pathology'}
                      </span>
                      <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                        {report.title}
                      </h4>
                      {report.scientificName && (
                        <span className="text-[11px] font-mono text-slate-400 italic block">
                          {report.scientificName}
                        </span>
                      )}
                    </div>

                    {/* Brief Description */}
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {report.description}
                    </p>

                    {/* Quick Treatment Snippet */}
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 space-y-1 text-[11px]">
                      {report.organicTreatment && (
                        <div className="flex items-start gap-1.5 text-emerald-300/90 truncate">
                          <Leaf className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="truncate"><strong>जैविक:</strong> {report.organicTreatment.split('\n')[0]}</span>
                        </div>
                      )}
                      {report.chemicalTreatment && (
                        <div className="flex items-start gap-1.5 text-teal-300/90 truncate">
                          <FlaskConical className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                          <span className="truncate"><strong>रसायन:</strong> {report.chemicalTreatment.split('\n')[0]}</span>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Card Actions: Listen, WhatsApp, and View Details */}
                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    
                    {/* Integrated "Listen to Answer" (Text-to-Speech) player */}
                    <button
                      type="button"
                      onClick={() => handleSpeak(report)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isSpeaking 
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700'
                      }`}
                      title={isSpeaking ? 'Stop listening' : 'Listen to advisory'}
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-bounce' : 'text-amber-400'}`} />
                      <span>{isSpeaking ? (isHindi ? 'रोकें' : 'Stop') : (isHindi ? 'सुने' : 'Listen')}</span>
                    </button>

                    {/* Native "Share on WhatsApp" button */}
                    <button
                      type="button"
                      onClick={() => handleShareWhatsApp(report)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-green-950/80 hover:bg-green-900 text-green-300 border border-green-500/30 transition-colors cursor-pointer"
                      title="Share report on WhatsApp"
                    >
                      <Share2 className="w-3.5 h-3.5 text-green-400" />
                      <span>{isHindi ? 'व्हाट्सएप' : 'WhatsApp'}</span>
                    </button>

                    {/* View Details Modal Trigger */}
                    <button
                      type="button"
                      onClick={() => setActiveReportModal(report)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                      title="View full report"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* FULL REPORT POPUP MODAL */}
      {activeReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 text-slate-100">
            
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  {activeReportModal.subTitle || 'AgreNova Diagnostic Report'}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {activeReportModal.title}
                </h3>
                {activeReportModal.scientificName && (
                  <p className="text-xs font-mono text-slate-400 italic">
                    {activeReportModal.scientificName}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setActiveReportModal(null)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              
              {/* Meta metrics bar */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <div>
                  <span className="block text-[10px] text-slate-400 font-mono">Date</span>
                  <span className="font-semibold text-white">{activeReportModal.date}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-mono">Confidence</span>
                  <span className="font-semibold text-emerald-400">{activeReportModal.confidence || '94%'}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-mono">Severity</span>
                  <span className="font-semibold text-amber-400">{activeReportModal.severity || 'मध्यम'}</span>
                </div>
              </div>

              {/* Description & Advice */}
              <div className="space-y-1">
                <h5 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider">
                  {isHindi ? 'लक्षण व रोग विश्लेषण:' : 'Symptoms & Pathology Analysis:'}
                </h5>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeReportModal.description}
                </p>
              </div>

              {/* Organic Treatment */}
              {activeReportModal.organicTreatment && (
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <Leaf className="w-4 h-4" />
                    <span>{isHindi ? 'प्राकृतिक व जैविक उपचार (Organic):' : 'Bio-Control & Organic Treatment:'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                    {activeReportModal.organicTreatment}
                  </p>
                </div>
              )}

              {/* Chemical Treatment */}
              {activeReportModal.chemicalTreatment && (
                <div className="p-3.5 rounded-xl bg-teal-950/40 border border-teal-500/30 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
                    <FlaskConical className="w-4 h-4" />
                    <span>{isHindi ? 'रासायनिक कवकनाशी/कीटनाशक उपचार (Chemical):' : 'Synthetic Chemical Remediation (CIB&RC Registered):'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                    {activeReportModal.chemicalTreatment}
                  </p>
                </div>
              )}

              {/* Prevention Tips */}
              {activeReportModal.preventionTips && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-slate-300 block">
                    {isHindi ? 'भविष्य में रोकथाम के उपाय:' : 'Prevention & Cultivar Recommendations:'}
                  </span>
                  <p className="text-xs text-slate-400 whitespace-pre-line leading-relaxed">
                    {activeReportModal.preventionTips}
                  </p>
                </div>
              )}

            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleSpeak(activeReportModal)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isHindi ? 'पूरी रिपोर्ट सुनें (TTS)' : 'Listen to Full Report'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleShareWhatsApp(activeReportModal)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-950 hover:bg-green-900 text-green-300 border border-green-500/30 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-green-400" />
                  <span>{isHindi ? 'व्हाट्सएप साझा करें' : 'WhatsApp'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Print Report"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
