/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  CheckCircle, AlertTriangle, AlertCircle, ShieldAlert, Sparkles, 
  Printer, Share2, Globe, Volume2, Clock, TrendingDown, 
  ShieldCheck, Leaf, FlaskConical, Stethoscope, FileText, 
  Info, RefreshCw, Eye, PhoneCall, HelpCircle
} from 'lucide-react';
import { AnalysisResult, PastReport } from '../types';
import { getTranslation } from '../translations';
import { FormattedMessage } from './FormattedMessage';
import { VoiceResponsePlayer } from './VoiceResponsePlayer';

interface CropAnalysisResultCardProps {
  result: AnalysisResult | PastReport;
  selectedLang: string;
  imageUrl?: string | null;
  cropName?: string;
  onPrint?: () => void;
  getWhatsAppLink?: (report: AnalysisResult | PastReport) => string;
  translatedAdvice?: string;
  isTranslatingAdvice?: boolean;
  onTranslateAdvice?: () => void;
  onScanAnother?: () => void;
  idPrefix?: string;
}

export const CropAnalysisResultCard: React.FC<CropAnalysisResultCardProps> = React.memo(({
  result,
  selectedLang,
  imageUrl,
  cropName,
  onPrint,
  getWhatsAppLink,
  translatedAdvice,
  isTranslatingAdvice,
  onTranslateAdvice,
  onScanAnother,
  idPrefix = 'active-advice'
}) => {
  // Normalize fields across AnalysisResult and PastReport
  const disease = result.disease || ('title' in result ? result.title : 'फसल रोग विश्लेषण');
  const scientificName = result.scientificName;
  const confidence = result.confidence || '92%';
  const severity = result.severity || 'मध्यम';
  const cropLoss = result.cropLoss || '15-25%';
  const recoveryTimeline = result.recoveryTimeline || '7-10 दिन';
  const description = result.description || '';
  const preventionTips = result.preventionTips || '';
  const organicTreatment = result.organicTreatment || '';
  const chemicalTreatment = result.chemicalTreatment || '';
  const advice = result.advice || '';

  // Severity styling computation
  const isHighSeverity = severity === 'उच्च' || severity === 'High' || severity.toLowerCase().includes('high') || severity.toLowerCase().includes('उच्च');
  const isLowSeverity = severity === 'कम' || severity === 'Low' || severity.toLowerCase().includes('low') || severity.toLowerCase().includes('हल्का');

  // Multi-language severity alert text mapping
  const severityAlertMap: Record<string, { highTitle: string; highSub: string; lowTitle: string; lowSub: string; modTitle: string; modSub: string }> = {
    en: {
      highTitle: 'Critical Severity — Immediate Action Required',
      highSub: 'Fast progression detected. Apply recommended bio/chemical treatment within 24-48 hours.',
      lowTitle: 'Mild Stage — Manageable with Preventive Care',
      lowSub: 'Symptoms in early stage. Organic spray and moisture regulation recommended.',
      modTitle: 'Moderate Severity — Timely Spray Recommended',
      modSub: 'Disease is spreading on foliage. Recommended treatment should be applied this week.'
    },
    hi: {
      highTitle: '⚠️ गंभीर संक्रमण स्तर — तत्काल उपचार आवश्यक',
      highSub: 'संक्रमण तेजी से फैल सकता है। अगले २४-४८ घंटों के भीतर सुझाई गई दवा का छिड़काव करें।',
      lowTitle: '✅ प्रारंभिक / हल्का स्तर — सामान्य उपचार से रोकथाम संभव',
      lowSub: 'लक्षण प्रारंभिक अवस्था में हैं। जैविक स्प्रे एवं उचित सिंचाई से फसल पूरी तरह सुरक्षित हो सकती है।',
      modTitle: '⚡ मध्यम संक्रमण — समय पर उपचार की आवश्यकता',
      modSub: 'पत्तियों पर रोग का फैलाव शुरू हो चुका है। इस सप्ताह जैविक या अनुशंसित कवकनाशी का प्रयोग करें।'
    },
    mr: {
      highTitle: '⚠️ गंभीर संसर्ग पातळी — तात्काळ उपचार आवश्यक',
      highSub: 'संसर्ग वेगाने पसरू शकतो. पुढील २४-४८ तासांत सुचवलेल्या औषधाची फवारणी करा.',
      lowTitle: '✅ प्राथमिक / सौम्य पातळी — सामान्य उपायांनी नियंत्रण शक्य',
      lowSub: 'लक्षणे सुरुवातीच्या टप्प्यात आहेत. सेंद्रिय फवारणीने पीक सुरक्षित राहील.',
      modTitle: '⚡ मध्यम संसर्ग — वेळेवर उपचारांची आवश्यकता',
      modSub: 'पानांवर रोगाचा प्रादुर्भाव सुरू झाला आहे. या आठवड्यात योग्य फवारणी करा.'
    },
    gu: {
      highTitle: '⚠️ ગંભીર રોગ સ્તર — તાત્કાલિક સારવાર જરૂરી',
      highSub: 'ચેપ ઝડપથી ફેલાઈ શકે છે. આગામી ૨૪-૪૮ કલાકમાં ભલામણ કરેલ દવાનો છંટકાવ કરો.',
      lowTitle: '✅ પ્રારંભિક / હળવું સ્તર — સામાન્ય પગલાંથી નિયંત્રણ શક્ય',
      lowSub: 'લક્ષણો શરૂઆતના તબક્કામાં છે. જૈવિક સ્પ્રેથી પાક સુરક્ષિત રહેશે.',
      modTitle: '⚡ મધ્યમ ચેપ — સમયસર સારવારની જરૂરિયાત',
      modSub: 'પાંદડા પર રોગ ફેલાઈ રહ્યો છે. આ અઠવાડિયે યોગ્ય દવાનો છંટકાવ કરો.'
    },
    pa: {
      highTitle: '⚠️ ਗੰਭੀਰ ਇਨਫੈਕਸ਼ਨ ਪੱਧਰ — ਤੁਰੰਤ ਇਲਾਜ ਜ਼ਰੂਰੀ',
      highSub: 'ਬਿਮਾਰੀ ਤੇਜ਼ੀ ਨਾਲ ਫੈਲ ਸਕਦੀ ਹੈ। ਅਗਲੇ 24-48 ਘੰਟਿਆਂ ਵਿੱਚ ਸਪਰੇਅ ਕਰੋ।',
      lowTitle: '✅ ਸ਼ੁਰੂਆਤੀ / ਹਲਕਾ ਪੱਧਰ — ਆਮ ਇਲਾਜ ਨਾਲ ਰੋਕਥਾਮ ਸੰਭਵ',
      lowSub: 'ਲੱਛਣ ਸ਼ੁਰੂਆਤੀ ਦੌਰ ਵਿੱਚ ਹਨ। ਜੈਵਿਕ ਸਪਰੇਅ ਨਾਲ ਫ਼ਸਲ ਸੁਰੱਖਿਅਤ ਰਹੇਗੀ।',
      modTitle: '⚡ ਦਰਮਿਆਨੀ ਬਿਮਾਰੀ — ਸਮੇਂ ਸਿਰ ਸਪਰੇਅ ਦੀ ਲੋੜ',
      modSub: 'ਪੱਤਿਆਂ ਤੇ ਬਿਮਾਰੀ ਫੈਲ ਰਹੀ ਹੈ। ਇਸ ਹਫ਼ਤੇ ਸਪਰੇਅ ਜ਼ਰੂਰ ਕਰੋ।'
    },
    bn: {
      highTitle: '⚠️ গুরুতর সংক্রমণের মাত্রা — অবিলম্বে ব্যবস্থা প্রয়োজন',
      highSub: 'সংক্রমণ দ্রুত ছড়িয়ে পড়তে পারে। আগামী ২৪-৪৮ ঘণ্টার মধ্যে স্প্রে করুন।',
      lowTitle: '✅ প্রাথমিক / মৃদু পর্যায় — সাধারণ পরিচর্যায় নিরাময় সম্ভব',
      lowSub: 'লক্ষণ প্রাথমিক পর্যায়ে রয়েছে। জৈব স্প্রে দ্বারা ফসল নিরাপদ থাকবে।',
      modTitle: '⚡ মাঝারি সংক্রমণ — সময়মতো ব্যবস্থা নেওয়া জরুরি',
      modSub: 'পাতায় রোগের বিস্তার শুরু হয়েছে। এই সপ্তাহে উপযুক্ত স্প্রে করুন।'
    },
    ta: {
      highTitle: '⚠️ தீவிர தொற்று நிலை — உடனடி சிகிச்சை தேவை',
      highSub: 'தொற்று வேகமாக பரவக்கூடும். அடுத்த 24-48 மணி நேரத்திற்குள் மருந்து தெளிக்கவும்.',
      lowTitle: '✅ ஆரம்ப / லேசான நிலை — எளிய பராமரிப்பால் கட்டுப்படுத்தலாம்',
      lowSub: 'அறிகுறிகள் ஆரம்ப நிலையில் உள்ளன. இயற்கை தெளிப்பு மூலம் பயிரைப் பாதுகாக்கலாம்.',
      modTitle: '⚡ மிதமான தொற்று — சரியான நேரத்தில் தெளிக்க பரிந்துரைக்கப்படுகிறது',
      modSub: 'இலைகளில் நோய் பரவத் தொடங்கியுள்ளது. இந்த வாரத்திற்குள் தெளிக்கவும்.'
    },
    te: {
      highTitle: '⚠️ తీవ్రమైన ఇన్ఫెక్షన్ స్థాయి — తక్షణ చికిత్స అవసరం',
      highSub: 'తెగులు వేగంగా వ్యాపించే అవకాశం ఉంది. రాబోయే 24-48 గంటల్లో పిచికారీ చేయండి.',
      lowTitle: '✅ ప్రారంభ / తేలికపాటి స్థాయి — సాధారణ చర్యలతో నివారణ సాధ్యం',
      lowSub: 'లక్షణాలు ప్రారంభ దశలో ఉన్నాయి. సేంద్రీయ పిచికారీతో పంట సురక్షితంగా ఉంటుంది.',
      modTitle: '⚡ మధ్యస్థ ఇన్ఫెక్షన్ — సకాలంలో పిచికారీ అవసరం',
      modSub: 'ఆకులపై తెగులు వ్యాపిస్తోంది. ఈ వారంలోనే పిచికారీ చేయండి.'
    },
    kn: {
      highTitle: '⚠️ ಗಂಭೀರ ಸೋಂಕಿನ ಮಟ್ಟ — ತಕ್ಷಣದ ಕ್ರಮ ಅಗತ್ಯ',
      highSub: 'ಸೋಂಕು ವೇಗವಾಗಿ ಹರಡಬಹುದು. ಮುಂದಿನ 24-48 ಗಂಟೆಗಳಲ್ಲಿ ಸಿಂಪಡಣೆ ಮಾಡಿ.',
      lowTitle: '✅ ಆರಂಭಿಕ / ಸೌಮ್ಯ ಹಂತ — ಸಾಮಾನ್ಯ ಕ್ರಮಗಳಿಂದ ನಿಯಂತ್ರಣ ಸಾಧ್ಯ',
      lowSub: 'ಲಕ್ಷಣಗಳು ಆರಂಭಿಕ ಹಂತದಲ್ಲಿವೆ. ಸಾವಯವ ಸಿಂಪಡಣೆಯಿಂದ ಬೆಳೆ ಸುರಕ್ಷಿತವಾಗಿರುತ್ತದೆ.',
      modTitle: '⚡ ಮಧ್ಯಮ ಸೋಂಕು — ಸಕಾಲಿಕ ಸಿಂಪಡಣೆ ಅಗತ್ಯ',
      modSub: 'ಎಲೆಗಳ ಮೇಲೆ ರೋಗ ಹರಡಲಾರಂಭಿಸಿದೆ. ಈ ವಾರದಲ್ಲೇ ಸೂಕ್ತ ಸಿಂಪಡಣೆ ಮಾಡಿ.'
    },
    ml: {
      highTitle: '⚠️ ഗുരുതരമായ അണുബാധ നില — അടിയന്തര നടപടി ആവശ്യം',
      highSub: 'രോഗം വേഗത്തിൽ പടരാൻ സാധ്യതയുണ്ട്. 24-48 മണിക്കൂറിനുള്ളിൽ മരുന്ന് തളിക്കുക.',
      lowTitle: '✅ പ്രാരംഭ ഘട്ടം — സാധാരണ പരിചരണത്തിലൂടെ നിയന്ത്രിക്കാം',
      lowSub: 'ലക്ഷണങ്ങൾ തുടക്കത്തിലാണ്. ജൈവ മരുന്ന് തളിക്കുന്നത് ഉചിതം.',
      modTitle: '⚡ മിതമായ അണുബാധ — സമയബന്ധിതമായ പരിചരണം ആവശ്യമാണ്',
      modSub: 'ഇലകളിൽ രോഗം പടരാൻ തുടങ്ങിയിട്ടുണ്ട്. ഈ ആഴ്ച തന്നെ മരുന്ന് തളിക്കുക.'
    }
  };

  const alertTexts = severityAlertMap[selectedLang] || severityAlertMap['en'];

  // Severity color tokens
  const severityConfig = isHighSeverity
    ? {
        badgeBg: 'bg-rose-500/10 text-rose-800 border-rose-200',
        dotBg: 'bg-rose-600',
        alertBg: 'bg-rose-50/70 border-rose-200/80 text-rose-950',
        alertIcon: <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />,
        alertTitle: alertTexts.highTitle,
        alertSubtitle: alertTexts.highSub,
        lossColor: 'text-rose-700',
        lossBarWidth: '65%',
        lossBarColor: 'bg-rose-600'
      }
    : isLowSeverity
    ? {
        badgeBg: 'bg-emerald-500/10 text-emerald-800 border-emerald-200',
        dotBg: 'bg-emerald-600',
        alertBg: 'bg-emerald-50/70 border-emerald-200/80 text-emerald-950',
        alertIcon: <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />,
        alertTitle: alertTexts.lowTitle,
        alertSubtitle: alertTexts.lowSub,
        lossColor: 'text-emerald-700',
        lossBarWidth: '20%',
        lossBarColor: 'bg-emerald-600'
      }
    : {
        badgeBg: 'bg-amber-500/10 text-amber-900 border-amber-200',
        dotBg: 'bg-amber-600',
        alertBg: 'bg-amber-50/70 border-amber-200/80 text-amber-950',
        alertIcon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
        alertTitle: alertTexts.modTitle,
        alertSubtitle: alertTexts.modSub,
        lossColor: 'text-amber-800',
        lossBarWidth: '40%',
        lossBarColor: 'bg-amber-600'
      };

  // Confidence numerical extraction for meter
  const confNum = parseInt(confidence.replace(/[^0-9]/g, ''), 10) || 90;

  return (
    <div id="card-analysis-result" className="bg-white rounded-2xl border border-slate-200/90 shadow-xs flex flex-col gap-5 p-5 md:p-6 overflow-hidden">
      
      {/* 1. TOP HEADER: Status Banner, Severity & Confidence Badges */}
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-emerald-50 text-emerald-900 border border-emerald-200/80 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wide flex items-center gap-1.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{getTranslation(selectedLang, 'latest_scientific_report')}</span>
            </span>
            {cropName && (
              <span className="bg-slate-100 text-slate-800 border border-slate-200 px-3 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1">
                <span>🌾</span>
                <span className="truncate max-w-[140px] sm:max-w-none">{cropName}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Severity Pill */}
            <span className={`text-[11px] font-black px-3 py-1 rounded-full border flex items-center gap-1.5 shadow-2xs ${severityConfig.badgeBg}`}>
              <span className={`w-2 h-2 rounded-full ${severityConfig.dotBg} animate-pulse shrink-0`} />
              <span>{getTranslation(selectedLang, 'infection_severity_label')}: <strong>{severity}</strong></span>
            </span>

            {/* Confidence Pill */}
            <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-[11px] font-black tracking-wide flex items-center gap-1.5 shadow-2xs">
              <span>🎯</span>
              <span>{getTranslation(selectedLang, 'accuracy_label')} {confidence}</span>
            </span>
          </div>
        </div>

        {/* 2. CROP & PATHOGEN DIAGNOSIS HERO */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start pt-1">
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-0.5">
              {getTranslation(selectedLang, 'detected_issue_label')}
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-tight tracking-tight break-words">
              {disease}
            </h2>
            {scientificName && (
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-600 font-semibold flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shrink-0">
                  {getTranslation(selectedLang, 'scientific_name_label')}
                </span>
                <span className="italic font-bold text-slate-800 break-words">{scientificName}</span>
              </div>
            )}
          </div>

          {/* Analyzed Image Thumbnail Preview if available */}
          {imageUrl && (
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shrink-0 shadow-inner group relative self-start sm:self-auto">
              <img src={imageUrl} alt="Leaf diagnosis scan" className="w-full h-full object-cover" />
              <span className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[8.5px] font-bold text-white text-center py-0.5">
                {getTranslation(selectedLang, 'analyzed_photo_badge')}
              </span>
            </div>
          )}
        </div>

        {/* Dynamic Warning Alert Banner */}
        <div className={`p-3.5 rounded-xl border flex items-start gap-3 mt-1 ${severityConfig.alertBg}`}>
          {severityConfig.alertIcon}
          <div className="text-xs leading-relaxed min-w-0 flex-1">
            <h4 className="font-extrabold">{severityConfig.alertTitle}</h4>
            <p className="opacity-90 font-medium mt-0.5">{severityConfig.alertSubtitle}</p>
          </div>
        </div>
      </div>

      {/* 3. KEY METRIC GAUGES: Impact & Recovery Expectations */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Metric 1: Potential Crop Loss */}
        <div className="bg-slate-50/90 p-3.5 rounded-xl border border-slate-200/80 flex flex-col justify-between gap-2 shadow-2xs min-w-0">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block truncate">
              {getTranslation(selectedLang, 'potential_crop_loss')}
            </span>
            <div className="flex items-baseline gap-2 mt-1 flex-wrap">
              <span className={`text-xl font-black ${severityConfig.lossColor}`}>{cropLoss}</span>
              <span className="text-[10px] font-bold text-slate-500">उपचार न करने पर</span>
            </div>
          </div>
          <div className="w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${severityConfig.lossBarColor}`} style={{ width: severityConfig.lossBarWidth }} />
          </div>
        </div>

        {/* Metric 2: Recovery Timeline */}
        <div className="bg-slate-50/90 p-3.5 rounded-xl border border-slate-200/80 flex flex-col justify-between gap-2 shadow-2xs min-w-0">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block truncate">
              {getTranslation(selectedLang, 'recovery_period_label')}
            </span>
            <div className="flex items-baseline gap-2 mt-1 flex-wrap">
              <span className="text-xl font-black text-slate-900">{recoveryTimeline}</span>
              <span className="text-[10px] font-bold text-slate-500">उचित स्प्रे उपरांत</span>
            </div>
          </div>
          <div className="w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: '75%' }} />
          </div>
        </div>

        {/* Metric 3: AI Diagnostic Confidence Meter */}
        <div className="bg-slate-50/90 p-3.5 rounded-xl border border-slate-200/80 flex flex-col justify-between gap-2 shadow-2xs min-w-0">
          <div>
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block truncate">
                {getTranslation(selectedLang, 'ai_confidence_meter')}
              </span>
              <span className="text-[9px] font-bold text-slate-500 shrink-0">
                {confNum >= 85 ? (selectedLang === 'en' ? 'High' : 'उच्च') : (selectedLang === 'en' ? 'Moderate' : 'मध्यम')}
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1 flex-wrap">
              <span className="text-xl font-black text-emerald-800">{confidence}</span>
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                confNum >= 85 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-amber-100 text-amber-900'
              }`}>
                {confNum >= 85 ? (selectedLang === 'en' ? 'Initial Detection' : 'प्रारंभिक पहचान') : (selectedLang === 'en' ? 'Verifiable' : 'सत्यापन योग्य')}
              </span>
            </div>
          </div>
          <div className="w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden">
            <div className={`${confNum >= 85 ? 'bg-emerald-600' : 'bg-amber-500'} h-full rounded-full`} style={{ width: `${Math.min(100, Math.max(40, confNum))}%` }} />
          </div>
        </div>
      </div>

      {/* Uncertainty & Image Quality Next Steps Guidance (when confidence is moderate or as farmer aid) */}
      {confNum < 85 && (
        <div className="bg-amber-50/80 border border-amber-200/90 p-3.5 rounded-xl flex items-start gap-3 shadow-2xs text-xs">
          <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1 flex flex-col gap-1">
            <span className="font-black text-amber-950">
              {getTranslation(selectedLang, 'uncertainty_guidance_title')}
            </span>
            <p className="text-[11px] text-amber-900 leading-relaxed font-medium">
              {getTranslation(selectedLang, 'uncertainty_guidance_desc')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              <div className="bg-white/80 p-2 rounded-lg border border-amber-200/60 flex items-center gap-2">
                <span>📸</span>
                <span className="text-[10.5px] font-bold text-slate-800">
                  {getTranslation(selectedLang, 'retake_daylight_hint')}
                </span>
              </div>
              <a 
                href="tel:18001801551"
                className="bg-white/80 p-2 rounded-lg border border-amber-200/60 flex items-center gap-2 text-emerald-800 hover:bg-emerald-50 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="text-[10.5px] font-bold">
                  {getTranslation(selectedLang, 'kisan_helpline_text')}
                </span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 4. SECTION: IDENTIFIED SYMPTOMS & OBSERVATION */}
      {description && (
        <div className="flex flex-col gap-1.5">
          <h3 className="font-black text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-emerald-700" />
            <span>{getTranslation(selectedLang, 'symptoms_title')}</span>
          </h3>
          <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/70 text-xs md:text-sm text-slate-700 leading-relaxed font-normal shadow-2xs">
            <p className="font-medium text-slate-800">{description}</p>
          </div>
        </div>
      )}

      {/* 5. SECTION: AVAILABLE TREATMENT SOLUTIONS (ORGANIC vs CHEMICAL) */}
      <div className="flex flex-col gap-2.5">
        <h3 className="font-black text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
          <Stethoscope className="w-4 h-4 text-emerald-700" />
          <span>{getTranslation(selectedLang, 'treatment_plan_title')}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Organic / Natural Treatment Card */}
          <div className="bg-emerald-50/40 border border-emerald-200/80 p-4 rounded-xl shadow-2xs flex flex-col justify-between gap-3">
            <div>
              <h4 className="font-black text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-1.5 mb-2 pb-1.5 border-b border-emerald-200/60">
                <Leaf className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{getTranslation(selectedLang, 'organic_treatment_title')}</span>
              </h4>
              <div className="text-xs text-slate-800 font-medium leading-relaxed">
                {organicTreatment ? (
                  <FormattedMessage text={organicTreatment} />
                ) : (
                  <p className="text-slate-500 italic">जैविक उपचार विवरण उपलब्ध नहीं है।</p>
                )}
              </div>
            </div>
            <span className="text-[9.5px] font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md self-start border border-emerald-200/60 leading-normal break-words max-w-full">
              🌱 पर्यावरण एवं मित्र कीटों के लिए पूरी तरह सुरक्षित
            </span>
          </div>

          {/* Chemical / Fungicide Treatment Card */}
          <div className="bg-rose-50/30 border border-rose-200/80 p-4 rounded-xl shadow-2xs flex flex-col justify-between gap-3 min-w-0">
            <div>
              <h4 className="font-black text-rose-950 text-xs uppercase tracking-wider flex items-center gap-1.5 mb-2 pb-1.5 border-b border-rose-200/60">
                <FlaskConical className="w-4 h-4 text-rose-700 shrink-0" />
                <span>{getTranslation(selectedLang, 'chemical_treatment_title')}</span>
              </h4>
              <div className="text-xs text-slate-800 font-medium leading-relaxed">
                {chemicalTreatment ? (
                  <FormattedMessage text={chemicalTreatment} />
                ) : (
                  <p className="text-slate-500 italic">रासायनिक उपचार विवरण उपलब्ध नहीं है।</p>
                )}
              </div>
            </div>
            <span className="text-[9.5px] font-bold text-rose-800 bg-rose-100/70 px-2.5 py-1 rounded-md self-start border border-rose-200/60 leading-normal break-words max-w-full">
              ⚠️ सावधानी: छिड़काव शाम के समय करें व मास्क अवश्य पहनें
            </span>
          </div>

        </div>
      </div>

      {/* 6. SECTION: PREVENTION & PROTECTION GUIDANCE */}
      {preventionTips && (
        <div className="flex flex-col gap-1.5">
          <h3 className="font-black text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>{getTranslation(selectedLang, 'prevention_tips_title')}</span>
          </h3>
          <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/70 text-xs md:text-sm text-slate-700 leading-relaxed font-normal shadow-2xs break-words">
            <FormattedMessage text={preventionTips} />
          </div>
        </div>
      )}

      {/* 7. SECTION: PRIMARY EXPERT SUMMARY & VOICE ACTION */}
      {advice && (
        <div className="bg-amber-50/60 border-l-4 border-amber-500 p-4 md:p-5 rounded-r-xl border-t border-r border-b border-amber-200/70 shadow-2xs flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b border-amber-200/70">
            <h4 className="font-black text-amber-950 text-xs flex items-center gap-1.5 uppercase tracking-wider">
              <span>🌾</span>
              <span>{getTranslation(selectedLang, 'summary_advice_title')}</span>
            </h4>
            
            <div className="flex items-center gap-2 flex-wrap">
              <VoiceResponsePlayer text={translatedAdvice || advice} langCode={selectedLang} />
              
              {onTranslateAdvice && (
                <button
                  type="button"
                  onClick={onTranslateAdvice}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 px-2.5 py-1 rounded-xl transition-all cursor-pointer border border-amber-200/80 shadow-2xs shrink-0"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>
                    {isTranslatingAdvice 
                      ? 'अनुवाद...' 
                      : translatedAdvice 
                        ? 'मूल भाषा' 
                        : getTranslation(selectedLang, 'translate_response')}
                  </span>
                </button>
              )}
            </div>
          </div>

          <p className="text-xs md:text-sm text-slate-800 leading-relaxed font-semibold break-words">
            {translatedAdvice || advice}
          </p>
        </div>
      )}

      {/* 8. OFFICIAL DISCLAIMER & SOURCE CITATION */}
      <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/70 flex flex-col gap-1">
        <p className="text-[10.5px] text-slate-600 leading-relaxed font-medium">
          {getTranslation(selectedLang, 'disclaimer_notice')}
        </p>
        <p className="text-[9.5px] text-slate-400 leading-relaxed font-bold">
          {getTranslation(selectedLang, 'source_reference')}
        </p>
      </div>

      {/* 9. ACTION BUTTONS: Print, Share to WhatsApp, Scan Another */}
      <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-1">
        {onPrint && (
          <button 
            onClick={onPrint}
            className="flex-1 bg-[#065F46] hover:bg-[#044e3a] active:bg-[#033b2c] text-white p-3.5 rounded-xl flex items-center justify-center gap-2 font-black text-xs transition-all cursor-pointer shadow-xs text-center min-h-[44px]"
          >
            <Printer className="w-4 h-4 shrink-0" />
            <span>{getTranslation(selectedLang, 'download_pdf_report')}</span>
          </button>
        )}

        {getWhatsAppLink && (
          <a 
            id="btn-whatsapp-share"
            href={getWhatsAppLink(result)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#25d366] hover:bg-[#20ba5a] text-white p-3.5 rounded-xl flex items-center justify-center gap-2 font-black text-xs transition-all shadow-xs cursor-pointer text-center min-h-[44px]"
          >
            <Share2 className="w-4 h-4 shrink-0" />
            <span>{getTranslation(selectedLang, 'share_whatsapp')}</span>
          </a>
        )}

        {onScanAnother && (
          <button
            onClick={onScanAnother}
            className="bg-[#F8FAFC] hover:bg-slate-100 text-[#065F46] border border-slate-200 p-3.5 rounded-xl flex items-center justify-center gap-2 font-black text-xs transition-all cursor-pointer shadow-2xs text-center min-h-[44px] sm:w-auto px-4"
          >
            <RefreshCw className="w-4 h-4 text-[#065F46] shrink-0" />
            <span>{getTranslation(selectedLang, 'scan_another_btn')}</span>
          </button>
        )}
      </div>

    </div>
  );
});
