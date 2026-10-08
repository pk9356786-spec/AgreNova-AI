import fs from 'fs';
import { UI_TRANSLATIONS } from '../src/translations';

const extraBatch: Record<string, Record<string, string>> = {
  en: {
    card_voice_kicker: "VOICE AI",
    card_voice_title: "Ask by Voice",
    card_voice_desc: "Ask any question about your crops, weather, or farming using your voice.",
    card_voice_cta: "Start with Voice",
    card_voice_meta: "⚡ Instant Answer • 10 Languages",
    card_vision_kicker: "AI VISION",
    card_vision_title: "Check Crop Health",
    card_vision_desc: "Upload crop photo for instant AI-powered disease diagnosis & care guide.",
    card_vision_cta: "Diagnose from Photo",
    card_vision_meta: "🔬 98% Accuracy • Organic Care"
  },
  hi: {
    card_voice_kicker: "VOICE AI",
    card_voice_title: "बोलकर पूछें",
    card_voice_desc: "अपनी फसल, मौसम या खेती से जुड़ा सवाल अपनी आवाज़ में पूछें।",
    card_voice_cta: "बोलकर शुरू करें",
    card_voice_meta: "⚡ तुरंत जवाब • 10 भाषाएँ",
    card_vision_kicker: "AI VISION",
    card_vision_title: "फसल की फोटो भेजें",
    card_vision_desc: "फसल की फोटो अपलोड करें और संभावित समस्या की AI-powered पहचान व मार्गदर्शन पाएं।",
    card_vision_cta: "फोटो से जांचें",
    card_vision_meta: "🔬 98% AI सटीकता • जैविक उपचार"
  },
  mr: {
    card_voice_kicker: "VOICE AI",
    card_voice_title: "बोलून विचारा",
    card_voice_desc: "आपल्या पिकाबद्दल, हवामानाबद्दल किंवा शेतीविषयक प्रश्न आवाजात विचारा.",
    card_voice_cta: "बोलून सुरू करा",
    card_voice_meta: "⚡ झटपट उत्तर • 10 भाषा",
    card_vision_kicker: "AI VISION",
    card_vision_title: "पिकाचा फोटो पाठवा",
    card_vision_desc: "पिकाचा फोटो अपलोड करा आणि रोगाची AI द्वारे अचूक तपासणी व मार्गदर्शन मिळवा.",
    card_vision_cta: "फोटोद्वारे तपासा",
    card_vision_meta: "🔬 98% अचूकता • सेंद्रिय उपचार"
  },
  gu: {
    card_voice_kicker: "VOICE AI",
    card_voice_title: "બોલીને પૂછો",
    card_voice_desc: "તમારા પાક, હવામાન કે ખેતી સંબંધિત પ્રશ્ન તમારા અવાજમાં પૂછો.",
    card_voice_cta: "બોલીને શરૂ કરો",
    card_voice_meta: "⚡ ત્વરિત જવાબ • 10 ભાષાઓ",
    card_vision_kicker: "AI VISION",
    card_vision_title: "પાકનો ફોટો મોકલો",
    card_vision_desc: "પાકનો ફોટો અપલોડ કરો અને સંભવિત રોગની AI આધારિત તપાસ અને માર્ગદર્શન મેળવો.",
    card_vision_cta: "ફોટો દ્વારા તપાસો",
    card_vision_meta: "🔬 98% સચોટતા • જૈવિક ઉપચાર"
  },
  pa: {
    card_voice_kicker: "VOICE AI",
    card_voice_title: "ਬੋਲ ਕੇ ਪੁੱਛੋ",
    card_voice_desc: "ਆਪਣੀ ਫ਼ਸਲ, ਮੌਸਮ ਜਾਂ ਖੇਤੀ ਨਾਲ ਸੰਬੰਧਿਤ ਸਵਾਲ ਆਪਣੀ ਆਵਾਜ਼ ਵਿੱਚ ਪੁੱਛੋ।",
    card_voice_cta: "ਬੋਲ ਕੇ ਸ਼ੁਰੂ ਕਰੋ",
    card_voice_meta: "⚡ ਤੁਰੰਤ ਜਵਾਬ • 10 ਭਾਸ਼ਾਵਾਂ",
    card_vision_kicker: "AI VISION",
    card_vision_title: "ਫ਼ਸਲ ਦੀ ਫੋਟੋ ਭੇਜੋ",
    card_vision_desc: "ਫ਼ਸਲ ਦੀ ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ ਅਤੇ ਸੰਭਾਵੀ ਸਮੱਸਿਆ ਦੀ AI ਆਧਾਰਿਤ ਜਾਂਚ ਅਤੇ ਸਲਾਹ ਲਵੋ।",
    card_vision_cta: "ਫੋਟੋ ਨਾਲ ਜਾਂਚੋ",
    card_vision_meta: "🔬 98% ਸ਼ੁੱਧਤਾ • ਜੈਵਿਕ ਇਲਾਜ"
  },
  bn: {
    card_voice_kicker: "VOICE AI",
    card_voice_title: "মুখে বলে জিজ্ঞাসা করুন",
    card_voice_desc: "আপনার ফসল, আবহাওয়া বা চাষাবাদ সংক্রান্ত প্রশ্ন মুখে বলে জানুন।",
    card_voice_cta: "মুখে বলে শুরু করুন",
    card_voice_meta: "⚡ তাৎক্ষণিক উত্তর • ১০টি ভাষা",
    card_vision_kicker: "AI VISION",
    card_vision_title: "ফসলের ছবি পাঠান",
    card_vision_desc: "ফসলের ছবি আপলোড করে এআই দ্বারা তাৎক্ষণিক রোগ নির্ণয় ও চিকিৎসা পরামর্শ পান।",
    card_vision_cta: "ছবি থেকে নির্ণয় করুন",
    card_vision_meta: "🔬 ৯৮% নির্ভুলতা • জৈব প্রতিকার"
  },
  ta: {
    card_voice_kicker: "VOICE AI",
    card_voice_title: "குரல் மூலம் கேட்கவும்",
    card_voice_desc: "உங்கள் பயிர், வானிலை அல்லது விவசாயம் குறித்த கேள்விகளை குரல் மூலம் கேளுங்கள்.",
    card_voice_cta: "பேசி தொடங்கவும்",
    card_voice_meta: "⚡ உடனடி பதில் • 10 மொழிகள்",
    card_vision_kicker: "AI VISION",
    card_vision_title: "பயிர் புகைப்படம் அனுப்பவும்",
    card_vision_desc: "பயிர் படத்தை பதிவேற்றி, AI மூலம் நோய் கண்டறிதல் மற்றும் வழிகாட்டுதல் பெறுங்கள்.",
    card_vision_cta: "புகைப்படம் மூலம் பரிசோதிக்கவும்",
    card_vision_meta: "🔬 98% துல்லியம் • இயற்கை சிகிச்சை"
  },
  te: {
    card_voice_kicker: "VOICE AI",
    card_voice_title: "వాయిస్ ద్వారా అడగండి",
    card_voice_desc: "మీ పంట, వాతావరణం లేదా వ్యవసాయ ప్రశ్నలను మీ వాయిస్‌తో అడగండి.",
    card_voice_cta: "వాయిస్‌తో ప్రారంభించండి",
    card_voice_meta: "⚡ తక్షణ సమాధానం • 10 భాషలు",
    card_vision_kicker: "AI VISION",
    card_vision_title: "పంట ఫోటో పంపండి",
    card_vision_desc: "పంట ఫోటోను అప్‌లోడ్ చేసి, AI ద్వారా రోగ నిర్ధారణ మరియు సలహాలు పొందండి.",
    card_vision_cta: "ఫోటోతో నిర్ధారించండి",
    card_vision_meta: "🔬 98% ఖచ్చితత్వం • సేంద్రీయ నివారణ"
  },
  kn: {
    card_voice_kicker: "VOICE AI",
    card_voice_title: "ಧ್ವನಿಯ ಮೂಲಕ ಕೇಳಿ",
    card_voice_desc: "ನಿಮ್ಮ ಬೆಳೆ, ಹವಾಮಾನ ಅಥವಾ ಕೃಷಿ ಕುರಿತ ಪ್ರಶ್ನೆಗಳನ್ನು ನಿಮ್ಮ ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ.",
    card_voice_cta: "ಧ್ವನಿಯೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಿ",
    card_voice_meta: "⚡ ತಕ್ಷಣದ ಉತ್ತರ • 10 ಭಾಷೆಗಳು",
    card_vision_kicker: "AI VISION",
    card_vision_title: "ಬೆಳೆಯ ಫೋಟೋ ಕಳುಹಿಸಿ",
    card_vision_desc: "ಬೆಳೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು AI ಆಧಾರಿತ ರೋಗ ಪತ್ತೆ ಹಾಗೂ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.",
    card_vision_cta: "ಫೋಟೋ ಮೂಲಕ ಪರೀಕ್ಷಿಸಿ",
    card_vision_meta: "🔬 98% ನಿಖರತೆ • ಸಾವಯವ ಚಿಕಿತ್ಸೆ"
  },
  ml: {
    card_voice_kicker: "VOICE AI",
    card_voice_title: "ശബ്ദത്തിലൂടെ ചോദിക്കുക",
    card_voice_desc: "നിങ്ങളുടെ വിള, കാലാവസ്ഥ അല്ലെങ്കിൽ കൃഷി സംബന്ധിച്ച ചോദ്യങ്ങൾ ശബ്ദത്തിലൂടെ ചോദിക്കുക.",
    card_voice_cta: "ശബ്ദത്തിൽ ആരംഭിക്കുക",
    card_voice_meta: "⚡ തത്സമയ ഉത്തരം • 10 ഭാഷകൾ",
    card_vision_kicker: "AI VISION",
    card_vision_title: "വിളയുടെ ഫോട്ടോ അയക്കുക",
    card_vision_desc: "വിളയുടെ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്ത് AI രോഗനിർണയവും ചികിത്സാ നിർദ്ദേശങ്ങളും നേടുക.",
    card_vision_cta: "ഫോട്ടോ വഴി പരിശോധിക്കുക",
    card_vision_meta: "🔬 98% കൃത്യത • ജൈവ ചികിത്സ"
  }
};

