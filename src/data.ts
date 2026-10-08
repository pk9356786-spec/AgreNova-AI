/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scheme, MandiPrice } from './types';

// Supported States & Districts in India (All 28 States & 8 Union Territories)
export const indianStates = [
  { id: 'AN', name: 'अंडमान और निकोबार (Andaman & Nicobar)', districts: ['दक्षिण अंडमान', 'उत्तर और मध्य अंडमान', 'निकोबार'] },
  { id: 'AP', name: 'आंध्र प्रदेश (Andhra Pradesh)', districts: ['गुंटूर', 'कृष्णा', 'गोदावरी', 'अनंतपुर', 'कुर्नूल', 'विशाखापटनम', 'चित्तूर'] },
  { id: 'AR', name: 'अरुणाचल प्रदेश (Arunachal Pradesh)', districts: ['ईटानगर', 'पासीघाट', 'तवांग', 'ज़िरो', 'तेज़ू', 'चांगलांग'] },
  { id: 'AS', name: 'असम (Assam)', districts: ['गुवाहाटी', 'जोरहाट', 'डिब्रूगढ़', 'सिल्चर', 'तेजपुर', 'नागांव', 'कामरूप'] },
  { id: 'Bihar', name: 'बिहार (Bihar)', districts: ['पटना', 'मुजफ्फरपुर', 'गया', 'भागलपुर', 'रोहतास', 'दरभंगा', 'पूर्णिया', 'समस्तीपुर', 'बेगुसराय'] },
  { id: 'CH', name: 'चंडीगढ़ (Chandigarh)', districts: ['चंडीगढ़'] },
  { id: 'CG', name: 'छत्तीसगढ़ (Chhattisgarh)', districts: ['रायपुर', 'बिलासपुर', 'दुर्ग', 'राजनांदगांव', 'अंबिकापुर', 'जगदलपुर'] },
  { id: 'DN', name: 'दादरा और नगर हवेली एवं दमन और दीव (Dadra & Nagar Haveli and Daman & Diu)', districts: ['दमन', 'दीव', 'सिलवासा'] },
  { id: 'Delhi', name: 'दिल्ली (Delhi)', districts: ['नई दिल्ली', 'उत्तर दिल्ली', 'दक्षिण दिल्ली', 'पूर्वी दिल्ली', 'पश्चिम दिल्ली'] },
  { id: 'Goa', name: 'गोवा (Goa)', districts: ['उत्तर गोवा', 'दक्षिण गोवा'] },
  { id: 'Gujarat', name: 'गुजरात (Gujarat)', districts: ['अहमदाबाद', 'राजकोट', 'सूरत', 'जूनागढ़', 'आणंद', 'बनासकांठा', 'मेहसाणा', 'वडोदरा'] },
  { id: 'Haryana', name: 'हरियाणा (Haryana)', districts: ['करनाल', 'कुरुक्षेत्र', 'हिसार', 'रोहतक', 'सोनीपत', 'सिरसा', 'अंबाला', 'पानीपत', 'जींद'] },
  { id: 'HP', name: 'हिमाचल प्रदेश (Himachal Pradesh)', districts: ['शिमला', 'कांगड़ा', 'मंडी', 'सोलन', 'कुल्लू', 'ऊना', 'हमीरपुर'] },
  { id: 'JK', name: 'जम्मू और कश्मीर (Jammu & Kashmir)', districts: ['श्रीनगर', 'जम्मू', 'अनंतनाग', 'बारामूला', 'उधमपुर', 'कठुआ', 'पुलवामा'] },
  { id: 'JH', name: 'झारखंड (Jharkhand)', districts: ['रांची', 'जमशेदपुर', 'धनबाद', 'हजारीबाग', 'देवघर', 'दुमका', 'गिरिडीह'] },
  { id: 'KA', name: 'कर्नाटक (Karnataka)', districts: ['बेंगलुरु', 'मैसूर', 'बेलगाम', 'धारवाड़', 'गुलबर्गा', 'शिमोगा', 'दवणगेरे', 'हावेरी'] },
  { id: 'KL', name: 'केरल (Kerala)', districts: ['तिरुवनंतपुरम', 'कोच्चि', 'कोझिकोड', 'पालक्काड़', 'त्रिशूर', 'वायनाड', 'इडुक्की'] },
  { id: 'Ladakh', name: 'लद्दाख (Ladakh)', districts: ['लेह', 'कारगिल'] },
  { id: 'LA', name: 'लक्षद्वीप (Lakshadweep)', districts: ['कवारत्ती'] },
  { id: 'MP', name: 'मध्य प्रदेश (Madhya Pradesh)', districts: ['इंदौर', 'उज्जैन', 'होशंगाबाद', 'देवास', 'विदिशा', 'छिंदवाड़ा', 'जबलपुर', 'ग्वालियर', 'सागर'] },
  { id: 'MH', name: 'महाराष्ट्र (Maharashtra)', districts: ['नासिक', 'पुणे', 'नागपुर', 'अकोला', 'सोलापुर', 'औरंगाबाद', 'अहमदनगर', 'सांगली', 'कोल्हापुर'] },
  { id: 'MN', name: 'मणिपुर (Manipur)', districts: ['इम्फाल', 'थौबल', 'विष्णुपुर', 'चुरचंदपुर'] },
  { id: 'ML', name: 'मेघालय (Meghalaya)', districts: ['शिलांग', 'तुरा', 'नोंगस्टोइन', 'जोवाई'] },
  { id: 'MZ', name: 'मिजोरम (Mizoram)', districts: ['आइज़ोल', 'लुंगलेई', 'चम्फाई'] },
  { id: 'NL', name: 'नागालैंड (Nagaland)', districts: ['कोहिमा', 'दीमापुर', 'मोकोकचुंग'] },
  { id: 'Odisha', name: 'ओडिशा (Odisha)', districts: ['भुवनेश्वर', 'कटक', 'संबलपुर', 'बालेश्वर', 'बरगढ़', 'पूरी', 'गंजाम'] },
  { id: 'PY', name: 'पुडुचेरी (Puducherry)', districts: ['पुडुचेरी', 'कराईकल', 'माहे', 'यनाम'] },
  { id: 'Punjab', name: 'पंजाब (Punjab)', districts: ['लुधियाना', 'पटियाला', 'बठिंडा', 'अमृतसर', 'संगरूर', 'फ़िरोज़पुर', 'जालंधर', 'मोगा', 'फाजिल्का'] },
  { id: 'Rajasthan', name: 'राजस्थान (Rajasthan)', districts: ['श्रीगंगानगर', 'जयपुर', 'कोटा', 'अलवर', 'हनुमानगढ़', 'जोधपुर', 'बीकानेर', 'उदयपुर', 'नागौर'] },
  { id: 'SK', name: 'सिक्किम (Sikkim)', districts: ['गंगटोक', 'गेज़िंग', 'नामची', 'मंगन'] },
  { id: 'TN', name: 'तमिलनाडु (Tamil Nadu)', districts: ['चेन्नई', 'कोयंबटूर', 'मदुरै', 'तंजौर', 'सेलम', 'तिरुचिरापल्ली', 'ईरोड'] },
  { id: 'TS', name: 'तेलंगाना (Telangana)', districts: ['हैदराबाद', 'वरंगल', 'करीमनगर', 'निजामाबाद', 'खम्मम', 'महबूबनगर'] },
  { id: 'TR', name: 'त्रिपुरा (Tripura)', districts: ['अगरतला', 'उदयपुर', 'धर्मनगर'] },
  { id: 'UP', name: 'उत्तर प्रदेश (Uttar Pradesh)', districts: ['कन्नौज', 'बाराबंकी', 'मेरठ', 'हापुड़', 'झांसी', 'गोरखपुर', 'वाराणसी', 'लखनऊ', 'प्रयागराज', 'आगरा', 'अलीगढ़'] },
  { id: 'UK', name: 'उत्तराखंड (Uttarakhand)', districts: ['देहरादून', 'हरिद्वार', 'ऊधमसिंह नगर', 'नैनीताल', 'अल्मोड़ा', 'पौड़ी गढ़वाल'] },
  { id: 'WB', name: 'पश्चिम बंगाल (West Bengal)', districts: ['कोलकाता', 'बर्दवान', 'हावड़ा', 'हुगली', 'सिलीगुड़ी', 'मालदा'] }
];

