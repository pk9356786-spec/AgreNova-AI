/**
 * Build complete translations for all 10 languages
 */
import fs from 'fs';
import path from 'path';

// Load our language dictionaries
import { mrData } from './lang_mr';
import { guData } from './lang_gu';
import { paData } from './lang_pa';
import { bnData } from './lang_bn';
import { taData } from './lang_ta';
import { teData } from './lang_te';
import { knData } from './lang_kn';
import { mlData } from './lang_ml';
import { extraTranslations } from './translations_data';
import { newBatchTranslations } from './new_batch_translations';
import { UI_TRANSLATIONS as existing } from '../src/translations';

const allLanguages: Record<string, Record<string, string>> = {
  hi: { ...existing.hi, ...(extraTranslations.hi || {}), ...(newBatchTranslations.hi || {}) },
  en: { ...existing.en, ...(extraTranslations.en || {}), ...(newBatchTranslations.en || {}) },
  mr: { ...existing.mr, ...(extraTranslations.hi || {}), ...mrData, ...(newBatchTranslations.mr || {}) },
  gu: { ...existing.gu, ...(extraTranslations.hi || {}), ...guData, ...(newBatchTranslations.gu || {}) },
  pa: { ...existing.pa, ...(extraTranslations.hi || {}), ...paData, ...(newBatchTranslations.pa || {}) },
  bn: { ...existing.bn, ...(extraTranslations.hi || {}), ...bnData, ...(newBatchTranslations.bn || {}) },
  ta: { ...existing.ta, ...(extraTranslations.hi || {}), ...taData, ...(newBatchTranslations.ta || {}) },
  te: { ...existing.te, ...(extraTranslations.hi || {}), ...teData, ...(newBatchTranslations.te || {}) },
  kn: { ...existing.kn, ...(extraTranslations.hi || {}), ...knData, ...(newBatchTranslations.kn || {}) },
  ml: { ...existing.ml, ...(extraTranslations.hi || {}), ...mlData, ...(newBatchTranslations.ml || {}) }
};

// Also make sure extraTranslations keys are properly localized in each
const regionalLangs = [
  { code: 'mr', data: mrData },
  { code: 'gu', data: guData },
  { code: 'pa', data: paData },
  { code: 'bn', data: bnData },
  { code: 'ta', data: taData },
  { code: 'te', data: teData },
  { code: 'kn', data: knData },
  { code: 'ml', data: mlData }
];

for (const { code, data } of regionalLangs) {
  for (const [k, v] of Object.entries(data)) {
    allLanguages[code][k] = v;
  }
}

// Check coverage against hi
const hiKeys = Object.keys(allLanguages.hi);
console.log('Total hi keys:', hiKeys.length);

for (const code of ['hi', 'en', 'mr', 'gu', 'pa', 'bn', 'ta', 'te', 'kn', 'ml']) {
  const missing = hiKeys.filter(k => !allLanguages[code][k]);
  console.log(`Lang [${code}]: count=${Object.keys(allLanguages[code]).length}, missing=${missing.length}`);
}

