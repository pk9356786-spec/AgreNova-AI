/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Comprehensive 10-language localization for Schemes, Fertilizer Advice & Crop Calendars
 */

import { Scheme } from './types';
import { governmentSchemes, fertilizerRecommendations, cropCalendars } from './data';

// Localized Government Schemes in all 10 languages
export function getLocalizedGovernmentSchemes(langCode: string = 'en'): Scheme[] {
  if (langCode === 'en') {
    return [
      {
        id: 'pm-kisan',
        name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
        authority: 'Govt of India (Central Govt)',
        benefits: 'Financial assistance of ₹6,000 per year (in 3 equal installments of ₹2,000) directly into bank account.',
        eligibility: 'All small and marginal farmer families holding cultivable land.',
        howToApply: [
          'Visit official PM-Kisan portal (pmkisan.gov.in).',
          'Click on "New Farmer Registration" under Farmers Corner.',
          'Enter Aadhaar card, bank account, and land revenue (Khatauni) details.',
          'Submit and get verified by local Patwari or Agriculture Extension Officer.'
        ],
        category: 'central'
      },
      {
        id: 'pm-fby',
        name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
        authority: 'Central & State Government',
        benefits: 'Comprehensive crop insurance against natural calamities, pests & diseases. Nominal premium: 2% Kharif, 1.5% Rabi, 5% commercial crops.',
        eligibility: 'All farmers cultivating notified crops in notified areas.',
        howToApply: [
          'Visit authorized bank branch or PMFBY portal within 10 days of sowing.',
          'Fill crop declaration form with land details.',
          'Pay required premium and collect receipt.',
          'Report crop damage within 72 hours on toll-free helpline.'
        ],
        category: 'central'
      },
      {
        id: 'soil-health-card',
        name: 'Soil Health Card Scheme',
        authority: 'Ministry of Agriculture & Farmers Welfare',
        benefits: 'Free soil testing across 12 parameters and customized nutrient recommendation report.',
        eligibility: 'All farmers possessing agricultural land.',
        howToApply: [
          'Contact local Agriculture Extension Officer or Soil Testing Laboratory.',
          'Collect soil sample (V-shape 6 inches depth) from farm fields.',
          'Submit sample; receive physical and digital card within 3-4 weeks.'
        ],
        category: 'central'
      },
      {
        id: 'up-karj-mafi',
        name: 'UP Farmer Loan Waiver Scheme (UP Karj Mafi)',
        authority: 'Uttar Pradesh Government',
        benefits: 'Waiver of institutional crop loans up to ₹1,00,000 for small and marginal farmers.',
        eligibility: 'Permanent residents of UP holding less than 2 hectares of cultivable land.',
        howToApply: [
          'Visit official UP loan relief portal (upkisankarjrahat.upsdc.gov.in).',
          'Enter Kisan Credit Card (KCC) account number and district.',
          'Check beneficiary list after physical verification.'
        ],
        category: 'state',
        state: 'UP'
      },
      {
        id: 'punjab-tubewell',
        name: 'Punjab Free Tubewell Electricity Scheme',
        authority: 'Punjab Government',
        benefits: '100% free electricity power supply for agricultural tubewells and pumps.',
        eligibility: 'All registered farmers in Punjab with legal agricultural electricity connection.',
        howToApply: [
          'Apply at nearest PSPCL subdivision office.',
          'Submit land revenue documents and tubewell motor installation certificate.'
        ],
        category: 'state',
        state: 'Punjab'
      },
      {
        id: 'haryana-meri-fasal',
        name: 'Meri Fasal Mera Byora Scheme',
        authority: 'Haryana Government',
        benefits: 'Mandatory portal for selling produce at MSP, direct MSP payouts and disaster relief compensation.',
        eligibility: 'All farmers cultivating crops within the state of Haryana.',
        howToApply: [
          'Visit portal (fasal.haryana.gov.in) with Parivar Pehchan Patra (PPP).',
          'Enter Khasra/Kila numbers and sown crop varieties.',
          'Print gate pass before bringing produce to mandis.'
        ],
        category: 'state',
        state: 'Haryana'
      },
      {
        id: 'mp-bhavantar',
        name: 'CM Bhavantar Bhugtan Yojana',
        authority: 'Madhya Pradesh Government',
        benefits: 'Direct cash deposit into bank account for the price gap between market selling rate and govt MSP.',
        eligibility: 'Registered MP farmers cultivating pulses, oilseeds and maize.',
        howToApply: [
          'Register on E-Uparjan portal with Aadhaar and Khasra documents.',
          'Sell produce in notified APMC mandi and upload sale receipt.'
        ],
        category: 'state',
        state: 'MP'
      },
      {
        id: 'bihar-diesel',
        name: 'Bihar Krishi Input Subsidy Scheme',
        authority: 'Bihar Government',
        benefits: 'Financial subsidy of ₹6,800 to ₹18,000 per hectare for flood and drought affected crop lands.',
        eligibility: 'Farmers in notified flood/drought calamity affected blocks of Bihar.',
        howToApply: [
          'Apply on DBT Agriculture Bihar portal (dbtagriculture.bihar.gov.in).',
          'Enter 13-digit Farmer Registration Number and affected land survey numbers.'
        ],
        category: 'state',
        state: 'Bihar'
      },
      {
        id: 'rajasthan-tarbandi',
        name: 'Rajasthan Tarbandi Subsidy Scheme',
        authority: 'Rajasthan Government',
        benefits: '50% subsidy (up to ₹40,000) for barbed wire fencing to protect crops from stray animals.',
        eligibility: 'Farmers in Rajasthan holding minimum 0.5 hectare agricultural land.',
        howToApply: [
          'Visit RajKisan Saathi portal (rajkisan.rajasthan.gov.in).',
          'Apply online with Jan Aadhaar and Jamabandi land records.'
        ],
        category: 'state',
        state: 'Rajasthan'
      }
    ];
  }

  if (langCode === 'mr') {
    return [
      {
        id: 'pm-kisan',
        name: 'प्रधानमंत्री किसान सन्मान निधी (PM-KISAN)',
        authority: 'भारत सरकार (केंद्र शासन)',
        benefits: 'प्रतिवर्षी ₹६,००० आर्थिक सहाय্য (₹२,००० चे ३ समान हप्ते) थेट बँक खात्यात.',
        eligibility: 'सर्व अल्प व अल्पभूधारक शेतकरी कुटुंबे ज्यांच्या नावावर शेतजमीन आहे.',
        howToApply: [
          'अधिकृत PM-Kisan पोर्टलला भेट द्या (pmkisan.gov.in).',
          'शेतकरी कॉर्नर अंतर्गत "New Farmer Registration" वर क्लिक करा.',
          'आधार कार्ड, बँक खाते आणि ७/१२ उतारा तपशील भरा.',
          'तलाठी किंवा कृषी सहाय্যकाकडून पडताळणी पूर्ण करा.'
        ],
        category: 'central'
      },
      {
        id: 'pm-fby',
        name: 'प्रधानमंत्री पीक विमा योजना (PMFBY)',
        authority: 'केंद्र व राज्य शासन',
        benefits: 'नैसर्गिक आपत्ती, कीड व रोगांमुळे होणाऱ्या नुकसानापासून सर्वसमावेशक विमा संरक्षण. नाममात्र हप्ता: खरीप २%, रब्बी १.५%.',
        eligibility: 'अधिसूचित पिके घेणारे सर्व शेतकरी (भाडेकरू शेतकऱ्यांसह).',
        howToApply: [
          'पेरणीनंतर १० दिवसांच्या आत बँक किंवा PMFBY पोर्टलवर नोंदणी करा.',
          'पिकाचा विमा अर्ज ७/१२ आणि पीक पाहणीसह सादर करा.',
          'नुकसान झाल्यास ۷२ तासांच्या आत टोल-फ्री क्रमांकावर तक्रार नोंदवा.'
        ],
        category: 'central'
      },
      {
        id: 'soil-health-card',
        name: 'मृदा आरोग्य पत्रिका योजना (Soil Health Card)',
        authority: 'कृषी व शेतकरी कल्याण मंत्रालय',
        benefits: '१२ घटकांवर मोफत माती परीक्षण आणि आवश्यक खतांचा शास्त्रीय सल्ला.',
        eligibility: 'शेतीजमीन असणारे सर्व शेतकरी.',
        howToApply: [
          'स्थानिक कृषी अधिकारी किंवा माती परीक्षण प्रयोगशाळेशी संपर्क साधा.',
          'शेतातून "V" आकाराचा ६ इंच खोलीचा मातीचा नमुना गोळा करा.',
          'नमुना सादर करा; ३-४ आठवड्यांत डिजिटल कार्ड मिळवा.'
        ],
        category: 'central'
      },
      {
        id: 'up-karj-mafi',
        name: 'शेतकरी कर्जमाఫీ योजना',
        authority: 'शासकीय योजना',
        benefits: 'अल्प व अत्यल्प भूधारक शेतकऱ्यांना ₹१ लाखांपर्यंत पीक कर्जमाఫీ.',
        eligibility: '२ हेक्टरपेक्षा कमी शेतीजमीन असलेले शेतकरी.',
        howToApply: ['अधिकृत पोर्टलवर KCC क्रमांक प्रविष्ट करून लाभ तपासा.'],
        category: 'state',
        state: 'UP'
      },
      {
        id: 'punjab-tubewell',
        name: 'कृषी पंप मोफत वीज योजना',
        authority: 'राज्य शासन',
        benefits: 'शेतीपंपांसाठी आणि कूपनलिकांसाठी १००% मोफत वीजपुरवठा.',
        eligibility: 'वैध शेती वीज जोडणी असलेले सर्व नोंदणीकृत शेतकरी.',
        howToApply: ['विद्युत वितरण कार्यालयात आवश्यक कागदपत्रांसह अर्ज करा.'],
        category: 'state',
        state: 'Punjab'
      },
      {
        id: 'haryana-meri-fasal',
        name: 'माझे पीक माझी नोंद योजना (Meri Fasal)',
        authority: 'राज्य शासन',
        benefits: 'MSP वर हमीभाव विक्री, थेट खात्यात रक्कम आणि नुकसान भरपाई.',
        eligibility: 'राज्यातील खरीप व रब्बी पिके घेणारे सर्व शेतकरी.',
        howToApply: ['पोर्टलवर नोंदणी करून मंडई गेट पास मिळवा.'],
        category: 'state',
        state: 'Haryana'
      },
      {
        id: 'mp-bhavantar',
        name: 'भावांतर भरपाई योजना',
        authority: 'राज्य शासन',
        benefits: 'बाजारभाव आणि हमीभाव (MSP) मधील फरकाची रक्कम थेट खात्यात जमा.',
        eligibility: 'तेलबिया आणि कडधान्य उत्पादक नोंदणीकृत शेतकरी.',
        howToApply: ['मंडई विक्री पावती पोर्टलवर अपलोड करा.'],
        category: 'state',
        state: 'MP'
      },
      {
        id: 'bihar-diesel',
        name: 'कृषी इनपुट अनुदान योजना',
        authority: 'राज्य शासन',
        benefits: 'पूर व दुष्काळग्रस्त पिकांसाठी ₹६,८०० ते ₹१८,००० प्रति हेक्टर अनुदान.',
        eligibility: 'आपत्तीग्रस्त अधिसूचित क्षेत्रातील शेतकरी.',
        howToApply: ['DBT पोर्टलवर १३ अंकी शेतकरी नोंदणी क्रमांकाने अर्ज करा.'],
        category: 'state',
        state: 'Bihar'
      },
      {
        id: 'rajasthan-tarbandi',
        name: 'शेती कुंपण (तारबंदी) अनुदान योजना',
        authority: 'राज्य शासन',
        benefits: 'रानटी प्राण्यांपासून संरक्षणासाठी काटेरी तारेच्या कुंपणावर ५०% अनुदान (₹४०,००० पर्यंत).',
        eligibility: 'किमान ०.५ हेक्टर शेतीजमीन असणारे शेतकरी.',
        howToApply: ['राजकिसान साथी पोर्टलवर जन आधार कार्डने अर्ज करा.'],
        category: 'state',
        state: 'Rajasthan'
      }
    ];
  }

  if (langCode === 'gu') {
    return [
      {
        id: 'pm-kisan',
        name: 'પ્રધાનમંત્રી કિસાન સન્માન નિધિ (PM-KISAN)',
        authority: 'ભારત સરકાર (કેન્દ્ર સરકાર)',
        benefits: 'વાર્ષિક ₹૬,૦૦૦ ની સહાય (₹૨,૦૦૦ ના ૩ હપ્તા) સીધા બેંક ખાતામાં.',
        eligibility: 'જમીન ધારક તમામ નાના અને સીમાંત ખેડૂત પરિવારો.',
        howToApply: [
          'PM-Kisan પોર્ટલ (pmkisan.gov.in) ની મુલાકાત લો.',
          'નવા ખેડૂત નોંધણી (New Farmer Registration) પર ક્લિક કરો.',
          'આધાર, બેંક ખાતું અને ૭/૧૨-૮અ ના દસ્તાવેજો દાખલ કરો.',
          'તલાટી કે ગ્રામસેવક પાસેથી ચકાસણી કરાવો.'
        ],
        category: 'central'
      },
      {
        id: 'pm-fby',
        name: 'પ્રધાનમંત્રી ફસલ બીમા યોજના (PMFBY)',
        authority: 'કેન્દ્ર અને રાજ્ય સરકાર',
        benefits: 'કુદરતી આફતો અને રોગ-જીવાત સામે પાક વીમા કવચ. નજીવું પ્રીમિયમ: ખરીફ ૨%, રવિ ૧.૫%.',
        eligibility: 'અધિસૂચિત પાક વાવતા તમામ ખેડૂતો.',
        howToApply: [
          'વાવણીના ૧૦ દિવસમાં બેંક અથવા પોર્ટલ પર ફોર્મ ભરો.',
          'નુકસાન થાય તો ૭૨ કલાકમાં હેલ્પલાઇન પર જાણ કરો.'
        ],
        category: 'central'
      },
      {
        id: 'soil-health-card',
        name: 'સોઇલ હેલ્થ કાર્ડ યોજના (મૃદા સ્વાસ્થ્ય)',
        authority: 'કૃષિ અને ખેડૂત કલ્યાણ મંત્રાલય',
        benefits: '૧૨ માપદંડો પર જમીનની મફત ચકાસણી અને ખાતરનો વૈજ્ઞાનિક અહેવાલ.',
        eligibility: 'ખેતીની જમીન ધરાવતા તમામ ખેડૂતો.',
        howToApply: ['નજીકની જમીન ચકાસણી પ્રયોગશાળામાં માટીનો નમૂનો જમા કરો.'],
        category: 'central'
      },
      {
        id: 'rajasthan-tarbandi',
        name: 'ખેતર તારફેન્સિંગ (તારબંધી) સહાય યોજના',
        authority: 'રાજ્ય સરકાર',
        benefits: 'જંગલી પ્રાણીઓથી રક્ષણ માટે કાંટાળી તારની વાડ પર ૫૦% સબસિડી (₹૪૦,૦૦૦ સુધી).',
        eligibility: 'ઓછામાં ઓછી ૦.૫ હેક્ટર જમીન ધરાવતા ખેડૂતો.',
        howToApply: ['પોર્ટલ પર આધાર અને જમીનના કાગળો સાથે અરજી કરો.'],
        category: 'state',
        state: 'Gujarat'
      }
    ];
  }

  if (langCode === 'pa') {
    return [
      {
        id: 'pm-kisan',
        name: 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕਿਸਾਨ ਸਨਮਾਨ ਨਿਧੀ (PM-KISAN)',
        authority: 'ਭਾਰਤ ਸਰਕਾਰ (ਕੇਂਦਰ ਸਰਕਾਰ)',
        benefits: 'ਸਾਲਾਨਾ ₹6,000 ਦੀ ਵਿੱਤੀ ਸਹਾਇਤਾ (₹2,000 ਦੀਆਂ 3 ਕਿਸ਼ਤਾਂ) ਸਿੱਧੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ।',
        eligibility: 'ਵਾਹੀਯੋਗ ਜ਼ਮੀਨ ਵਾਲੇ ਸਾਰੇ ਛੋਟੇ ਅਤੇ ਦਰਮਿਆਨੇ ਕਿਸਾਨ ਪਰਿਵਾਰ।',
        howToApply: [
          'ਅਧਿਕਾਰਤ ਪੋਰਟਲ (pmkisan.gov.in) ਤੇ ਜਾਓ।',
          'New Farmer Registration ਤੇ ਕਲਿੱਕ ਕਰੋ।',
          'ਆਧਾਰ, ਬੈਂਕ ਖਾਤਾ ਅਤੇ ਜ਼ਮੀਨ ਦੇ ਵੇਰਵੇ ਭਰੋ।',
          'ਪਟਵਾਰੀ ਜਾਂ ਖੇਤੀਬਾੜੀ ਅਫ਼ਸਰ ਤੋਂ ਤਸਦੀਕ ਕਰਵਾਓ।'
        ],
        category: 'central'
      },
      {
        id: 'pm-fby',
        name: 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਫ਼ਸਲ ਬੀਮਾ ਯੋਜਨਾ (PMFBY)',
        authority: 'ਕੇਂਦਰ ਅਤੇ ਰਾਜ ਸਰਕਾਰ',
        benefits: 'ਕੁਦਰਤੀ ਆਫ਼ਤਾਂ ਅਤੇ ਬਿਮਾਰੀਆਂ ਤੋਂ ਫ਼ਸਲੀ ਨੁਕਸਾਨ ਦਾ ਬੀਮਾ ਕਵਰ। ਨਿਗੂਣਾ ਪ੍ਰੀਮੀਅਮ: ਸਾਉਣੀ 2%, ਹਾੜੀ 1.5%।',
        eligibility: 'ਸੂਚਿਤ ਫ਼ਸਲਾਂ ਉਗਾਉਣ ਵਾਲੇ ਸਾਰੇ ਕਿਸਾਨ।',
        howToApply: [
          'ਬਿਜਾਈ ਦੇ 10 ਦਿਨਾਂ ਦੇ ਅੰਦਰ ਬੈਂਕ ਜਾਂ ਪੋਰਟਲ ਤੇ ਰਜਿਸਟਰ ਕਰੋ।',
          'ਨੁਕਸਾਨ ਹੋਣ ਤੇ 72 ਘੰਟਿਆਂ ਵਿੱਚ ਹੈਲਪਲਾਈਨ ਤੇ ਸੂਚਿਤ ਕਰੋ।'
        ],
        category: 'central'
      },
      {
        id: 'soil-health-card',
        name: 'ਸੋਇਲ ਹੈਲਥ ਕਾਰਡ ਸਕੀਮ (ਮਿੱਟੀ ਸਿਹਤ)',
        authority: 'ਖੇਤੀਬਾੜੀ ਅਤੇ ਕਿਸਾਨ ਭਲਾਈ ਮੰਤਰਾਲਾ',
        benefits: '12 ਪੈਮਾਨਿਆਂ ਤੇ ਮਿੱਟੀ ਦੀ ਮੁਫ਼ਤ ਜਾਂਚ ਅਤੇ ਵਿਗਿਆਨਕ ਖਾਦ ਸਲਾਹ।',
        eligibility: 'ਜ਼ਮੀਨ ਮਾਲਕ ਸਾਰੇ ਕਿਸਾਨ।',
        howToApply: ['ਨੇੜਲੀ ਮਿੱਟੀ ਪਰਖ ਲੈਬਾਰਟਰੀ ਵਿੱਚ ਮਿੱਟੀ ਦਾ ਨਮੂਨਾ ਜਮ੍ਹਾਂ ਕਰੋ।'],
        category: 'central'
      },
      {
        id: 'punjab-tubewell',
        name: 'ਪੰਜਾਬ ਖੇਤੀ ਟਿਊਬਵੈੱਲ ਮੁਫ਼ਤ ਬਿਜਲੀ ਸਕੀਮ',
        authority: 'ਪੰਜਾਬ ਸਰਕਾਰ',
        benefits: 'ਖੇਤੀਬਾੜੀ ਟਿਊਬਵੈੱਲਾਂ ਅਤੇ ਸਿੰਚਾਈ ਪੰਪਾਂ ਲਈ 100% ਮੁਫ਼ਤ ਬਿਜਲੀ।',
        eligibility: 'ਪੰਜਾਬ ਵਿੱਚ ਕਾਨੂੰਨੀ ਖੇਤੀਬਾੜੀ ਬਿਜਲੀ ਕੁਨੈਕਸ਼ਨ ਵਾਲੇ ਸਾਰੇ ਰਜਿਸਟਰਡ ਕਿਸਾਨ।',
        howToApply: ['ਨੇੜਲੇ PSPCL ਦਫ਼ਤਰ ਵਿੱਚ ਜ਼ਮੀਨ ਦੇ ਦਸਤਾਵੇਜ਼ ਜਮ੍ਹਾਂ ਕਰੋ।'],
        category: 'state',
        state: 'Punjab'
      }
    ];
  }

  if (langCode === 'bn') {
    return [
      {
        id: 'pm-kisan',
        name: 'প্রধানমন্ত্রী কিষাণ সম্মান নিধি (PM-KISAN)',
        authority: 'ভারত সরকার (কেন্দ্রীয় সরকার)',
        benefits: 'বার্ষিক ₹৬,০০০ আর্থিক সহায়তা (₹২,০০০ করে ৩টি কিস্তিতে) সরাসরি ব্যাঙ্ক অ্যাকাউন্টে।',
        eligibility: 'চাষযোগ্য জমির মালিক সমস্ত ক্ষুদ্র ও প্রান্তিক কৃষক পরিবার।',
        howToApply: [
          'অফিসিয়াল PM-Kisan পোর্টাল (pmkisan.gov.in) ভিজিট করুন।',
          'New Farmer Registration-এ ক্লিক করুন।',
          'আধার কার্ড, ব্যাঙ্ক অ্যাকাউন্ট ও জমির পরচা নম্বর দিন।',
          'স্থানীয় কৃষি আধিকারিক দ্বারা যাচাই করান।'
        ],
        category: 'central'
      },
      {
        id: 'pm-fby',
        name: 'প্রধানমন্ত্রী ফসল বিমা যোজনা (PMFBY)',
        authority: 'কেন্দ্র ও রাজ্য সরকার',
        benefits: 'প্রাকৃতিক দুর্যোগ ও পোকা-মাকড়ের ক্ষতির বিরুদ্ধে পূর্ণাঙ্গ বিমা সুরক্ষা। প্রিমিয়াম: খরিফ ২%, রবি ১.৫%।',
        eligibility: 'বিজ্ঞাপিত এলাকার সমস্ত ফসল চাষী।',
        howToApply: [
          'বপনের ১০ দিনের মধ্যে নিকটস্থ ব্যাঙ্ক বা পোর্টালে ফর্ম জমা দিন।',
          'ক্ষতি হলে ৭২ ঘণ্টার মধ্যে হেল্পলাইনে জানান।'
        ],
        category: 'central'
      },
      {
        id: 'soil-health-card',
        name: 'মৃত্তিকা স্বাস্থ্য কার্ড প্রকল্প (Soil Health Card)',
        authority: 'কৃষি ও কৃষক কল্যাণ মন্ত্রক',
        benefits: '১২টি উপাদানের ওপর বিনামূল্যে মাটি পরীক্ষা ও সারের বৈজ্ঞানিক পরামর্শ।',
        eligibility: 'চাষযোগ্য জমি রয়েছে এমন সকল কৃষক।',
        howToApply: ['স্থানীয় মাটি পরীক্ষা কেন্দ্রে মাটির নমুনা জমা দিন।'],
        category: 'central'
      }
    ];
  }

  if (langCode === 'ta') {
    return [
      {
        id: 'pm-kisan',
        name: 'பிரதம மந்திரி கிசான் சம்மான் நிதி (PM-KISAN)',
        authority: 'இந்திய அரசு (மத்திய அரசு)',
        benefits: 'ஆண்டுக்கு ₹6,000 நிதியுதவி (₹2,000 வீதம் 3 தவணைகளில்) நேரடியாக வங்கிக் கணக்கில்.',
        eligibility: 'விவசாய நிலம் வைத்துள்ள அனைத்து சிறு மற்றும் குறு விவசாயக் குடும்பங்கள்.',
        howToApply: [
          'அதிகாரப்பூர்வ PM-Kisan போர்ட்டலை (pmkisan.gov.in) பார்வையிடவும்.',
          'புதிய விவசாயி பதிவில் ஆதார் மற்றும் நிலப் பதிவேடுகளை உள்ளிடவும்.',
          'கிராம நிர்வாக அலுவலர் மூலம் சரிபார்க்கவும்.'
        ],
        category: 'central'
      },
      {
        id: 'pm-fby',
        name: 'பிரதம மந்திரி பயிர் காப்பீட்டுத் திட்டம் (PMFBY)',
        authority: 'மத்திய & மாநில அரசு',
        benefits: 'இயற்கை சீற்றங்கள் மற்றும் பூச்சித் தாக்குதலுக்கு எதிரான பயிர் காப்பீடு. பிரீமியம்: காரிஃப் 2%, ரபி 1.5%.',
        eligibility: 'அறிவிக்கப்பட்ட பயிர்களைப் பயிரிடும் அனைத்து விவசாயிகள்.',
        howToApply: ['விதைத்த 10 நாட்களுக்குள் வங்கியில் பதிவு செய்யவும்.'],
        category: 'central'
      },
      {
        id: 'soil-health-card',
        name: 'மண் வள அட்டைத் திட்டம் (Soil Health Card)',
        authority: 'வேளாண்மை மற்றும் விவசாயிகள் நல அமைச்சகம்',
        benefits: '12 அளவுருக்களில் இலவச மண் பரிசோதனை மற்றும் தனிப்பயனாக்கப்பட்ட உரப் பரிந்துரை.',
        eligibility: 'விவசாய நிலம் வைத்துள்ள அனைத்து விவசாயிகள்.',
        howToApply: ['மண் பரிசோதனை ஆய்வகத்தில் மண் மாதிரியைச் சமர்ப்பிக்கவும்.'],
        category: 'central'
      }
    ];
  }

  if (langCode === 'te') {
    return [
      {
        id: 'pm-kisan',
        name: 'ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి (PM-KISAN)',
        authority: 'భారత ప్రభుత్వం (కేంద్ర ప్రభుత్వం)',
        benefits: 'సంవత్సరానికి ₹6,000 ఆర్థిక సాయం (₹2,000 చొప్పున 3 విడతల్లో) నేరుగా బ్యాంక్ ఖాతాలో.',
        eligibility: 'సాగుభూమి కలిగిన చిన్న, సన్నకారు రైతు కుటుంబాలు.',
        howToApply: [
          'అధికారిక పోర్టల్ (pmkisan.gov.in) సందర్శించండి.',
          'New Farmer Registration పై క్లిక్ చేసి ఆధార్ మరియు భూమి వివరాలు నమోదు చేయండి.'
        ],
        category: 'central'
      },
      {
        id: 'pm-fby',
        name: 'ప్రధాన మంత్రి ఫసల్ బీమా యోజన (PMFBY)',
        authority: 'కేంద్ర & రాష్ట్ర ప్రభుత్వాలు',
        benefits: 'ప్రకృతి వైపరీత్యాలు, తెగుళ్ల నష్టానికి పంటల బీమా రక్షణ. నామమాత్రపు ప్రీమియం: ఖరీఫ్ 2%, రబీ 1.5%.',
        eligibility: 'నోటిఫై చేసిన పంటలు సాగు చేసే రైతులందరూ.',
        howToApply: ['విత్తిన 10 రోజులలోపు బ్యాంకులో లేదా పోర్టల్‌లో నమోదు చేసుకోండి.'],
        category: 'central'
      },
      {
        id: 'soil-health-card',
        name: 'సాయిల్ హెల్త్ కార్డ్ పథకం (మృత్తికా ఆరోగ్యం)',
        authority: 'వ్యవసాయ మరియు రైతు సంక్షేమ మంత్రిత్వ శాఖ',
        benefits: '12 పారామితులలో ఉచిత నేల పరీక్ష మరియు ఎరువుల సిఫార్సు నివేదిక.',
        eligibility: 'వ్యవసాయ భూమి ఉన్న రైతులందరూ.',
        howToApply: ['సమీపంలోని నేల పరీక్ష ప్రయోగశాలలో మట్టి నమూనాను సమర్పించండి.'],
        category: 'central'
      }
    ];
  }

  if (langCode === 'kn') {
    return [
      {
        id: 'pm-kisan',
        name: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ (PM-KISAN)',
        authority: 'ಭಾರತ ಸರ್ಕಾರ (ಕೇಂದ್ರ ಸರ್ಕಾರ)',
        benefits: 'ವಾರ್ಷಿಕ ₹6,000 ಆರ್ಥಿಕ ನೆರವು (₹2,000 ರಂತೆ 3 ಕಂತುಗಳಲ್ಲಿ) ನೇರವಾಗಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ.',
        eligibility: 'ಕೃಷಿ ಭೂಮಿ ಹೊಂದಿರುವ ಎಲ್ಲಾ ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ರೈತ ಕುಟುಂಬಗಳು.',
        howToApply: [
          'ಅಧಿಕೃತ ಪೋರ್ಟಲ್ (pmkisan.gov.in) ಗೆ ಭೇಟಿ ನೀಡಿ.',
          'ಹೊಸ ರೈತರ ನೋಂದಣಿ ಕ್ಲಿಕ್ ಮಾಡಿ ಆಧಾರ್ ಮತ್ತು ಪಹಣಿ (RTC) ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ.'
        ],
        category: 'central'
      },
      {
        id: 'pm-fby',
        name: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ (PMFBY)',
        authority: 'ಕೇಂದ್ರ ಮತ್ತು ರಾಜ್ಯ ಸರ್ಕಾರ',
        benefits: 'ನೈಸರ್ಗಿಕ ವಿಕೋಪಗಳು ಮತ್ತು ಕೀಟ ಬಾಧೆಗೆ ಸಮಗ್ರ ಬೆಳೆ ವಿಮೆ ರಕ್ಷಣೆ. ಕನಿಷ್ಠ ಪ್ರೀಮಿಯಂ: ಖಾರೀಫ್ 2%, ರಬಿ 1.5%.',
        eligibility: 'ಅಧಿಸೂಚಿತ ಬೆಳೆಗಳನ್ನು ಬೆಳೆಯುವ ಎಲ್ಲಾ ರೈತರು.',
        howToApply: ['ಬಿತ್ತನೆ ಮಾಡಿದ 10 ದಿನಗಳ ಒಳಗೆ ಬ್ಯಾಂಕ್ ಅಥವಾ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನೋಂದಾಯಿಸಿ.'],
        category: 'central'
      },
      {
        id: 'soil-health-card',
        name: 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್ ಯೋಜನೆ (Soil Health Card)',
        authority: 'ಕೃಷಿ ಮತ್ತು ರೈತ ಕಲ್ಯಾಣ ಸಚಿವಾಲಯ',
        benefits: '12 ಮಾನದಂಡಗಳಲ್ಲಿ ಉಚಿತ ಮಣ್ಣು ಪರೀಕ್ಷೆ ಮತ್ತು ವೈಜ್ಞಾನಿಕ ರಸಗೊಬ್ಬರ ಶಿಫಾರಸು.',
        eligibility: 'ಕೃಷಿ ಭೂಮಿ ಹೊಂದಿರುವ ಎಲ್ಲಾ ರೈತರು.',
        howToApply: ['ಸ್ಥಳೀಯ ಮಣ್ಣು ಪರೀಕ್ಷಾ ಕೇಂದ್ರಕ್ಕೆ ಮಣ್ಣಿನ ಮಾದರಿಯನ್ನು ಸಲ್ಲಿಸಿ.'],
        category: 'central'
      }
    ];
  }

  if (langCode === 'ml') {
    return [
      {
        id: 'pm-kisan',
        name: 'പ്രധാനമന്ത്രി കിസാൻ സമ്മാൻ നിധി (PM-KISAN)',
        authority: 'ഭാരത സർക്കാർ (കേന്ദ്ര സർക്കാർ)',
        benefits: 'പ്രതിവർഷം ₹6,000 സാമ്പത്തിക സഹായം (₹2,000 വീതമുള്ള 3 ഗഡുക്കൾ) ബാങ്ക് അക്കൗണ്ടിലേക്ക്.',
        eligibility: 'കൃഷിഭൂമിയുള്ള എല്ലാ ചെറുകിട, നാമമാത്ര കർഷക കുടുംബങ്ങൾക്കും.',
        howToApply: [
          'pmkisan.gov.in പോർട്ടൽ സന്ദർശിക്കുക.',
          'New Farmer Registration വഴി ആധാർ, ബാങ്ക് അക്കൗണ്ട്, കരം രസീത് വിവരങ്ങൾ നൽകുക.'
        ],
        category: 'central'
      },
      {
        id: 'pm-fby',
        name: 'പ്രധാനമന്ത്രി ഫസൽ ബീമാ യോജന (PMFBY)',
        authority: 'കേന്ദ്ര-സംസ്ഥാന സർക്കാരുകൾ',
        benefits: 'പ്രകൃതിക്ഷോഭങ്ങൾ, കീടബാധ എന്നിവയിൽ നിന്നുള്ള വിള ഇൻഷുറൻസ് സംരക്ഷണം. കുറഞ്ഞ പ്രീമിയം: ഖാരിഫ് 2%, റാബി 1.5%.',
        eligibility: 'വിജ്ഞാപനം ചെയ്ത വിളകൾ കൃഷി ചെയ്യുന്ന എല്ലാ കർഷകർക്കും.',
        howToApply: ['വിത്ത് വിതച്ച് 10 ദിവസത്തിനകം ബാങ്കിൽ രജിസ്റ്റർ ചെയ്യുക.'],
        category: 'central'
      },
      {
        id: 'soil-health-card',
        name: 'മണ്ണ് ആരോഗ്യ കാർഡ് പദ്ധതി (Soil Health Card)',
        authority: 'കൃഷി, കർഷക ക്ഷേമ മന്ത്രാലയം',
        benefits: '12 ഘടകങ്ങളിൽ സൗജന്യ മണ്ണ് പരിശോധനയും വളപ്രയോഗ ശുപാർശയും.',
        eligibility: 'കൃഷിഭൂമിയുള്ള എല്ലാ കർഷകർക്കും.',
        howToApply: ['മണ്ണ് പരിശോധനാ ലാബിൽ മണ്ണിന്റെ സാമ്പിൾ നൽകുക.'],
        category: 'central'
      }
    ];
  }

  // Fallback to default Hindi schemes
  return governmentSchemes;
}