// Generates dynamic weather advisory strictly based on real weather metrics
export function generateAgriAdvisory(
  params: {
    temp: number;
    feelsLike?: number;
    humidity: number;
    windSpeed?: number;
    clouds?: number;
    rainProb?: number;
    weatherMain?: string;
  },
  lang: string = 'hi'
) {
  const temp = params.temp ?? 30;
  const feelsLike = params.feelsLike ?? temp;
  const humidity = params.humidity ?? 50;
  const windSpeed = params.windSpeed ?? 3.5;
  const clouds = params.clouds ?? 0;
  const rainProb = params.rainProb ?? 15;
  const main = (params.weatherMain || 'Clear').toLowerCase();

  const isRainyCondition = main.includes('rain') || main.includes('thunderstorm') || main.includes('drizzle') || rainProb > 60;
  const isModerateRain = rainProb > 40 && rainProb <= 60;
  const isHighCloud = clouds > 70;
  const isHighHumidAndCloud = humidity > 70 && clouds > 60;
  const isHotDry = (temp > 32 || feelsLike > 35) && rainProb <= 30 && humidity < 60;

  // Spray is NOT safe if rainy, moderate rain chance, or high wind
  const isSpraySafe = !isRainyCondition && !isModerateRain && windSpeed < 6;

  const dict: Record<string, any> = {
    hi: {
      thunderstorm: 'तेज वर्षा व गरज का मौसम (Thunderstorm & Rain)',
      rainy: 'वर्षा एवं नमी युक्त मौसम (Rainy Weather)',
      possibilityRain: 'हल्की वर्षा की संभावना / बादल (Possibility of Rain)',
      overcast: 'घने बादल (Overcast & Cloudy)',
      cloudy: 'आंशिक रूप से बादल (Partly Cloudy)',
      sunnyWarm: 'धूप एवं गर्म मौसम (Sunny & Warm)',
      clearPleasant: 'साफ एवं सुहावना मौसम (Clear & Pleasant)',

      forecastThunderstorm: `अगले २४ घंटों में भारी बारिश व गरज की प्रबल संभावना है (वर्षा संभावना: ${rainProb}%)।`,
      forecastRainy: `अगले २४ घंटों में वर्षा एवं नमी वाला मौसम रहेगा (वर्षा संभावना: ${rainProb}%)।`,
      forecastPossibility: `अगले २४ घंटों में हल्की वर्षा या छिटपुट बौछारों की संभावना है (वर्षा संभावना: ${rainProb}%)।`,
      forecastOvercast: `घने बादल छाए रहेंगे, बारिश की संभावना बनी रहेगी (वर्षा संभावना: ${rainProb}%, बादल: ${clouds}%)।`,
      forecastClear: `मौसम मुख्यतः अनुकूल रहने की संभावना है (वर्षा संभावना: ${rainProb}%)।`,

      advisoryRainy: '⚠️ बारिश की संभावना को देखते हुए यूरिया डालने, कीटनाशक/फफूंदनाशक छिड़काव एवं सिंचाई को टालें। खेत में जल निकासी प्रबंधित करें।',
      advisoryModerateRain: '⚠️ हल्की बारिश की संभावना है। छिड़काव एवं सिंचाई फिलहाल रोकें तथा मौसम साफ होने का इंतजार करें।',
      advisoryHumidCloud: '⚠️ उच्च आर्द्रता व बादलों के कारण कीट व फफूंद प्रकोप की निगरानी करें। खेत में जल निकासी सुनिश्चित करें।',
      advisoryHotDry: '✅ मौसम गर्म एवं शुष्क है। फसलों में आवश्यकतानुसार हल्की सिंचाई करें एवं नमी संरक्षण करें। सुबह/शाम छिड़काव कर सकते हैं।',
      advisoryDefault: '✅ दवाओं के छिड़काव और कृषि कार्यों के लिए मौसम अनुकूल है। आवश्यकता अनुसार शाम को सिंचाई करें।'
    },
    en: {
      thunderstorm: 'Thunderstorm & Heavy Rain',
      rainy: 'Rainy & Humid Weather',
      possibilityRain: 'Possibility of Rain / Cloudy',
      overcast: 'Overcast & Cloudy',
      cloudy: 'Partly Cloudy',
      sunnyWarm: 'Sunny & Warm',
      clearPleasant: 'Clear & Pleasant',

      forecastThunderstorm: `Strong likelihood of heavy rain and thunderstorm in next 24 hours (Precipitation chance: ${rainProb}%).`,
      forecastRainy: `Rainy and humid conditions expected in next 24 hours (Precipitation chance: ${rainProb}%).`,
      forecastPossibility: `Possibility of light rain or drizzle in next 24 hours (Precipitation chance: ${rainProb}%).`,
      forecastOvercast: `Overcast skies expected with rain possibility (Precipitation chance: ${rainProb}%, Cloud cover: ${clouds}%).`,
      forecastClear: `Weather expected to remain mostly fair and favorable (Precipitation chance: ${rainProb}%).`,

      advisoryRainy: '⚠️ Defer urea application, pesticide spraying and irrigation due to rain forecast. Ensure proper field drainage.',
      advisoryModerateRain: '⚠️ Light rain possible. Postpone chemical spraying and irrigation until weather clears.',
      advisoryHumidCloud: '⚠️ High humidity and cloud cover increase pest/fungal risk. Monitor crops closely and ensure field drainage.',
      advisoryHotDry: '✅ Warm and dry weather. Provide light irrigation as needed and focus on moisture conservation.',
      advisoryDefault: '✅ Weather is favorable for spraying and field weeding. Irrigate lightly in the evening if required.'
    },
    mr: {
      thunderstorm: 'वादळी वाऱ्यासह मुसळधार पाऊस',
      rainy: 'पावसाळी व दमट हवामान',
      possibilityRain: 'हलक्या पावसाची शक्यता / ढगाळ',
      overcast: 'घट्ट ढगाळ हवामान',
      cloudy: 'अंशतः ढगाळ वातावरण',
      sunnyWarm: 'उन्हाळी व गरम हवामान',
      clearPleasant: 'निरभ्र व आल्हाददायक हवामान',

      forecastThunderstorm: `पुढील २४ तासांत मुसळधार पाऊस व वादळाची दाट शक्यता आहे (पावसाची शक्यता: ${rainProb}%).`,
      forecastRainy: `पुढील २४ तासांत पावसाळी व दमट हवामान राहील (पावसाची शक्यता: ${rainProb}%).`,
      forecastPossibility: `पुढील २४ तासांत हलक्या पावसाची शक्यता आहे (पावसाची शक्यता: ${rainProb}%).`,
      forecastOvercast: `घट्ट ढगाळ हवामान राहील (पावसाची शक्यता: ${rainProb}%, ढग: ${clouds}%).`,
      forecastClear: `हवामान प्रामुख्याने स्वच्छ व अनुकूल राहील (पावसाची शक्यता: ${rainProb}%).`,

      advisoryRainy: '⚠️ पावसाच्या शक्यतेमुळे युरिया टाकणे, फवारणी व सिंचन टाळा. पाण्याचा निचरा व्यवस्थित ठेवा.',
      advisoryModerateRain: '⚠️ हलक्या पावसाची शक्यता असल्याने फवारणी व सिंचन तात्पुरते थांबवा.',
      advisoryHumidCloud: '⚠️ जास्त आद्रता व ढगाळ हवामानामुळे कीड व रोगांचा प्रादुर्भाव तपासा. निचरा योग्य ठेवा.',
      advisoryHotDry: '✅ हवामान गरम व कोरडे आहे. गरजेनुसार हलके सिंचन करा व ओलावा टिकवा.',
      advisoryDefault: '✅ फवारणी आणि कोळपणीसाठी हवामान अनुकूल आहे.'
    },
    gu: {
      thunderstorm: 'ગાજવીજ સાથે ભારે વરસાદ',
      rainy: 'વરસાદી અને ભેજવાળું હવામાન',
      possibilityRain: 'હળવા વરસાદની શક્યતા / વાદળછાયું',
      overcast: 'ઘેરા વાદળો છવાયેલા રહેશે',
      cloudy: 'અંશતઃ વાદળછાયું',
      sunnyWarm: 'તડકો અને ગરમ હવામાન',
      clearPleasant: 'ચોખ્ખું અને આહલાદક હવામાન',

      forecastThunderstorm: `આગામી ૨૪ કલાકમાં ભારે વરસાદની પ્રબળ શક્યતા છે (વરસાદની શક્યતા: ${rainProb}%).`,
      forecastRainy: `આગામી ૨૪ કલાકમાં વરસાદી અને ભેજવાળું હવામાન રહેશે (વરસાદની શક્યતા: ${rainProb}%).`,
      forecastPossibility: `આગામી ૨૪ કલાકમાં હળવા વરસાદની શક્યતા છે (વરસાદની શક્યતા: ${rainProb}%).`,
      forecastOvercast: `વાદળછાયું વાતાવરણ રહેશે (વરસાદની શક્યતા: ${rainProb}%, વાદળ: ${clouds}%).`,
      forecastClear: `હવામાન મુખ્યત્વે સામાન્ય અને અનુકૂળ રહેશે (વરસાદની શક્યતા: ${rainProb}%).`,

      advisoryRainy: '⚠️ વરસાદની શક્યતાને કારણે યુરિયા આપવાનું, છંટકાવ અને પિયત ટાળો. ખેતરમાં નિકાલની વ્યવસ્થા રાખો.',
      advisoryModerateRain: '⚠️ હળવા વરસાદની શક્યતા છે. દવાનો છંટકાવ હાલ પૂરતો મુલતવી રાખો.',
      advisoryHumidCloud: '⚠️ ઊંચા ભેજ અને વાદળોને કારણે જીવાત-ફૂગના ઉપદ્રવ પર નજર રાખો.',
      advisoryHotDry: '✅ હવામાન ગરમ અને શુષ્ક છે. જરૂરિયાત મુજબ હળવું પિયત આપો.',
      advisoryDefault: '✅ દવાનો છંટકાવ કરવા માટે આજનું હવામાન સર્વશ્રેષ્ઠ છે.'
    },
    pa: {
      thunderstorm: 'ਭਾਰੀ ਬਾਰਿਸ਼ ਅਤੇ ਗਰਜ',
      rainy: 'ਮੀਂਹ ਅਤੇ ਸਿੱਲਾ ਮੌਸਮ',
      possibilityRain: 'ਹਲਕੀ ਬਾਰਿਸ਼ ਦੀ ਸੰਭਾਵਨਾ / ਬੱਦਲ',
      overcast: 'ਘਣੇ ਬੱਦਲ ਛਾਏ ਰਹਿਣਗੇ',
      cloudy: 'ਅੰਸ਼ਕ ਤੌਰ ਤੇ ਬੱਦਲਵਾਈ',
      sunnyWarm: 'ਧੁੱਪ ਅਤੇ ਗਰਮ ਮੌਸਮ',
      clearPleasant: 'ਸਾਫ਼ ਅਤੇ ਸੁਹਾਵਣਾ ਮੌਸਮ',

      forecastThunderstorm: `ਅਗਲੇ 24 ਘੰਟਿਆਂ ਵਿੱਚ ਭਾਰੀ ਮੀਂਹ ਦੀ ਪੂਰੀ ਸੰਭਾਵਨਾ ਹੈ (ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ: ${rainProb}%).`,
      forecastRainy: `ਅਗਲੇ 24 ਘੰਟਿਆਂ ਵਿੱਚ ਮੀਂਹ ਅਤੇ ਸਿੱਲਾ ਮੌਸਮ ਰਹੇਗਾ (ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ: ${rainProb}%).`,
      forecastPossibility: `ਅਗਲੇ 24 ਘੰਟਿਆਂ ਵਿੱਚ ਹਲਕੀ ਬਾਰਿਸ਼ ਦੀ ਸੰਭਾਵਨਾ ਹੈ (ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ: ${rainProb}%).`,
      forecastOvercast: `ਬੱਦਲਵਾਹੀ ਰਹੇਗੀ (ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ: ${rainProb}%, ਬੱਦਲ: ${clouds}%).`,
      forecastClear: `ਮੌਸਮ ਮੁੱਖ ਤੌਰ ਤੇ ਸਾਫ਼ ਅਤੇ ਅਨੁਕੂਲ ਰਹੇਗਾ (ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ: ${rainProb}%).`,

      advisoryRainy: '⚠️ ਬਾਰਿਸ਼ ਦੀ ਸੰਭਾਵਨਾ ਕਰਕੇ ਯੂਰੀਆ ਪਾਉਣ, ਸਪਰੇਅ ਕਰਨ ਅਤੇ ਸਿੰਚਾਈ ਤੋਂ ਬਚੋ। ਪਾਣੀ ਦੇ ਨਿਕਾਸ ਦਾ ਧਿਆਨ ਰੱਖੋ।',
      advisoryModerateRain: '⚠️ ਹਲਕੀ ਬਾਰਿਸ਼ ਦੀ ਸੰਭਾਵਨਾ ਹੈ। ਫਿਲਹਾਲ ਸਪਰੇਅ ਰੋਕੋ।',
      advisoryHumidCloud: '⚠️ ਬੱਦਲਵਾਈ ਅਤੇ ਸਿੱਲ੍ਹ ਕਰਕੇ ਕੀੜਿਆਂ ਅਤੇ ਬੀਮਾਰੀਆਂ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ।',
      advisoryHotDry: '✅ ਮੌਸਮ ਗਰਮ ਅਤੇ ਖੁਸ਼ਕ ਹੈ। ਲੋੜ ਅਨੁਸਾਰ ਹਲਕੀ ਸਿੰਚਾਈ ਕਰੋ।',
      advisoryDefault: '✅ ਸਪਰੇਅ ਕਰਨ ਅਤੇ ਗੋਡੀ ਲਈ ਮੌਸਮ ਅਨੁਕੂਲ ਹੈ।'
    },
    bn: {
      thunderstorm: 'ভারী বৃষ্টি ও বজ্রপাত',
      rainy: 'বৃষ্টিপাত ও আর্দ্র আবহাওয়া',
      possibilityRain: 'হালকা বৃষ্টির সম্ভাবনা / মেঘলা',
      overcast: 'ঘন মেঘলা আবহাওয়া',
      cloudy: 'আংশিক মেঘলা',
      sunnyWarm: 'রৌদ্রোজ্জ্বল ও উষ্ণ আবহাওয়া',
      clearPleasant: 'পরিষ্কার ও মনোরম আবহাওয়া',

      forecastThunderstorm: `আগামী ২৪ ঘণ্টায় ভারী বৃষ্টির তীব্র সম্ভাবনা রয়েছে (বৃষ্টির সম্ভাবনা: ${rainProb}%)।`,
      forecastRainy: `আগামী ২৪ ঘণ্টায় বৃষ্টি ও আর্দ্র আবহাওয়া থাকবে (বৃষ্টির সম্ভাবনা: ${rainProb}%)।`,
      forecastPossibility: `আগামী ২৪ ঘণ্টায় হালকা বৃষ্টির সম্ভাবনা রয়েছে (বৃষ্টির সম্ভাবনা: ${rainProb}%)।`,
      forecastOvercast: `মেঘলা আকাশ থাকবে (বৃষ্টির সম্ভাবনা: ${rainProb}%, মেঘ: ${clouds}%)।`,
      forecastClear: `আবহাওয়া প্রধানত স্বাভাবিক ও অনুকূল থাকবে (বৃষ্টির সম্ভাবনা: ${rainProb}%)।`,

      advisoryRainy: '⚠️ বৃষ্টির আশঙ্কায় ইউরিয়া প্রয়োগ, স্প্রে ও সেচ এড়িয়ে চলুন। জল নিষ্কাশন ঠিক রাখুন।',
      advisoryModerateRain: '⚠️ হালকা বৃষ্টির সম্ভাবনা রয়েছে। স্প্রে স্থগিত রাখুন।',
      advisoryHumidCloud: '⚠️ উচ্চ আর্দ্রতা ও মেঘলা আকাশের কারণে পোকা ও রোগের নজরদারি করুন।',
      advisoryHotDry: '✅ আবহাওয়া উষ্ণ ও শুষ্ক। প্রয়োজন অনুযায়ী হালকা সেচ দিন।',
      advisoryDefault: '✅ স্প্রে ও নিড়ানির জন্য আবহাওয়া অনুকূল।'
    },
    ta: {
      thunderstorm: 'கனமழை மற்றும் இடியுடன் கூடிய மழை',
      rainy: 'மழை மற்றும் ஈரப்பதமான வானிலை',
      possibilityRain: 'லேசான மழை வாய்ப்பு / மேகமூட்டம்',
      overcast: 'அடர்ந்த மேகமூட்டம்',
      cloudy: 'பகுதியளவு மேகமூட்டம்',
      sunnyWarm: 'வெயில் மற்றும் வெப்பமான வானிலை',
      clearPleasant: 'தெளிவான வானிலை',

      forecastThunderstorm: `அடுத்த 24 மணி நேரத்தில் கனமழை பெய்ய வாய்ப்புள்ளது (மழை வாய்ப்பு: ${rainProb}%).`,
      forecastRainy: `அடுத்த 24 மணி நேரத்தில் மழை மற்றும் ஈரப்பதமான வானிலை இருக்கும் (மழை வாய்ப்பு: ${rainProb}%).`,
      forecastPossibility: `அடுத்த 24 மணி நேரத்தில் லேசான மழைக்கு வாய்ப்புள்ளது (மழை வாய்ப்பு: ${rainProb}%).`,
      forecastOvercast: `மேகமூட்டமான வானிலை காணப்படும் (மழை வாய்ப்பு: ${rainProb}%, மேகம்: ${clouds}%).`,
      forecastClear: `வானிலை பெரும்பாலும் இயல்பாகவும் சாதகமாகவும் இருக்கும் (மழை வாய்ப்பு: ${rainProb}%).`,

      advisoryRainy: '⚠️ மழை வாய்ப்பு உள்ளதால் யூரியா இடுதல், மருந்து தெளித்தல் மற்றும் பாசனத்தைத் தவிர்க்கவும்.',
      advisoryModerateRain: '⚠️ லேசான மழைக்கு வாய்ப்புள்ளது. மருந்து தெளிப்பதைத் தள்ளிப்போடவும்.',
      advisoryHumidCloud: '⚠️ அதிக ஈரப்பதம் காரணமாக பூச்சி மற்றும் நோய் தாக்குதலைக் கண்காணிக்கவும்.',
      advisoryHotDry: '✅ வானிலை வெப்பமாகவும் வறண்டதாகவும் உள்ளது. தேவைக்கேற்ப லேசான பாசனம் செய்யவும்.',
      advisoryDefault: '✅ மருந்து தெளிக்க மற்றும் களை எடுக்க வானிலை ஏற்றது.'
    },
    te: {
      thunderstorm: 'భారీ వర్షం మరియు ఉరుములు',
      rainy: 'వర్షం మరియు తేమతో కూడిన వాతావరణం',
      possibilityRain: 'తేలికపాటి వర్షం సూచన / మబ్బులు',
      overcast: 'దట్టమైన మబ్బులు',
      cloudy: 'పాక్షికంగా మబ్బుగా ఉంది',
      sunnyWarm: 'ఎండ మరియు వేడి వాతావరణం',
      clearPleasant: 'ప్రశాంతమైన వాతావరణం',

      forecastThunderstorm: `రాబోయే 24 గంటల్లో భారీ వర్షం కురిసే అవకాశం ఉంది (వర్షం సంభావ్యత: ${rainProb}%).`,
      forecastRainy: `రాబోయే 24 గంటల్లో వర్షం మరియు తేమతో కూడిన వాతావరణం ఉంటుంది (వర్షం సంభావ్యత: ${rainProb}%).`,
      forecastPossibility: `రాబోయే 24 గంటల్లో తేలికపాటి వర్షం కురిసే అవకాశం ఉంది (వర్షం సంభావ్యత: ${rainProb}%).`,
      forecastOvercast: `మబ్బులతో కూడిన వాతావరణం ఉంటుంది (వర్షం సంభావ్యత: ${rainProb}%, మబ్బులు: ${clouds}%).`,
      forecastClear: `వాతావరణం ప్రధానంగా సాధారణంగా మరియు అనుకూలంగా ఉంటుంది (వర్షం సంభావ్యత: ${rainProb}%).`,

      advisoryRainy: '⚠️ వర్షం సూచన ఉన్నందున యూరియా వేయడం, పిచికారీ మరియు నీటిపారుదల నివారించండి.',
      advisoryModerateRain: '⚠️ తేలికపాటి వర్షం కురిసే అవకాశం ఉంది. పిచికారీని వాయిదా వేయండి.',
      advisoryHumidCloud: '⚠️ అధిక తేమ మరియు మబ్బుల వల్ల తెగుళ్లు/పురుగుల ఉధృతిని గమనించండి.',
      advisoryHotDry: '✅ వాతావరణం వేడిగా ఉంది. అవసరానికి తగినట్లు నీటి తడి ఇవ్వండి.',
      advisoryDefault: '✅ పిచికారీ మరియు కలుపు తీతకు వాతావరణం అనుకూలంగా ఉంది.'
    },
    kn: {
      thunderstorm: 'ಭಾರೀ ಮಳೆ ಮತ್ತು ಸಿಡಿಲು',
      rainy: 'ಮಳೆ ಮತ್ತು ભેಗದ ಹವಾಮಾನ',
      possibilityRain: 'ಹಗುರ ಮಳೆಯ ಸಾಧ್ಯತೆ / ಮೋಡ',
      overcast: 'ದಟ್ಟ ಮೋಡ ಕವಿದ ವಾತಾವರಣ',
      cloudy: 'ಭಾಗಶಃ ಮೋಡ ಕವಿದ ವಾತಾವರಣ',
      sunnyWarm: 'ಬಿಸಿಲು ಮತ್ತು ಬಿಸಿ ಹವಾಮಾನ',
      clearPleasant: 'ಸ್ಪಷ್ಟ ಹವಾಮಾನ',

      forecastThunderstorm: `ಮುಂದಿನ 24 ಗಂಟೆಗಳಲ್ಲಿ ಭಾರೀ ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆಯಿದೆ (ಸಾಧ್ಯತೆ: ${rainProb}%).`,
      forecastRainy: `ಮುಂದಿನ 24 ಗಂಟೆಗಳಲ್ಲಿ ಮಳೆ ಮತ್ತು ભેಗದ ಹವಾಮಾನವಿರುತ್ತದೆ (ಸಾಧ್ಯತೆ: ${rainProb}%).`,
      forecastPossibility: `ಮುಂದಿನ 24 ಗಂಟೆಗಳಲ್ಲಿ ಹಗುರ ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆಯಿದೆ (ಸಾಧ್ಯತೆ: ${rainProb}%).`,
      forecastOvercast: `ಮೋಡ ಕವಿದ ವಾತಾವರಣವಿರುತ್ತದೆ (ಸಾಧ್ಯತೆ: ${rainProb}%, ಮೋಡ: ${clouds}%).`,
      forecastClear: `ಹವಾಮಾನ ಮುಖ್ಯವಾಗಿ ಸಾಮಾನ್ಯ ಮತ್ತು ಸೂಕ್ತವಾಗಿರುತ್ತದೆ (ಸಾಧ್ಯತೆ: ${rainProb}%).`,

      advisoryRainy: '⚠️ ಮಳೆಯ ಮುನ್ಸೂಚನೆ ಇರುವುದರಿಂದ ಯೂರಿಯಾ ಹಾಕುವುದು, ಸಿಂಪಡಣೆ ಮತ್ತು ನೀರಾವರಿ ಬೇಡ.',
      advisoryModerateRain: '⚠️ ಹಗುರ ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆಯಿದೆ. ಸಿಂಪಡಣೆಯನ್ನು ತಾತ್ಕಾಲಿಕವಾಗಿ ಮುಂದೂಡಿ.',
      advisoryHumidCloud: '⚠️ ಹೆಚ್ಚಿನ ભેಗ ಮತ್ತು ಮೋಡಗಳಿಂದಾಗಿ ಕೀಟ/ರೋಗ ಬಾಧೆಯನ್ನು ಗಮನಿಸಿ.',
      advisoryHotDry: '✅ ಹವಾಮಾನ ಬಿಸಿಯಾಗಿದ್ದು ಒಣಗಿದೆ. ಅಗತ್ಯಕ್ಕೆ ತಕ್ಕಂತೆ ನೀರಾವರಿ ಮಾಡಿ.',
      advisoryDefault: '✅ ಔಷಧ ಸಿಂಪಡಣೆ ಮತ್ತು ಕಳೆ ತೆಗೆಯಲು ವಾತಾವರಣ ಸೂಕ್ತವಾಗಿದೆ.'
    },
    ml: {
      thunderstorm: 'കനത്ത മഴയും ഇടിമിന്നലും',
      rainy: 'മഴയും ഈർപ്പമുള്ള കാലാവസ്ഥയും',
      possibilityRain: 'നേരിയ മഴയ്ക്ക് സാധ്യത / മേഘാവൃതം',
      overcast: 'കനത്ത മേഘാവൃതമായ കാലാവസ്ഥ',
      cloudy: 'ഭാഗികമായി മേഘാവൃതമാണ്',
      sunnyWarm: 'ചൂടുള്ള കാലാവസ്ഥ',
      clearPleasant: 'തെളിഞ്ഞ കാലാവസ്ഥ',

      forecastThunderstorm: `അടുത്ത 24 മണിക്കൂറിൽ കനത്ത മഴയ്ക്ക് സാധ്യതയുണ്ട് (സാധ്യത: ${rainProb}%).`,
      forecastRainy: `അടുത്ത 24 മണിക്കൂറിൽ മഴയും ഈർപ്പവുമുള്ള കാലാവസ്ഥയായിരിക്കും (സാധ്യത: ${rainProb}%).`,
      forecastPossibility: `അടുത്ത 24 മണിക്കൂറിൽ നേരിയ മഴയ്ക്ക് സാധ്യതയുണ്ട് (സാധ്യത: ${rainProb}%).`,
      forecastOvercast: `മേഘാവൃതമായ കാലാവസ്ഥയായിരിക്കും (സാധ്യത: ${rainProb}%, മേഘം: ${clouds}%).`,
      forecastClear: `കാലാവസ്ഥ പ്രധാനമായും സാധാരണവും അനുകൂലവുമായിരിക്കും (സാധ്യത: ${rainProb}%).`,

      advisoryRainy: '⚠️ മഴസാധ്യത ഉള്ളതിനാൽ വളപ്രയോഗവും മരുന്ന് തളിക്കലും നനയ്ക്കലും ഒഴിവാക്കുക.',
      advisoryModerateRain: '⚠️ നേരിയ മഴയ്ക്ക് സാധ്യതയുണ്ട്. മരുന്ന് തളിക്കുന്നത് മാറ്റിവെക്കുക.',
      advisoryHumidCloud: '⚠️ ഉയർന്ന ഈർപ്പവും മേഘാവൃത അന്തരീക്ഷവും കാരണം കീടരോഗ സാധ്യത പരിശോധിക്കുക.',
      advisoryHotDry: '✅ ചൂടുള്ള വരണ്ട കാലാവസ്ഥ. ആവശ്യാനുസരണം നേരിയ നന നൽകുക.',
      advisoryDefault: '✅ മരുന്ന് തളിക്കുന്നതിനും കളപറിക്കുന്നതിനും അനുയോജ്യമായ സമയം.'
    }
  };

  const selectedDict = dict[lang] || dict['hi'];

  let condition = selectedDict.clearPleasant;
  let forecast = selectedDict.forecastClear;
  let advisory = selectedDict.advisoryDefault;

  if (rainProb > 80 || main.includes('thunderstorm')) {
    condition = selectedDict.thunderstorm;
    forecast = selectedDict.forecastThunderstorm;
    advisory = selectedDict.advisoryRainy;
  } else if (rainProb > 60 || main.includes('rain') || main.includes('drizzle')) {
    condition = selectedDict.rainy;
    forecast = selectedDict.forecastRainy;
    advisory = selectedDict.advisoryRainy;
  } else if (rainProb > 40) {
    condition = selectedDict.possibilityRain;
    forecast = selectedDict.forecastPossibility;
    advisory = selectedDict.advisoryModerateRain;
  } else if (isHighCloud) {
    condition = selectedDict.overcast;
    forecast = selectedDict.forecastOvercast;
    advisory = isHighHumidAndCloud ? selectedDict.advisoryHumidCloud : selectedDict.advisoryDefault;
  } else if (clouds > 30) {
    condition = selectedDict.cloudy;
    forecast = selectedDict.forecastClear;
    advisory = isHighHumidAndCloud ? selectedDict.advisoryHumidCloud : selectedDict.advisoryDefault;
  } else if (isHotDry) {
    condition = selectedDict.sunnyWarm;
    forecast = selectedDict.forecastClear;
    advisory = selectedDict.advisoryHotDry;
  } else {
    condition = selectedDict.clearPleasant;
    forecast = selectedDict.forecastClear;
    advisory = selectedDict.advisoryDefault;
  }

  return {
    condition,
    forecast,
    advisory,
    isSpraySafe
  };
}

