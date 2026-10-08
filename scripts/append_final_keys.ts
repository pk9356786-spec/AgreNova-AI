import fs from 'fs';
import { UI_TRANSLATIONS } from '../src/translations';

const extraBatch: Record<string, Record<string, string>> = {
  en: {
    toast_weather_shared: "Weather forecast shared successfully!",
    toast_weather_copied: "Weather details copied to clipboard!",
    toast_profile_updated: "Farmer profile updated successfully!",
    speech_err_no_speech: "No voice detected. Please tap the microphone and speak again.",
    speech_err_permission: "Microphone permission denied. Please allow microphone access in your browser settings.",
    speech_err_network: "Network issue prevented speech capture. Please type your query in the box below.",
    speech_err_general: "Could not capture speech. Please speak again or type below.",
    speech_err_unsupported: "Voice recognition is not supported in this browser. Please type your query.",
    weather_unavailable_title: "Weather Data Temporarily Unavailable",
    weather_unavailable_sub: "Check network connectivity or tap retry below.",
    mandi_unavailable_title: "Official Mandi Data Currently Unavailable",
    mandi_records_updating: "Official market records are currently updating on Agmarknet or markets are closed today.",
    mandi_view_rate_btn: "View Rate"
  },
  hi: {
    toast_weather_shared: "मौसम पूर्वानुमान सफलतापूर्वक साझा किया गया!",
    toast_weather_copied: "मौसम विवरण क्लिपबोर्ड पर कॉपी किया गया!",
    toast_profile_updated: "किसान प्रोफ़ाइल सफलतापूर्वक सहेजी गई!",
    speech_err_no_speech: "आवाज़ सुनाई नहीं दी। कृपया माइक बटन दबाकर दोबारा बोलें।",
    speech_err_permission: "माइक्रोफ़ोन अनुमति अस्वीकृत। कृपया ब्राउज़र सेटिंग्स में माइक्रोफ़ोन की अनुमति दें।",
    speech_err_network: "नेटवर्क समस्या के कारण आवाज़ रिकॉर्ड नहीं हो सकी। कृपया नीचे दिए गए बॉक्स में टाइप करें।",
    speech_err_general: "बोलने में समस्या हुई। कृपया दोबारा बोलें या नीचे लिखकर पूछें।",
    speech_err_unsupported: "आपके ब्राउज़र में बोलकर बताने की सुविधा उपलब्ध नहीं है। कृपया टाइप करें।",
    weather_unavailable_title: "मौसम का डेटा अस्थायी रूप से अनुपलब्ध है",
    weather_unavailable_sub: "इंटरनेट कनेक्टिविटी जांचें या तुरंत पुनः प्रयास करें।",
    mandi_unavailable_title: "सरकारी मंडी डेटा वर्तमान में उपलब्ध नहीं है",
    mandi_records_updating: "आधिकारिक सरकारी Agmarknet रिकॉर्ड वर्तमान में अपडेट हो रहे हैं या आज मंडी बंद है।",
    mandi_view_rate_btn: "भाव देखें"
  },
  mr: {
    toast_weather_shared: "हवामान अंदाज यशस्वीरीत्या शेअर केला!",
    toast_weather_copied: "हवामान तपशील क्लिपबोर्डवर कॉपी केला!",
    toast_profile_updated: "शेतकरी प्रोफाइल यशस्वीरीत्या जतन केले!",
    speech_err_no_speech: "आवाज ऐकू आला नाही. कृपया माइक बटण दाबून पुन्हा बोला.",
    speech_err_permission: "मायक्रोफोन परवानगी नाकारली. कृपया ब्राऊझर सेटिंग्जमध्ये मायक्रोफोन सुरू करा.",
    speech_err_network: "नेटवर्क समस्येमुळे आवाज रेकॉर्ड झाला नाही. कृपया खाली टाइप करा.",
    speech_err_general: "बोलण्यात अडचण आली. कृपया पुन्हा बोला किंवा खाली टाइप करा.",
    speech_err_unsupported: "आपल्या ब्राउझरमध्ये व्हॉइस ओळख उपलब्ध नाही. कृपया टाइप करा.",
    weather_unavailable_title: "हवामान डेटा तात्पुरता उपलब्ध नाही",
    weather_unavailable_sub: "इंटरनेट तपासा किंवा पुन्हा प्रयत्न करा.",
    mandi_unavailable_title: "अधिकृत कृषी उत्पन्न बाजार समिती दर उपलब्ध नाही",
    mandi_records_updating: "सरकारी Agmarknet पोर्टलवर दर अपडेट होत आहेत किंवा आज बाजार बंद आहे.",
    mandi_view_rate_btn: "दर पाहा"
  },
  gu: {
    toast_weather_shared: "હવામાન આગાહી સફળતાપૂર્વક શેર કરી!",
    toast_weather_copied: "હવામાન વિગતો ક્લિપબોર્ડ પર કૉપિ કરી!",
    toast_profile_updated: "ખેડૂત પ્રોફાઇલ સફળતાપૂર્વક સાચવી!",
    speech_err_no_speech: "અવાજ સંભળાયો નથી. કૃપા કરીને માઇક બટન દબાવીને ફરીથી બોલો.",
    speech_err_permission: "માઇક્રોફોન પરવાનગી નકારી. કૃપા કરીને બ્રાઉઝર સેટિંગ્સમાં મંજૂરી આપો.",
    speech_err_network: "નેટવર્ક સમસ્યાને કારણે અવાજ રેકોર્ડ ન થઈ શક્યો. કૃપા કરીને નીચે લખો.",
    speech_err_general: "બોલવામાં સમસ્યા આવી. કૃપા કરીને ફરી પ્રયાસ કરો અથવા લખો.",
    speech_err_unsupported: "આ બ્રાઉઝરમાં અવાજ સુવિધા ઉપલબ્ધ નથી. કૃપા કરીને લખો.",
    weather_unavailable_title: "હવામાન માહિતી કામચલાઉ ઉપલબ્ધ નથી",
    weather_unavailable_sub: "ઇન્ટરનેટ કનેક્શન તપાસો અથવા ફરી પ્રયાસ કરો.",
    mandi_unavailable_title: "સરકારી બજાર ભાવ હાલ ઉપલબ્ધ નથી",
    mandi_records_updating: "સરકારી Agmarknet રેકોર્ડ અપડેટ થઈ રહ્યા છે અથવા આજે માર્કેટ યાર્ડ બંધ છે.",
    mandi_view_rate_btn: "ભાવ જુઓ"
  },
  pa: {
    toast_weather_shared: "ਮੌਸਮ ਦਾ ਅਨੁਮਾਨ ਸਫਲਤਾਪੂਰਵਕ ਸਾਂਝਾ ਕੀਤਾ ਗਿਆ!",
    toast_weather_copied: "ਮੌਸਮ ਦੇ ਵੇਰਵੇ ਕਲਿੱਪਬੋਰਡ 'ਤੇ ਕਾਪੀ ਕੀਤੇ ਗਏ!",
    toast_profile_updated: "ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ ਸਫਲਤਾਪੂਰਵਕ ਸੁਰੱਖਿਅਤ ਕੀਤੀ ਗਈ!",
    speech_err_no_speech: "ਕੋਈ ਆਵਾਜ਼ ਨਹੀਂ ਸੁਣੀ ਗਈ। ਕਿਰਪਾ ਕਰਕੇ ਮਾਈਕ ਦਬਾ ਕੇ ਦੁਬਾਰਾ ਬੋਲੋ।",
    speech_err_permission: "ਮਾਈਕ੍ਰੋਫੋਨ ਆਗਿਆ ਅਸਵੀਕਾਰ ਕੀਤੀ ਗਈ। ਕਿਰਪਾ ਕਰਕੇ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਮਾਈਕ ਦੀ ਆਗਿਆ ਦਿਓ।",
    speech_err_network: "ਨੈੱਟਵਰਕ ਸਮੱਸਿਆ ਕਰਕੇ ਆਵਾਜ਼ ਰਿਕਾਰਡ ਨਹੀਂ ਹੋ ਸਕੀ। ਕਿਰਪਾ ਕਰਕੇ ਹੇਠਾਂ ਲਿਖੋ।",
    speech_err_general: "ਬੋਲਣ ਵਿੱਚ ਮੁਸ਼ਕਿਲ ਆਈ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਬੋਲੋ ਜਾਂ ਹੇਠਾਂ ਲਿਖੋ।",
    speech_err_unsupported: "ਤੁਹਾਡੇ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਆਵਾਜ਼ ਪਛਾਣ ਉਪਲਬਧ ਨਹੀਂ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਲਿਖੋ।",
    weather_unavailable_title: "ਮੌਸਮ ਡੇਟਾ ਅਸਥਾਈ ਤੌਰ 'ਤੇ ਉਪਲਬਧ ਨਹੀਂ ਹੈ",
    weather_unavailable_sub: "ਇੰਟਰਨੈੱਟ ਕਨੈਕਸ਼ਨ ਦੀ ਜਾਂਚ ਕਰੋ ਜਾਂ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    mandi_unavailable_title: "ਸਰਕਾਰੀ ਮੰਡੀ ਭਾਅ ਇਸ ਵੇਲੇ ਉਪਲਬਧ ਨਹੀਂ ਹੈ",
    mandi_records_updating: "ਸਰਕਾਰੀ Agmarknet ਰਿਕਾਰਡ ਅਪਡੇਟ ਹੋ ਰਹੇ ਹਨ ਜਾਂ ਅੱਜ ਮੰਡੀ ਬੰਦ ਹੈ।",
    mandi_view_rate_btn: "ਭਾਅ ਦੇਖੋ"
  },
  bn: {
    toast_weather_shared: "আবহাওয়া পূর্বাভাস সফলভাবে শেয়ার করা হয়েছে!",
    toast_weather_copied: "আবহাওয়ার বিবরণ ক্লিপবোর্ডে কপি করা হয়েছে!",
    toast_profile_updated: "কৃষক প্রোফাইল সফলভাবে সংরক্ষিত হয়েছে!",
    speech_err_no_speech: "কোন শব্দ শোনা যায়নি। অনুগ্রহ করে মাইক চেপে আবার বলুন।",
    speech_err_permission: "মাইক্রোফোন অনুমতি প্রত্যাখ্যাত। ব্রাউজার সেটিংসে অনুমতি দিন।",
    speech_err_network: "নেটওয়ার্ক সমস্যার কারণে ভয়েস রেকর্ড করা যায়নি। অনুগ্রহ করে নিচে টাইপ করুন।",
    speech_err_general: "কথা বুঝতে সমস্যা হয়েছে। অনুগ্রহ করে আবার বলুন বা নিচে লিখুন।",
    speech_err_unsupported: "আপনার ব্রাউজারে ভয়েস সমর্থন নেই। অনুগ্রহ করে টাইপ করুন।",
    weather_unavailable_title: "আবহাওয়ার তথ্য সাময়িকভাবে অনুপলব্ধ",
    weather_unavailable_sub: "ইন্টারনেট সংযোগ পরীক্ষা করুন বা পুনরায় চেষ্টা করুন।",
    mandi_unavailable_title: "সরকারি মান্ডি রেট বর্তমানে অনুপলব্ধ",
    mandi_records_updating: "সরকারি Agmarknet পোর্টাল আপডেট হচ্ছে অথবা আজ মান্ডি বন্ধ আছে।",
    mandi_view_rate_btn: "দর দেখুন"
  },
  ta: {
    toast_weather_shared: "வானிலை முன்னறிவிப்பு வெற்றிகரமாகப் பகிரப்பட்டது!",
    toast_weather_copied: "வானிலை விவரங்கள் கிளிப்போர்டில் நகலெடுக்கப்பட்டது!",
    toast_profile_updated: "விவசாயி சுயவிவரம் வெற்றிகரமாகப் புதுப்பிக்கப்பட்டது!",
    speech_err_no_speech: "குரல் கேட்கவில்லை. மைக் பொத்தானை அழுத்தி மீண்டும் பேசவும்.",
    speech_err_permission: "மைக்ரோஃபோன் அனுமதி மறுக்கப்பட்டது. உலாவி அமைப்புகளில் அனுமதிக்கவும்.",
    speech_err_network: "நெட்வொர்க் பிரச்சனையால் குரல் பதிவு செய்ய முடியவில்லை. கீழே தட்டச்சு செய்யவும்.",
    speech_err_general: "பேச்சைப் பதிவு செய்வதில் சிக்கல். மீண்டும் பேசவும் அல்லது எழுதவும்.",
    speech_err_unsupported: "உங்கள் உலாவியில் குரல் அறிதல் ஆதரிக்கப்படவில்லை. தட்டச்சு செய்யவும்.",
    weather_unavailable_title: "வானிலை தரவு தற்காலிகமாக கிடைக்கவில்லை",
    weather_unavailable_sub: "இணைய இணைப்பைச் சரிபார்க்கவும் அல்லது மீண்டும் முயற்சிக்கவும்.",
    mandi_unavailable_title: "அரசு மண்டி விலை விவரம் தற்போது கிடைக்கவில்லை",
    mandi_records_updating: "அரசு Agmarknet பதிவுகள் புதுப்பிக்கப்படுகின்றன அல்லது இன்று சந்தை விடுமுறை.",
    mandi_view_rate_btn: "விலை பார்க்க"
  },
  te: {
    toast_weather_shared: "వాతావరణ సమాచారం విజయవంతంగా భాగస్వామ్యం చేయబడింది!",
    toast_weather_copied: "వాతావరణ వివరాలు క్లిప్‌బోర్డ్‌కి కాపీ చేయబడ్డాయి!",
    toast_profile_updated: "రైతు ప్రొఫైల్ విజయవంతంగా భద్రపరచబడింది!",
    speech_err_no_speech: "వాయిస్ వినిపించలేదు. మైక్ బటన్ నొక్కి మళ్లీ మాట్లాడండి.",
    speech_err_permission: "మైక్రోఫోన్ అనుమతి నిరాకరించబడింది. బ్రౌజర్ సెట్టింగ్స్‌లో అనుమతించండి.",
    speech_err_network: "నెట్‌వర్క్ సమస్య వల్ల వాయిస్ రికార్డ్ కాలేదు. దయచేసి క్రింద టైప్ చేయండి.",
    speech_err_general: "వాయిస్ గ్రహించడంలో సమస్య. దయచేసి మళ్లీ మాట్లాడండి లేదా టైప్ చేయండి.",
    speech_err_unsupported: "ఈ బ్రౌజర్‌లో వాయిస్ రికగ్నిషన్ సపోర్ట్ లేదు. టైప్ చేయండి.",
    weather_unavailable_title: "వాతావరణ డేటా తాత్కాలికంగా అందుబాటులో లేదు",
    weather_unavailable_sub: "ఇంటర్నెట్ కనెక్షన్ తనిఖీ చేయండి లేదా మళ్లీ ప్రయత్నించండి.",
    mandi_unavailable_title: "ప్రభుత్వ మార్కెట్ ధరలు ప్రస్తుతం అందుబాటులో లేవు",
    mandi_records_updating: "ప్రభుత్వ Agmarknet డేటా అప్‌డేట్ అవుతోంది లేదా ఈరోజు మార్కెట్ మూసివేయబడింది.",
    mandi_view_rate_btn: "ధర చూడండి"
  },
  kn: {
    toast_weather_shared: "ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ಯಶಸ್ವಿಯಾಗಿ ಹಂಚಿಕೊಳ್ಳಲಾಗಿದೆ!",
    toast_weather_copied: "ಹವಾಮಾನ ವಿವರಗಳನ್ನು ನಕಲಿಸಲಾಗಿದೆ!",
    toast_profile_updated: "ರೈತರ ಪ್ರೊಫೈಲ್ ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ!",
    speech_err_no_speech: "ಯಾವುದೇ ಧ್ವನಿ ಕೇಳಿಸಲಿಲ್ಲ. ಮೈಕ್ ಬಟನ್ ಒತ್ತಿ ಮತ್ತೆ ಮಾತನಾಡಿ.",
    speech_err_permission: "ಮೈಕ್ರೊಫೋನ್ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ. ಬ್ರೌಸರ್ ಸೆಟ್ಟಿಂಗ್‌ನಲ್ಲಿ ಅನುಮತಿಸಿ.",
    speech_err_network: "ನೆಟ್‌ವರ್ಕ್ ಸಮಸ್ಯೆಯಿಂದ ಧ್ವನಿ ದಾಖಲಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಕೆಳಗೆ ಟೈಪ್ ಮಾಡಿ.",
    speech_err_general: "ಧ್ವನಿ ಗ್ರಹಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಮಾತನಾಡಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ.",
    speech_err_unsupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ. ಟೈಪ್ ಮಾಡಿ.",
    weather_unavailable_title: "ಹವಾಮಾನ ಮಾಹಿತಿ ತಾತ್ಕಾಲಿಕವಾಗಿ ಲಭ್ಯವಿಲ್ಲ",
    weather_unavailable_sub: "ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕವನ್ನು ಪರಿಶೀಲಿಸಿ ಅಥವಾ ಮರುಪ್ರಯತ್ನಿಸಿ.",
    mandi_unavailable_title: "ಸರ್ಕಾರಿ ಎಪಿಎಂಸಿ ದರಗಳು ಪ್ರಸ್ತುತ ಲಭ್ಯವಿಲ್ಲ",
    mandi_records_updating: "ಸರ್ಕಾರಿ Agmarknet ದಾಖಲೆಗಳು ನವೀಕರಣಗೊಳ್ಳುತ್ತಿವೆ ಅಥವಾ ಇಂದು ಮಾರುಕಟ್ಟೆ ರಜೆ.",
    mandi_view_rate_btn: "ದರ ನೋಡಿ"
  },
  ml: {
    toast_weather_shared: "കാലാവസ്ഥ പ്രവചനം വിജയകരമായി പങ്കിട്ടു!",
    toast_weather_copied: "കാലാവസ്ഥ വിവരങ്ങൾ ക്ലിപ്പ്ബോർഡിലേക്ക് പകർത്തി!",
    toast_profile_updated: "കർഷക പ്രൊഫൈൽ വിജയകരമായി സംരക്ഷിച്ചു!",
    speech_err_no_speech: "ശബ്ദം കേൾക്കാനായില്ല. മൈക്ക് ബട്ടൺ അമർത്തി വീണ്ടും സംസാരിക്കുക.",
    speech_err_permission: "മൈക്രോഫോൺ അനുമതി നിഷേധിച്ചു. ബ്രൗസർ സെറ്റിംഗ്സിൽ അനുമതി നൽകുക.",
    speech_err_network: "നെറ്റ്‌വർക്ക് പ്രശ്നം മൂലം ശബ്ദം രേഖപ്പെടുത്താൻ കഴിഞ്ഞില്ല. ദയവായി താഴെ ടൈപ്പ് ചെയ്യുക.",
    speech_err_general: "സംസാരം തിരിച്ചറിയാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും സംസാരിക്കുക അല്ലെങ്കിൽ ടൈപ്പ് ചെയ്യുക.",
    speech_err_unsupported: "ഈ ബ്രൗസറിൽ വോയ്‌സ് റെക്കഗ്നിഷൻ ലഭ്യമല്ല. ദയവായി ടൈപ്പ് ചെയ്യുക.",
    weather_unavailable_title: "കാലാവസ്ഥ വിവരങ്ങൾ താൽക്കാലികമായി ലഭ്യമല്ല",
    weather_unavailable_sub: "ഇന്റർനെറ്റ് കണക്ഷൻ പരിശോധിക്കുക അല്ലെങ്കിൽ വീണ്ടും ശ്രമിക്കുക.",
    mandi_unavailable_title: "സർക്കാർ മാർക്കറ്റ് നിരക്കുകൾ ഇപ്പോൾ ലഭ്യമല്ല",
    mandi_records_updating: "സർക്കാർ Agmarknet വിവരങ്ങൾ അപ്‌ഡേറ്റ് ചെയ്യപ്പെടുകയാണ് അല്ലെങ്കിൽ ഇന്ന് മാർക്കറ്റ് അവധിയാണ്.",
    mandi_view_rate_btn: "വില കാണുക"
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
console.log('Appended final extra toast & speech keys successfully.');