const merged = { ...UI_TRANSLATIONS };
for (const lang of Object.keys(extraBatch)) {
  merged[lang] = {
    ...merged[lang],
    ...extraBatch[lang]
  };
}

const content = `// Comprehensive 10-Language UI Dictionary for AgreNova AI
// Languages: English (en), Hindi (hi), Marathi (mr), Gujarati (gu), Punjabi (pa), Bengali (bn), Tamil (ta), Telugu (te), Kannada (kn), Malayalam (ml)

export const UI_TRANSLATIONS: Record<string, Record<string, string>> = ${JSON.stringify(merged, null, 2)};

export function getTranslation(lang: string, key: string, fallback?: string): string {
  const langTable = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS['en'];
  if (langTable && langTable[key]) {
    return langTable[key];
  }
  const enTable = UI_TRANSLATIONS['en'];
  if (enTable && enTable[key]) {
    return enTable[key];
  }
  return fallback !== undefined ? fallback : key;
}

export interface SupportedLanguage {
  code: string;
  name: string;
  englishName: string;
  nativeName: string;
  bcp47: string;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'en', name: 'English', englishName: 'English', nativeName: 'English', bcp47: 'en-IN' },
  { code: 'hi', name: 'Hindi', englishName: 'Hindi', nativeName: 'हिन्दी', bcp47: 'hi-IN' },
  { code: 'mr', name: 'Marathi', englishName: 'Marathi', nativeName: 'मराठी', bcp47: 'mr-IN' },
  { code: 'gu', name: 'Gujarati', englishName: 'Gujarati', nativeName: 'ગુજરાતી', bcp47: 'gu-IN' },
  { code: 'pa', name: 'Punjabi', englishName: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', bcp47: 'pa-IN' },
  { code: 'bn', name: 'Bengali', englishName: 'Bengali', nativeName: 'বাংলা', bcp47: 'bn-IN' },
  { code: 'ta', name: 'Tamil', englishName: 'Tamil', nativeName: 'தமிழ்', bcp47: 'ta-IN' },
  { code: 'te', name: 'Telugu', englishName: 'Telugu', nativeName: 'తెలుగు', bcp47: 'te-IN' },
  { code: 'kn', name: 'Kannada', englishName: 'Kannada', nativeName: 'ಕನ್ನಡ', bcp47: 'kn-IN' },
  { code: 'ml', name: 'Malayalam', englishName: 'Malayalam', nativeName: 'മലയാളം', bcp47: 'ml-IN' }
];

export function getTTSLangCode(lang: string): string {
  const map: Record<string, string> = {
    en: 'en-IN',
    hi: 'hi-IN',
    mr: 'mr-IN',
    gu: 'gu-IN',
    pa: 'pa-IN',
    bn: 'bn-IN',
    ta: 'ta-IN',
    te: 'te-IN',
    kn: 'kn-IN',
    ml: 'ml-IN'
  };
  return map[lang] || 'hi-IN';
}

export function detectInputLanguage(text: string, currentLang?: string): string {
  if (!text) return currentLang || 'en';
  // Devanagari (Hindi / Marathi)
  if (/[\\u0900-\\u097F]/.test(text)) {
    if (currentLang === 'mr') return 'mr';
    return 'hi';
  }
  // Bengali
  if (/[\\u0980-\\u09FF]/.test(text)) return 'bn';
  // Gurmukhi (Punjabi)
  if (/[\\u0A00-\\u0A7F]/.test(text)) return 'pa';
  // Gujarati
  if (/[\\u0A80-\\u0AFF]/.test(text)) return 'gu';
  // Tamil
  if (/[\\u0B80-\\u0BFF]/.test(text)) return 'ta';
  // Telugu
  if (/[\\u0C00-\\u0C7F]/.test(text)) return 'te';
  // Kannada
  if (/[\\u0C80-\\u0CFF]/.test(text)) return 'kn';
  // Malayalam
  if (/[\\u0D00-\\u0D7F]/.test(text)) return 'ml';
  return currentLang || 'en';
}
`;

fs.writeFileSync('src/translations.ts', content, 'utf8');
console.log('Appended card polish translation keys successfully.');