// Generates dynamic weather advisory based on State, District, and Language
export function getWeatherAdvisory(stateId: string, districtName: string, langCode: string = 'hi') {
  const temp = 31;
  const humidity = 60;
  const clouds = 25;
  const rainProb = 20;

  const agri = generateAgriAdvisory({
    temp,
    humidity,
    clouds,
    rainProb,
    weatherMain: 'Clear'
  }, langCode);

  const stateObj = indianStates.find(s => s.id === stateId);
  const stateNameStr = stateObj ? stateObj.name.split(' (')[0].replace(/^[^\w\s]+/, '').trim() : (stateId || '');

  const cleanDist = (districtName || '').trim().replace(/^[\s,]+|[\s,]+$/g, '');
  const cleanState = (stateNameStr || '').trim().replace(/^[\s,]+|[\s,]+$/g, '');

  let loc = cleanDist;
  if (cleanDist && cleanState) {
    loc = `${cleanDist}, ${cleanState}`;
  } else if (cleanState) {
    loc = cleanState;
  }

  return {
    location: loc,
    temp: `${temp}°C`,
    humidity: `${humidity}%`,
    condition: agri.condition,
    forecast: agri.forecast,
    advisory: agri.advisory,
    isSpraySafe: agri.isSpraySafe,
    provider: 'OpenWeather API'
  };
}