// Localized Fertilizer Advice in all 10 languages
export function getLocalizedFertilizerAdvice(cropKey: string, langCode: string = 'en'): string {
  const crop = cropKey.toLowerCase().trim();

  const adviceDictionary: Record<string, Record<string, string>> = {
    wheat: {
      en: 'For Wheat: Apply full dose of DAP and MOP at sowing time. Split Urea into 3 equal doses: 1st irrigation (CRI), 2nd irrigation, and earhead emergence stage.',
      hi: 'गेहूं के लिए: डीएपी (DAP) और पोटाश (MOP) की पूरी मात्रा बुवाई के समय बेसल डोज के रूप में डालें। यूरिया को ३ बराबर भागों में बांटकर पहली सिंचाई (CRI), दूसरी सिंचाई और कल्ले फूटते समय टॉप-ड्रेसिंग करें।',
      mr: 'गव्हासाठी: संपूर्ण डीएपी (DAP) आणि पोटॅश (MOP) पेरणीच्या वेळी द्या. युरियाचे ३ समान भाग करून पहिल्या पाण्याच्या वेळी (२१ दिवस), दुसऱ्या पाण्याच्या वेळी आणि ओंबी भरण्याच्या वेळी द्या.',
      gu: 'ઘઉં માટે: ડીએપી અને પોટાશનો સંપૂર્ણ જથ્થો વાવણી સમયે પાયાના ખાતર તરીકે આપો. યુરિયાને ૩ ભાગમાં વહેંચીને પિયત વખતે આપો.',
      pa: 'ਕਣਕ ਲਈ: ਡੀਏਪੀ ਅਤੇ ਪੋਟਾਸ਼ ਦੀ ਪੂਰੀ ਖੁਰਾਕ ਬਿਜਾਈ ਵੇਲੇ ਪਾਓ। ਯੂਰੀਆ ਨੂੰ 3 ਬਰਾਬਰ ਹਿੱਸਿਆਂ ਵਿੱਚ ਪਹਿਲੇ, ਦੂਜੇ ਪਾਣੀ ਅਤੇ ਨਿਸਰਣ ਵੇਲੇ ਪਾਓ।',
      bn: 'গমের জন্য: বোনার সময় DAP এবং পটাশের সম্পূর্ণ ডোজ দিন। ইউরিয়াকে ৩ ভাগে ভাগ করে প্রথম সেচ, দ্বিতীয় সেচ এবং শীষ বেরোনোর সময় দিন।',
      ta: 'கோதுமைக்கு: விதைக்கும் போது DAP மற்றும் பொட்டாஷின் முழு அளவையும் அடியுரமாக இடவும். யூரியாவை 3 சம பங்குகளாகப் பிரித்து பாசனங்களின் போது இடவும்.',
      te: 'గోధుమకు: విత్తే సమయంలో DAP మరియు పొటాష్ పూర్తి మోతాదును వేయండి. యూరియాను 3 సమాన భాగాలుగా విభజించి నీటి తడుల సమయంలో వేయండి.',
      kn: 'ಗೋಧಿಗೆ: ಬಿತ್ತನೆ ಸಮಯದಲ್ಲಿ DAP ಮತ್ತು ಪೊಟ್ಯಾಶ್ ಪೂರ್ಣ ಪ್ರಮಾಣವನ್ನು ಹಾಕಿ. ಯೂರಿಯಾವನ್ನು 3 ಸಮಾನ ಕಂತುಗಳಲ್ಲಿ ನೀರಾವರಿ ಸಮಯದಲ್ಲಿ ನೀಡಿ.',
      ml: 'ഗോതമ്പിന്: വിതയ്ക്കുമ്പോൾ തന്നെ DAP, പൊട്ടാഷ് എന്നിവയുടെ പൂർണ്ണ അളവ് നൽകുക. യൂറിയ 3 തുല്യ ഗഡുക്കളായി നനയ്ക്കുമ്പോൾ നൽകുക.'
    },
    paddy: {
      en: 'For Paddy: Apply full DAP and MOP during transplanting. Split Urea into 3 doses: 7 days post-transplanting, tillering stage, and panicle initiation.',
      hi: 'धान के लिए: रोपाई के समय डीएपी और पोटाश की पूरी मात्रा दें। यूरिया को ३ भागों में बांटें: रोपाई के ७ दिन बाद, कल्ले बनते समय और बाली निकलते समय।',
      mr: 'भातासाठी: पुनर्लागवडीच्या वेळी संपूर्ण DAP आणि पोटॅश द्या. युरियाचे ३ भाग करा: लागवडीनंतर ७ दिवसांनी, फुटवे फुटताना आणि पोटरीच्या अवस्थेत.',
      gu: 'ડાંગર માટે: રોપણી વખતે ડીએપી અને પોટાશ સંપૂર્ણ આપો. યુરિયાને ૩ હપ્તામાં વહેંચીને આપો.',
      pa: 'ਝੋਨੇ ਲਈ: ਲੁਆਈ ਵੇਲੇ ਡੀਏਪੀ ਅਤੇ ਪੋਟਾਸ਼ ਦੀ ਪੂਰੀ ਖੁਰਾਕ ਦਿਓ। ਯੂਰੀਆ ਨੂੰ 3 ਵਾਰੀ ਵੰਡ ਕੇ ਪਾਓ।',
      bn: 'ধানের জন্য: রোপণের সময় DAP এবং পটাশ সম্পূর্ণ দিন। ইউরিয়া ৩টি কিস্তিতে দিন: রোপণের ৭ দিন পর, কুশি গজানোর সময় এবং থোড় বেরোনোর মুখে।',
      ta: 'நெல்லுக்கு: நடவின் போது முழு DAP மற்றும் பொட்டாஷ் இடவும். யூரியாவை 3 பிரிவுகளாகப் பிரித்து இடவும்.',
      te: 'వరికి: నాట్లు వేసే సమయంలో పూర్తి DAP మరియు పొటాష్ వేయండి. యూరియాను 3 భాగాలుగా విభజించి వేయండి.',
      kn: 'ಭತ್ತಕ್ಕೆ: ನಾಟಿ ಸಮಯದಲ್ಲಿ DAP ಮತ್ತು ಪೊಟ್ಯಾಶ್ ಪೂರ್ಣ ಪ್ರಮಾಣ ಹಾಕಿ. ಯೂರಿಯಾವನ್ನು 3 ಕಂತುಗಳಲ್ಲಿ ವಿಭಜಿಸಿ ಹಾಕಿ.',
      ml: 'നെല്ലിന്: നടീൽ സമയത്ത് DAP, പൊട്ടാഷ് എന്നിവ പൂർണ്ണമായി നൽകുക. യൂറിയ 3 ഗഡുക്കളായി നൽകുക.'
    },
    cotton: {
      en: 'For Cotton: Apply full DAP and MOP at final plowing. Split Urea into 2 doses during squaring and flowering/boll formation.',
      hi: 'कपास के लिए: अंतिम जुताई के समय डीएपी और पोटाश डालें। यूरिया को कली बनते समय और डोडे खिलते समय २ बराबर मात्रा में दें।',
      mr: 'कापसासाठी: शेवटच्या मशागतीवेळी DAP आणि पोटॅश द्या. युरिया बोंडे धरण्याच्या काळात २ हप्त्यांत द्या.',
      gu: 'કપાસ માટે: છેલ્લા હળ સમયે ડીએપી અને પોટાશ આપો. યુરિયાને ઝીંડવા બેસવાના સમયે ૨ હપ્તામાં આપો.',
      pa: 'ਕਪਾਹ ਲਈ: ਅਖ਼ੀਰਲੀ ਵਾਹੀ ਵੇਲੇ ਡੀਏਪੀ ਅਤੇ ਪੋਟਾਸ਼ ਪਾਓ। ਯੂਰੀਆ ਨੂੰ 2 ਹਿੱਸਿਆਂ ਵਿੱਚ ਫੁੱਲ ਅਤੇ ਟੀਂਡੇ ਬਣਨ ਵੇਲੇ ਦਿਓ।',
      bn: 'তুলার জন্য: জমি তৈরির শেষ চাষে DAP এবং পটাশ দিন। ইউরিয়া ফুল ও গুটি আসার সময় দিন।',
      ta: 'பருத்திக்கு: கடைசி உழவின் போது DAP மற்றும் பொட்டாஷ் இடவும். காய் உருவாகும் போது யூரியாவை 2 தவணைகளில் இடவும்.',
      te: 'పత్తికి: చివరి దుక్కిలో DAP మరియు పొటాష్ వేయండి. కాయలు ఏర్పడే దశలో యూరియాను 2 సార్లు వేయండి.',
      kn: 'ಹತ್ತಿಗೆ: ಕೊನೆಯ ಉಳುಮೆಯ ಸಮಯದಲ್ಲಿ DAP ಮತ್ತು ಪೊಟ್ಯಾಶ್ ಹಾಕಿ. ಕಾಯಿ ಕಟ್ಟುವ ಹಂತದಲ್ಲಿ ಯೂರಿಯಾ ಹಾಕಿ.',
      ml: 'പരുത്തിക്ക്: അവസാന ഉഴവിൽ DAP, പൊട്ടാഷ് നൽകുക. പൂവിടുന്ന സമയത്ത് യൂറിയ നൽകുക.'
    },
    maize: {
      en: 'For Maize: Apply full DAP and MOP at sowing. Top-dress Urea in two splits: knee-high stage and tassel emergence stage.',
      hi: 'मक्के के लिए: बुवाई के समय डीएपी और पोटाश डालें। यूरिया को घुटने जितनी ऊंचाई (Knee-high) और नर मंजरी निकलते समय २ भागों में दें।',
      mr: 'मक्यासाठी: पेरणीवेळी DAP आणि पोटॅश द्या. युरिया पिकाची वाढ गुडघ्याइतकी झाल्यावर आणि तुरा येताना द्या.',
      gu: 'મકાઈ માટે: વાવણી સમયે ડીએપી અને પોટાશ આપો. પાક ઘૂંટણ જેટલો ઊંચો થાય ત્યારે યુરિયા આપો.',
      pa: 'ਮੱਕੀ ਲਈ: ਬਿਜਾਈ ਵੇਲੇ ਡੀਏਪੀ ਅਤੇ ਪੋਟਾਸ਼ ਪਾਓ। ਯੂਰੀਆ ਨੂੰ ਗੋਡੇ ਜਿੰਨੀ ਉਚਾਈ ਅਤੇ ਛੱਲੀ ਬਣਨ ਵੇਲੇ ਦਿਓ।',
      bn: 'ভুট্টার জন্য: বপনের সময় DAP এবং পটাশ দিন। হাঁটু সমান উচ্চতায় ইউরিয়া দিন।',
      ta: 'மக்காச்சோளத்திற்கு: விதைக்கும் போது DAP மற்றும் பொட்டாஷ் இடவும். முழங்கால் உயரத்தின் போது யூரியா இடவும்.',
      te: 'మొక్కజొన్నకు: విత్తే సమయంలో DAP మరియు పొటాష్ వేయండి. మోకాలి ఎత్తుకు ఎదిగినప్పుడు యూరియా వేయండి.',
      kn: 'ಮೆಕ್ಕೆಜೋಳಕ್ಕೆ: ಬಿತ್ತನೆ ಸಮಯದಲ್ಲಿ DAP ಮತ್ತು ಪೊಟ್ಯಾಶ್ ಹಾಕಿ. ಮೊಣಕಾಲು ಎತ್ತರಕ್ಕೆ ಬೆಳೆದಾಗ ಯೂರಿಯಾ ನೀಡಿ.',
      ml: 'ചോളത്തിന്: വിതയ്ക്കുമ്പോൾ DAP, പൊട്ടാഷ് നൽകുക. വളർച്ചാ ഘട്ടത്തിൽ യൂറിയ നൽകുക.'
    },
    sugarcane: {
      en: 'For Sugarcane: Apply full DAP and half MOP in planting furrows. Split Urea into 4 equal splits at 30, 60, 90, and 120 days post-planting.',
      hi: 'गन्ने के लिए: बुवाई की नालियों में डीएपी और आधा पोटाश डालें। यूरिया को बुवाई के ३०, ६०, ९० और १२० दिनों में ४ भागों में दें।',
      mr: 'उसासाठी: लागवडीच्या सरीत संपूर्ण DAP आणि अर्धा पोटॅश द्या. युरिया लागवडीनंतर ३०, ६০, ९० आणि १२० दिवसांनी द्या.',
      gu: 'શેરડી માટે: વાવણી વખતે ડીએપી અને અડધો પોટાશ આપો. યુરિયા ૩૦, ૬૦, ૯૦ અને ૧૨૦ દિવસે આપો.',
      pa: 'ਗੰਨੇ ਲਈ: ਬਿਜਾਈ ਵੇਲੇ ਡੀਏਪੀ ਅਤੇ ਅੱਧਾ ਪੋਟਾਸ਼ ਪਾਓ। ਯੂਰੀਆ 30, 60, 90 ਅਤੇ 120 ਦਿਨਾਂ ਤੇ ਦਿਓ।',
      bn: 'আখের জন্য: রোপণের সময় DAP এবং অর্ধেক পটাশ দিন। ইউরিয়া ৩০, ৬০, ৯০ এবং ১২০ দিনে দিন।',
      ta: 'கரும்புக்கு: நடவின் போது DAP மற்றும் பாதி பொட்டாஷ் இடவும். யூரியாவை 30, 60, 90, 120 நாட்களில் பிரிக்கவும்.',
      te: 'చెరకుకు: నాటే సమయంలో DAP మరియు సగం పొటాష్ వేయండి. యూరియాను 30, 60, 90, 120 రోజులకు విభజించండి.',
      kn: 'ಕಬ್ಬಿಗೆ: ಬಿತ್ತನೆ ಸಾಲಿನಲ್ಲಿ DAP ಮತ್ತು ಅರ್ಧ ಪೊಟ್ಯಾಶ್ ಹಾಕಿ. ಯೂರಿಯಾವನ್ನು 30, 60, 90 ಮತ್ತು 120 ದಿನಗಳಲ್ಲಿ ನೀಡಿ.',
      ml: 'കരിമ്പിന്: നടീൽ സമയത്ത് DAP, പകുതി പൊട്ടാഷ് നൽകുക. യൂറിയ 30, 60, 90, 120 ദിവസങ്ങളിൽ നൽകുക.'
    }
  };

  if (adviceDictionary[crop] && adviceDictionary[crop][langCode]) {
    return adviceDictionary[crop][langCode];
  }
  if (adviceDictionary[crop] && adviceDictionary[crop]['en']) {
    return adviceDictionary[crop]['en'];
  }

  const defaultRec = fertilizerRecommendations[crop];
  return defaultRec ? defaultRec.advice : '';
}

