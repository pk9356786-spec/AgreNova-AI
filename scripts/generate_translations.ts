/**
 * Complete, authentic translations generator for all 10 languages:
 * en (English), hi (हिन्दी), mr (मराठी), gu (ગુજરાતી), pa (ਪੰਜਾਬੀ),
 * bn (বাংলা), ta (தமிழ்), te (తెలుగు), kn (ಕನ್ನಡ), ml (മലയാളം)
 */

import fs from 'fs';
import { UI_TRANSLATIONS as existing } from '../src/translations';

// Dictionary of missing keys and full native scripts for all 10 languages
import { extraTranslations } from './translations_data';

const languages = ['hi', 'en', 'mr', 'gu', 'pa', 'bn', 'ta', 'te', 'kn', 'ml'];

const merged: Record<string, Record<string, string>> = {};

for (const lang of languages) {
  merged[lang] = {
    ...(existing[lang] || {}),
    ...(extraTranslations[lang] || {})
  };
}

// Verify that every single key present in hi exists in all other languages
const hiKeys = Object.keys(merged.hi);
console.log('Total hi keys:', hiKeys.length);

for (const lang of languages) {
  const currentKeys = Object.keys(merged[lang]);
  const missing = hiKeys.filter(k => !merged[lang][k]);
  if (missing.length > 0) {
    console.warn(`[WARN] Language ${lang} is missing ${missing.length} keys:`, missing);
  } else {
    console.log(`[OK] Language ${lang} has all ${currentKeys.length} keys.`);
  }
}