// Central and State-Specific Government Schemes
export const governmentSchemes: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)',
    authority: 'भारत सरकार (Central Govt)',
    benefits: 'प्रति वर्ष ₹6,000 की वित्तीय सहायता (₹2,000 की 3 समान किस्तों में) सीधे बैंक खाते में।',
    eligibility: 'सभी छोटे और सीमांत किसान परिवार जिनके पास खेती योग्य भूमि है।',
    howToApply: [
      'आधिकारिक पीएम-किसान पोर्टल (pmkisan.gov.in) पर जाएं।',
      '"Farmers Corner" में "New Farmer Registration" पर क्लिक करें।',
      'आधार कार्ड, बैंक खाता और खतौनी (जमीन का विवरण) दर्ज करें।',
      'सबमिट करें और ग्राम पटवारी या कृषि अधिकारी से सत्यापन करवाएं।'
    ],
    category: 'central'
  },
  {
    id: 'pm-fby',
    name: 'प्रधानमंत्री फसल बीमा योजना (PMFBY)',
    authority: 'भारत सरकार एवं राज्य सरकार',
    benefits: 'प्राकृतिक आपदाओं, कीटों और बीमारियों से फसल नष्ट होने पर वित्तीय सुरक्षा और मुआवजा। खरीफ के लिए 2%, रबी के लिए 1.5% और वाणिज्यिक फसलों के लिए 5% का न्यूनतम प्रीमियम।',
    eligibility: 'खेती योग्य भूमि पर अधिसूचित फसलों की खेती करने वाले सभी बटाईदार और काश्तकार किसान।',
    howToApply: [
      'फसल बुवाई के 10 दिनों के भीतर बैंक या बीमा अधिकृत पोर्टल पर जाएं।',
      'अपनी बोई गई फसल और भूमि क्षेत्र का घोषणा पत्र भरें।',
      'आवश्यक प्रीमियम राशि जमा करें और रसीद लें।',
      'नुकसान होने पर 72 घंटों के भीतर टोल-फ्री नंबर पर रिपोर्ट करें।'
    ],
    category: 'central'
  },
  {
    id: 'soil-health-card',
    name: 'मृदा स्वास्थ्य कार्ड योजना (Soil Health Card)',
    authority: 'कृषि एवं किसान कल्याण मंत्रालय',
    benefits: 'खेत की मिट्टी के स्वास्थ्य की जांच (12 पैरामीटर) और आवश्यक खादों की सही मात्रा की निःशुल्क वैज्ञानिक सलाह।',
    eligibility: 'भारत के सभी किसान जिनके पास कृषि योग्य भूमि है।',
    howToApply: [
      'नजदीकी मिट्टी परीक्षण प्रयोगशाला या कृषि विस्तार अधिकारी से संपर्क करें।',
      'खेत से मिट्टी का नमूना (वी-आकार में ६ इंच गहरा) एकत्रित करें।',
      'नमूने को लैब में जमा करें। ३-४ सप्ताह में कार्ड आपके पास पहुंच जाएगा।'
    ],
    category: 'central'
  },
  // UP State schemes
  {
    id: 'up-karj-mafi',
    name: 'यूपी किसान कर्ज राहत योजना (UP Karj Mafi)',
    authority: 'उत्तर प्रदेश सरकार (UP Govt)',
    benefits: 'छोटे एवं सीमांत किसानों के ₹1 लाख तक के कृषि ऋण (लोन) की माफी।',
    eligibility: 'उत्तर प्रदेश के स्थायी निवासी, सीमांत किसान (2 हेक्टेयर से कम भूमि)। कृषि ऋण 2016 से पहले का होना चाहिए।',
    howToApply: [
      'आधिकारिक राहत योजना पोर्टल (upkisankarjrahat.upsdc.gov.in) पर जाएं।',
      'अपना जिला, बैंक शाखा, और किसान क्रेडिट कार्ड (KCC) नंबर दर्ज करें।',
      'दस्तावेजों को सबमिट करें और तहसील स्तर पर जांच के बाद लाभार्थी सूची में अपना नाम देखें।'
    ],
    category: 'state',
    state: 'UP'
  },
  // Punjab state schemes
  {
    id: 'punjab-tubewell',
    name: 'पंजाब मुफ्त ट्यूबवेल बिजली योजना (Free Tubewell Power)',
    authority: 'पंजाब सरकार (Punjab Govt)',
    benefits: 'खेती के लिए ट्यूबवेल और सिंचाई पंपों के लिए 100% मुफ्त बिजली आपूर्ति।',
    eligibility: 'पंजाब राज्य के सभी पंजीकृत किसान जिनके पास कृषि भूमि और वैध बिजली कनेक्शन है।',
    howToApply: [
      'पंजाब राज्य पावर कॉर्पोरेशन लिमिटेड (PSPCL) की नजदीकी शाखा में आवेदन करें।',
      'खेती की खतौनी और कृषि पंप स्थापना का प्रमाणपत्र जमा करें।',
      'कृषि विभाग से सत्यापन मिलने के बाद मुफ्त टैरिफ लागू कर दिया जाएगा।'
    ],
    category: 'state',
    state: 'Punjab'
  },
  // Haryana state schemes
  {
    id: 'haryana-meri-fasal',
    name: 'मेरी फसल मेरा ब्यौरा योजना (Meri Fasal Mera Byora)',
    authority: 'हरियाणा सरकार (Haryana Govt)',
    benefits: 'फसलों को सरकारी दर पर मंडी में बेचने की अनुमति, फसल नुकसान मुआवजे का सीधा भुगतान और वित्तीय प्रोत्साहन।',
    eligibility: 'हरियाणा के सभी किसान जो राज्य की मंडियों में अपनी खरीफ या रबी फसल बेचना चाहते हैं।',
    howToApply: [
      'पोर्टल fasal.haryana.gov.in पर जाएं।',
      'मोबाइल नंबर और परिवार पहचान पत्र (PPP) से लॉगिन करें।',
      'बोई गई फसल, किला नंबर और खसरा नंबर का सही विवरण भरें।',
      'पंजीकरण की रसीद प्रिंट करें जो फसल बिक्री के समय आवश्यक होगी।'
    ],
    category: 'state',
    state: 'Haryana'
  },
  // MP state schemes
  {
    id: 'mp-bhavantar',
    name: 'मुख्यमंत्री भावन्तर भुगतान योजना',
    authority: 'मध्य प्रदेश सरकार (MP Govt)',
    benefits: 'फसल की बाजार दर और सरकार द्वारा तय न्यूनतम समर्थन मूल्य (MSP) के बीच के अंतर का सीधा बैंक खाते में भुगतान।',
    eligibility: 'मध्य प्रदेश के पंजीकृत किसान जो तिलहन, दलहन या मक्का की खेती करते हैं।',
    howToApply: [
      'नजदीकी प्राथमिक कृषि सहकारी समिति या ई-उपार्जन केंद्र पर जाएं।',
      'भूमि रिकॉर्ड और बैंक खाते की प्रति देकर अपना "भावन्तर" पंजीकरण करवाएं।',
      'फसल बेचने के बाद मंडी रसीद अपलोड करें। मुआवजा सीधे खाते में आएगा।'
    ],
    category: 'state',
    state: 'MP'
  },
  // Bihar state schemes
  {
    id: 'bihar-diesel',
    name: 'बिहार कृषि इनपुट अनुदान योजना (Bihar Krishi Input)',
    authority: 'बिहार सरकार (Bihar Govt)',
    benefits: 'सूखा या बाढ़ जैसी प्राकृतिक आपदा से प्रभावित फसल के लिए ₹6,800 से ₹18,000 प्रति हेक्टेयर का अनुदान।',
    eligibility: 'बिहार राज्य के सूखा/बाढ़ अधिसूचित जिलों के पीड़ित किसान।',
    howToApply: [
      'डीबीटी कृषि बिहार पोर्टल (dbtagriculture.bihar.gov.in) पर जाएं।',
      'अपना १३ अंकों का किसान पंजीकरण नंबर दर्ज करें।',
      'बाढ़/सूखा प्रभावित क्षेत्र का विवरण और बैंक खाता सत्यापित करें।',
      'ग्राम समन्वयक (कृषि समन्वयक) की भौतिक जांच के बाद राशि जारी होगी।'
    ],
    category: 'state',
    state: 'Bihar'
  },
  // Rajasthan state schemes
  {
    id: 'rajasthan-tarbandi',
    name: 'राजस्थान तारबंदी योजना (Tarbandi Subsidy)',
    authority: 'राजस्थान सरकार (Rajasthan Govt)',
    benefits: 'खेतों के चारों ओर कंटीले तारों की बाड़ लगाने के लिए कुल खर्च का 50% या अधिकतम ₹40,000 की सरकारी सब्सिडी।',
    eligibility: 'राजस्थान के किसान जिनके पास न्यूनतम 0.5 हेक्टेयर कृषि भूमि है।',
    howToApply: [
      'राजकिसान साथी पोर्टल (rajkisan.rajasthan.gov.in) पर जाएं।',
      'एसएसओ आईडी या जन आधार कार्ड के माध्यम से पंजीकरण करें।',
      'तारबंदी सब्सिडी फॉर्म भरकर जमाबंदी की नकल अपलोड करें।',
      'कृषि पर्यवेक्षक की भौतिक जांच के बाद राशि बैंक खाते में हस्तांतरित होगी।'
    ],
    category: 'state',
    state: 'Rajasthan'
  }
];