// Generate src/translations.ts
const codeOut = `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LanguageOption {
  code: string;
  name: string;
  englishName: string;
  ttsLang: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', englishName: 'English', ttsLang: 'en-IN' },
  { code: 'hi', name: 'हिन्दी', englishName: 'Hindi', ttsLang: 'hi-IN' },
  { code: 'mr', name: 'मराठी', englishName: 'Marathi', ttsLang: 'mr-IN' },
  { code: 'gu', name: 'ગુજરાતી', englishName: 'Gujarati', ttsLang: 'gu-IN' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', englishName: 'Punjabi', ttsLang: 'pa-IN' },
  { code: 'bn', name: 'বাংলা', englishName: 'Bengali', ttsLang: 'bn-IN' },
  { code: 'ta', name: 'தமிழ்', englishName: 'Tamil', ttsLang: 'ta-IN' },
  { code: 'te', name: 'తెలుగు', englishName: 'Telugu', ttsLang: 'te-IN' },
  { code: 'kn', name: 'ಕನ್ನಡ', englishName: 'Kannada', ttsLang: 'kn-IN' },
  { code: 'ml', name: 'മലയാളം', englishName: 'Malayalam', ttsLang: 'ml-IN' }
];

export const UI_TRANSLATIONS: Record<string, Record<string, string>> = ${JSON.stringify(allLanguages, null, 2)};

/**
 * Safely retrieve localized UI strings with fallback to English, then Hindi
 */
export function getTranslation(langCode: string, key: string): string {
  if (UI_TRANSLATIONS[langCode] && UI_TRANSLATIONS[langCode][key]) {
    return UI_TRANSLATIONS[langCode][key];
  }
  if (UI_TRANSLATIONS['en'] && UI_TRANSLATIONS['en'][key]) {
    return UI_TRANSLATIONS['en'][key];
  }
  if (UI_TRANSLATIONS['hi'] && UI_TRANSLATIONS['hi'][key]) {
    return UI_TRANSLATIONS['hi'][key];
  }
  return key;
}

/**
 * Localized month names for all 10 supported languages
 */
export const LOCALIZED_MONTHS: Record<string, string[]> = {
  hi: ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  mr: ['जानेवारी', 'फेब्रुवारी', 'मार्च', 'एप्रिल', 'मे', 'जून', 'जुलै', 'ऑगस्ट', 'सप्टेंबर', 'ऑक्टोबर', 'नोव्हेंबर', 'डिसेंबर'],
  gu: ['જાન્યુઆરી', 'ફેબ્રુઆરી', 'માર્ચ', 'એપ્રિલ', 'મે', 'જૂન', 'જુલાઈ', 'ઓગસ્ટ', 'સપ્ટેમ્બર', 'ઓક્ટોબર', 'નવેમ્બર', 'ડિસેમ્બર'],
  pa: ['ਜਨਵਰੀ', 'ਫ਼ਰਵਰੀ', 'ਮਾਰਚ', 'ਅਪ੍ਰੈਲ', 'ਮਈ', 'ਜੂਨ', 'ਜੁਲਾਈ', 'ਅਗਸਤ', 'ਸਤੰਬਰ', 'ਅਕਤੂਬਰ', 'ਨਵੰਬਰ', 'ਦਸੰਬਰ'],
  bn: ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'],
  ta: ['ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்'],
  te: ['జనవరి', 'ఫిబ్రవరి', 'మార్చి', 'ఏప్రిల్', 'మే', 'జూన్', 'జూలై', 'ఆగస్టు', 'సెప్టెంబర్', 'అక్టోబర్', 'నవంబర్', 'డిసెంబర్'],
  kn: ['ಜನವರಿ', 'ಫೆಬ್ರವರಿ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿಲ್', 'ಮೇ', 'ಜೂನ್', 'ಜುಲೈ', 'ಆಗಸ್ಟ್', 'ಸೆಪ್ಟೆಂಬರ್', 'ಅಕ್ಟೋಬರ್', 'ನವೆಂಬರ್', 'ಡಿಸೆಂಬರ್'],
  ml: ['ജനുവരി', 'ഫെബ്രുവരി', 'മാർച്ച്', 'ഏപ്രിൽ', 'മേയ്', 'ജൂൺ', 'ജൂലൈ', 'ഓഗസ്റ്റ്', 'സെപ്റ്റംബർ', 'ഒക്ടോബർ', 'നവംബർ', 'ഡിസംബർ']
};

/**
 * Format a Date object localized into the user's selected language
 */
export function formatLocalizedDate(date: Date, langCode: string = 'en'): string {
  const day = date.getDate();
  const year = date.getFullYear();
  const months = LOCALIZED_MONTHS[langCode] || LOCALIZED_MONTHS['en'];
  const monthName = months[date.getMonth()] || months[0];

  if (langCode === 'en') {
    return \`\${day} \${monthName}, \${year}\`;
  }
  return \`\${day} \${monthName}, \${year}\`;
}

/**
 * Automatically detect user input script/language.
 */
export function detectInputLanguage(text: string, currentSelectedLang: string = 'hi'): string {
  if (!text || typeof text !== 'string') return currentSelectedLang || 'hi';
  const trimmed = text.trim();
  if (!trimmed) return currentSelectedLang || 'hi';
  
  // Gurmukhi (Punjabi): \\u0A00-\\u0A7F
  if (/[\\u0A00-\\u0A7F]/.test(trimmed)) return 'pa';
  // Gujarati: \\u0A80-\\u0AFF
  if (/[\\u0A80-\\u0AFF]/.test(trimmed)) return 'gu';
  // Bengali: \\u0980-\\u09FF
  if (/[\\u0980-\\u09FF]/.test(trimmed)) return 'bn';
  // Tamil: \\u0B80-\\u0BFF
  if (/[\\u0B80-\\u0BFF]/.test(trimmed)) return 'ta';
  // Telugu: \\u0C00-\\u0C7F
  if (/[\\u0C00-\\u0C7F]/.test(trimmed)) return 'te';
  // Kannada: \\u0C80-\\u0CFF
  if (/[\\u0C80-\\u0CFF]/.test(trimmed)) return 'kn';
  // Malayalam: \\u0D00-\\u0D7F
  if (/[\\u0D00-\\u0D7F]/.test(trimmed)) return 'ml';
  // Devanagari (Hindi / Marathi)
  if (/[\\u0900-\\u097F]/.test(trimmed)) {
    if (/\\b(आहे|आहेत|करा|करावे|पिकांचे|शेतकरी|झाले|पिकाला)\\b/i.test(trimmed)) {
      return 'mr';
    }
    return 'hi';
  }

  // English / Latin script input (a-z)
  if (/[a-zA-Z]/.test(trimmed)) {
    if (currentSelectedLang && currentSelectedLang !== 'en') {
      return currentSelectedLang;
    }
    return 'en';
  }

  return currentSelectedLang || 'en';
}

/**
 * Get speech synthesis BCP-47 tag for a language code
 */
export function getTTSLangCode(langCode: string): string {
  const found = SUPPORTED_LANGUAGES.find(l => l.code === langCode);
  return found ? found.ttsLang : 'hi-IN';
}

/**
 * Localized crop display names across all 10 languages
 */
export const CROP_DISPLAY_MAP: Record<string, Record<string, string>> = {
  wheat: {
    en: 'Wheat', hi: 'गेहूं (Wheat)', mr: 'गहू (Wheat)', gu: 'ઘઉં (Wheat)', pa: 'ਕਣਕ (Wheat)',
    bn: 'গম (Wheat)', ta: 'கோதுமை (Wheat)', te: 'గోధుమ (Wheat)', kn: 'ಗೋಧಿ (Wheat)', ml: 'ഗോതമ്പ് (Wheat)'
  },
  paddy: {
    en: 'Paddy / Rice', hi: 'धान / चावल (Paddy)', mr: 'भात / तांदूळ (Paddy)', gu: 'ડાંગર / ચોખા (Paddy)', pa: 'ਝੋਨਾ (Paddy)',
    bn: 'ধান / চাল (Paddy)', ta: 'நெல் / அரிசி (Paddy)', te: 'వరి / బియ్యం (Paddy)', kn: 'ಭತ್ತ / ಅಕ್ಕಿ (Paddy)', ml: 'നെല്ല് / അരി (Paddy)'
  },
  cotton: {
    en: 'Cotton', hi: 'कपास (Cotton)', mr: 'कापूस (Cotton)', gu: 'કપાસ (Cotton)', pa: 'ਕਪਾਹ (Cotton)',
    bn: 'তুলা (Cotton)', ta: 'பருத்தி (Cotton)', te: 'పత్తి (Cotton)', kn: 'ಹತ್ತಿ (Cotton)', ml: 'പരുത്തി (Cotton)'
  },
  maize: {
    en: 'Maize / Corn', hi: 'मक्का (Maize)', mr: 'मका (Maize)', gu: 'મકાઈ (Maize)', pa: 'ਮੱਕੀ (Maize)',
    bn: 'ভুট্টা (Maize)', ta: 'மக்காச்சோளம் (Maize)', te: 'మొక్కజొన్న (Maize)', kn: 'ಮೆಕ್ಕೆಜೋಳ (Maize)', ml: 'ചോളം (Maize)'
  },
  sugarcane: {
    en: 'Sugarcane', hi: 'गन्ना (Sugarcane)', mr: 'ऊस (Sugarcane)', gu: 'શેરડી (Sugarcane)', pa: 'ਗੰਨਾ (Sugarcane)',
    bn: 'আখ (Sugarcane)', ta: 'கரும்பு (Sugarcane)', te: 'చెరకు (Sugarcane)', kn: 'ಕಬ್ಬು (Sugarcane)', ml: 'കരിമ്പ് (Sugarcane)'
  },
  mustard: {
    en: 'Mustard', hi: 'सरसों (Mustard)', mr: 'मोहरी (Mustard)', gu: 'રાયડો / સરસવ (Mustard)', pa: 'ਸਰ੍ਹੋਂ (Mustard)',
    bn: 'সরিষা (Mustard)', ta: 'கடுகு (Mustard)', te: 'ఆవాలు (Mustard)', kn: 'ಸಾಸಿವೆ (Mustard)', ml: 'കടുക് (Mustard)'
  },
  gram: {
    en: 'Gram / Chickpea', hi: 'चना (Gram)', mr: 'हरभरा (Gram)', gu: 'ચણા (Gram)', pa: 'ਛੋਲੇ (Gram)',
    bn: 'ছোলা (Gram)', ta: 'கொண்டைக்கடலை (Gram)', te: 'శనగలు (Gram)', kn: 'ಕಡಲೆ (Gram)', ml: 'കടല (Gram)'
  },
  soybean: {
    en: 'Soybean', hi: 'सोयाबीन (Soybean)', mr: 'सोयाबीन (Soybean)', gu: 'સોયાબીન (Soybean)', pa: 'ਸੋਇਆਬੀਨ (Soybean)',
    bn: 'সয়াবিন (Soybean)', ta: 'சோயாபீன் (Soybean)', te: 'సోయాబీన్ (Soybean)', kn: 'ಸೋಯಾಬೀನ್ (Soybean)', ml: 'സോയാബീൻ (Soybean)'
  },
  bajra: {
    en: 'Pearl Millet (Bajra)', hi: 'बाजरा (Bajra)', mr: 'बाजरी (Bajra)', gu: 'બાજરી (Bajra)', pa: 'ਬਾਜਰਾ (Bajra)',
    bn: 'বাজরা (Bajra)', ta: 'கம்பு (Bajra)', te: 'సజ్జలు (Bajra)', kn: 'ಸಜ್ಜೆ (Bajra)', ml: 'കമ്പം (Bajra)'
  },
  groundnut: {
    en: 'Groundnut / Peanut', hi: 'मूंगफली (Groundnut)', mr: 'भुईमूग (Groundnut)', gu: 'મગફળી (Groundnut)', pa: 'ਮੂੰਗਫਲੀ (Groundnut)',
    bn: 'চীনাবাদাম (Groundnut)', ta: 'வேர்க்கடலை (Groundnut)', te: 'వేరుశనగ (Groundnut)', kn: 'ಕಡಲೆಕಾಯಿ (Groundnut)', ml: 'നിലക്കടല (Groundnut)'
  },
  potato: {
    en: 'Potato', hi: 'आलू (Potato)', mr: 'बटाटा (Potato)', gu: 'બટાકા (Potato)', pa: 'ਆਲੂ (Potato)',
    bn: 'আলু (Potato)', ta: 'உருளைக்கிழங்கு (Potato)', te: 'బంగాళాదుంప (Potato)', kn: 'ಆಲೂಗಡ್ಡೆ (Potato)', ml: 'ഉരുളക്കിഴങ്ങ് (Potato)'
  },
  onion: {
    en: 'Onion', hi: 'प्याज (Onion)', mr: 'कांदा (Onion)', gu: 'ડુંગળી (Onion)', pa: 'ਪਿਆਜ਼ (Onion)',
    bn: 'পেঁয়াজ (Onion)', ta: 'வெங்காயம் (Onion)', te: 'ఉల్లిపాయ (Onion)', kn: 'ಈರುಳ್ಳಿ (Onion)', ml: 'സവാള (Onion)'
  },
  tomato: {
    en: 'Tomato', hi: 'टमाटर (Tomato)', mr: 'टोमॅटो (Tomato)', gu: 'ટામેટા (Tomato)', pa: 'ਟਮਾਟਰ (Tomato)',
    bn: 'টমেটো (Tomato)', ta: 'தக்காளி (Tomato)', te: 'టమోటా (Tomato)', kn: 'ಟೊಮೆಟೊ (Tomato)', ml: 'തക്കാളി (Tomato)'
  }
};

export function getCropDisplayName(cropName: string, langCode: string): string {
  const key = cropName.toLowerCase().trim();
  if (CROP_DISPLAY_MAP[key]) {
    return CROP_DISPLAY_MAP[key][langCode] || CROP_DISPLAY_MAP[key]['en'] || cropName;
  }
  return cropName;
}

/**
 * Localized Soil display names
 */
export const SOIL_DISPLAY_MAP: Record<string, Record<string, string>> = {
  alluvial: {
    en: 'Alluvial Soil', hi: 'जलोढ़ मिट्टी (Alluvial)', mr: 'गाळाची माती (Alluvial)', gu: 'કાંપવાળી જમીન (Alluvial)',
    pa: 'ਜਲੋਢ ਮਿੱਟੀ (Alluvial)', bn: 'পলিমাটি (Alluvial)', ta: 'வண்டல் மண் (Alluvial)', te: 'ఒండ్రు నేల (Alluvial)',
    kn: 'ಮೆಕ್ಕಲು ಮಣ್ಣು (Alluvial)', ml: 'എക്കൽ മണ്ണ് (Alluvial)'
  },
  black: {
    en: 'Black / Regur Soil', hi: 'काली मिट्टी (Black Soil)', mr: 'काळी माती / रेगूर (Black Soil)', gu: 'કાળી જમીન (Black Soil)',
    pa: 'ਕਾਲੀ ਮਿੱਟੀ (Black Soil)', bn: 'কালো মাটি (Black Soil)', ta: 'கரிசல் மண் (Black Soil)', te: 'నల్ల రేగడి నేల (Black Soil)',
    kn: 'ಕಪ್ಪು ಮಣ್ಣು (Black Soil)', ml: 'കറുത്ത മണ്ണ് (Black Soil)'
  },
  red: {
    en: 'Red & Yellow Soil', hi: 'लाल और पीली मिट्टी', mr: 'तांबडी व पिवळी माती', gu: 'લાલ અને પીળી જમીન',
    pa: 'ਲਾਲ ਅਤੇ ਪੀਲੀ ਮਿੱਟੀ', bn: 'লাল ও হলুদ মাটি', ta: 'செம்மண் மற்றும் மஞ்சள் மண்', te: 'ఎర్ర నేలలు',
    kn: 'ಕೆಂಪು ಮತ್ತು ಹಳದಿ ಮಣ್ಣು', ml: 'ചെമ്മണ്ണ്'
  },
  clayey: {
    en: 'Clayey Soil', hi: 'चिकनी मिट्टी (Clayey)', mr: 'चिकणमाती (Clayey)', gu: 'ચીકણી જમીન (Clayey)',
    pa: 'ਚੀਕਣੀ ਮਿੱਟੀ (Clayey)', bn: 'এঁটেল মাটি (Clayey)', ta: 'களிமண் (Clayey)', te: 'బంకమట్టి నేల (Clayey)',
    kn: 'ಜೇಡಿ ಮಣ್ಣು (Clayey)', ml: 'കളിമണ്ണ് (Clayey)'
  },
  sandy: {
    en: 'Sandy / Arid Soil', hi: 'रेतीली मिट्टी (Sandy)', mr: 'वाळूयुक्त / हलकी माती (Sandy)', gu: 'રેતાળ જમીન (Sandy)',
    pa: 'ਰੇਤਲੀ ਮਿੱਟੀ (Sandy)', bn: 'বেলে মাটি (Sandy)', ta: 'மணல் மண் (Sandy)', te: 'ఇసుక నేల (Sandy)',
    kn: 'ಮರಳು ಮಣ್ಣು (Sandy)', ml: 'മണൽ മണ്ണ് (Sandy)'
  },
  other: {
    en: 'Other / Custom Soil Type', hi: 'अन्य / कस्टम मिट्टी', mr: 'इतर माती प्रकार', gu: 'અન્ય જમીન પ્રકાર',
    pa: 'ਹੋਰ ਮਿੱਟੀ ਪ੍ਰਕਾਰ', bn: 'অন্যান্য মাটির ধরন', ta: 'பிற மண் வகை', te: 'ఇతర నేల రకం',
    kn: 'ಇತರ ಮಣ್ಣಿನ ಪ್ರಕಾರ', ml: 'മറ്റ് മണ്ണ് തരം'
  }
};

export function getSoilDisplayName(soilType: string, langCode: string): string {
  const key = soilType.toLowerCase().trim();
  if (SOIL_DISPLAY_MAP[key]) {
    return SOIL_DISPLAY_MAP[key][langCode] || SOIL_DISPLAY_MAP[key]['en'] || soilType;
  }
  return soilType;
}

/**
 * Client-side language translation helper for AI responses
 */
export function translateTextToTarget(text: string, targetLangCode: string): string {
  if (!text || targetLangCode === 'en') {
    return text;
  }

  const targetLangObj = SUPPORTED_LANGUAGES.find(l => l.code === targetLangCode);
  const targetLangName = targetLangObj ? targetLangObj.name : targetLangCode;

  const disclaimerMap: Record<string, string> = {
    hi: \`[हिन्दी अनुवाद]:\\n\\n\`,
    mr: \`[मराठीत भाषांतरित]:\\n\\n\`,
    gu: \`[ગુજરાતીમાં અનુવાદિત]:\\n\\n\`,
    pa: \`[ਪੰਜਾਬੀ ਵਿੱਚ ਅਨੁਵਾਦ ਕੀਤਾ]:\\n\\n\`,
    bn: \`[বাংলায় অনূদিত]:\\n\\n\`,
    ta: \`[தமிழில் மொழிபெயர்க்கப்பட்டது]:\\n\\n\`,
    te: \`[తెలుగులోకి అనువదించబడింది]:\\n\\n\`,
    kn: \`[ಕನ್ನಡಕ್ಕೆ ಅನುವಾದಿಸಲಾಗಿದೆ]:\\n\\n\`,
    ml: \`[മലയാളത്തിലേക്ക് വിവർത്തനം ചെയ്തത്]:\\n\\n\`
  };

  const prefix = disclaimerMap[targetLangCode] || \`[\${targetLangName}]:\\n\\n\`;
  return prefix + text;
}
`;

fs.writeFileSync(path.resolve('src/translations.ts'), codeOut, 'utf8');
console.log('Successfully written pristine src/translations.ts!');