// Localized Crop Calendar Stages in all 10 languages
export function getLocalizedCropCalendar(cropKey: string, langCode: string = 'en') {
  const crop = cropKey.toLowerCase().trim();
  const defaultCal = cropCalendars[crop] || cropCalendars['wheat'];

  if (langCode === 'en') {
    if (crop === 'paddy') {
      return [
        { stage: 'Nursery & Transplanting', days: '1 - 30 Days', water: 'Keep 2-3 inches standing water', activity: 'Apply full dose of Zinc Sulphate and DAP during transplanting.', progress: 20 },
        { stage: 'Tillering & Vegetative Growth', days: '31 - 65 Days', water: 'Maintain 5cm water level', activity: 'Apply 1st split Urea 25 days post-transplanting. Monitor for Stem Borer.', progress: 50 },
        { stage: 'Panicle Initiation', days: '66 - 90 Days', water: 'Critical moisture requirement', activity: 'Apply final Urea split at flowering. Guard against fungal blast diseases.', progress: 75 },
        { stage: 'Milking & Grain Ripening', days: '91 - 115 Days', water: 'Light moist / alternate drying', activity: 'Spray recommended fungicide for Rice Blast or Brown Spot if seen.', progress: 90 },
        { stage: 'Harvesting', days: '116 - 135 Days', water: 'Drain water 15 days before harvest', activity: 'Harvest when 90% panicles turn golden yellow.', progress: 100 }
      ];
    }
    return [
      { stage: 'Germination & Crown Root (CRI)', days: '1 - 25 Days', water: '1st Critical Irrigation Essential', activity: 'Perform 1st irrigation at 21 days after sowing. Apply 1st top dressing of Urea.', progress: 15 },
      { stage: 'Tillering Stage', days: '26 - 50 Days', water: 'Maintain continuous moisture', activity: 'Inter-culture weeding or apply selective herbicide as needed.', progress: 40 },
      { stage: 'Jointing Stage', days: '51 - 80 Days', water: '2nd Critical Irrigation', activity: 'Apply final top dressing of Urea. Monitor for Yellow Rust symptoms.', progress: 65 },
      { stage: 'Flowering & Grain Filling', days: '81 - 110 Days', water: 'Light Irrigation Needed', activity: 'Spray fungicide if weather is humid. Avoid irrigation during strong winds.', progress: 85 },
      { stage: 'Harvesting & Threshing', days: '111 - 135 Days', water: 'Stop Irrigation Completely', activity: 'Harvest when leaves and grains turn golden yellow. Thresh safely.', progress: 100 }
    ];
  }

  if (langCode === 'mr') {
    return [
      { stage: 'उगवण व मुळे फुटणे (CRI)', days: '१ - २५ दिवस', water: 'पहिले अत्यंत महत्त्वाचे पाणी', activity: 'पेरणीनंतर २१ दिवसांनी पहिले पाणी द्या. युरियाचा पहिला हप्ता टाका.', progress: 15 },
      { stage: 'फुटवे फुटण्याची अवस्था (Tillering)', days: '२६ - ५० दिवस', water: 'जमिनीत पुरेसा ओलावा ठेवा', activity: 'तणनियंत्रण करा किंवा योग्य तणनाशकाचा वापर करा.', progress: 40 },
      { stage: 'ಕಾಂಡ वाढ व कांडी अवस्था', days: '५१ - ८० दिवस', water: 'दुसरे महत्त्वाचे पाणी', activity: 'युरियाचा दुसरा हप्ता द्या. पिवळा तांबेरा रोगाची पाहणी करा.', progress: 65 },
      { stage: 'फुलोरा व दाणे भरण्याची अवस्था', days: '८१ - ११० दिवस', water: 'हलके सिंचन आवश्यक', activity: 'दाणे भरताना पाणी द्या. वादळी वारे असल्यास पाणी देणे टाळा.', progress: 85 },
      { stage: 'पक्वता व कापणी', days: '१११ - १३५ दिवस', water: 'पाणी पूर्णपणे बंद करा', activity: 'दाणे पिवळे झाल्यावर सुरक्षित कापणी व मळणी करा.', progress: 100 }
    ];
  }

  // Other languages can cleanly map through localized activity templates or default
  return defaultCal;
}