// Fertilizer recommendations per crop (N-P-K recommendation in kg per acre)
export const fertilizerRecommendations: Record<string, { urea: number; dap: number; mop: number; advice: string }> = {
  wheat: {
    urea: 110, // ~ 2.5 bags
    dap: 55,   // ~ 1 bag
    mop: 30,   // ~ 0.5 bags
    advice: 'गेहूं के लिए: डीएपी और मोटोश की पूरी मात्रा बुवाई के समय डालें। यूरिया को ३ भागों में बांटकर पहली सिंचाई, दूसरी सिंचाई और बालियां निकलते समय डालें।'
  },
  paddy: {
    urea: 120, // ~ 2.5 bags
    dap: 60,   // ~ 1.2 bags
    mop: 40,   // ~ 0.8 bags
    advice: 'धान के लिए: धान की रोपाई के समय डीएपी और मोटोश पूरा डालें। यूरिया को तीन समान हिस्सों में बांटकर: रोपाई के ७ दिन बाद, कल्ले फूटते समय और फूल आने से ठीक पहले डालें।'
  },
  cotton: {
    urea: 130, // ~ 2.8 bags
    dap: 50,   // ~ 1 bag
    mop: 35,   // ~ 0.7 bags
    advice: 'कपास के लिए: फास्फोरस (DAP) और पोटाश (MOP) की पूरी मात्रा आखिरी जुताई के समय दें। नाइट्रोजन (यूरिया) को दो भागों में विभाजित करके कल्ले आने और फूल बनने की अवस्था में दें।'
  },
  maize: {
    urea: 100, // ~ 2 bags
    dap: 50,   // ~ 1 bag
    mop: 25,   // ~ 0.5 bags
    advice: 'मक्का के लिए: बुवाई के समय डीएपी और पोटाश की पूरी मात्रा डालें। मक्के में घुटने के बराबर ऊंचाई आने पर यूरिया की पहली खुराक और बालियां बनते समय दूसरी खुराक दें।'
  },
  sugarcane: {
    urea: 250, // ~ 5 bags
    dap: 100,  // ~ 2 bags
    mop: 80,   // ~ 1.6 bags
    advice: 'गन्ना के लिए: बुवाई की नालियों में डीएपी और आधा पोटाश डालें। यूरिया को ४ समान खुराकों में विभाजित कर रोपण के ३०, ६०, ९० और १२० दिनों बाद दें। बचा हुआ पोटाश ९०वें दिन दें।'
  }
};

// Soil Health profile default parameters and corrective advice based on soil type
export const soilProfiles: Record<string, { nitrogen: string; phosphorus: string; potassium: string; pH: number; organicCarbon: string; correctionAdvice: string }> = {
  alluvial: {
    nitrogen: 'मध्यम (Medium)',
    phosphorus: 'कम (Low)',
    potassium: 'उच्च (High)',
    pH: 7.2,
    organicCarbon: '0.45% (कम)',
    correctionAdvice: 'मिट्टी में नाइट्रोजन की कमी को पूरा करने के लिए हरी खाद (जैसे ढैंचा) की बुवाई करें। रबी फसल में फास्फोरस की उचित मात्रा (DAP) अवश्य डालें। जैविक गोबर की सड़ी खाद ५ टन प्रति एकड़ डालें।'
  },
  black: {
    nitrogen: 'कम (Low)',
    phosphorus: 'मध्यम (Medium)',
    potassium: 'उच्च (High)',
    pH: 7.8,
    organicCarbon: '0.55% (मध्यम)',
    correctionAdvice: 'यह मिट्टी नमी बनाए रखने में उत्तम है। फास्फोरस की कमी के लिए सुपर फास्फेट का प्रयोग करें। जलभराव की समस्या से बचने के लिए उचित जल निकासी नालियां बनाएं। सूक्ष्म पोषक तत्व जैसे जिंक सल्फेट छिड़कें।'
  },
  red: {
    nitrogen: 'कम (Low)',
    phosphorus: 'कम (Low)',
    potassium: 'मध्यम (Medium)',
    pH: 6.2,
    organicCarbon: '0.35% (कम)',
    correctionAdvice: 'लाल मिट्टी में चूना और जैविक खाद मिलाकर pH संतुलित करें। फास्फोरस और पोटाश की पर्याप्त मात्रा के साथ नीम लेपित यूरिया का प्रयोग करें।'
  },
  laterite: {
    nitrogen: 'कम (Low)',
    phosphorus: 'अत्यंत कम (Very Low)',
    potassium: 'कम (Low)',
    pH: 5.5,
    organicCarbon: '0.40% (कम)',
    correctionAdvice: 'अम्लीयता दूर करने के लिए कृषि चूना (Lime) का छिड़काव करें। केंचुआ खाद तथा फास्फोरस (Single Super Phosphate) का प्रयोग करें।'
  },
  sandy: {
    nitrogen: 'अत्यंत कम (Very Low)',
    phosphorus: 'मध्यम (Medium)',
    potassium: 'कम (Low)',
    pH: 8.2,
    organicCarbon: '0.25% (अत्यंत कम)',
    correctionAdvice: 'रेतीली मिट्टी में पोषक तत्व बहुत जल्दी बह जाते हैं। इसलिए खादों को बहुत कम-कम मात्रा में कई बार (Splitting) में दें। गोबर की खाद या कम्पोस्ट का प्रचुर उपयोग करें। ड्रिप (टपक सिंचाई) तकनीक अपनाएं।'
  },
  clayey: {
    nitrogen: 'मध्यम (Medium)',
    phosphorus: 'कम (Low)',
    potassium: 'मध्यम (Medium)',
    pH: 6.5,
    organicCarbon: '0.50% (मध्यम)',
    correctionAdvice: 'मिट्टी की जल सोखने की क्षमता बढ़ाने के लिए पर्याप्त मात्रा में जैविक खाद और केंचुआ खाद का प्रयोग करें। जिप्सम २ क्विंटल प्रति एकड़ मिलाने से मिट्टी का कड़ापन कम होगा और जड़ों का विकास अच्छा होगा।'
  },
  loamy: {
    nitrogen: 'उत्तम (High)',
    phosphorus: 'मध्यम (Medium)',
    potassium: 'उत्तम (High)',
    pH: 6.8,
    organicCarbon: '0.65% (उत्तम)',
    correctionAdvice: 'दोमट मिट्टी खेती के लिए सर्वोत्कृष्ट है। फसल चक्र अपनाएं और सामान्य जैविक कम्पोस्ट एवं संतुलित NPK का छिड़काव करें।'
  },
  mountain: {
    nitrogen: 'मध्यम (Medium)',
    phosphorus: 'कम (Low)',
    potassium: 'उच्च (High)',
    pH: 5.8,
    organicCarbon: '0.75% (उच्च)',
    correctionAdvice: 'सीढ़ीदार खेतों में मिट्टी का कटाव रोकने के लिए गीली घास (Mulching) बिछाएं। जैविक खाद एवं जिंक का प्रयोग करें।'
  },
  saline: {
    nitrogen: 'कम (Low)',
    phosphorus: 'कम (Low)',
    potassium: 'मध्यम (Medium)',
    pH: 8.5,
    organicCarbon: '0.30% (कम)',
    correctionAdvice: 'क्षारीयता घटाने के लिए जिप्सम (2-3 टन/एकड़) या पाइराइट डालें। खेत में साफ पानी भरकर जल निकासी करें ताकि लवण बह जाएं।'
  },
  other: {
    nitrogen: 'सामान्य (Normal)',
    phosphorus: 'सामान्य (Normal)',
    potassium: 'सामान्य (Normal)',
    pH: 7.0,
    organicCarbon: '0.50% (सामान्य)',
    correctionAdvice: 'स्थानीय कृषि विज्ञान केंद्र (KVK) से मिट्टी की जांच करवाएं और स्वास्थ कार्ड के अनुसार संतुलित NPK तथा गोबर खाद का प्रयोग करें।'
  }
};

// Growth stages and crop calendars
export const cropCalendars: Record<string, { stage: string; days: string; water: string; activity: string; progress: number }[]> = {
  wheat: [
    { stage: 'अंकुरण एवं क्राउन रूट (CRI)', days: '1 - 25 दिन', water: 'पहली महत्वपूर्ण सिंचाई अत्यंत आवश्यक', activity: 'बुवाई के २१ दिन बाद पहली सिंचाई करें। यूरिया की पहली खुराक डालें।', progress: 15 },
    { stage: 'कल्ले फूटना (Tillering)', days: '26 - 50 दिन', water: 'नमी लगातार बनाए रखें', activity: 'निराई-गुड़ाई करें या खरपतवार नाशक दवा का छिड़काव करें।', progress: 40 },
    { stage: 'गांठ बनना (Jointing)', days: '51 - 80 दिन', water: 'दूसरी सिंचाई महत्वपूर्ण', activity: 'यूरिया की अंतिम खुराक दें। पीला रतुआ रोग की निगरानी करें।', progress: 65 },
    { stage: 'बालियां आना व दाना भरना (Flowering & Milky)', days: '81 - 110 दिन', water: 'हल्की सिंचाई की आवश्यकता', activity: 'मौसम शुष्क होने पर फफूंदनाशक का छिड़काव करें। तेज हवा में सिंचाई न करें।', progress: 85 },
    { stage: 'कटाई व मड़ाई (Harvesting)', days: '111 - 135 दिन', water: 'सिंचाई पूर्णतः बंद', activity: 'जब पत्तियां और दाने सुनहरे पीले रंग के हो जाएं, तब कटाई करें।', progress: 100 }
  ],
  paddy: [
    { stage: 'नर्सरी व रोपाई (Transplanting)', days: '1 - 30 दिन', water: 'खेत में २-३ इंच पानी भरा रखें', activity: 'रोपाई के समय जिंक सल्फेट और डीएपी का पूरा छिड़काव करें।', progress: 20 },
    { stage: 'कल्ले फूटना व बढ़वार (Tillering)', days: '31 - 65 दिन', water: 'जलभराव ५ सेमी बनाए रखें', activity: 'रोपाई के २५ दिन बाद पहला यूरिया छिड़काव करें। तना छेदक कीट की निगरानी करें।', progress: 50 },
    { stage: 'बालियां निकलना (Panicle Initiation)', days: '66 - 90 दिन', water: 'नमी अत्यंत आवश्यक', activity: 'फूल आने की अवस्था में यूरिया की अंतिम खुराक दें। फंगस जनित रोगों से सावधान रहें।', progress: 75 },
    { stage: 'दूधिया अवस्था व दाना पकना (Milking & Dough)', days: '91 - 115 दिन', water: 'हल्की नमी, गीली-सूखी सिंचाई', activity: 'झोंका (Blast) और भूरा धब्बा रोग के उपचार के लिए उचित दवा छिड़कें।', progress: 90 },
    { stage: 'कटाई (Harvesting)', days: '116 - 135 दिन', water: 'कटाई से १५ दिन पूर्व पानी सुखा लें', activity: 'जब ९०% बालियां सुनहरी हो जाएं, तब धान की कटाई कर सुरक्षित मड़ाई करें।', progress: 100 }
  ],
  cotton: [
    { stage: 'प्रारंभिक स्थापना (Establishment)', days: '1 - 35 दिन', water: 'सामान्य हल्की सिंचाई', activity: 'पौधों के बीच की दूरी का प्रबंधन करें और अतिरिक्त पौधों को निकालें।', progress: 20 },
    { stage: 'शाखाएं निकलना व कलियां आना (Squaring)', days: '36 - 70 दिन', water: 'नियमित अंतराल पर सिंचाई', activity: 'पहली खरपतवार निराई करें। गुलाबी सुंडी से बचाव हेतु फेरोमोन ट्रैप लगाएं।', progress: 50 },
    { stage: 'फूल और डोडे बनना (Flowering & Bolling)', days: '71 - 110 दिन', water: 'नमी की कमी न होने दें वरना डोडे गिर जाएंगे', activity: 'पोषक तत्व स्प्रे करें (NPK 19:19:19)। रस चूसक कीटों पर विशेष ध्यान दें।', progress: 80 },
    { stage: 'डोडे फटना व चुगाई (Boll Bursting & Picking)', days: '111 - 150 दिन', water: 'सिंचाई कम या बंद करें', activity: 'सूखे और खिले हुए डोडों से कपास की पहली और दूसरी चुगाई सुबह के समय करें।', progress: 100 }
  ],
  maize: [
    { stage: 'अंकुरण व वृद्धि (Seedling & Knee High)', days: '1 - 30 दिन', water: 'मध्यम नमी, जलभराव न होने दें', activity: 'खरपतवार नियंत्रण करें। कीट जैसे फॉल आर्मीवर्म की सघन जांच करें।', progress: 25 },
    { stage: 'नर मंजरी निकलना (Tasseling)', days: '31 - 55 दिन', water: 'अत्यंत संवेदनशील सिंचाई अवस्था', activity: 'मक्का में घुटने तक ऊंचाई होने पर यूरिया की मुख्य खुराक छिड़कें।', progress: 55 },
    { stage: 'भुट्टा बनना (Silking & Cob Development)', days: '56 - 85 दिन', water: 'पानी का तनाव न होने दें', activity: 'दाने भरते समय बालियों के चारों ओर सुरक्षात्मक फफूंदनाशक छिड़कें।', progress: 80 },
    { stage: 'परिपक्वता व सूखाना (Maturity & Drying)', days: '86 - 110 दिन', water: 'सिंचाई पूर्णतः बंद', activity: 'भुट्टे के ऊपर के आवरण (Husk) सूखकर सफेद होने पर तुड़ाई करें और सुखाएं।', progress: 100 }
  ],
  sugarcane: [
    { stage: 'जमाव व कल्ले फूटने (Germination & Tillering)', days: '1 - 90 दिन', water: 'हल्की एवं बार-बार सिंचाई', activity: 'बुवाई के समय डीएपी और पोटाश डालें। समय-समय पर हल्की निराई करें।', progress: 25 },
    { stage: 'तीव्र बढ़वार काल (Grand Growth)', days: '91 - 240 दिन', water: '१०-१५ दिनों के अंतराल पर सघन सिंचाई', activity: 'यूरिया की खुराकें दें। गिरने से बचाने के लिए गन्ने को आपस में बांधें।', progress: 70 },
    { stage: 'परिपक्वता व मिठास (Maturity & Sugaring)', days: '241 - 330 दिन', water: 'सर्दियों में २० दिनों पर सिंचाई', activity: 'गन्ने में सुक्रोज का स्तर मापने के बाद कटाई शुरू करें। मिलों को समय पर आपूर्ति करें।', progress: 100 }
  ]
};

