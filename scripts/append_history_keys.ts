import fs from 'fs';
import { UI_TRANSLATIONS } from '../src/translations';

const extra: Record<string, Record<string, string>> = {
  en: {
    history_archived_sub: "Archived crop diagnoses, scientific recommendations & farmer advisories",
    history_empty_instruction: "Your diagnostic scans and question histories will automatically appear here.",
    history_view_details_open: "Active • Open",
    history_view_details_arrow: "View Details →",
    history_select_left_desc: "Click on any archived record from the left list to view complete scientific findings, dosages, and action steps.",
    home_search_placeholder: "Ex: 50 quintal wheat price or yellow leaf in paddy",
    action_voice_input_tip: "Press mic to ask questions or specify crop name and quantity."
  },
  hi: {
    history_archived_sub: "पूर्व फसल जांच, वैज्ञानिक सिफारिशें एवं विशेषज्ञ परामर्श का सुरक्षित रिकॉर्ड",
    history_empty_instruction: "आपकी फसल रोग जांच और सलाह रिपोर्ट का इतिहास यहां सुरक्षित रूप से दिखाई देगा।",
    history_view_details_open: "सक्रिय • खुला हुआ",
    history_view_details_arrow: "विवरण देखें →",
    history_select_left_desc: "पूर्ण वैज्ञानिक निष्कर्ष, दवाई की खुराक एवं सिफारिशें देखने के लिए बाईं सूची से किसी भी रिपोर्ट पर क्लिक करें।",
    home_search_placeholder: "उदा: 50 क्विंटल गेहूं का भाव या धान में तना छेदक",
    action_voice_input_tip: "माइक दबाकर सवाल पूछें या फ़सल का नाम व मात्रा बताएं।"
  },
  mr: {
    history_archived_sub: "मागील पीक तपासणी, वैज्ञानिक शिफारसी व तज्ज्ञ सल्ल्यांचा सुरक्षित रेकॉर्ड",
    history_empty_instruction: "तुमचे पीक रोग निदान व प्रश्न विचारल्याचा इतिहास येथे आपोआप सुरक्षित दिसेल.",
    history_view_details_open: "सक्रिय • उघडलेले",
    history_view_details_arrow: "तपशील पहा →",
    history_select_left_desc: "संपूर्ण वैज्ञानिक निष्कर्ष, औषधांचे प्रमाण व उपाय पाहण्यासाठी डाव्या यादीतील कोणत्याही अहवालावर क्लिक करा.",
    home_search_placeholder: "उदा: ५० क्विंटल गव्हाचा भाव किंवा भातातील खोडकिडा",
    action_voice_input_tip: "माइक दाबून प्रश्न विचारा किंवा पिकाचे नाव व प्रमाण सांगा."
  },
  gu: {
    history_archived_sub: "પાછલા પાક નિદાન, વૈજ્ઞાનિક ભલામણો અને નિષ્ણાત સલાહનો સુરક્ષિત રેકોર્ડ",
    history_empty_instruction: "તમારો પાક રોગ નિદાન અને પ્રશ્નોત્તરીનો ઇતિહાસ અહીં આપોઆપ સુરક્ષિત દેખાશે.",
    history_view_details_open: "સક્રિય • ખુલ્લું",
    history_view_details_arrow: "વિગતો જુઓ →",
    history_select_left_desc: "સંપૂર્ણ વૈજ્ઞાનિક તારણો, દવાનો જથ્થો અને પગલાં જોવા માટે ડાબી બાજુની યાદીમાંથી કોઈપણ રિપોર્ટ પર ક્લિક કરો.",
    home_search_placeholder: "દા.ત.: ૫૦ ક્વિન્ટલ ઘઉંનો ભાવ અથવા ડાંગરમાં ગાભમારાની ઈયળ",
    action_voice_input_tip: "માઇક દબાવીને પ્રશ્ન પૂછો અથવા પાકનું નામ અને જથ્થો જણાવો."
  },
  pa: {
    history_archived_sub: "ਪਿਛਲੀ ਫ਼ਸਲ ਜਾਂਚ, ਵਿਗਿਆਨਕ ਸਿਫ਼ਾਰਸ਼ਾਂ ਅਤੇ ਮਾਹਿਰਾਂ ਦੀ ਸਲਾਹ ਦਾ ਸੁਰੱਖਿਅਤ ਰਿਕਾਰਡ",
    history_empty_instruction: "ਤੁਹਾਡੀ ਫ਼ਸਲ ਬਿਮਾਰੀ ਜਾਂਚ ਅਤੇ ਸਵਾਲਾਂ ਦਾ ਇਤਿਹਾਸ ਇੱਥੇ ਆਪਣੇ ਆਪ ਦਿਖਾਈ ਦੇਵੇਗਾ।",
    history_view_details_open: "ਸਰਗਰਮ • ਖੁੱਲ੍ਹਾ",
    history_view_details_arrow: "ਵੇਰਵੇ ਦੇਖੋ →",
    history_select_left_desc: "ਪੂਰੇ ਵਿਗਿਆਨਕ ਸਿੱਟੇ, ਦਵਾਈ ਦੀ ਖ਼ੁਰਾਕ ਅਤੇ ਉਪਾਅ ਦੇਖਣ ਲਈ ਖੱਬੀ ਸੂਚੀ ਵਿੱਚੋਂ ਕਿਸੇ ਵੀ ਰਿਪੋਰਟ ਤੇ ਕਲਿੱਕ ਕਰੋ।",
    home_search_placeholder: "ਉਦਾ: 50 ਕੁਇੰਟਲ ਕਣਕ ਦਾ ਭਾਅ ਜਾਂ ਝੋਨੇ ਵਿੱਚ ਤਣਾ ਛੇਦਕ",
    action_voice_input_tip: "ਮਾਈਕ ਦਬਾ ਕੇ ਸਵਾਲ ਪੁੱਛੋ ਜਾਂ ਫ਼ਸਲ ਦਾ ਨਾਮ ਅਤੇ ਮਾਤਰਾ ਦੱਸੋ।"
  },
  bn: {
    history_archived_sub: "পূর্ববর্তী ফসল রোগ নির্ণয়, বৈজ্ঞানিক সুপারিশ ও বিশেষজ্ঞ পরামর্শের সুরক্ষিত রেকর্ড",
    history_empty_instruction: "আপনার ফসলের রোগ নির্ণয় ও পরামর্শের ইতিহাস এখানে স্বয়ংক্রিয়ভাবে প্রদর্শিত হবে।",
    history_view_details_open: "সক্রিয় • উন্মুক্ত",
    history_view_details_arrow: "বিস্তারিত দেখুন →",
    history_select_left_desc: "সম্পূর্ণ বৈজ্ঞানিক ফলাফল, ওষুধের মাত্রা ও পদক্ষেপ দেখার জন্য বাম দিকের তালিকা থেকে যেকোনো রিপোর্টে ক্লিক করুন।",
    home_search_placeholder: "উদা: ৫০ কুইন্টাল গমের দাম বা ধানে মাজরা পোকা",
    action_voice_input_tip: "মাইক চেপে প্রশ্ন করুন বা ফসলের নাম ও পরিমাণ বলুন।"
  },
  ta: {
    history_archived_sub: "முந்தைய பயிர் பரிசோதனை, அறிவியல் பரிந்துரைகள் மற்றும் விவசாய ஆலோசனைகளின் பாதுகாப்பான பதிவு",
    history_empty_instruction: "உங்கள் பயிர் நோய் கண்டறிதல் மற்றும் கேள்வி வரலாறு இங்கே தானாகவே தோன்றும்.",
    history_view_details_open: "செயலில் • திறக்கப்பட்டது",
    history_view_details_arrow: "விவரங்களைப் பார்க்க →",
    history_select_left_desc: "முழுமையான அறிவியல் முடிவுகள், மருந்தின் அளவு மற்றும் செயல்முறைகளைக் காண இடது பட்டியலிலிருந்து ஏதேனும் அறிக்கையைக் கிளிக் செய்க.",
    home_search_placeholder: "எ.கா: 50 குவிண்டால் கோதுமை விலை அல்லது நெல்லில் தண்டு துளைப்பான்",
    action_voice_input_tip: "மைக்கை அழுத்தி கேள்வி கேளுங்கள் அல்லது பயிர் பெயர் மற்றும் அளவைக் கூறுங்கள்."
  },
  te: {
    history_archived_sub: "గత పంట పరీక్షలు, శాస్త్రీయ సిఫార్సులు మరియు నిపుణుల సలహాల సురక్షిత రికార్డు",
    history_empty_instruction: "మీ పంట తెగులు నిర్ధారణ మరియు ప్రశ్నల చరిత్ర ఇక్కడ స్వయంచాలకంగా కనిపిస్తుంది.",
    history_view_details_open: "యాక్టివ్ • తెరవబడింది",
    history_view_details_arrow: "వివరాలు చూడండి →",
    history_select_left_desc: "పూర్తి శాస్త్రీయ వివరాలు, మందుల మోతాదు మరియు చర్యలను చూడటానికి ఎడమ జాబితా నుండి ఏదైనా నివేదికపై క్లిక్ చేయండి.",
    home_search_placeholder: "ఉదా: 50 క్వింటాళ్ల గోధుమ ధర లేదా వరిలో కాండం తొలుచు పురుగు",
    action_voice_input_tip: "మైక్ నొక్కి ప్రశ్న అడగండి లేదా పంట పేరు మరియు పరిమాణం చెప్పండి."
  },
  kn: {
    history_archived_sub: "ಹಿಂದಿನ ಬೆಳೆ ರೋಗ ತಪಾಸಣೆ, ವೈಜ್ಞಾನಿಕ ಶಿಫಾರಸುಗಳು ಮತ್ತು ಕೃಷಿ ಸಲಹೆಗಳ ಸುರಕ್ಷಿತ ದಾಖಲೆ",
    history_empty_instruction: "ನಿಮ್ಮ ಬೆಳೆ ರೋಗ ತಪಾಸಣೆ ಮತ್ತು ಪ್ರಶ್ನೆಗಳ ಇತಿಹಾಸವು ಇಲ್ಲಿ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಗೋಚರಿಸುತ್ತದೆ.",
    history_view_details_open: "ಸಕ್ರಿಯ • ತೆರೆದಿದೆ",
    history_view_details_arrow: "ವಿವರಗಳನ್ನು ನೋಡಿ →",
    history_select_left_desc: "ಸಂಪೂರ್ಣ ವೈಜ್ಞಾನಿಕ ವಿವರಗಳು, ಔಷಧಿ ಪ್ರಮಾಣ ಮತ್ತು ಕ್ರಮಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಎಡ ಪಟ್ಟಿಯಿಂದ ಯಾವುದೇ ವರದಿಯನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ.",
    home_search_placeholder: "ಉದಾ: 50 ಕ್ವಿಂಟಾಲ್ ಗೋಧಿ ದರ ಅಥವಾ ಭತ್ತದಲ್ಲಿ ಕಾಂಡಕೊರಕ",
    action_voice_input_tip: "ಮೈಕ್ ಒತ್ತಿ ಪ್ರಶ್ನೆ ಕೇಳಿ ಅಥವಾ ಬೆಳೆಯ ಹೆಸರು ಮತ್ತು ಪ್ರಮಾಣ ತಿಳಿಸಿ."
  },
  ml: {
    history_archived_sub: "മുൻകാല വിള പരിശോധന, ശാസ്ത്രീയ നിർദ്ദേശങ്ങൾ, വിദഗ്ദ്ധോപദേശങ്ങൾ എന്നിവയുടെ സുരക്ഷിത രേഖ",
    history_empty_instruction: "നിങ്ങളുടെ വിള രോഗനിർണ്ണയവും ചോദ്യ ചരിത്രവും ഇവിടെ സ്വയമേവ ദൃശ്യമാകും.",
    history_view_details_open: "സജീവം • തുറന്നത്",
    history_view_details_arrow: "വിശദാംശങ്ങൾ കാണുക →",
    history_select_left_desc: "പൂർണ്ണ ശാസ്ത്രീയ കണ്ടെത്തലുകൾ, മരുന്നിന്റെ അളവ്, തുടർനടപടികൾ എന്നിവ കാണാൻ ഇടത് ലിസ്റ്റിൽ നിന്ന് ഏതെങ്കിലും റിപ്പോർട്ടിൽ ക്ലിക്ക് ചെയ്യുക.",
    home_search_placeholder: "ഉദാ: 50 ക്വിന്റൽ ഗോതമ്പിന്റെ വില അല്ലെങ്കിൽ നെല്ലിലെ തണ്ടുതുരപ്പൻ",
    action_voice_input_tip: "മൈക്ക് അമർത്തി ചോദ്യം ചോദിക്കുക അല്ലെങ്കിൽ വിളയുടെ പേരും അളവും പറയുക."
  }
};

for (const lang of Object.keys(UI_TRANSLATIONS)) {
  if (extra[lang]) {
    for (const [k, v] of Object.entries(extra[lang])) {
      UI_TRANSLATIONS[lang][k] = v;
    }
  }
}

// Read current translations.ts and replace UI_TRANSLATIONS object
const code = fs.readFileSync('src/translations.ts', 'utf8');
const startTag = 'export const UI_TRANSLATIONS: Record<string, Record<string, string>> = ';
const endTag = ';\n\n/**\n * Safely retrieve localized UI strings';

const idxStart = code.indexOf(startTag);
const idxEnd = code.indexOf(endTag);

if (idxStart !== -1 && idxEnd !== -1) {
  const newCode = code.substring(0, idxStart + startTag.length) +
    JSON.stringify(UI_TRANSLATIONS, null, 2) +
    code.substring(idxEnd);
  fs.writeFileSync('src/translations.ts', newCode, 'utf8');
  console.log('Successfully appended history & prompt keys to src/translations.ts');
} else {
  console.error('Could not find markers in src/translations.ts');
}
