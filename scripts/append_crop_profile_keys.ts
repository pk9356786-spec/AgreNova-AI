import fs from 'fs';
import { UI_TRANSLATIONS } from '../src/translations';

const extraBatch: Record<string, Record<string, string>> = {
  en: {
    treatment_plan_title: "Recommended Treatment Plan (Organic & Chemical)",
    uncertainty_guidance_title: "Uncertainty Guidance & Next Steps",
    uncertainty_guidance_desc: "Leaf lighting, angle, or mixed symptoms may affect diagnosis accuracy. We recommend:",
    retake_daylight_hint: "Retake in daylight from 6-10 inches",
    gps_not_supported: "GPS not supported on this device. Please select state and district below.",
    location_coords_fetched: "Location coordinates fetched. Please verify district below.",
    location_perm_denied: "Location permission denied. Please choose your state & district from the dropdowns below.",
    gps_unable_reach: "Unable to reach GPS. You can manually select your location below."
  },
  hi: {
    treatment_plan_title: "अनुशंसित उपचार विधियां (जैविक एवं रासायनिक)",
    uncertainty_guidance_title: "अनिश्चितता की स्थिति में स्पष्टीकरण एवं अगले कदम",
    uncertainty_guidance_desc: "पत्ती पर छाया, कैमरे के हिलने या लक्षण मिश्रित होने पर सटीकता प्रभावित हो सकती है। बेहतर परिणाम के लिए:",
    retake_daylight_hint: "दिन की धूप में 6-10 इंच से साफ़ फोटो लें",
    gps_not_supported: "इस डिवाइस में GPS समर्थित नहीं है। कृपया नीचे से राज्य व जिला चुनें।",
    location_coords_fetched: "स्थान निर्देशांक प्राप्त हुए। कृपया नीचे से अपना जिला सुनिश्चित करें।",
    location_perm_denied: "स्थान अनुमति नहीं मिली — कृपया नीचे दिए गए ड्रॉपडाउन से अपना राज्य और जिला चुनें।",
    gps_unable_reach: "GPS से संपर्क नहीं हो सका। आप नीचे से मैन्युअल अपना स्थान चुन सकते हैं।"
  },
  mr: {
    treatment_plan_title: "शिफारस केलेल्या उपचार पद्धती (सेंद्रिय व रासायनिक)",
    uncertainty_guidance_title: "अस्पष्टतेच्या बाबतीत मार्गदर्शन व पुढील पावले",
    uncertainty_guidance_desc: "पानावरील प्रकाश किंवा लक्षणे मिश्र असल्यामुळे अचूकतेवर परिणाम होऊ शकतो. शिफारस:",
    retake_daylight_hint: "दिवसाच्या प्रकाशात 6-10 इंच अंतरावरून स्पष्ट फोटो घ्या",
    gps_not_supported: "या डिव्हाइसवर GPS समर्थित नाही. कृपया खाली राज्य व जिल्हा निवडा.",
    location_coords_fetched: "स्थान प्राप्त झाले. कृपया खाली तुमचा जिल्हा तपासा.",
    location_perm_denied: "स्थान परवानगी नाकारली. कृपया खालील यादीतून राज्य आणि जिल्हा निवडा.",
    gps_unable_reach: "GPS शी संपर्क होऊ शकला नाही. आपण खाली व्यक्तिचलितपणे निवडू शकता."
  },
  gu: {
    treatment_plan_title: "ભલામણ કરેલ ઉપચાર પદ્ધતિઓ (જૈવિક અને રાસાયણિક)",
    uncertainty_guidance_title: "અનિશ્ચિતતાની સ્થિતિમાં માર્ગદર્શન અને આગળના પગલાં",
    uncertainty_guidance_desc: "પાંદડા પર પ્રકાશ અથવા મિશ્ર લક્ષણોને કારણે સચોટતા પર અસર પડી શકે છે. ભલામણ:",
    retake_daylight_hint: "દિવસના અજવાળામાં 6-10 ઇંચથી સ્પષ્ટ ફોટો લો",
    gps_not_supported: "આ ઉપકરણમાં GPS સપોર્ટેડ નથી. કૃપા કરીને નીચેથી રાજ્ય અને જિલ્લો પસંદ કરો.",
    location_coords_fetched: "સ્થાન મળ્યું છે. કૃપા કરીને નીચે તમારો જિલ્લો ચકાસો.",
    location_perm_denied: "સ્થાન પરવાનગી નકારી. કૃપા કરીને નીચેથી તમારું રાજ્ય અને જિલ્લો પસંદ કરો.",
    gps_unable_reach: "GPS સંપર્ક થઈ શક્યો નથી. તમે જાતે સ્થાન પસંદ કરી શકો છો."
  },
  pa: {
    treatment_plan_title: "ਸਿਫਾਰਸ਼ ਕੀਤੇ ਇਲਾਜ ਦੇ ਤਰੀਕੇ (ਜੈਵਿਕ ਅਤੇ ਰਸਾਇਣਕ)",
    uncertainty_guidance_title: "ਅਨਿਸ਼ਚਿਤਤਾ ਦੀ ਸਥਿਤੀ ਵਿੱਚ ਮਾਰਗਦਰਸ਼ਨ ਅਤੇ ਅਗਲੇ ਕਦਮ",
    uncertainty_guidance_desc: "ਪੱਤੇ 'ਤੇ ਰੌਸ਼ਨੀ ਜਾਂ ਮਿਸ਼ਰਤ ਲੱਛਣਾਂ ਕਾਰਨ ਸ਼ੁੱਧਤਾ ਪ੍ਰਭਾਵਿਤ ਹੋ ਸਕਦੀ ਹੈ। ਸਿਫਾਰਸ਼:",
    retake_daylight_hint: "ਦਿਨ ਦੀ ਧੁੱਪ ਵਿੱਚ 6-10 ਇੰਚ ਤੋਂ ਸਾਫ਼ ਫੋਟੋ ਲਵੋ",
    gps_not_supported: "ਇਸ ਡਿਵਾਈਸ 'ਤੇ GPS ਸਮਰਥਿਤ ਨਹੀਂ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਹੇਠਾਂ ਰਾਜ ਅਤੇ ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ।",
    location_coords_fetched: "ਸਥਾਨ ਦੇ ਨਿਰਦੇਸ਼ਾਂਕ ਪ੍ਰਾਪਤ ਹੋਏ। ਕਿਰਪਾ ਕਰਕੇ ਹੇਠਾਂ ਜ਼ਿਲ੍ਹੇ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ।",
    location_perm_denied: "ਸਥਾਨ ਆਗਿਆ ਅਸਵੀਕਾਰ ਕੀਤੀ ਗਈ। ਕਿਰਪਾ ਕਰਕੇ ਹੇਠਾਂ ਦਿੱਤੀ ਸੂਚੀ ਵਿੱਚੋਂ ਰਾਜ ਅਤੇ ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ।",
    gps_unable_reach: "GPS ਨਾਲ ਸੰਪਰਕ ਨਹੀਂ ਹੋ ਸਕਿਆ। ਤੁਸੀਂ ਹੇਠਾਂ ਆਪਣਾ ਸਥਾਨ ਚੁਣ ਸਕਦੇ ਹੋ।"
  },
  bn: {
    treatment_plan_title: "প্রস্তাবিত চিকিৎসা পদ্ধতি (জৈব এবং রাসায়নিক)",
    uncertainty_guidance_title: "অনিশ্চয়তার ক্ষেত্রে নির্দেশিকা ও পরবর্তী পদক্ষেপ",
    uncertainty_guidance_desc: "পাতায় আলো বা মিশ্র উপসর্গের কারণে নির্ভুলতা প্রভাবিত হতে পারে। পরামর্শ:",
    retake_daylight_hint: "দিনের আলোতে 6-10 ইঞ্চি দূর থেকে স্পষ্ট ছবি তুলুন",
    gps_not_supported: "এই ডিভাইসে GPS সমর্থিত নয়। অনুগ্রহ করে নিচে রাজ্য ও জেলা নির্বাচন করুন।",
    location_coords_fetched: "অবস্থানের স্থানাঙ্ক পাওয়া গেছে। অনুগ্রহ করে নিচে জেলা যাচাই করুন।",
    location_perm_denied: "অবস্থানের অনুমতি প্রত্যাখ্যাত হয়েছে। ড্রপডাউন থেকে রাজ্য ও জেলা নির্বাচন করুন।",
    gps_unable_reach: "GPS সংযোগ করা যায়নি। আপনি নিচে ম্যানুয়ালি নির্বাচন করতে পারেন।"
  },
  ta: {
    treatment_plan_title: "பரிந்துரைக்கப்பட்ட சிகிச்சை முறைகள் (இயற்கை & ரசாயன)",
    uncertainty_guidance_title: "நிச்சயமற்ற வழிகாட்டுதல் & அடுத்த படிகள்",
    uncertainty_guidance_desc: "இலையின் வெளிச்சம் அல்லது கலவையான அறிகுறிகள் துல்லியத்தை பாதிக்கலாம். பரிந்துரை:",
    retake_daylight_hint: "பகல் வெளிச்சத்தில் 6-10 அங்குல தூரத்திலிருந்து தெளிவான படம் எடுக்கவும்",
    gps_not_supported: "இந்த சாதனத்தில் GPS ஆதரிக்கப்படவில்லை. கீழே மாநிலம் மற்றும் மாவட்டத்தைத் தேர்ந்தெடுக்கவும்.",
    location_coords_fetched: "இருப்பிட ஆயத்தொலைவுகள் பெறப்பட்டன. கீழே உங்கள் மாவட்டத்தைச் சரிபார்க்கவும்.",
    location_perm_denied: "இருப்பிட அனுமதி மறுக்கப்பட்டது. கீழ்தோன்றலில் இருந்து மாநிலம் மற்றும் மாவட்டத்தைத் தேர்ந்தெடுக்கவும்.",
    gps_unable_reach: "GPS உடன் இணைக்க முடியவில்லை. கீழே நீங்களே தேர்வு செய்யலாம்."
  },
  te: {
    treatment_plan_title: "సిఫార్సు చేయబడిన నివారణ చర్యలు (సేంద్రీయ & రసాయన)",
    uncertainty_guidance_title: "సందేహం ఉన్న సందర్భంలో మార్గదర్శకత్వం & తదుపరి చర్యలు",
    uncertainty_guidance_desc: "ఆకులపై వెలుతురు లేదా మిశ్రమ లక్షణాల వల్ల ఖచ్చితత్వం మారవచ్చు. సిఫార్సు:",
    retake_daylight_hint: "పగటి వెలుగులో 6-10 అంగుళాల దూరం నుండి స్పష్టమైన ఫోటో తీయండి",
    gps_not_supported: "ఈ పరికరంలో GPS సపోర్ట్ లేదు. దయచేసి క్రింద రాష్ట్రం మరియు జిల్లాను ఎంచుకోండి.",
    location_coords_fetched: "లొకేషన్ కోఆర్డినేట్లు పొందబడ్డాయి. దయచేసి క్రింద మీ జిల్లాను సరిచూడండి.",
    location_perm_denied: "లొకేషన్ అనుమతి నిరాకరించబడింది. క్రింది జాబితా నుండి రాష్ట్రం & జిల్లాను ఎంచుకోండి.",
    gps_unable_reach: "GPS అందుబాటులో లేదు. మీరు క్రింద నేరుగా ఎంచుకోవచ్చు."
  },
  kn: {
    treatment_plan_title: "ಶಿಫಾರಸು ಮಾಡಲಾದ ಚಿಕಿತ್ಸಾ ವಿಧಾನಗಳು (ಸಾವಯವ ಮತ್ತು ರಾಸಾಯನಿಕ)",
    uncertainty_guidance_title: "ಅನಿಶ್ಚಿತತೆಯ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಮುಂದಿನ ಹಂತಗಳು",
    uncertainty_guidance_desc: "ಎಲೆಯ ಬೆಳಕು ಅಥವಾ ಮಿಶ್ರ ಲಕ್ಷಣಗಳಿಂದ ನಿಖರತೆ ಬದಲಾಗಬಹುದು. ಶಿಫಾರಸು:",
    retake_daylight_hint: "ಹಗಲು ಬೆಳಕಿನಲ್ಲಿ 6-10 ಇಂಚು ದೂರದಿಂದ ಸ್ಪಷ್ಟ ಫೋಟೋ ತೆಗೆಯಿರಿ",
    gps_not_supported: "ಈ ಸಾಧನದಲ್ಲಿ GPS ಬೆಂಬಲಿತವಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ಕೆಳಗೆ ರಾಜ್ಯ ಮತ್ತು ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    location_coords_fetched: "ಸ್ಥಳದ ನಿರ್ದೇಶಾಂಕಗಳು ದೊರೆತಿವೆ. ದಯವಿಟ್ಟು ಕೆಳಗೆ ನಿಮ್ಮ ಜಿಲ್ಲೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
    location_perm_denied: "ಸ್ಥಳದ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ. ದಯವಿಟ್ಟು ಕೆಳಗಿನಿಂದ ರಾಜ್ಯ ಮತ್ತು ಜಿಲ್ಲೆಯನ್ನು ಆರಿಸಿ.",
    gps_unable_reach: "GPS ತಲುಪಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ. ನೀವು ಕೆಳಗೆ ಹಸ್ತಚಾಲಿತವಾಗಿ ಆಯ್ಕೆ ಮಾಡಬಹುದು."
  },
  ml: {
    treatment_plan_title: "ശുപാർശ ചെയ്യുന്ന ചികിത്സാ രീതികൾ (ജൈവവും രാസപരവും)",
    uncertainty_guidance_title: "അനിശ്ചിതത്വ മാർഗ്ഗനിർദ്ദേശവും അടുത്ത ഘട്ടങ്ങളും",
    uncertainty_guidance_desc: "ഇലയിലെ വെളിച്ചം അല്ലെങ്കിൽ സമ്മിശ്ര ലക്ഷണങ്ങൾ കൃത്യതയെ ബാധിച്ചേക്കാം. ശുപാർശ:",
    retake_daylight_hint: "പകൽ വെളിച്ചത്തിൽ 6-10 ഇഞ്ച് അകലെ നിന്ന് വ്യക്തമായ ഫോട്ടോ എടുക്കുക",
    gps_not_supported: "ഈ ഉപകരണത്തിൽ GPS ലഭ്യമല്ല. ദയവായി താഴെ സംസ്ഥാനവും ജില്ലയും തിരഞ്ഞെടുക്കുക.",
    location_coords_fetched: "ലൊക്കേഷൻ നിർദ്ദേശാങ്കങ്ങൾ ലഭിച്ചു. ദയവായി താഴെ നിങ്ങളുടെ ജില്ല പരിശോധിക്കുക.",
    location_perm_denied: "ലൊക്കേഷൻ അനുമതി നിഷേധിച്ചു. താഴെ ഡ്രോപ്പ്ഡൗണിൽ നിന്ന് സംസ്ഥാനവും ജില്ലയും തിരഞ്ഞെടുക്കുക.",
    gps_unable_reach: "GPS ബന്ധിപ്പിക്കാനായില്ല. നിങ്ങൾക്ക് താഴെ നേരിട്ട് തിരഞ്ഞെടുക്കാം."
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
`;

fs.writeFileSync('src/translations.ts', content, 'utf8');
console.log('Appended crop & profile keys successfully.');