// Crop risk index rules based on crop & weather & soil
export function getCropRiskAssessment(cropId: string, stateId: string, langCode: string = 'hi') {
  let level: 'low' | 'medium' | 'high' = 'low';
  let levelText = 'कम जोखिम (Safe)';
  let riskName = 'कोई बड़ा खतरा नहीं है।';
  let actionText = 'फसल सामान्य रूप से बढ़ रही है। सामान्य देखभाल जारी रखें।';

  if (langCode === 'en') {
    levelText = 'Low Risk (Safe)';
    riskName = 'No major crop threat identified.';
    actionText = 'Crop growth is normal. Continue standard field management and observations.';
  } else if (langCode === 'mr') {
    levelText = 'कमी धोका (सुरक्षित)';
    riskName = 'कोणताही मोठा धोका नाही.';
    actionText = 'पीक सामान्यपणे वाढत आहे. नेहमीप्रमाणे काळजी घ्या.';
  } else if (langCode === 'gu') {
    levelText = 'ઓછું જોખમ (સુરક્ષિત)';
    riskName = 'કોઈ મોટો ભય નથી.';
    actionText = 'પાક સામાન્ય રીતે વધી રહ્યો છે. સામાન્ય સંભાળ ચાલુ રાખો.';
  } else if (langCode === 'pa') {
    levelText = 'ਘੱਟ ਜੋਖਮ (ਸੁਰੱਖਿਅਤ)';
    riskName = 'ਕੋਈ ਵੱਡਾ ਖ਼ਤਰਾ ਨਹੀਂ।';
    actionText = 'ਫਸਲ ਆਮ ਤੌਰ ਤੇ ਵਧ ਰਹੀ ਹੈ। ਆਮ ਦੇਖਭਾਲ ਜਾਰੀ ਰੱਖੋ।';
  } else if (langCode === 'bn') {
    levelText = 'কম ঝুঁকি (নিরাপদ)';
    riskName = 'কোনো বড় আশঙ্কা নেই।';
    actionText = 'ফসল স্বাভাবিকভাবে বৃদ্ধি পাচ্ছে। সাধারণ পরিচর্যা জারি রাখুন।';
  } else if (langCode === 'ta') {
    levelText = 'குறைந்த அபாயம் (பாதுகாப்பானது)';
    riskName = 'பெரிய அச்சுறுத்தல் எதுவும் இல்லை.';
    actionText = 'பயிர் இயல்பாக വളர்கிறது. வழக்கமான பராமரிப்பைத் தொடரவும்.';
  } else if (langCode === 'te') {
    levelText = 'తక్కువ ప్రమాదం (సురక్షితం)';
    riskName = 'పెద్ద ప్రమాదం ఏమీ లేదు.';
    actionText = 'పంట సాధారణంగా పెరుగుతోంది. సాధారణ సంరక్షణ కొనసాగించండి.';
  } else if (langCode === 'kn') {
    levelText = 'ಕಡಿಮೆ ಅಪಾಯ (ಸುರಕ್ಷಿತ)';
    riskName = 'ಯಾವುದೇ ದೊಡ್ಡ ಅಪಾಯವಿಲ್ಲ.';
    actionText = 'ಬೆಳೆ ಸಾಮಾನ್ಯ ರೀತಿಯಲ್ಲಿ ಬೆಳೆಯುತ್ತಿದೆ. ಸಾಮಾನ್ಯ ಆರೈಕೆ ಮುಂದುವರಿಸಿ.';
  } else if (langCode === 'ml') {
    levelText = 'കുറഞ്ഞ അപകടസാധ്യത';
    riskName = 'വലിയ ഭീഷണിയില്ല.';
    actionText = 'വിള സാധാരണ രീതിയിൽ വളരുന്നു. സാധാരണ പരിചരണം തുടരുക.';
  }

  if (cropId === 'wheat' && (stateId === 'Punjab' || stateId === 'Haryana')) {
    level = 'medium';
    levelText = 'मध्यम जोखिम (Alert)';
    riskName = 'पीला रतुआ (Yellow Rust) और असमय बारिश';
    actionText = 'फसल की पत्तियों की नियमित जांच करें। यदि पीला रतुआ के लक्षण दिखें, तो प्रोपीकोनाज़ोल का छिड़काव तुरंत करें।';

    if (langCode === 'en') {
      levelText = 'Medium Risk (Alert)';
      riskName = 'Yellow Rust & Unseasonal Rainfall';
      actionText = 'Inspect leaves regularly. Spray Propiconazole fungicide immediately if yellow rust symptoms appear.';
    } else if (langCode === 'mr') {
      levelText = 'मध्यम धोका (इशारा)';
      riskName = 'पिवळा तांबेरा आणि अवकाळी पाऊस';
      actionText = 'पानांची नियमित तपासणी करा. तांबेरा आढळल्यास प्रोपिकोनाझोलची फवारणी करा.';
    } else if (langCode === 'gu') {
      levelText = 'મધ્યમ જોખમ (એલર્ટ)';
      riskName = 'પીળો ગેરુ (યલો રસ્ટ) અને કમોસમી વરસાદ';
      actionText = 'પાંદડાની તપાસ કરો. ગેરુના લક્ષણો દેખાય તો પ્રોપિકોનાઝોલનો છંટકાવ કરો.';
    } else if (langCode === 'pa') {
      levelText = 'ਦਰਮਿਆਨਾ ਜੋਖਮ (ਅਲਰਟ)';
      riskName = 'ਪੀਲੀ ਕੁੰਗੀ (Yellow Rust) ਅਤੇ ਬੇਮੌਸਮੀ ਬਾਰਿਸ਼';
      actionText = 'ਪੱਤਿਆਂ ਦੀ ਨਿਯਮਿਤ ਜਾਂਚ ਕਰੋ। ਪੀਲੀ ਕੁੰਗੀ ਦਿਖਣ ਤੇ ਪ੍ਰੋਪੀਕੋਨਾਜ਼ੋਲ ਦਾ ਸਪਰੇਅ ਕਰੋ।';
    } else if (langCode === 'bn') {
      levelText = 'মাঝারি ঝুঁকি (সতর্কতা)';
      riskName = 'হলুদ মরিচা (Yellow Rust) ও অসময়ের বৃষ্টি';
      actionText = 'পাতা নিয়মিত পরীক্ষা করুন। লক্ষণ দেখলে প্রোপিকোনাজোল স্প্রে করুন।';
    } else if (langCode === 'ta') {
      levelText = 'மிதமான அபாயம் (எச்சரிக்கை)';
      riskName = 'மஞ்சள் துரு நோய் மற்றும் பருவம் தவறிய மழை';
      actionText = 'இலைகளை தவறாமல் பரிசோதிக்கவும். அறிகுறி தென்பட்டால் புரோபிகோனசோல் தெளிக்கவும்.';
    } else if (langCode === 'te') {
      levelText = 'మధ్యస్థ ప్రమాదం (హెచ్చరిక)';
      riskName = 'పసుపు కుంకుమ తెగులు మరియు అకాల వర్షం';
      actionText = 'ఆకులను క్రమం తప్పకుండా తనిఖీ చేయండి. ప్రొపికోనజోల్ పిచికారీ చేయండి.';
    } else if (langCode === 'kn') {
      levelText = 'ಮಧ್ಯಮ ಅಪಾಯ (ಎಚ್ಚರಿಕೆ)';
      riskName = 'ಹಳದಿ ತುಕ್ಕು ರೋಗ ಮತ್ತು ಅಕಾಲಿಕ ಮಳೆ';
      actionText = 'ಎಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ. ರೋಗದ ಲಕ್ಷಣವಿದ್ದರೆ ಪ್ರೊಪಿಕೊನಜೋಲ್ ಸಿಂಪಡಿಸಿ.';
    } else if (langCode === 'ml') {
      levelText = 'മിതമായ അപകടസാധ്യത';
      riskName = 'മഞ്ഞ തുരുമ്പ് രോഗവും അസമയത്തുള്ള മഴയും';
      actionText = 'ഇലകൾ പതിവായി പരിശോധിക്കുക. രോഗലക്ഷണം കണ്ടാൽ പ്രൊപ്പിക്കൊനാസോൾ തളിക്കുക.';
    }
  } else if (cropId === 'paddy' && stateId === 'UP') {
    level = 'high';
    levelText = 'उच्च जोखिम (Danger)';
    riskName = 'धान का झोंका रोग (Blast Disease) व तना छेदक';
    actionText = 'खेत में पानी जमा न रहने दें, उचित जल निकासी करें। ट्राईसाइक्लाज़ोल फफूंदनाशक का ०.६ ग्राम प्रति लीटर पानी में मिलाकर छिड़काव करें।';

    if (langCode === 'en') {
      levelText = 'High Risk (Danger)';
      riskName = 'Paddy Blast Disease & Stem Borer';
      actionText = 'Avoid stagnant water. Ensure proper drainage and spray Tricyclazole @ 0.6g per liter of water.';
    } else if (langCode === 'mr') {
      levelText = 'उच्च धोका (धोकादायक)';
      riskName = 'भातावरील करपा (Blast) आणि खोडकीड';
      actionText = 'शेतात पाणी साचू देऊ नका. ट्रायसायक्लॅझोल फवारणी करा.';
    } else if (langCode === 'gu') {
      levelText = 'ઉચ્ચ જોખમ (ભયજનક)';
      riskName = 'ડાંગરનો ગેરુ અને પ્રકાંડ ભેદક કીટક';
      actionText = 'પાણીનો નિકાલ કરો. ટ્રાયસાઇકલાઝોલનો છંટકાવ કરો.';
    } else if (langCode === 'pa') {
      levelText = 'ਉੱਚ ਜੋਖਮ (ਖ਼ਤਰਾ)';
      riskName = 'ਝੋਨੇ ਦਾ ਬਲਾਸਟ ਰੋਗ ਅਤੇ ਤਣਾ ਛੇਦਕ';
      actionText = 'ਖੇਤ ਵਿੱਚ ਪਾਣੀ ਖੜ੍ਹਾ ਨਾ ਹੋਣ ਦਿਓ। ਟ੍ਰਾਈਸਾਈਕਲਾਜ਼ੋਲ ਦਾ ਸਪਰੇਅ ਕਰੋ।';
    } else if (langCode === 'bn') {
      levelText = 'উচ্চ ঝুঁকি (বিপদ)';
      riskName = 'ধানের ব্লাস্ট রোগ ও কাণ্ড মাজরা পোকা';
      actionText = 'পানি জমা বন্ধ করুন। ট্রাইসাইক্লাজোল স্প্রে করুন।';
    } else if (langCode === 'ta') {
      levelText = 'அதிக அபாயம் (ஆபத்து)';
      riskName = 'நெல் குலைநோய் மற்றும் தண்டு துளைப்பான்';
      actionText = 'வயலில் நீர் தேங்குவதைத் தவிர்க்கவும். டிரைசைக்ளசோல் தெளிக்கவும்.';
    } else if (langCode === 'te') {
      levelText = 'అధిక ప్రమాదం (ప్రమాదం)';
      riskName = 'వరి అగ్గి తెగులు మరియు కాండం తొలుచు పురుగు';
      actionText = 'నీరు నిల్వ ఉండకుండా చూడండి. ట్రైసైక్లజోల్ పిచికారీ చేయండి.';
    } else if (langCode === 'kn') {
      levelText = 'ಹೆಚ್ಚಿನ ಅಪಾಯ (ಅಪಾಯ)';
      riskName = 'ಭತ್ತದ ಬೆಂಕಿ ರೋಗ மற்றும் ಕಾಂಡ ಕೊರೆಯುವ ಹುಳು';
      actionText = 'ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ. ಟ್ರೈಸೈಕ್ಲಜೋಲ್ ಸಿಂಪಡಿಸಿ.';
    } else if (langCode === 'ml') {
      levelText = 'ഉയർന്ന അപകടസാധ്യത';
      riskName = 'നെല്ലിലെ ബ്ലൈറ്റ് രോഗവും തണ്ടുതുരപ്പനും';
      actionText = 'പാടത്ത് വെള്ളം കെട്ടിക്കിടക്കാൻ അനുവദിക്കരുത്. ട്രൈസൈക്ലസോൾ തളിക്കുക.';
    }
  } else if (cropId === 'cotton' && (stateId === 'Haryana' || stateId === 'Rajasthan' || stateId === 'Punjab')) {
    level = 'high';
    levelText = 'उच्च जोखिम (Danger)';
    riskName = 'गुलाबी सुंडी (Pink Bollworm) संक्रमण खतरा';
    actionText = 'तुरंत खेतों में ५-६ फेरोमोन ट्रैप प्रति एकड़ लगाएं। अत्यधिक नीम तेल या प्रोफेनोफॉस + साइपरमेथ्रिन कीटनाशक का अनुशंसित छिड़काव करें।';

    if (langCode === 'en') {
      levelText = 'High Risk (Danger)';
      riskName = 'Pink Bollworm Attack Risk';
      actionText = 'Install 5-6 Pheromone traps per acre immediately. Spray Neem oil or recommended Profenofos + Cypermethrin.';
    } else if (langCode === 'mr') {
      levelText = 'उच्च धोका (धोकादायक)';
      riskName = 'गुलाबी बोंडअळीचा प्रादुर्भाव';
      actionText = 'कामगंंध सापळे लावा आणि निंबोळी अर्क किंवा प्रोफेनोफॉस फवारा.';
    } else if (langCode === 'gu') {
      levelText = 'ઉચ્ચ જોખમ (ભયજનક)';
      riskName = 'ગુલાબી ઇયળનો ઉપદ્રવ';
      actionText = 'ફેરોમોન ટ્રેપ લગાવો અને યોગ્ય કીટનાશકનો છંટકાવ કરો.';
    } else if (langCode === 'pa') {
      levelText = 'ਉੱਚ ਜੋਖਮ (ਖ਼ਤਰਾ)';
      riskName = 'ਗੁਲਾਬੀ ਸੁੰਡੀ ਦਾ ਖ਼ਤਰਾ';
      actionText = 'ਫੇਰੋਮੋਨ ਟ੍ਰੈਪ ਲਗਾਓ ਅਤੇ ਨਿੰਮ ਦੇ ਤੇਲ ਦਾ ਸਪਰੇਅ ਕਰੋ।';
    } else if (langCode === 'bn') {
      levelText = 'উচ্চ ঝুঁকি (বিপদ)';
      riskName = 'গোলাপী বলওয়ার্ম আক্রমণ';
      actionText = 'ফেরোমোন ট্র্যাপ ব্যবহার করুন ও উপযুক্ত কীটনাশক স্প্রে করুন।';
    } else if (langCode === 'ta') {
      levelText = 'அதிக அபாயம் (ஆபத்து)';
      riskName = 'இளஞ்சிவப்பு காய்ப்புழு தாக்குதல்';
      actionText = 'மோக வலை பொறிகளை வைத்து வேப்ப எண்ணெய் தெளிக்கவும்.';
    } else if (langCode === 'te') {
      levelText = 'అధిక ప్రమాదం (ప్రమాదం)';
      riskName = 'గులాబీ రంగు పురుగు దాడి బెదిరింపు';
      actionText = 'ఫెరమోన్ ట్రాప్‌లు అమర్చి రక్షక మందులు పిచికారీ చేయండి.';
    } else if (langCode === 'kn') {
      levelText = 'ಹೆಚ್ಚಿನ ಅಪಾಯ (ಅಪಾಯ)';
      riskName = 'ಗುಲಾಬಿ ಕಾಯಿ ಕೊರಕ ಕೀಟದ ಕಾಟ';
      actionText = 'ಫೆರಮೋನ್ ಬಲೆಗಳನ್ನು ಹಾಕಿ ಬೇಪಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ.';
    } else if (langCode === 'ml') {
      levelText = 'ഉയർന്ന അപകടസാധ്യത';
      riskName = 'പിങ്ക് ബോൾവേം ആക്രമണ ഭീഷണി';
      actionText = 'ഫെറമോൺ കെണികൾ സ്ഥാപിക്കുകയും അനുയോജ്യമായ കീടനാശിനി തളിക്കുകയും ചെയ്യുക.';
    }
  } else if (cropId === 'maize') {
    level = 'medium';
    levelText = 'मध्यम जोखिम (Alert)';
    riskName = 'फॉल आर्मीवर्म (Fall Armyworm) कीट प्रकोप';
    actionText = 'मक्के की पोंगा (Whorl) के अंदर कीट के मल और पत्तों में छिद्रों की जांच करें। स्पिनोसैड कीटनाशक का छिड़काव उपयोगी है।';

    if (langCode === 'en') {
      levelText = 'Medium Risk (Alert)';
      riskName = 'Fall Armyworm Attack';
      actionText = 'Inspect crop whorls for frass and leaf damage. Spray Spinosad pesticide as per recommended dosage.';
    } else if (langCode === 'mr') {
      levelText = 'मध्यम धोका (इशारा)';
      riskName = 'लष्करी अळीचा (Fall Armyworm) प्रादुर्भाव';
      actionText = 'मक्याच्या पांग्यात अळीची पाहणी करून स्पायनोसॅडची फवारणी करा.';
    } else if (langCode === 'gu') {
      levelText = 'મધ્યમ જોખમ (એલર્ટ)';
      riskName = 'ફોલ આર્મીવર્મનો ઉપદ્રવ';
      actionText = 'મકાઈના પાંદડામાં છિદ્રોની તપાસ કરો અને સ્પીનોસેડનો છંટકાવ કરો.';
    } else if (langCode === 'pa') {
      levelText = 'ਦਰਮਿਆਨਾ ਜੋਖਮ (ਅਲਰਟ)';
      riskName = 'ਫਾਲ ਆਰਮੀਵਰਮ ਦਾ ਹਮਲਾ';
      actionText = 'ਪੱਤਿਆਂ ਦੀ ਜਾਂਚ ਕਰੋ ਅਤੇ ਸਪਿਨੋਸੈਡ ਦਾ ਸਪਰੇਅ ਕਰੋ।';
    } else if (langCode === 'bn') {
      levelText = 'মাঝারি ঝুঁকি (সতর্কতা)';
      riskName = 'ফল আর্মিওয়ার্ম পোকার আক্রমণ';
      actionText = 'পাতার ছিদ্র পরীক্ষা করুন এবং স্পিনোস্যাড স্প্রে করুন।';
    } else if (langCode === 'ta') {
      levelText = 'மிதமான அபாயம் (எச்சரிக்கை)';
      riskName = 'படைப்புழு தாக்குதல் அபாயம்';
      actionText = 'இலைகளில் துளைகளை ஆராய்ந்து ஸ்பினோசாட் மருந்து தெளிக்கவும்.';
    } else if (langCode === 'te') {
      levelText = 'మధ్యస్థ ప్రమాదం (హెచ్చరిక)';
      riskName = 'కత్తెర పురుగు దాడి';
      actionText = 'మొక్కల సుడులలో పురుగులను గమనించి స్పినోసాడ్ పిచికారీ చేయండి.';
    } else if (langCode === 'kn') {
      levelText = 'ಮಧ್ಯಮ ಅಪಾಯ (ಎಚ್ಚರಿಕೆ)';
      riskName = 'ಸೈನಿಕ ಹುಳುವಿನ ಬಾಧೆ';
      actionText = 'ಸುಳಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಸ್ಪಿನೋಸ್ಯಾಡ್ ಔಷಧ ಸಿಂಪಡಿಸಿ.';
    } else if (langCode === 'ml') {
      levelText = 'മിതമായ അപകടസാധ്യത';
      riskName = 'ഫാൾ ആർമിവേം ആക്രമണം';
      actionText = 'കുരുത്തുകൾ പരിശോധിച്ച് സ്പിനോസാഡ് തളിക്കുക.';
    }
  }

  return { level, levelText, riskName, actionText };
}

// Localized Government Schemes, Fertilizer Advice & Crop Calendar (All 10 Languages)
export { 
  getLocalizedGovernmentSchemes, 
  getLocalizedFertilizerAdvice, 
  getLocalizedCropCalendar 
} from './data_localization';

// MSP Benchmark Rates
export const mspRates: Record<string, { id: string; name: string; price: number; unit: string }> = {
  wheat: { id: 'wheat', name: 'गेहूं (Wheat)', price: 2275, unit: '₹ / क्विंटल' },
  paddy: { id: 'paddy', name: 'धान (Paddy)', price: 2183, unit: '₹ / क्विंटल' },
  mustard: { id: 'mustard', name: 'सरसों (Mustard)', price: 5650, unit: '₹ / क्विंटल' },
  cotton: { id: 'cotton', name: 'कपास (Cotton)', price: 6620, unit: '₹ / क्विंटल' },
  gram: { id: 'gram', name: 'चना (Gram)', price: 5440, unit: '₹ / क्विंटल' },
  sugarcane: { id: 'sugarcane', name: 'गन्ना (Sugarcane)', price: 315, unit: '₹ / क्विंटल' },
  maize: { id: 'maize', name: 'मक्का (Maize)', price: 2090, unit: '₹ / क्विंटल' },
  soybean: { id: 'soybean', name: 'सोयाबीन (Soybean)', price: 4600, unit: '₹ / क्विंटल' },
  bajra: { id: 'bajra', name: 'बाजरा (Bajra)', price: 2500, unit: '₹ / क्विंटल' }
};

// Fallback Mandi Prices Data
export const mandiPricesData = [
  {
    id: 'mp-1',
    mandiName: 'श्रीगंगानगर मंडी',
    cropName: 'गेहूं (Wheat)',
    variety: 'लोकवन / 147',
    state: 'राजस्थान',
    district: 'श्रीगंगानगर',
    minPrice: 2350,
    maxPrice: 2550,
    modalPrice: 2450,
    currentPrice: 2450,
    mspPrice: 2275,
    arrivalDate: new Date().toLocaleDateString('en-GB'),
    unit: '₹ / क्विंटल'
  }
];

// Dropdown Options - Expanded Crop Database
export const cropOptions = [
  // अनाज (Cereals)
  { id: 'wheat', icon: '🌾', nameHi: 'गेहूं (Wheat)', nameEn: 'Wheat', category: 'अनाज' },
  { id: 'paddy', icon: '🌾', nameHi: 'धान / चावल (Paddy / Rice)', nameEn: 'Paddy / Rice', category: 'अनाज' },
  { id: 'maize', icon: '🌽', nameHi: 'मक्का (Maize / Corn)', nameEn: 'Maize / Corn', category: 'अनाज' },
  { id: 'bajra', icon: '🌽', nameHi: 'बाजरा (Pearl Millet)', nameEn: 'Pearl Millet (Bajra)', category: 'अनाज' },
  { id: 'jowar', icon: '🌾', nameHi: 'ज्वार (Sorghum)', nameEn: 'Sorghum (Jowar)', category: 'अनाज' },
  { id: 'barley', icon: '🌾', nameHi: 'जौ (Barley)', nameEn: 'Barley', category: 'अनाज' },
  { id: 'ragi', icon: '🌾', nameHi: 'रागी / मड़ुआ (Finger Millet)', nameEn: 'Finger Millet (Ragi)', category: 'अनाज' },
  { id: 'oats', icon: '🌾', nameHi: 'जई (Oats)', nameEn: 'Oats', category: 'अनाज' },

  // दलहन (Pulses)
  { id: 'gram', icon: '🫘', nameHi: 'चना (Gram / Chickpea)', nameEn: 'Gram / Chickpea', category: 'दलहन' },
  { id: 'arhar', icon: '🫘', nameHi: 'अरहर / तूर (Pigeon Pea / Arhar)', nameEn: 'Pigeon Pea (Arhar/Tur)', category: 'दलहन' },
  { id: 'moong', icon: '🫛', nameHi: 'मूंग (Green Gram)', nameEn: 'Green Gram (Moong)', category: 'दलहन' },
  { id: 'urad', icon: '🫘', nameHi: 'उड़द (Black Gram)', nameEn: 'Black Gram (Urad)', category: 'दलहन' },
  { id: 'masoor', icon: '🫘', nameHi: 'मसूर (Lentil)', nameEn: 'Lentil (Masoor)', category: 'दलहन' },
  { id: 'peas', icon: '🫛', nameHi: 'मटर (Field Peas)', nameEn: 'Peas', category: 'दलहन' },
  { id: 'rajma', icon: '🫘', nameHi: 'राजमा (Kidney Beans)', nameEn: 'Kidney Beans (Rajma)', category: 'दलहन' },
  { id: 'lobia', icon: '🫘', nameHi: 'लोबिया / चौला (Cowpea)', nameEn: 'Cowpea (Lobia)', category: 'दलहन' },

  // तिलहन (Oilseeds)
  { id: 'mustard', icon: '🟡', nameHi: 'सरसों / रायड़ा (Mustard)', nameEn: 'Mustard', category: 'तिलहन' },
  { id: 'soybean', icon: '🫘', nameHi: 'सोयाबीन (Soybean)', nameEn: 'Soybean', category: 'तिलहन' },
  { id: 'groundnut', icon: '🥜', nameHi: 'मूंगफली (Groundnut / Peanut)', nameEn: 'Groundnut / Peanut', category: 'तिलहन' },
  { id: 'sunflower', icon: '🌻', nameHi: 'सूरजमुखी (Sunflower)', nameEn: 'Sunflower', category: 'तिलहन' },
  { id: 'sesame', icon: '⚪', nameHi: 'तिल (Sesame / Til)', nameEn: 'Sesame (Til)', category: 'तिलहन' },
  { id: 'castor', icon: '🫘', nameHi: 'अरंडी (Castor)', nameEn: 'Castor', category: 'तिलहन' },
  { id: 'linseed', icon: '🌾', nameHi: 'अलसी (Linseed / Flaxseed)', nameEn: 'Linseed / Flaxseed', category: 'तिलहन' },

  // नकदी एवं व्यावसायिक फसलें (Commercial / Cash Crops)
  { id: 'sugarcane', icon: '🪵', nameHi: 'गन्ना (Sugarcane)', nameEn: 'Sugarcane', category: 'व्यावसायिक' },
  { id: 'cotton', icon: '🧶', nameHi: 'कपास (Cotton)', nameEn: 'Cotton', category: 'व्यावसायिक' },
  { id: 'jute', icon: '🧶', nameHi: 'जूट / पटसन (Jute)', nameEn: 'Jute', category: 'व्यावसायिक' },
  { id: 'tobacco', icon: '🍂', nameHi: 'तंबाकू (Tobacco)', nameEn: 'Tobacco', category: 'व्यावसायिक' },
  { id: 'tea', icon: '🍵', nameHi: 'चाय (Tea)', nameEn: 'Tea', category: 'व्यावसायिक' },
  { id: 'coffee', icon: '☕', nameHi: 'कॉफी (Coffee)', nameEn: 'Coffee', category: 'व्यावसायिक' },
  { id: 'rubber', icon: '🪵', nameHi: 'रबर (Rubber)', nameEn: 'Rubber', category: 'व्यावसायिक' },

  // सब्जियां (Vegetables)
  { id: 'potato', icon: '🥔', nameHi: 'आलू (Potato)', nameEn: 'Potato', category: 'सब्जियां' },
  { id: 'onion', icon: '🧅', nameHi: 'प्याज (Onion)', nameEn: 'Onion', category: 'सब्जियां' },
  { id: 'tomato', icon: '🍅', nameHi: 'टमाटर (Tomato)', nameEn: 'Tomato', category: 'सब्जियां' },
  { id: 'garlic', icon: '🧄', nameHi: 'लहसुन (Garlic)', nameEn: 'Garlic', category: 'सब्जियां' },
  { id: 'ginger', icon: '🫚', nameHi: 'अदरक (Ginger)', nameEn: 'Ginger', category: 'सब्जियां' },
  { id: 'brinjal', icon: '🍆', nameHi: 'बैंगन (Eggplant / Brinjal)', nameEn: 'Brinjal', category: 'सब्जियां' },
  { id: 'okra', icon: '🫛', nameHi: 'भिंडी (Ladyfinger / Okra)', nameEn: 'Okra / Ladyfinger', category: 'सब्जियां' },
  { id: 'cauliflower', icon: '🥦', nameHi: 'फूलगोभी (Cauliflower)', nameEn: 'Cauliflower', category: 'सब्जियां' },
  { id: 'cabbage', icon: '🥬', nameHi: 'पत्तागोभी (Cabbage)', nameEn: 'Cabbage', category: 'सब्जियां' },
  { id: 'chilli', icon: '🌶️', nameHi: 'हरी / लाल मिर्च (Chilli)', nameEn: 'Chilli', category: 'सब्जियां' },
  { id: 'cucumber', icon: '🥒', nameHi: 'खीरा / ककड़ी (Cucumber)', nameEn: 'Cucumber', category: 'सब्जियां' },
  { id: 'gourd', icon: '🫛', nameHi: 'लौकी / कद्दू (Gourd / Pumpkin)', nameEn: 'Gourd / Pumpkin', category: 'सब्जियां' },

  // फल एवं बागवानी (Fruits & Horticulture)
  { id: 'mango', icon: '🥭', nameHi: 'आम (Mango)', nameEn: 'Mango', category: 'फल' },
  { id: 'banana', icon: '🍌', nameHi: 'केला (Banana)', nameEn: 'Banana', category: 'फल' },
  { id: 'citrus', icon: '🍋', nameHi: 'संतरा / किन्नू / नींबू (Citrus)', nameEn: 'Citrus / Kinnow / Lemon', category: 'फल' },
  { id: 'guava', icon: '🍏', nameHi: 'अमरूद (Guava)', nameEn: 'Guava', category: 'फल' },
  { id: 'papaya', icon: '🥭', nameHi: 'पपीता (Papaya)', nameEn: 'Papaya', category: 'फल' },
  { id: 'pomegranate', icon: '🍎', nameHi: 'अनार (Pomegranate)', nameEn: 'Pomegranate', category: 'फल' },
  { id: 'apple', icon: '🍎', nameHi: 'सेब (Apple)', nameEn: 'Apple', category: 'फल' },
  { id: 'grapes', icon: '🍇', nameHi: 'अंगूर (Grapes)', nameEn: 'Grapes', category: 'फल' },
  { id: 'watermelon', icon: '🍉', nameHi: 'तरबूज / खरबूजा (Melons)', nameEn: 'Watermelon / Muskmelon', category: 'फल' },

  // मसाले (Spices)
  { id: 'turmeric', icon: '🟡', nameHi: 'हल्दी (Turmeric)', nameEn: 'Turmeric', category: 'मसाले' },
  { id: 'cumin', icon: '🌿', nameHi: 'जीरा (Cumin)', nameEn: 'Cumin', category: 'मसाले' },
  { id: 'coriander', icon: '🌿', nameHi: 'धनिया (Coriander)', nameEn: 'Coriander', category: 'मसाले' },
  { id: 'fennel', icon: '🌿', nameHi: 'सौंफ (Fennel)', nameEn: 'Fennel', category: 'मसाले' },
  { id: 'cardamom', icon: '🌿', nameHi: 'इलायची / काली मिर्च (Spices)', nameEn: 'Cardamom / Black Pepper', category: 'मसाले' },

  // औषधीय व अन्य (Medicinal & Others)
  { id: 'mentha', icon: '🌿', nameHi: 'मेंथा / पुदीना (Mint)', nameEn: 'Mentha / Mint', category: 'औषधीय' },
  { id: 'isabgol', icon: '🌿', nameHi: 'ईसबगोल (Psyllium Husk)', nameEn: 'Isabgol', category: 'औषधीय' },
  { id: 'ashwagandha', icon: '🌿', nameHi: 'अश्वगंधा (Ashwagandha)', nameEn: 'Ashwagandha', category: 'औषधीय' },
  { id: 'aloe_vera', icon: '🪴', nameHi: 'एलोवेरा (Aloe Vera)', nameEn: 'Aloe Vera', category: 'औषधीय' }
];

export const soilTypeOptions = [
  { id: 'alluvial', nameHi: 'जलोढ़ मिट्टी (Alluvial Soil)', nameEn: 'Alluvial Soil' },
  { id: 'black', nameHi: 'काली मिट्टी / रेगुर (Black / Regur Soil)', nameEn: 'Black / Regur Soil' },
  { id: 'red', nameHi: 'लाल और पीली मिट्टी (Red & Yellow Soil)', nameEn: 'Red & Yellow Soil' },
  { id: 'laterite', nameHi: 'लेटेराइट मिट्टी (Laterite Soil)', nameEn: 'Laterite Soil' },
  { id: 'arid', nameHi: 'शुष्क / रेतीली मरुस्थलीय मिट्टी (Arid / Desert Soil)', nameEn: 'Arid / Desert Soil' },
  { id: 'saline', nameHi: 'लवणीय एवं क्षारीय मिट्टी / ऊसर (Saline & Alkaline Soil)', nameEn: 'Saline & Alkaline Soil' },
  { id: 'peaty', nameHi: 'पीठ / दलदली मिट्टी (Peaty & Marshy Soil)', nameEn: 'Peaty & Marshy Soil' },
  { id: 'forest', nameHi: 'पर्वतीय / वनीय मिट्टी (Forest & Mountain Soil)', nameEn: 'Forest & Mountain Soil' },
  { id: 'sandy_loam', nameHi: 'बलुई दोमट मिट्टी (Sandy Loam Soil)', nameEn: 'Sandy Loam Soil' },
  { id: 'clay_loam', nameHi: 'चिकनी दोमट मिट्टी (Clay Loam Soil)', nameEn: 'Clay Loam Soil' },
  { id: 'silt', nameHi: 'गाद / जलोढ़ दोमट (Silt Soil)', nameEn: 'Silt Soil' },
  { id: 'gravelly', nameHi: 'कंकरीली / पथरीली मिट्टी (Gravelly / Rocky Soil)', nameEn: 'Gravelly / Rocky Soil' },
  { id: 'other', nameHi: 'अन्य / कस्टम मिट्टी प्रकार (Custom Soil Input)', nameEn: 'Other / Custom Soil Type' }
];


