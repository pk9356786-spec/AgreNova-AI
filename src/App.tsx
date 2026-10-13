/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, Component, ReactNode } from 'react';
import { 
  Mic, MicOff, Camera, Sparkles, Send, AlertCircle, RefreshCw, 
  CheckCircle, HelpCircle, FileText, Wheat, MapPin, User, 
  TrendingUp, Award, Calculator, Calendar, Droplets, 
  Activity, ShieldAlert, Sparkle, Download, Eye, Plus, ArrowRight,
  UserCheck, Sliders, ChevronDown, ChevronUp, Share2, Printer, 
  Trash2, Search, Info, Settings, X, Globe, Bot, Volume2, ScanLine,
  Image as ImageIcon, Upload, Menu, Home, History, Phone, RotateCcw, Filter, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FarmerProfile, MandiPrice, AnalysisResult, QuestionResult, PastReport, Scheme, SoilHealthCard 
} from './types';
import { 
  indianStates, mspRates, mandiPricesData, getWeatherAdvisory, 
  governmentSchemes, fertilizerRecommendations, soilProfiles, 
  cropCalendars, getCropRiskAssessment, getLocalizedFertilizerAdvice,
  getLocalizedCropCalendar, getLocalizedGovernmentSchemes
} from './data';
import { AgreNovaLogoIcon, AgreNovaLogoBadge } from './components/AgreNovaLogo';
import { VoiceResponsePlayer } from './components/VoiceResponsePlayer';
import { FarmerProfileForm } from './components/FarmerProfileForm';
import { FormattedMessage } from './components/FormattedMessage';
import { WeatherEnvironmentAnimation } from './components/WeatherEnvironmentAnimation';
import { CropAnalysisResultCard } from './components/CropAnalysisResultCard';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { SUPPORTED_LANGUAGES, getTranslation, detectInputLanguage, getTTSLangCode } from './translations';

// Helper for Arabic to Hindi numerals if requested, but simple standard digits are preferred for readibility
const toHindiDigits = (num: number | string) => String(num);

const getHindiDate = () => {
  const date = new Date();
  const day = toHindiDigits(date.getDate());
  const year = toHindiDigits(date.getFullYear());
  const months = [
    'जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 
    'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
  ];
  const month = months[date.getMonth()];
  return `${day} ${month}, ${year}`;
};

// Initial default reports to populate history if empty
const defaultPastReports: PastReport[] = [
  {
    id: 'r1',
    date: '06 जुलाई, 2026',
    type: 'disease',
    title: 'संभावित रोग: गेहूं का भूरा रतुआ (Brown Rust)',
    subTitle: 'गेहूं (Wheat)',
    imageUrl: null,
    disease: 'गेहूं का भूरा रतुआ (Brown Rust)',
    scientificName: 'Puccinia triticina',
    confidence: '90%',
    severity: 'मध्यम',
    cropLoss: '15-20%',
    recoveryTimeline: '7-10 दिन',
    description: 'पत्तियों पर छोटे, गोल, चमकीले नारंगी या भूरे रंग के धब्बे दिखाई देते हैं। यह मुख्य रूप से हवा द्वारा फैलने वाला फंगल संक्रमण है जो गर्म और नम हवा में तेजी से बढ़ता है।',
    preventionTips: '1. रोग प्रतिरोधी किस्मों (जैसे HD 2967, HD 3086) का चयन करें।\n2. नाइट्रोजन उर्वरकों का अधिक मात्रा में एक साथ छिड़काव न करें।\n3. पोटाश (MOP) का उचित मात्रा में उपयोग करें ताकि रोग प्रतिरोधक क्षमता विकसित हो।',
    organicTreatment: '1. खट्टे मट्ठे (5-6 दिन पुराना छाछ) को तांबे के बर्तन में रखकर 5 लीटर प्रति एकड़ की दर से 150 लीटर पानी में मिलाकर छिड़काव करें।\n2. नीम के तेल (3000 PPM) का 3 मिली प्रति लीटर पानी में मिलाकर घोल बनाकर पत्तियों पर छिड़कें।',
    chemicalTreatment: '1. प्रोपीकोनाज़ोल (Propiconazole 25% EC) कवकनाशी का 1 मिली प्रति लीटर पानी (यानी 200 मिली प्रति एकड़) में घोल बनाकर छिड़काव करें।\n2. यदि संक्रमण गंभीर हो तो टेबुकोनाज़ोल का छिड़काव करें।',
    advice: 'किसान भाई, घबराने की आवश्यकता नहीं है। अपनी फसल में यूरिया की टॉप-ड्रेसिंग टालें और तुरंत जैविक उपचार के रूप में छाछ या रासायनिक कवकनाशी प्रोपीकोनाज़ोल का छिड़काव करें।'
  },
  {
    id: 'r2',
    date: '28 जून, 2026',
    type: 'disease',
    title: 'संभावित रोग: धान का झोंका रोग (Rice Blast)',
    subTitle: 'धान (Paddy Common)',
    imageUrl: null,
    disease: 'धान का झोंका रोग (Rice Blast)',
    scientificName: 'Magnaporthe oryzae',
    confidence: '94%',
    severity: 'उच्च',
    cropLoss: '30-40%',
    recoveryTimeline: '10-14 दिन',
    description: 'पत्तियों पर विशिष्ट आंख के आकार के धब्बे दिखाई दे रहे हैं जिनके केंद्र में भूरा/धूसर रंग और किनारों पर लाल-भूरा घेरा है। यह एक गंभीर फंगल संक्रमण है जो गर्म और आर्द्र मौसम में तेजी से फैलता है।',
    preventionTips: '1. रोपाई के समय स्वस्थ और प्रमाणित बीजों का ही उपयोग करें।\n2. नाइट्रोजन उर्वरकों की अत्यधिक खुराक न डालें।\n3. खेत में जल निकासी व्यवस्था को उत्तम रखें।',
    organicTreatment: '1. स्यूडोमोनास फ्लोरेसेंस (Pseudomonas fluorescens) जैविक कवकनाशी का 10 ग्राम प्रति लीटर पानी में मिलाकर पत्तियों पर छिड़काव करें।\n2. गाय के मट्ठे या नीम के तेल (3000 PPM) का छिड़काव करें।',
    chemicalTreatment: '1. ट्राईसाइक्लाज़ोल (75% WP) कवकनाशी का 0.6 ग्राम प्रति लीटर पानी में मिलाकर पहला छिड़काव करें।\n2. गंभीर संक्रमण में हेक्साकोनाजोल (5% EC) का 2 मिली प्रति लीटर पानी में छिड़काव करें।',
    advice: 'किसान भाई, पहले खेत में यूरिया का उपयोग रोकें। तुरंत जैविक स्यूडोमोनास का छिड़काव करें, यदि रोग 3 दिनों में नियंत्रित न हो तो ट्राईसाइक्लाज़ोल फफूंदनाशक का छिड़काव करें।'
  }
];

// Memory-efficient helper to compress camera images to max 1200px width/height and JPEG 0.80 quality
const compressImage = (input: File | Blob | string, maxWidth = 1200, maxHeight = 1200, quality = 0.80): Promise<string> => {
  return new Promise((resolve) => {
    let objectUrl: string | null = null;
    let src = '';

    if (typeof input === 'string') {
      src = input;
    } else {
      try {
        objectUrl = URL.createObjectURL(input);
        src = objectUrl;
      } catch {
        // Fallback to FileReader if createObjectURL fails
        const reader = new FileReader();
        reader.onload = () => resolve(compressImage(reader.result as string, maxWidth, maxHeight, quality));
        reader.onerror = () => resolve('');
        reader.readAsDataURL(input);
        return;
      }
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    const cleanup = () => {
      if (objectUrl) {
        try {
          URL.revokeObjectURL(objectUrl);
        } catch {
          // Ignore revocation cleanup
        }
      }
    };

    img.onload = () => {
      try {
        let width = img.width || maxWidth;
        let height = img.height || maxHeight;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, width);
        canvas.height = Math.max(1, height);

        const ctx = canvas.getContext('2d', { alpha: false });
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          const result = canvas.toDataURL('image/jpeg', quality);
          cleanup();
          resolve(result);
        } else {
          cleanup();
          resolve(typeof input === 'string' ? input : '');
        }
      } catch (err) {
        cleanup();
        resolve(typeof input === 'string' ? input : '');
      }
    };

    img.onerror = () => {
      cleanup();
      resolve(typeof input === 'string' ? input : '');
    };

    img.src = src;
  });
};

// Generates high-quality sample crop leaf data URLs for test diagnoses
const createSampleCropImage = (cropType: 'wheat' | 'tomato' | 'cotton' | 'rice' | 'maize'): string => {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 450;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background sky/field gradient
  const bgGradient = ctx.createLinearGradient(0, 0, 0, 450);
  bgGradient.addColorStop(0, '#78909c');
  bgGradient.addColorStop(0.5, '#546e7a');
  bgGradient.addColorStop(1, '#2e7d32');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, 600, 450);

  if (cropType === 'wheat') {
    // Wheat leaf with Yellow Rust pustules
    const leafGrad = ctx.createLinearGradient(100, 50, 500, 400);
    leafGrad.addColorStop(0, '#558b2f');
    leafGrad.addColorStop(0.5, '#7cb342');
    leafGrad.addColorStop(1, '#33691e');
    ctx.fillStyle = leafGrad;

    ctx.beginPath();
    ctx.moveTo(120, 420);
    ctx.bezierCurveTo(150, 200, 280, 80, 520, 50);
    ctx.bezierCurveTo(450, 220, 320, 360, 180, 430);
    ctx.closePath();
    ctx.fill();

    // Yellow Rust Stripes / Pustules
    ctx.fillStyle = '#fbc02d';
    for (let i = 0; i < 28; i++) {
      const x = 200 + (i * 10) + Math.sin(i) * 15;
      const y = 300 - (i * 8) + Math.cos(i) * 10;
      ctx.beginPath();
      ctx.ellipse(x, y, 16, 4, -0.6, 0, Math.PI * 2);
      ctx.fill();
    }
    // Orange necrotic lesions
    ctx.fillStyle = '#e65100';
    for (let i = 0; i < 18; i++) {
      const x = 220 + (i * 12);
      const y = 280 - (i * 8);
      ctx.beginPath();
      ctx.ellipse(x, y, 7, 2.5, -0.6, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (cropType === 'tomato') {
    // Tomato Leaf with Early/Late Blight spots
    ctx.fillStyle = '#2e7d32';
    // Draw central compound leaflet
    ctx.beginPath();
    ctx.ellipse(300, 225, 140, 190, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Blight brown concentric spots with chlorotic yellow halo
    const spots = [
      { x: 260, y: 170, r: 38 },
      { x: 340, y: 240, r: 44 },
      { x: 280, y: 310, r: 32 },
      { x: 220, y: 260, r: 28 }
    ];
    spots.forEach(sp => {
      // Yellow halo
      ctx.fillStyle = 'rgba(253, 216, 53, 0.85)';
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.r + 12, 0, Math.PI * 2);
      ctx.fill();
      // Brown necrotic center
      ctx.fillStyle = '#3e2723';
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
      ctx.fill();
      // Concentric ring target board pattern
      ctx.strokeStyle = '#271202';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.r * 0.6, 0, Math.PI * 2);
      ctx.stroke();
    });
  } else if (cropType === 'cotton') {
    // Cotton Leaf with Leafhopper / Whitefly damage
    ctx.fillStyle = '#388e3c';
    ctx.beginPath();
    // 3-lobed leaf
    ctx.arc(300, 240, 110, 0, Math.PI * 2);
    ctx.arc(210, 200, 70, 0, Math.PI * 2);
    ctx.arc(390, 200, 70, 0, Math.PI * 2);
    ctx.fill();

    // Leaf curling & yellowing margin
    ctx.strokeStyle = '#c0ca33';
    ctx.lineWidth = 14;
    ctx.stroke();

    // Hopper burn red/brown margins
    ctx.strokeStyle = '#bf360c';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Whitefly tiny nymphs
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 30; i++) {
      const x = 240 + Math.sin(i * 3) * 80;
      const y = 200 + Math.cos(i * 4) * 60;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (cropType === 'rice') {
    // Rice/Paddy leaf with Blast lesions (Spindle-shaped eye spots)
    ctx.fillStyle = '#43a047';
    ctx.beginPath();
    ctx.moveTo(100, 380);
    ctx.quadraticCurveTo(280, 160, 520, 80);
    ctx.quadraticCurveTo(340, 280, 160, 420);
    ctx.closePath();
    ctx.fill();

    // Spindle / Eye shaped blast lesions
    const blastSpots = [
      { x: 260, y: 240, rx: 30, ry: 10, rot: -0.4 },
      { x: 340, y: 190, rx: 38, ry: 12, rot: -0.45 },
      { x: 420, y: 140, rx: 25, ry: 9, rot: -0.4 }
    ];
    blastSpots.forEach(bs => {
      // Brown-red border
      ctx.fillStyle = '#8d6e63';
      ctx.beginPath();
      ctx.ellipse(bs.x, bs.y, bs.rx + 6, bs.ry + 4, bs.rot, 0, Math.PI * 2);
      ctx.fill();
      // Gray center
      ctx.fillStyle = '#cfd8dc';
      ctx.beginPath();
      ctx.ellipse(bs.x, bs.y, bs.rx, bs.ry, bs.rot, 0, Math.PI * 2);
      ctx.fill();
    });
  } else {
    // Maize leaf with Fall Armyworm damage & leaf spots
    ctx.fillStyle = '#1b5e20';
    ctx.beginPath();
    ctx.moveTo(80, 400);
    ctx.bezierCurveTo(180, 220, 360, 120, 540, 90);
    ctx.bezierCurveTo(400, 260, 260, 360, 130, 430);
    ctx.closePath();
    ctx.fill();

    // Shot-hole / Window pane feeding holes
    ctx.fillStyle = '#37474f';
    const holes = [
      { x: 280, y: 250, r: 18 },
      { x: 320, y: 220, r: 24 },
      { x: 370, y: 180, r: 16 },
      { x: 240, y: 280, r: 14 }
    ];
    holes.forEach(h => {
      ctx.beginPath();
      ctx.arc(h.x, h.y, h.r, 0, Math.PI * 2);
      ctx.fill();
      // ragged yellow edge
      ctx.strokeStyle = '#fff59d';
      ctx.lineWidth = 3;
      ctx.stroke();
    });
  }

  // Overlay subtle title label badge
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fillRect(15, 390, 570, 45);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px sans-serif';
  const labelMap: Record<string, string> = {
    wheat: 'नमूना 1: गेहूं में पीला रतुआ / रस्ट (Yellow Rust)',
    tomato: 'नमूना 2: टमाटर में झुलसा रोग (Blight)',
    cotton: 'नमूना 3: कपास की पत्ती व टिड्डा (Pest Infestation)',
    rice: 'नमूना 4: धान / चावल का पौधा (Blast Disease)',
    maize: 'नमूना 5: मक्का / मकई की फसल (Armyworm Leaf Damage)'
  };
  ctx.fillText(labelMap[cropType] || 'फसल पत्ती नमूना', 25, 420);

  return canvas.toDataURL('image/jpeg', 0.88);
};

// Preset sample test items
const SAMPLE_TEST_PHOTOS = [
  {
    id: 'sample-wheat',
    cropKey: 'wheat' as const,
    title: 'गेहूं में पीला रतुआ / रस्ट',
    englishTitle: 'Wheat Yellow Rust',
    tag: 'रतुआ / फफूंद',
    gradient: 'from-amber-700/80 to-amber-900/90'
  },
  {
    id: 'sample-tomato',
    cropKey: 'tomato' as const,
    title: 'टमाटर में झुलसा रोग (Blight)',
    englishTitle: 'Tomato Blight',
    tag: 'झुलसा / फफूंद',
    gradient: 'from-rose-700/80 to-rose-900/90'
  },
  {
    id: 'sample-cotton',
    cropKey: 'cotton' as const,
    title: 'कपास की पत्ती व टिड्डा',
    englishTitle: 'Cotton Pest Attack',
    tag: 'कीट प्रकोप',
    gradient: 'from-emerald-700/80 to-teal-900/90'
  },
  {
    id: 'sample-rice',
    cropKey: 'rice' as const,
    title: 'धान / चावल का पौधा',
    englishTitle: 'Paddy Blast Disease',
    tag: 'ब्लास्ट / लीफ स्पॉट',
    gradient: 'from-lime-700/80 to-emerald-900/90'
  },
  {
    id: 'sample-maize',
    cropKey: 'maize' as const,
    title: 'मक्का / मकई की फसल',
    englishTitle: 'Maize Armyworm',
    tag: 'कीट क्षति',
    gradient: 'from-yellow-700/80 to-stone-900/90'
  }
];

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Application Self-Healing Error Boundary Component
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('App ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    const self = this as any;
    if (self.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full text-center border border-slate-100 flex flex-col items-center">
            <AgreNovaLogoIcon className="w-14 h-14 mb-1" alt="AgreNova AI Logo" />
            <h2 className="text-xl font-bold mt-2 text-slate-900">AgreNova AI</h2>
            <p className="text-sm text-slate-600 mt-2">
              अनुप्रयोग लोड करने में एक अस्थायी समस्या आई।
            </p>
            <button 
              onClick={() => { self.setState({ hasError: false }); window.location.reload(); }}
              className="mt-4 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all cursor-pointer"
            >
              पुनः लोड करें (Reload App)
            </button>
          </div>
        </div>
      );
    }
    return self.props.children;
  }
}

function MainApp() {
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'diagnosis' | 'tools' | 'msp' | 'schemes' | 'history' | 'profile' | 'help'>('home');
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [showProfileWelcome, setShowProfileWelcome] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState<boolean>(false);
  const [isDrawerLangOpen, setIsDrawerLangOpen] = useState<boolean>(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const settingsMobileRef = useRef<HTMLDivElement>(null);

  // Language State with safe localStorage wrapper (Default: Hindi 'hi')
  const [selectedLang, setSelectedLang] = useState<string>(() => {
    try {
      return localStorage.getItem('agrenova_lang') || 'hi';
    } catch (e) {
      return 'hi';
    }
  });
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState<boolean>(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Translation memory for messages & AI reports
  const [translatedMessages, setTranslatedMessages] = useState<Record<string, string>>({});
  const [isTranslatingKey, setIsTranslatingKey] = useState<string | null>(null);

  // Farmer Profile State with safe localStorage wrapper
  const [profile, setProfile] = useState<FarmerProfile>(() => {
    try {
      const saved = localStorage.getItem('agrenova_profile') || localStorage.getItem('kisaansetu_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('localStorage read error:', e);
    }
    return {
      name: 'पवन कुमार जी',
      state: 'Rajasthan',
      district: 'खैरथल-तिजारा',
      crop: 'bajra',
      landSize: 2,
      soilType: 'alluvial'
    };
  });

  // History / Scan Logs State with safe localStorage wrapper
  const [historyList, setHistoryList] = useState<PastReport[]>(() => {
    try {
      const saved = localStorage.getItem('agrenova_history') || localStorage.getItem('kisaansetu_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('localStorage read error:', e);
    }
    return defaultPastReports;
  });

  // UI state filters
  const [historySearch, setHistorySearch] = useState('');
  const [historyFilter, setHistoryFilter] = useState<'all' | 'disease' | 'question'>('all');
  const [selectedPastReport, setSelectedPastReport] = useState<PastReport | null>(null);

  // Core App & Interaction States
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [speechError, setSpeechError] = useState('');
  const [isAskingQuestion, setIsAskingQuestion] = useState(false);
  const [questionError, setQuestionError] = useState('');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [spokenQueryText, setSpokenQueryText] = useState('');
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  // Image Upload and Analysis State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzingPhoto, setIsAnalyzingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState('');

  // Latest Active Diagnostic Result on home screen
  const [activeResult, setActiveResult] = useState<AnalysisResult | null>(null);
  // Chat dialogue state (to store current chat dialogue if asking questions)
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'bot'; text: string; quickReplies?: string[] }[]>([]);
  const [isFloatingChatOpen, setIsFloatingChatOpen] = useState(false);

  // First-time user interactive guide banner state
  const [isFirstTimeGuideOpen, setIsFirstTimeGuideOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem('agrenova_guide_dismissed') !== 'true';
    } catch (e) {
      return true;
    }
  });

  const dismissFirstTimeGuide = () => {
    setIsFirstTimeGuideOpen(false);
    try {
      localStorage.setItem('agrenova_guide_dismissed', 'true');
    } catch (e) {
      console.warn('localStorage error:', e);
    }
  };

  // Fertilizer calculator custom states
  const [calcAcre, setCalcAcre] = useState<number>(profile.landSize || 1);
  const [calcCrop, setCalcCrop] = useState<string>(profile.crop || 'wheat');

  // Soil health custom card state
  const [soilCard, setSoilCard] = useState<SoilHealthCard>({
    nitrogen: 180, // kg/hectare (low)
    phosphorus: 12, // kg/hectare (low)
    potassium: 290, // kg/hectare (high)
    pH: 6.8
  });
  const [showSoilResults, setShowSoilResults] = useState(false);

  // Mandi & MSP custom states
  const [selectedMandiCrop, setSelectedMandiCrop] = useState<string>('wheat');
  const [highlightedCrop, setHighlightedCrop] = useState<string | null>(null);
  const [mspCalcQuintals, setMspCalcQuintals] = useState<number>(20);
  const [mspCalcCrop, setMspCalcCrop] = useState<string>('wheat');

  // Dynamic Weather and Mandi Data States
  const [liveWeather, setLiveWeather] = useState<{
    temp: string;
    feelsLike?: string;
    windSpeed?: string;
    clouds?: string;
    rainProbability?: string;
    condition: string;
    humidity: string;
    location: string;
    forecast: string;
    advisory: string;
    isSpraySafe: boolean;
    provider?: string;
    debugInfo?: {
      selectedState: string;
      selectedDistrict: string;
      resolvedLocationName: string;
      lat: number | string;
      lon: number | string;
      temp: string;
      humidity: string;
      condition: string;
      description: string;
      responseTimeMs: number;
      timestamp: string;
      geocoding?: {
        resolvedCity: string;
        resolvedState: string;
      };
    };
  } | null>(null);

  const [isWeatherLoading, setIsWeatherLoading] = useState<boolean>(true);
  const [weatherIsCached, setWeatherIsCached] = useState<boolean>(false);
  const [weatherErrorNotice, setWeatherErrorNotice] = useState<string | null>(null);
  const [weatherRefreshCount, setWeatherRefreshCount] = useState<number>(0);

  const handleRefreshWeather = () => {
    setWeatherRefreshCount(prev => prev + 1);
  };

  const handleShareWeather = async () => {
    const currentTemp = liveWeather?.temp || '35°C';
    const currentCond = liveWeather?.condition || 'साफ़ और धूप भरा मौसम';
    const currentLoc = formatLocationDisplay(profile.district, profile.state);
    const shareText = `🌾 AgreNova AI - लाइव मौसम पूर्वानुमान\n📍 ${currentLoc}\n🌡️ तापमान: ${currentTemp} • ${currentCond}\n💧 नमी: ${liveWeather?.humidity || '63%'}\n💨 हवा: ${liveWeather?.windSpeed || '3.09 m/s'}\n☁️ बादल: ${liveWeather?.clouds || '65%'}\n🌾 सलाह: ${liveWeather?.advisory || 'सिंचाई व छिड़काव सलाह'}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AgreNova AI',
          text: shareText
        });
        showToast(getTranslation(selectedLang, 'toast_weather_shared'));
      } catch (e) {
        // User cancelled share
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareText);
      showToast(getTranslation(selectedLang, 'toast_weather_copied'));
    }
  };

  const [isMandiLoading, setIsMandiLoading] = useState<boolean>(false);
  const [mandiDataSource, setMandiDataSource] = useState<string>('');
  const [mandiIsFallback, setMandiIsFallback] = useState<boolean>(false);
  const [mandiFallbackNotice, setMandiFallbackNotice] = useState<string>('');
  const [liveMandiPrices, setLiveMandiPrices] = useState<{
    id: string;
    mandiName: string;
    cropName: string;
    variety?: string;
    state: string;
    district: string;
    minPrice: number;
    maxPrice: number;
    modalPrice: number;
    currentPrice: number;
    mspPrice: number;
    arrivalDate: string;
    unit: string;
  }[]>([]);

  // Toast feedback state for positive actions (Profile saved, Shared, Copied)
  const [toastMessage, setToastMessage] = useState<{ title: string; type?: 'success' | 'info' } | null>(null);
  const showToast = (title: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ title, type });
    setTimeout(() => {
      setToastMessage(prev => (prev?.title === title ? null : prev));
    }, 3200);
  };

  // Safe fetch helper that handles timeouts and non-JSON / HTML responses gracefully
  const safeFetchJson = async <T = any>(url: string, options?: RequestInit, timeoutMs = 25000): Promise<T | null> => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const mergedSignal = options?.signal || controller.signal;
      const res = await fetch(url, { ...options, signal: mergedSignal });
      clearTimeout(timer);

      if (!res.ok && res.status >= 500) {
        return null;
      }

      const text = await res.text();
      if (!text || text.trim().startsWith('<')) {
        return null;
      }
      try {
        return JSON.parse(text) as T;
      } catch {
        return null;
      }
    } catch (e: any) {
      clearTimeout(timer);
      if (e?.name !== 'AbortError') {
        console.warn(`Fetch error for ${url}:`, e);
      }
      return null;
    }
  };

  // Location formatting helper: "District, State" if state exists, else "District", no trailing commas
  const formatLocationDisplay = (districtOrLoc?: string, stateName?: string) => {
    let d = (districtOrLoc || '').trim();
    let s = (stateName || '').trim();

    d = d.replace(/^[\s,]+|[\s,]+$/g, '');
    s = s.replace(/^[\s,]+|[\s,]+$/g, '');

    if (d.includes(',')) {
      const parts = d.split(',').map(p => p.trim().replace(/^[\s,]+|[\s,]+$/g, '')).filter(Boolean);
      if (parts.length >= 2) {
        d = parts[0];
        s = s || parts[1];
      } else if (parts.length === 1) {
        d = parts[0];
      }
    }

    if (s) {
      const cleanState = s.split(' (')[0].replace(/^[^\w\s]+/, '').trim();
      if (d && cleanState) {
        return `${d}, ${cleanState}`;
      }
      return d || cleanState;
    }

    return d;
  };

  // Helper to accurately map OpenWeatherMap API condition to Hindi text
  const getWeatherConditionHindi = (mainRaw?: string, descRaw?: string, translatedRaw?: string): string => {
    const main = (mainRaw || '').trim();
    const desc = (descRaw || '').toLowerCase().trim();
    const translated = (translatedRaw || '').trim();

    if (main === 'Clouds' || desc.includes('cloud') || desc.includes('बादल')) {
      if (desc.includes('overcast') || desc.includes('घने')) return 'घने बादल';
      return 'आंशिक बादल';
    }

    if (main === 'Clear' || desc.includes('clear') || desc.includes('साफ')) {
      return 'साफ मौसम';
    }

    if (main === 'Rain' || main === 'Drizzle' || main === 'Thunderstorm' || desc.includes('rain') || desc.includes('वर्षा') || desc.includes('बारिश')) {
      return 'बारिश';
    }

    if (main === 'Haze' || main === 'Mist' || main === 'Smoke' || main === 'Fog' || desc.includes('haze') || desc.includes('mist') || desc.includes('smoke') || desc.includes('fog') || desc.includes('धुंध') || desc.includes('कोहरा')) {
      return 'धुंध';
    }

    if (translated && translated !== 'Clear' && translated !== 'Clouds') {
      return translated;
    }

    return 'साफ मौसम';
  };

  // Weather fallback helper: restores from local cache for requested location or displays temporary unavailable notice
  const handleWeatherFallback = (
    active: boolean, 
    stateStr: string, 
    districtStr: string, 
    stateNameStr: string
  ) => {
    if (!active) return;
    let cachedPayload: any = null;
    try {
      const cacheStore = JSON.parse(localStorage.getItem('agrenova_weather_cache_v1') || '{}');
      const cacheKey = `${stateStr.toLowerCase()}_${districtStr.toLowerCase()}`;
      cachedPayload = cacheStore[cacheKey]?.data;
    } catch (e) {
      console.warn('Weather cache read error:', e);
    }

    if (cachedPayload) {
      const rawMain = cachedPayload.debugInfo?.condition || '';
      const rawDesc = cachedPayload.debugInfo?.description || '';
      const rawTrans = cachedPayload.condition || '';
      setLiveWeather({
        ...cachedPayload,
        condition: getWeatherConditionHindi(rawMain, rawDesc, rawTrans),
        provider: 'Cached Weather'
      });
      setWeatherIsCached(true);
      setWeatherErrorNotice('पिछला उपलब्ध मौसम डेटा दिखाया जा रहा है।');
    } else {
      setLiveWeather(null);
      setWeatherIsCached(false);
      setWeatherErrorNotice('मौसम का डेटा अस्थायी रूप से उपलब्ध नहीं है।');
    }
    setIsWeatherLoading(false);
  };

  // Fetch dynamic real-time weather from backend OpenWeather API endpoint
  useEffect(() => {
    let active = true;
    const stateObj = indianStates.find(s => s.id === profile.state || s.name.includes(profile.state));
    const stateNameStr = stateObj ? stateObj.name.split(' (')[0].replace(/^[^\w\s]+/, '').trim() : (profile.state || '');
    const cacheKey = `${profile.state.toLowerCase()}_${profile.district.toLowerCase()}`;

    // 1. Synchronously populate from cache if available for instant perceived loading
    try {
      const cacheStore = JSON.parse(localStorage.getItem('agrenova_weather_cache_v1') || '{}');
      const cached = cacheStore[cacheKey] || cacheStore['_last_success'];
      if (cached && cached.data) {
        setLiveWeather(cached.data);
        setWeatherIsCached(true);
        setIsWeatherLoading(false);
      } else {
        setIsWeatherLoading(true);
        setWeatherIsCached(false);
      }
    } catch {
      setIsWeatherLoading(true);
      setWeatherIsCached(false);
    }

    setWeatherErrorNotice(null);

    const fetchStartTime = Date.now();
    const searchState = stateNameStr || "Delhi";
const searchDistrict = profile?.district || "New Delhi";
    safeFetchJson(`/api/weather?state=${encodeURIComponent(searchState)}&district=${encodeURIComponent(searchDistrict)}&lang=${selectedLang}&nocache=true&t=${Date.now()}`)
          .then(data => {
      if (!active) return;
      if (data && data.main && !data.error) {
        const locName = data.name || profile.district;
        const fetchEndTime = Date.now();
        const responseTimeMs = data.debugInfo?.responseTimeMs || (fetchEndTime - fetchStartTime);
        const weatherMain = data.weather?.[0]?.main || data.debugInfo?.condition || 'Clear';
        const weatherDesc = data.weather?.[0]?.description || data.debugInfo?.description || '';
        const weatherTrans = data.debugInfo?.translatedDescription || '';
          const mappedCondition = getWeatherConditionHindi(weatherMain, weatherDesc, weatherTrans);
          const newWeatherData = {
            temp: `${data.main.temp}°C`,
            feelsLike: data.main.feels_like !== undefined ? `${data.main.feels_like}°C` : undefined,
            condition: mappedCondition,
            humidity: `${data.main.humidity}%`,
            windSpeed: data.wind?.speed !== undefined ? `${data.wind.speed} m/s` : undefined,
            clouds: data.main?.clouds !== undefined ? `${data.main.clouds}%` : (data.clouds?.all !== undefined ? `${data.clouds.all}%` : undefined),
            rainProbability: data.main?.rain_probability !== undefined ? (typeof data.main.rain_probability === 'number' ? `${data.main.rain_probability}%` : String(data.main.rain_probability)) : 'उपलब्ध नहीं',
            location: formatLocationDisplay(profile.district || locName, stateNameStr),
            forecast: data.agricultural?.forecast || mappedCondition,
            advisory: data.agricultural?.advisory || 'छिड़काव के लिए आज का मौसम सुरक्षित है।',
            isSpraySafe: data.agricultural?.isSpraySafe ?? true,
            provider: 'OpenWeather API (Live)',
            debugInfo: {
              selectedState: profile.state,
              selectedDistrict: profile.district,
              resolvedLocationName: data.debugInfo?.resolvedLocationName || locName,
              lat: data.coord?.lat ?? data.debugInfo?.lat ?? '--',
              lon: data.coord?.lon ?? data.debugInfo?.lon ?? '--',
              temp: `${data.main.temp}°C`,
              humidity: `${data.main.humidity}%`,
              condition: weatherMain,
              description: weatherDesc || mappedCondition,
              responseTimeMs: responseTimeMs,
              timestamp: data.debugInfo?.timestamp || new Date().toISOString(),
              geocoding: {
                resolvedCity: data.debugInfo?.geocoding?.resolvedCity || locName,
                resolvedState: data.debugInfo?.geocoding?.resolvedState || stateNameStr || profile.state
              }
            }
          };

          try {
            const cacheStore = JSON.parse(localStorage.getItem('agrenova_weather_cache_v1') || '{}');
            const cacheKey = `${profile.state.toLowerCase()}_${profile.district.toLowerCase()}`;
            cacheStore[cacheKey] = {
              data: newWeatherData,
              timestamp: Date.now()
            };
            cacheStore['_last_success'] = {
              data: newWeatherData,
              timestamp: Date.now()
            };
            localStorage.setItem('agrenova_weather_cache_v1', JSON.stringify(cacheStore));
          } catch (e) {
            console.warn('Weather cache write error:', e);
          }

          setLiveWeather(newWeatherData);
          setWeatherIsCached(false);
          setWeatherErrorNotice(null);
          setIsWeatherLoading(false);
        } else {
          handleWeatherFallback(active, profile.state, profile.district, stateNameStr);
        }
      })
      .catch(err => {
        console.warn('Dynamic weather fetch error:', err);
        if (active) {
          handleWeatherFallback(active, profile.state, profile.district, stateNameStr);
        }
      });

    return () => { active = false; };
  }, [profile.state, profile.district, selectedLang, weatherRefreshCount]);

  // Fetch dynamic real-time Agmarknet mandi rates from backend data.gov.in endpoint
  useEffect(() => {
    let active = true;
    const stateObj = indianStates.find(s => s.id === profile.state || s.name.includes(profile.state));
    const stateNameStr = stateObj ? stateObj.name.split(' (')[0].replace(/^[^\w\s]+/, '').trim() : (profile.state || '');
    const cleanStateSlug = (stateNameStr || profile.state || '').toLowerCase().replace(/[\s\-_&()]+/g, '');
    const cleanDistSlug = (profile.district || '').toLowerCase().replace(/[\s\-_&()]+/g, '');
    const cacheKey = `${cleanStateSlug}_${cleanDistSlug}_${selectedMandiCrop.toLowerCase()}`;
    const stateCacheKey = `${cleanStateSlug}_${selectedMandiCrop.toLowerCase()}`;

    // 1. Synchronously populate from cache if available for instant perceived loading
    try {
      const cacheStore = JSON.parse(localStorage.getItem('agrenova_mandi_cache_v2') || '{}');
      const cachedResult = cacheStore[cacheKey] || cacheStore[stateCacheKey];
      if (cachedResult && Array.isArray(cachedResult.data) && cachedResult.data.length > 0) {
        setLiveMandiPrices(cachedResult.data);
        setMandiDataSource(cachedResult.source || 'Official Agmarknet API (data.gov.in)');
        setMandiIsFallback(true);
        setMandiFallbackNotice('पिछला उपलब्ध मंडी भाव (अपडेट हो रहा है...)');
        setIsMandiLoading(false);
      } else {
        setIsMandiLoading(true);
        setLiveMandiPrices([]);
        setMandiIsFallback(false);
        setMandiFallbackNotice('');
      }
    } catch {
      setIsMandiLoading(true);
      setLiveMandiPrices([]);
      setMandiIsFallback(false);
      setMandiFallbackNotice('');
    }

    safeFetchJson(`/api/mandi-prices?crop=${encodeURIComponent(selectedMandiCrop)}&state=${encodeURIComponent(stateNameStr || profile.state)}&district=${encodeURIComponent(profile.district)}&nocache=true&t=${Date.now()}`)
      .then(data => {
        if (!active) return;
        setIsMandiLoading(false);
        if (data && (data.status === 'success' || data.records?.length > 0) && Array.isArray(data.records) && data.records.length > 0) {
          const mapped = data.records.map((rec: any, idx: number) => {
            const minP = Number(rec.min_price) || Number(rec.modal_price) || 0;
            const maxP = Number(rec.max_price) || Number(rec.modal_price) || 0;
            const modP = Number(rec.modal_price) || minP || 0;
            const mspP = Number(rec.msp_price) || mspRates[selectedMandiCrop]?.price || 2400;

            return {
              id: `agmarknet-${idx}-${Date.now()}`,
              mandiName: rec.market || `${profile.district} मंडी`,
              cropName: rec.commodity || mspRates[selectedMandiCrop]?.name || selectedMandiCrop,
              variety: rec.variety || 'Standard',
              state: rec.state || stateNameStr || profile.state,
              district: rec.district || profile.district,
              minPrice: minP,
              maxPrice: maxP,
              modalPrice: modP,
              currentPrice: modP,
              mspPrice: mspP,
              arrivalDate: rec.arrival_date || new Date().toLocaleDateString('en-GB'),
              unit: rec.unit || '₹ / क्विंटल',
              isNearby: Boolean(rec.isNearby),
              nearbyLabel: rec.nearbyLabel || 'निकटतम उपलब्ध मंडी'
            };
          });
          setLiveMandiPrices(mapped);
          setMandiDataSource(data.source || 'Official Agmarknet API (data.gov.in)');
          setMandiIsFallback(Boolean(data.isFallback || !data.isLive));
          setMandiFallbackNotice(data.fallbackMessage || (data.isFallback ? 'निकटतम उपलब्ध मंडी' : ''));

          // Save to local cache for offline resiliency with same-state validation
          try {
            const cacheStore = JSON.parse(localStorage.getItem('agrenova_mandi_cache_v2') || '{}');
            const cachePayload = {
              timestamp: Date.now(),
              data: mapped,
              state: stateNameStr || profile.state,
              source: data.source || 'Official Agmarknet API (data.gov.in)',
              fallbackMessage: data.fallbackMessage || ''
            };
            cacheStore[cacheKey] = cachePayload;
            cacheStore[stateCacheKey] = cachePayload;
            localStorage.setItem('agrenova_mandi_cache_v2', JSON.stringify(cacheStore));
          } catch (e) {
            console.warn('Mandi cache write error:', e);
          }
        } else {
          // Check local cache for same-state fallback
          let cachedResult: any = null;
          try {
            const cacheStore = JSON.parse(localStorage.getItem('agrenova_mandi_cache_v2') || '{}');
            cachedResult = cacheStore[cacheKey] || cacheStore[stateCacheKey];
          } catch (e) {
            console.warn('Mandi cache read error:', e);
          }

          if (cachedResult && Array.isArray(cachedResult.data) && cachedResult.data.length > 0) {
            setLiveMandiPrices(cachedResult.data);
            setMandiDataSource(cachedResult.source || 'Official Agmarknet API (data.gov.in)');
            setMandiIsFallback(true);
            setMandiFallbackNotice('पिछला उपलब्ध मंडी भाव दिखाया जा रहा है।');
          } else {
            setLiveMandiPrices([]);
            setMandiDataSource('');
            setMandiIsFallback(false);
            setMandiFallbackNotice('');
          }
        }
      })
      .catch(err => {
        console.warn('Dynamic mandi rates fetch error:', err);
        if (active) {
          setIsMandiLoading(false);
          // Check local cache on network error for same-state data
          let cachedResult: any = null;
          try {
            const cacheStore = JSON.parse(localStorage.getItem('agrenova_mandi_cache_v2') || '{}');
            cachedResult = cacheStore[cacheKey] || cacheStore[stateCacheKey];
          } catch (e) {
            console.warn('Mandi cache read error on network error:', e);
          }

          if (cachedResult && Array.isArray(cachedResult.data) && cachedResult.data.length > 0) {
            setLiveMandiPrices(cachedResult.data);
            setMandiDataSource(cachedResult.source || 'Official Agmarknet API (data.gov.in)');
            setMandiIsFallback(true);
            setMandiFallbackNotice('पिछला उपलब्ध मंडी भाव दिखाया जा रहा है।');
          } else {
            setLiveMandiPrices([]);
            setMandiDataSource('');
            setMandiIsFallback(false);
            setMandiFallbackNotice('');
          }
        }
      });

    return () => { active = false; };
  }, [selectedMandiCrop, profile.state, profile.district]);

  // References
  const recognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat conversation area to latest message
  useEffect(() => {
    if (isFloatingChatOpen) {
      const timer = setTimeout(() => {
        const container = document.getElementById('card-text-query');
        if (container) {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
          });
        } else if (chatEndRef.current) {
          chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [chatMessages, isAskingQuestion, isFloatingChatOpen, translatedMessages]);

  // Check offline status
  useEffect(() => {
    setIsOffline(!navigator.onLine);
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Close settings and language dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const targetNode = event.target as Node;
      const insideDesktopSettings = settingsRef.current && settingsRef.current.contains(targetNode);
      const insideMobileSettings = settingsMobileRef.current && settingsMobileRef.current.contains(targetNode);
      
      if (!insideDesktopSettings && !insideMobileSettings) {
        setIsSettingsOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(targetNode)) {
        setIsLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Lock background scrolling and close open dropdowns while any modal is open
  useEffect(() => {
    if (isProfileModalOpen || showProfileWelcome || isMenuDrawerOpen) {
      document.body.style.overflow = 'hidden';
      setIsLangDropdownOpen(false);
      setIsSettingsOpen(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isProfileModalOpen, showProfileWelcome, isMenuDrawerOpen]);

  // Save profile helper
  const handleSaveProfile = (updatedProfile: FarmerProfile) => {
    try {
      localStorage.removeItem('agrenova_weather_cache_v1');
    } catch (e) {
      console.warn('Weather cache clear error:', e);
    }
    setWeatherIsCached(false);
    setWeatherErrorNotice(null);
    setLiveWeather(null);
    setProfile(updatedProfile);
    try {
      localStorage.setItem('agrenova_profile', JSON.stringify(updatedProfile));
    } catch (e) {
      console.warn('localStorage write error:', e);
    }
    setCalcAcre(updatedProfile.landSize || 1);
    setCalcCrop(updatedProfile.crop || 'wheat');
    setShowProfileWelcome(false);
    showToast(getTranslation(selectedLang, 'toast_profile_updated'));
  };

  // Helper for translating AI responses
  const handleTranslateResponse = async (key: string, rawText: string) => {
    if (translatedMessages[key]) {
      // Toggle off back to original
      const updated = { ...translatedMessages };
      delete updated[key];
      setTranslatedMessages(updated);
      return;
    }

    setIsTranslatingKey(key);
    const targetLangObj = SUPPORTED_LANGUAGES.find(l => l.code === selectedLang) || SUPPORTED_LANGUAGES[0];
    
    try {
      const data = await safeFetchJson('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: rawText,
          targetLangName: targetLangObj.englishName
        })
      });

      if (data && data.translatedText) {
        setTranslatedMessages(prev => ({ ...prev, [key]: data.translatedText }));
      }
    } catch (e) {
      console.warn('Translation request failed:', e);
    } finally {
      setIsTranslatingKey(null);
    }
  };

  // Check if profile name is empty to prompt welcome card
  useEffect(() => {
    if (!profile.name) {
      setShowProfileWelcome(true);
    }
  }, [profile.name]);

  // Save history helper
  useEffect(() => {
    try {
      localStorage.setItem('agrenova_history', JSON.stringify(historyList));
    } catch (e) {
      console.warn('localStorage write error:', e);
    }
  }, [historyList]);

  // Speech Recognition hook initialization
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = getTTSLangCode(selectedLang);

      rec.onstart = () => {
        setIsRecording(true);
        setSpeechError('');
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setSpokenQueryText(transcript);
        const detected = detectInputLanguage(transcript, selectedLang);
        if (detected && detected !== selectedLang && detected !== 'en') {
          setSelectedLang(detected);
          try {
            localStorage.setItem('agrenova_lang', detected);
          } catch (e) {
            console.warn('localStorage write error:', e);
          }
        }
      };

      rec.onerror = (event: any) => {
        const errType = event?.error;
        if (errType === 'no-speech') {
          setSpeechError(getTranslation(selectedLang, 'speech_err_no_speech'));
        } else if (errType === 'aborted') {
          // User or lifecycle stopped listening, benign event
        } else if (errType === 'not-allowed') {
          console.warn('Speech recognition permission notice:', errType);
          setSpeechError(getTranslation(selectedLang, 'speech_err_permission'));
        } else if (errType === 'network') {
          console.warn('Speech recognition network notice:', errType);
          setSpeechError(getTranslation(selectedLang, 'speech_err_network'));
        } else {
          console.warn('Speech recognition notice:', errType);
          setSpeechError(getTranslation(selectedLang, 'speech_err_general'));
        }
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Update speech recognition language when selected language changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = getTTSLangCode(selectedLang);
    }
  }, [selectedLang]);

  // Handle Speech Toggle
  const toggleRecording = () => {
    if (!recognitionRef.current) {
      setSpeechError(getTranslation(selectedLang, 'speech_err_unsupported'));
      return;
    }
    if (isRecording) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        // Safe silence on redundant stop
      }
      setIsRecording(false);
    } else {
      try {
        setSpeechError('');
        recognitionRef.current.lang = getTTSLangCode(selectedLang);
        recognitionRef.current.start();
      } catch (err) {
        console.warn('Speech start warning:', err);
        setIsRecording(false);
      }
    }
  };

  // Handle Retry Speech Recording
  const handleRetryRecording = () => {
    setSpeechError('');
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Safe ignore stop error
      }
      setTimeout(() => {
        try {
          recognitionRef.current.lang = getTTSLangCode(selectedLang);
          recognitionRef.current.start();
        } catch (err) {
          console.warn('Speech retry warning:', err);
          setIsRecording(false);
        }
      }, 150);
    } else {
      toggleRecording();
    }
  };

  // Open Voice Assistant Overlay Modal
  const openVoiceModal = () => {
    setSpokenQueryText(inputText || '');
    setIsVoiceModalOpen(true);
    setSpeechError('');
    if (!isRecording) {
      toggleRecording();
    }
  };

  // Close Voice Assistant Overlay Modal
  const closeVoiceModal = () => {
    setIsVoiceModalOpen(false);
    if (isRecording && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.warn(err);
      }
      setIsRecording(false);
    }
  };

  // Open Camera / Vision Analysis Overlay Modal
  const openCameraModal = () => {
    setIsCameraModalOpen(true);
    setPhotoError('');
  };

  // Close Camera / Vision Analysis Overlay Modal
  const closeCameraModal = () => {
    setIsCameraModalOpen(false);
  };

  // Trigger Native Camera Capture
  const triggerCameraCapture = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    } else {
      triggerFileSelect();
    }
  };

  // Handle Sample Photo Click
  const handleSamplePhotoSelect = async (cropKey: 'wheat' | 'tomato' | 'cotton' | 'rice' | 'maize') => {
    closeCameraModal();
    setActiveTab('diagnosis');
    const sampleDataUrl = createSampleCropImage(cropKey);
    if (sampleDataUrl) {
      setSelectedImage(sampleDataUrl);
      await analyzePhoto(sampleDataUrl);
    }
  };

  // Submit Spoken Query from Voice Modal
  const submitVoiceModalQuery = () => {
    const textToSubmit = (spokenQueryText || inputText).trim();
    closeVoiceModal();
    if (textToSubmit) {
      setInputText(textToSubmit);
      setIsFloatingChatOpen(true);
      handleAskQuestion(textToSubmit);
    }
  };

  // Quick Action Shortcut Handler for Chat Recommendations
  const handleActionShortcut = (actionKey: string) => {
    if (actionKey === 'diagnosis') {
      setIsFloatingChatOpen(false);
      setActiveTab('diagnosis');
      setTimeout(() => {
        cameraInputRef.current?.click();
      }, 200);
    } else if (actionKey === 'mandi') {
      setIsFloatingChatOpen(false);
      setActiveTab('msp');
    } else if (actionKey === 'tools') {
      setIsFloatingChatOpen(false);
      setActiveTab('tools');
    } else if (actionKey === 'weather') {
      setIsFloatingChatOpen(false);
      setActiveTab('home');
      setTimeout(() => {
        const el = document.getElementById('card-weather-advisory');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } else if (actionKey === 'schemes') {
      setIsFloatingChatOpen(false);
      setActiveTab('schemes');
    }
  };

  // Chatbot Question Submission Handler
  const handleAskQuestion = async (queryToSubmit?: string) => {
    if (isAskingQuestion) return;
    const finalQuery = queryToSubmit || inputText;
    if (!finalQuery.trim()) return;

    // Auto detect language of input text (pass current selectedLang)
    const userMsg = finalQuery.trim();
    const detected = detectInputLanguage(userMsg, selectedLang);
    let activeLang = selectedLang;
    // Only auto-switch language if an explicit native regional script (Devanagari, Gurmukhi, Gujarati, etc.) was typed
    // Never auto-switch to English for Roman/Latin input unless user selected English in language selector
    if (detected && detected !== selectedLang && detected !== 'en') {
      activeLang = detected;
      setSelectedLang(detected);
      try {
        localStorage.setItem('agrenova_lang', detected);
      } catch (e) {
        console.warn('localStorage write error:', e);
      }
    }
    const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === activeLang) || SUPPORTED_LANGUAGES[0];

    // Build history payload from recent turns
    const chatHistoryPayload = chatMessages.slice(-6).map(m => ({
      role: m.sender === 'user' ? 'user' : 'model',
      text: m.text
    }));

    // Append to current chat UI list
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputText('');
    setIsAskingQuestion(true);
    setQuestionError('');
    setIsFloatingChatOpen(true);

    try {
      const data = await safeFetchJson<QuestionResult>('/api/ask-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question: userMsg, 
          profile,
          weather: liveWeather ? {
            temp: liveWeather.temp,
            feelsLike: liveWeather.feelsLike,
            condition: liveWeather.condition,
            humidity: liveWeather.humidity,
            windSpeed: liveWeather.windSpeed,
            rainProbability: liveWeather.rainProbability,
            isSpraySafe: liveWeather.isSpraySafe,
            advisory: liveWeather.advisory
          } : undefined,
          recentDiagnosis: activeResult ? {
            disease: activeResult.disease,
            scientificName: activeResult.scientificName,
            severity: activeResult.severity,
            cropLoss: activeResult.cropLoss,
            organicTreatment: activeResult.organicTreatment,
            chemicalTreatment: activeResult.chemicalTreatment
          } : undefined,
          history: chatHistoryPayload,
          langCode: activeLang,
          langName: currentLangObj.englishName
        })
      });
      
      const answerText = data?.answer || 'राम-राम किसान भाई! 🙏\n\nआपकी फसल की अच्छी बढ़वार के लिए खेत में समय पर सिंचाई और संतुलित खाद (NPK) का प्रयोग करें। यदि कोई कीट या रोग के लक्षण दिखें तो तुरंत फोटो अपलोड करें।';
      const quickReplies = data?.quickReplies || ['गेहूं की खाद प्रबंधन', 'सरसों में माहू की दवा', 'चना में उकठा रोग', 'मौसम का हाल'];

      // Append answer to chatbot state
      setChatMessages(prev => [...prev, { 
        sender: 'bot', 
        text: answerText, 
        quickReplies: quickReplies 
      }]);

      // Highlight crop in Mandi Rates if matched
      if (data?.cropMentioned) {
        const matched = Object.keys(mspRates).find(key => 
          data.cropMentioned?.toLowerCase().includes(key) || 
          mspRates[key].name.includes(data.cropMentioned || '')
        );
        if (matched) {
          setSelectedMandiCrop(matched);
          setHighlightedCrop(matched);
          setTimeout(() => setHighlightedCrop(null), 8000);
        }
      }

      // Add to persistent History List
      const newHistoryItem: PastReport = {
        id: 'q_' + Date.now(),
        date: getHindiDate(),
        type: 'question',
        title: `किसान मित्र संवाद: "${userMsg.slice(0, 30)}${userMsg.length > 30 ? '...' : ''}"`,
        subTitle: data?.cropMentioned || 'सामान्य कृषि परामर्श',
        imageUrl: null,
        description: `आपके प्रश्न "${userMsg}" पर कृषि विशेषज्ञ की सलाह:`,
        advice: answerText
      };
      setHistoryList(prev => [newHistoryItem, ...prev]);

    } catch (err: any) {
      console.error(err);
      setQuestionError('सलाह प्राप्त करने में समस्या हुई। कृपया दोबारा प्रयास करें।');
      setChatMessages(prev => [...prev, { 
        sender: 'bot', 
        text: '⚠️ **उत्तर प्राप्त करने में तकनीकी रुकावट आई**\n\nइंटरनेट कनेक्टिविटी या सर्वर व्यस्तता के कारण उत्तर नहीं मिल सका। कृपया नीचे दिए विकल्पों में से किसी एक को चुनें:', 
        quickReplies: ['🔄 पुनः प्रयास करें', '📞 किसान कॉल सेंटर 1800-180-1551', '📸 रोग जांच हेतु फ़ोटो लें']
      }]);
    } finally {
      setIsAskingQuestion(false);
    }
  };

  // Image Upload / Camera Snapshot Handler with direct Blob compression
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input so selecting the same file later still fires onChange
    e.target.value = '';

    if (file.size > 25 * 1024 * 1024) {
      setPhotoError('फ़ोटो आकार बहुत बड़ा है (25MB से कम फ़ोटो चुनें)।');
      return;
    }

    if (isAnalyzingPhoto) return;

    setActiveTab('diagnosis');
    try {
      const compressedBase64 = await compressImage(file);
      if (compressedBase64) {
        setSelectedImage(compressedBase64);
        await analyzePhoto(compressedBase64);
      } else {
        setPhotoError('फ़ोटो प्रोसेस करने में असमर्थ। कृपया दोबारा फ़ोटो लें।');
      }
    } catch (error) {
      console.error('File compression error:', error);
      setPhotoError('फ़ोटो लोड करने में विफल।');
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Backend Crop Photo Analysis Runner
  const analyzePhoto = async (base64Img: string) => {
    if (isAnalyzingPhoto) return;
    setIsAnalyzingPhoto(true);
    setPhotoError('');
    setActiveResult(null);

    const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === selectedLang) || SUPPORTED_LANGUAGES[0];

    try {
      const data = await safeFetchJson<AnalysisResult>('/api/analyze-crop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          image: base64Img, 
          profile,
          langCode: selectedLang,
          langName: currentLangObj.englishName
        })
      });

      if (data && data.disease) {
        setActiveResult(data);

        // Save to history log
        const newHistoryItem: PastReport = {
          id: 'scan_' + Date.now(),
          date: getHindiDate(),
          type: 'disease',
          title: `रोग विश्लेषण: ${data.disease}`,
          subTitle: profile.crop ? mspRates[profile.crop]?.name : 'फसल विश्लेषण',
          imageUrl: base64Img,
          disease: data.disease,
          scientificName: data.scientificName,
          confidence: data.confidence,
          severity: data.severity,
          cropLoss: data.cropLoss,
          recoveryTimeline: data.recoveryTimeline,
          description: data.description,
          preventionTips: data.preventionTips,
          organicTreatment: data.organicTreatment,
          chemicalTreatment: data.chemicalTreatment,
          advice: data.advice
        };
        setHistoryList(prev => [newHistoryItem, ...prev]);
      } else {
        setPhotoError('फ़ोटो का विश्लेषण करने में तकनीकी रुकावट आई। कृपया साफ़ रोशनी में दोबारा फ़ोटो खींचें या पुनः प्रयास करें।');
      }

    } catch (err: any) {
      console.error(err);
      setPhotoError('फ़ोटो का विश्लेषण करने में तकनीकी रुकावट आई। कृपया साफ़ रोशनी में दोबारा फ़ोटो खींचें या पुनः प्रयास करें।');
    } finally {
      setIsAnalyzingPhoto(false);
    }
  };

  // Generate dynamic WhatsApp link for the report
  const getWhatsAppLink = (report: AnalysisResult | PastReport) => {
    let message = `🌾 *AgreNova AI डिजिटल रिपोर्ट* 🌾\n\n`;

    const isPastReport = 'type' in report;
    
    if (!isPastReport || report.type === 'disease') {
      const disease = isPastReport ? report.disease : (report as AnalysisResult).disease;
      const scientificName = isPastReport ? report.scientificName : (report as AnalysisResult).scientificName;
      const confidence = isPastReport ? report.confidence : (report as AnalysisResult).confidence;
      const severity = isPastReport ? report.severity : (report as AnalysisResult).severity;
      const cropLoss = isPastReport ? report.cropLoss : (report as AnalysisResult).cropLoss;
      const timeline = isPastReport ? report.recoveryTimeline : (report as AnalysisResult).recoveryTimeline;
      const desc = isPastReport ? report.description : (report as AnalysisResult).description;
      const organic = isPastReport ? report.organicTreatment : (report as AnalysisResult).organicTreatment;
      const chemical = isPastReport ? report.chemicalTreatment : (report as AnalysisResult).chemicalTreatment;
      const advice = isPastReport ? report.advice : (report as AnalysisResult).advice;

      message += `🔴 *संभावित समस्या:* ${disease}\n`;
      if (scientificName) message += `🔬 *वैज्ञानिक नाम:* _${scientificName}_\n`;
      if (confidence) message += `🎯 *सटीकता:* ${confidence}\n`;
      if (severity) message += `⚠️ *गंभीरता:* ${severity}\n`;
      if (cropLoss) message += `📉 *फसल नुकसान:* ${cropLoss}\n`;
      if (timeline) message += `⏳ *ठीक होने की अवधि:* ${timeline}\n\n`;
      message += `📝 *लक्षण विवरण:* ${desc}\n\n`;
      if (organic) message += `🍃 *जैविक उपचार:* \n${organic}\n\n`;
      if (chemical) message += `🧪 *रासायनिक उपचार:* \n${chemical}\n\n`;
      message += `🌾 *मुख्य सलाह:* \n${advice}\n`;
    } else {
      const pReport = report as PastReport;
      if (pReport.originalQuery) {
        message += `❓ *किसान का सवाल:* "${pReport.originalQuery}"\n\n`;
      }
      message += `💡 *विशेषज्ञ सलाह:*\n${pReport.advice}\n`;
    }

    message += `\n----------------------------\n⚠️ *स्रोत्र संदर्भ:* ICAR-भारतीय गेहूं एवं जौ अनुसंधान संस्थान (IIWBR)\n📲 *AgreNova AI से तुरंत वैज्ञानिक सलाह पाएं!*`;
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  };

  // Generate dynamic WhatsApp link for the last chatbot response
  const getWhatsAppLinkForChat = () => {
    const lastBotMsg = [...chatMessages].reverse().find(msg => msg.sender === 'bot');
    if (!lastBotMsg) return '#';
    
    let message = `🌾 *AgreNova AI चैट संवाद* 🌾\n\n`;
    message += `💡 *विशेषज्ञ सलाह:*\n${lastBotMsg.text}\n\n`;
    message += `----------------------------\n⚠️ *स्रोत्र संदर्भ:* ICAR-भारतीय गेहूं एवं जौ अनुसंधान संस्थान (IIWBR)\n📲 *AgreNova AI से तुरंत वैज्ञानिक सलाह पाएं!*`;
    
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  };

  // Get current Mandi rates (strictly official Agmarknet live data)
  const currentMandiPrices = liveMandiPrices;

  const mspBenchmark = mspRates[selectedMandiCrop];

  // Weather variables (prioritize dynamic OpenWeatherMap API data)
  const weatherAdvisory = liveWeather;

  // Risk prediction
  const cropRisk = getCropRiskAssessment(profile.crop, profile.state, selectedLang);

  // Filtered history list
  const filteredHistory = historyList.filter(item => {
    const q = historySearch.toLowerCase().trim();
    const matchesSearch = !q || 
      (item.title && item.title.toLowerCase().includes(q)) || 
      (item.disease && item.disease.toLowerCase().includes(q)) ||
      (item.subTitle && item.subTitle.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q)) ||
      (item.date && item.date.toLowerCase().includes(q));
    
    const matchesType = historyFilter === 'all' || item.type === historyFilter;
    return matchesSearch && matchesType;
  });

  // Print report trigger
  const handlePrintReport = () => {
    window.print();
  };

  // Handle local delete history
  const handleDeleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('क्या आप इस रिपोर्ट को इतिहास से हटाना चाहते हैं?')) {
      setHistoryList(prev => prev.filter(item => item.id !== id));
      if (selectedPastReport?.id === id) {
        setSelectedPastReport(null);
      }
    }
  };

  const renderMandiMspCard = () => {
    const cropDisplay = mspRates[selectedMandiCrop]?.name || selectedMandiCrop;
    const diffFromBenchmark = currentMandiPrices.length > 0
      ? currentMandiPrices[0].modalPrice - mspBenchmark.price
      : 0;

    return (
      <div id="card-price-msp" className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-4">
        {/* Header with Title and Crop Selector */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                <Wheat className="w-5 h-5" />
              </span>
              <h3 className="font-black text-base text-slate-900 tracking-tight">
                {getTranslation(selectedLang, 'mandi_vs_msp_title')}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 font-medium bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60">
                📍 {getTranslation(selectedLang, 'district')}: <strong className="text-slate-700">{formatLocationDisplay(profile.district, profile.state)}</strong>
              </span>
              <span className="inline-flex items-center gap-1 font-medium bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 text-emerald-800">
                🌱 {getTranslation(selectedLang, 'crop')}: <strong className="font-black">{cropDisplay}</strong>
              </span>
            </p>
          </div>

          {/* Crop selector pill row */}
          <div className="flex gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200/80 overflow-x-auto w-full sm:w-auto">
            {Object.keys(mspRates).map(cropKey => (
              <button
                key={cropKey}
                onClick={() => setSelectedMandiCrop(cropKey)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                  selectedMandiCrop === cropKey 
                    ? 'bg-emerald-700 text-white shadow-xs ring-2 ring-emerald-600/30' 
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                {mspRates[cropKey].name.split(' (')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Grid: Govt MSP Benchmark (Left) vs Market Mandi Real-Time (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Official Govt MSP Benchmark Card */}
          <div className="md:col-span-4 bg-gradient-to-br from-amber-50/90 via-amber-50/60 to-white border-2 border-amber-200/90 p-4.5 rounded-2xl flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-black text-amber-900 uppercase tracking-wider bg-amber-100/90 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 border border-amber-300/80">
                  🏛️ {getTranslation(selectedLang, 'cacp_msp_badge')}
                </span>
                <span className="text-[10px] font-bold text-amber-800 bg-white/80 px-2 py-0.5 rounded border border-amber-200">
                  2026-27
                </span>
              </div>
              
              <div className="mt-3">
                <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                  {getTranslation(selectedLang, 'govt_rate_per_quintal')}
                </div>
                <div className="text-3xl font-black text-slate-900 mt-1 tracking-tight">
                  ₹{mspBenchmark.price.toLocaleString('en-IN')}
                  <span className="text-xs text-slate-500 font-semibold ml-1">/ क्विंटल</span>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-amber-200/70 flex flex-col gap-1 text-[11px]">
                <div className="flex justify-between text-slate-600">
                  <span>फसल:</span>
                  <span className="font-black text-slate-900">{cropDisplay}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>गारंटी स्तर:</span>
                  <span className="font-bold text-amber-800">न्यूनतम सरकारी दर (Floor Price)</span>
                </div>
              </div>
            </div>

            <p className="text-[10.5px] text-amber-900/90 leading-relaxed font-medium mt-3 bg-amber-100/50 p-2 rounded-lg border border-amber-200/60">
              *भारत सरकार कृषि लागत एवं मूल्य आयोग (CACP) द्वारा निर्धारित वैधानिक गारंटी दर।
            </p>
          </div>

          {/* Mandi Rates for the selected crop & location */}
          <div className="md:col-span-8 bg-slate-50/90 border border-slate-200/80 p-4.5 rounded-2xl flex flex-col gap-3 shadow-2xs">
            {/* Header Strip inside Mandi Card */}
            <div className="flex justify-between items-center text-xs font-bold text-slate-600 flex-wrap gap-2 pb-1 border-b border-slate-200/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-black text-slate-800">मंडी आवक एवं बाजार दरें</span>
                <span className="text-slate-400 font-normal">({profile.district}, {profile.state})</span>
              </div>
              <span className="text-emerald-800 font-black bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200/80 text-[11px]">
                {isMandiLoading ? 'लोड हो रहा है...' : `${currentMandiPrices.length} मंडी परिणाम`}
              </span>
            </div>

            {isMandiLoading ? (
              <div className="flex flex-col items-center justify-center text-center py-10 gap-2.5">
                <div className="w-7 h-7 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs text-slate-600 font-bold">आधिकारिक Agmarknet पोर्टल से नवीनतम मंडी भाव प्राप्त हो रहे हैं...</p>
              </div>
            ) : currentMandiPrices.length > 0 ? (
              <div className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-1">
                {currentMandiPrices.map((item) => {
                  const diff = item.modalPrice - item.mspPrice;
                  const isAbove = diff >= 0;
                  return (
                    <div key={item.id} className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col gap-2.5 hover:border-emerald-300 transition-all">
                      {/* Mandi Name & Price Comparison Header */}
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-black text-slate-900 text-sm">{item.mandiName}</span>
                            {item.isNearby && (
                              <span className="text-[10px] font-black text-amber-900 bg-amber-50 border border-amber-200/90 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                                📍 {item.nearbyLabel || 'निकटतम उपलब्ध मंडी'}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 mt-0.5">
                            <span>🌾 {item.cropName}</span>
                            {item.variety && <span className="bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded text-[10px] font-bold">({item.variety})</span>}
                          </div>
                        </div>
                        
                        {/* Modal Price & Difference Tag */}
                        <div className="text-right shrink-0">
                          <div className="font-black text-emerald-800 text-lg tracking-tight">
                            ₹{item.modalPrice.toLocaleString('en-IN')} <span className="text-xs text-slate-400 font-normal">/ Qtl</span>
                          </div>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-md inline-flex items-center gap-1 ${
                            isAbove 
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/90' 
                              : 'bg-rose-50 text-rose-700 border border-rose-200/90'
                          }`}>
                            {isAbove 
                              ? `▲ +₹${diff.toLocaleString('en-IN')} (${getTranslation(selectedLang, 'above_msp')})` 
                              : `▼ -₹${Math.abs(diff).toLocaleString('en-IN')} (${getTranslation(selectedLang, 'below_msp')})`}
                          </span>
                        </div>
                      </div>

                      {/* 3 Price Breakdown: Min, Modal, Max */}
                      <div className="grid grid-cols-3 gap-2 bg-slate-50/90 p-2.5 rounded-xl text-center border border-slate-200/60">
                        <div>
                          <div className="text-[9.5px] text-slate-500 font-bold uppercase tracking-wider">न्यूनतम भाव (Min)</div>
                          <div className="text-xs sm:text-sm font-black text-slate-800 mt-0.5">₹{item.minPrice.toLocaleString('en-IN')}</div>
                        </div>
                        <div className="border-x border-slate-200/80">
                          <div className="text-[9.5px] text-emerald-700 font-black uppercase tracking-wider">मॉडल भाव (Modal)</div>
                          <div className="text-xs sm:text-sm font-black text-emerald-800 mt-0.5">₹{item.modalPrice.toLocaleString('en-IN')}</div>
                        </div>
                        <div>
                          <div className="text-[9.5px] text-slate-500 font-bold uppercase tracking-wider">अधिकतम भाव (Max)</div>
                          <div className="text-xs sm:text-sm font-black text-slate-800 mt-0.5">₹{item.maxPrice.toLocaleString('en-IN')}</div>
                        </div>
                      </div>

                      {/* Bottom timestamp & location metadata */}
                      <div className="flex justify-between items-center text-[10.5px] text-slate-500 font-medium pt-1.5 border-t border-slate-100">
                        <span className="inline-flex items-center gap-1">
                          🕒 अंतिम आवक दिनांक: <strong className="text-slate-700">{item.arrivalDate}</strong>
                        </span>
                        <span className="inline-flex items-center gap-1">
                          📍 {formatLocationDisplay(item.district, item.state)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8 px-4 bg-white rounded-xl border border-slate-200/80">
                <AlertCircle className="w-8 h-8 text-amber-500 mb-2" />
                <p className="text-xs sm:text-sm font-black text-slate-800">
                  {getTranslation(selectedLang, 'mandi_unavailable_title')}
                </p>
                <p className="text-xs text-slate-500 max-w-sm mt-1 leading-relaxed">
                  {getTranslation(selectedLang, 'mandi_records_updating')}
                </p>
                <div className="flex flex-wrap gap-2 mt-3.5 justify-center">
                  {['wheat', 'mustard', 'rice', 'cotton'].filter(c => c !== selectedMandiCrop).slice(0, 3).map((altCrop) => (
                    <button
                      key={altCrop}
                      type="button"
                      onClick={() => setSelectedMandiCrop(altCrop)}
                      className="text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/80 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95"
                    >
                      <span>🌾 {mspRates[altCrop]?.name || altCrop} {getTranslation(selectedLang, 'mandi_view_rate_btn')}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Mandi price source & freshness disclaimer */}
        <div className="text-xs text-slate-500 font-medium leading-relaxed border-t border-slate-100 pt-3 flex items-center justify-between flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5">
            🌐 <strong>डेटा स्रोत्र:</strong> आधिकारिक Agmarknet API (data.gov.in) — भारत सरकार
          </span>
          {liveMandiPrices.length > 0 && (
            <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${
              mandiIsFallback 
                ? 'bg-amber-50 text-amber-900 border-amber-200' 
                : 'bg-emerald-50 text-emerald-900 border-emerald-200'
            }`}>
              {mandiIsFallback ? (mandiFallbackNotice || 'पिछला उपलब्ध डेटा') : '✓ वास्तविक लाइव डेटा (Live Verified)'}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased scrollbar-none">
      {/* 100% Full-Width Solid Deep Agri-Green Header (#002C23) - Clean Single Header with Hamburger Menu */}
      <header id="app-header" className="w-full bg-[#002C23] border-b border-[#00382d] shadow-md z-[200] sticky top-0">
        {/* Main Header Bar */}
        <div className="w-full px-3.5 sm:px-6 md:px-8 py-2.5 sm:py-3 flex flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Left: Brand Logo + Title + Subtitle */}
          <div 
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 cursor-pointer"
            onClick={() => { setActiveTab('home'); setSelectedPastReport(null); }}
          >
            <div id="logo" className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center shrink-0">
              <AgreNovaLogoIcon className="w-8 h-8 sm:w-10 sm:h-10" alt="AgreNova AI Logo" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5">
                <h1 id="app-title" className="text-lg sm:text-2xl font-black text-white tracking-tight flex items-center gap-1.5 leading-none">
                  AgreNova <span className="text-[#34D399] font-black">AI</span>
                </h1>
              </div>
              <p className="text-[10px] sm:text-xs text-emerald-100/90 font-medium leading-normal tracking-wide mt-0.5">
                {getTranslation(selectedLang, 'app_tagline') || 'AI for Smarter Agriculture'}
              </p>
            </div>
          </div>
          
          {/* Right: Single Hamburger Menu Button (☰) */}
          <div className="flex items-center shrink-0">
            <button
              id="hamburger-menu-btn"
              onClick={() => setIsMenuDrawerOpen(true)}
              aria-label="मेनू खोलें"
              title="मेनू (Menu)"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#003d31] hover:bg-[#004739] active:scale-95 text-white border border-[#004e3e] flex items-center justify-center transition-all shadow-sm cursor-pointer"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-100" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Navigation Drawer Menu */}
      <AnimatePresence>
        {isMenuDrawerOpen && (
          <div className="fixed inset-0 z-[9999] flex justify-end">
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Slide-out Drawer Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="relative w-80 max-w-[85vw] h-full bg-[#07271b] border-l border-[#00382d] shadow-2xl flex flex-col z-10 overflow-hidden"
            >
              {/* Drawer Top Header */}
              <div className="bg-[#002C23] text-white px-5 py-4 flex items-center justify-between border-b border-[#00382d]">
                <div className="flex items-center gap-2.5">
                  <AgreNovaLogoIcon className="w-7 h-7" alt="AgreNova Logo" />
                  <div>
                    <h2 className="text-base font-black tracking-tight text-white leading-none">
                      AgreNova <span className="text-[#34D399]">AI</span>
                    </h2>
                    <p className="text-[10px] text-emerald-200/90 font-medium mt-0.5">
                      {getTranslation(selectedLang, 'app_tagline') || 'AI for Smarter Agriculture'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuDrawerOpen(false)}
                  className="w-8 h-8 rounded-lg bg-[#003d31] hover:bg-[#004739] text-emerald-100 flex items-center justify-center cursor-pointer transition-colors"
                  aria-label="बंद करें"
                  title="बंद करें"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Navigation Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
                {/* 1. मुख्य पृष्ठ (Home) */}
                <button
                  id="menu-item-home"
                  onClick={() => {
                    setActiveTab('home');
                    setSelectedPastReport(null);
                    setIsMenuDrawerOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-3 cursor-pointer ${
                    activeTab === 'home'
                      ? 'bg-emerald-900/70 text-white font-black border border-emerald-500/50 shadow-inner ring-1 ring-emerald-500/30'
                      : 'text-slate-100 hover:bg-[#0f3b2c] hover:text-white'
                  }`}
                >
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-emerald-500 text-white shadow-md shadow-emerald-950/50">
                    <Home className="w-4 h-4 text-white stroke-[2.5]" />
                  </span>
                  <span className="flex-1">{getTranslation(selectedLang, 'nav_home')}</span>
                  {activeTab === 'home' && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50"></span>}
                </button>

                {/* 2. कृषि कैलकुलेटर (Calculators) */}
                <button
                  id="menu-item-tools"
                  onClick={() => {
                    setActiveTab('tools');
                    setSelectedPastReport(null);
                    setIsMenuDrawerOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-3 cursor-pointer ${
                    activeTab === 'tools'
                      ? 'bg-teal-900/70 text-white font-black border border-teal-500/50 shadow-inner ring-1 ring-teal-500/30'
                      : 'text-slate-100 hover:bg-[#0f3b2c] hover:text-white'
                  }`}
                >
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 text-white shadow-md shadow-teal-950/50">
                    <Calculator className="w-4 h-4 text-white stroke-[2.5]" />
                  </span>
                  <span className="flex-1">{getTranslation(selectedLang, 'nav_tools')}</span>
                  {activeTab === 'tools' && <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-sm shadow-teal-400/50"></span>}
                </button>

                {/* 3. MSP दरें (MSP Rates) */}
                <button
                  id="menu-item-msp"
                  onClick={() => {
                    setActiveTab('msp');
                    setSelectedPastReport(null);
                    setIsMenuDrawerOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-3 cursor-pointer ${
                    activeTab === 'msp'
                      ? 'bg-amber-950/70 text-amber-100 font-black border border-amber-500/50 shadow-inner ring-1 ring-amber-500/30'
                      : 'text-slate-100 hover:bg-[#0f3b2c] hover:text-white'
                  }`}
                >
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 shadow-md shadow-amber-950/50">
                    <TrendingUp className="w-4 h-4 text-slate-950 stroke-[2.7]" />
                  </span>
                  <span className="flex-1">{getTranslation(selectedLang, 'nav_msp')}</span>
                  {activeTab === 'msp' && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400/50"></span>}
                </button>

                {/* 4. सरकारी योजनाएं (Government Schemes) */}
                <button
                  id="menu-item-schemes"
                  onClick={() => {
                    setActiveTab('schemes');
                    setSelectedPastReport(null);
                    setIsMenuDrawerOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-3 cursor-pointer ${
                    activeTab === 'schemes'
                      ? 'bg-indigo-950/70 text-indigo-100 font-black border border-indigo-500/50 shadow-inner ring-1 ring-indigo-500/30'
                      : 'text-slate-100 hover:bg-[#0f3b2c] hover:text-white'
                  }`}
                >
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-950/50">
                    <Award className="w-4 h-4 text-white stroke-[2.5]" />
                  </span>
                  <span className="flex-1">{getTranslation(selectedLang, 'nav_schemes')}</span>
                  {activeTab === 'schemes' && <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse shadow-sm shadow-indigo-400/50"></span>}
                </button>

                {/* 5. जांच इतिहास (Scan / Diagnosis History) */}
                <button
                  id="menu-item-history"
                  onClick={() => {
                    setActiveTab('history');
                    setSelectedPastReport(null);
                    setIsMenuDrawerOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-3 cursor-pointer ${
                    activeTab === 'history'
                      ? 'bg-sky-950/70 text-sky-100 font-black border border-sky-500/50 shadow-inner ring-1 ring-sky-500/30'
                      : 'text-slate-100 hover:bg-[#0f3b2c] hover:text-white'
                  }`}
                >
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-md shadow-sky-950/50">
                    <History className="w-4 h-4 text-white stroke-[2.5]" />
                  </span>
                  <span className="flex-1">{getTranslation(selectedLang, 'nav_history')}</span>
                  {activeTab === 'history' && <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-sm shadow-sky-400/50"></span>}
                </button>

                {/* 6. दिशा-निर्देश व मदद (Guidelines & Help) */}
                <button
                  id="menu-item-help"
                  onClick={() => {
                    setActiveTab('help');
                    setSelectedPastReport(null);
                    setIsMenuDrawerOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-3 cursor-pointer ${
                    activeTab === 'help'
                      ? 'bg-orange-950/70 text-orange-100 font-black border border-orange-500/50 shadow-inner ring-1 ring-orange-500/30'
                      : 'text-slate-100 hover:bg-[#0f3b2c] hover:text-white'
                  }`}
                >
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-md shadow-orange-950/50">
                    <HelpCircle className="w-4 h-4 text-white stroke-[2.5]" />
                  </span>
                  <span className="flex-1">{getTranslation(selectedLang, 'nav_help')}</span>
                  {activeTab === 'help' && <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse shadow-sm shadow-orange-400/50"></span>}
                </button>

                {/* Subtle Divider */}
                <div className="py-2">
                  <div className="border-t border-[#0e3a2b]"></div>
                </div>

                {/* 7. भाषा बदलें (Language Selection Accordion) */}
                <div>
                  <button
                    id="menu-item-language"
                    onClick={() => setIsDrawerLangOpen(!isDrawerLangOpen)}
                    className="w-full text-left px-3.5 py-3 rounded-xl font-bold text-sm text-slate-100 hover:bg-[#0f3b2c] hover:text-white transition-all flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#003d31] text-emerald-300 border border-[#004e3e] flex items-center justify-center shrink-0 shadow-xs">
                        <Globe className="w-4 h-4 text-emerald-300 stroke-[2.2]" />
                      </span>
                      <div>
                        <div className="font-bold text-white">भाषा बदलें (Language)</div>
                        <div className="text-xs text-emerald-300 font-semibold">
                          {SUPPORTED_LANGUAGES.find(l => l.code === selectedLang)?.name || 'हिन्दी'} ({SUPPORTED_LANGUAGES.find(l => l.code === selectedLang)?.englishName || 'Hindi'})
                        </div>
                      </div>
                    </div>
                    {isDrawerLangOpen ? <ChevronUp className="w-4 h-4 text-slate-300" /> : <ChevronDown className="w-4 h-4 text-slate-300" />}
                  </button>

                  {/* Language Selection List */}
                  {isDrawerLangOpen && (
                    <div className="mt-1.5 ml-3 pl-3 border-l-2 border-emerald-500/60 bg-[#051c13] rounded-r-xl p-2 space-y-1 max-h-56 overflow-y-auto ring-1 ring-[#00382d]">
                      {SUPPORTED_LANGUAGES.map((lang) => {
                        const isSelected = selectedLang === lang.code;
                        return (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setSelectedLang(lang.code);
                              try {
                                localStorage.setItem('agrenova_lang', lang.code);
                              } catch (e) {
                                console.warn('localStorage write error:', e);
                              }
                              setIsDrawerLangOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-emerald-600/30 text-emerald-200 font-black border border-emerald-500/40'
                                : 'text-slate-200 hover:bg-[#0f3b2c] hover:text-white'
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              <span>{lang.name}</span>
                              <span className="text-[11px] text-slate-400 font-normal">({lang.englishName})</span>
                            </span>
                            {isSelected && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 8. सेटिंग्स (Settings) */}
                <button
                  id="menu-item-settings"
                  onClick={() => {
                    setIsMenuDrawerOpen(false);
                    setIsProfileModalOpen(true);
                  }}
                  className="w-full text-left px-3.5 py-3 rounded-xl font-bold text-sm text-slate-100 hover:bg-[#0f3b2c] hover:text-white transition-all flex items-center gap-3 cursor-pointer"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#003d31] text-slate-200 border border-[#004e3e] flex items-center justify-center shrink-0 shadow-xs">
                    <Settings className="w-4 h-4 text-slate-200 stroke-[2.2]" />
                  </span>
                  <span className="flex-1 font-bold text-white">सेटिंग्स (Settings & Profile)</span>
                </button>

                {/* Subtle Divider */}
                <div className="py-2">
                  <div className="border-t border-[#0e3a2b]"></div>
                </div>

                {/* 9. किसान हेल्पलाइन (Helpline) */}
                <a
                  id="menu-item-helpline"
                  href="tel:18001801551"
                  className="w-full bg-[#FDB813] hover:bg-[#ffc42e] active:scale-95 text-[#002C23] font-black text-sm px-4 py-3 rounded-xl transition-all shadow-lg shadow-black/30 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 fill-current text-[#002C23] shrink-0" />
                  <span>किसान हेल्पलाइन 1800-180-1551</span>
                </a>
              </div>

              {/* Drawer Footer info */}
              <div className="p-3 bg-[#041a12] border-t border-[#0e3a2b] text-center">
                <p className="text-[11px] text-emerald-400/80 font-medium">
                  AgreNova AI • कृषक हित में जारी
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Hidden File Input for instant camera/photo upload from any tab */}
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        className="hidden" 
      />

      {/* Main Content Body */}
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col gap-4 md:gap-6 p-3 sm:p-4 md:p-6 min-w-0">
        {/* Offline & App Notification banner */}
        {isOffline && (
          <div className="bg-amber-500 text-white px-4 py-2.5 rounded-2xl flex items-center justify-between shadow-md text-sm font-semibold animate-pulse">
            <span className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{getTranslation(selectedLang, 'offline_mode_alert')}</span>
            </span>
          </div>
        )}

        {/* Dynamic farmer greetings & Local weather strip */}
        {activeTab === 'home' && (
          <div className="w-full max-w-4xl mx-auto mb-2">
            {(() => {
              const rawMain = (weatherAdvisory?.debugInfo?.condition || '').trim();
              const rawDesc = (weatherAdvisory?.debugInfo?.description || '').toLowerCase().trim();
              const rawCond = (weatherAdvisory?.condition || '').toLowerCase().trim();
              const mainLower = rawMain.toLowerCase();

              let weatherIcon = '☀️';
              if (mainLower === 'thunderstorm' || rawDesc.includes('thunderstorm') || rawCond.includes('thunder') || rawCond.includes('तूफान')) {
                weatherIcon = '⛈️';
              } else if (mainLower === 'drizzle' || rawDesc.includes('drizzle')) {
                weatherIcon = '🌦️';
              } else if (mainLower === 'rain' || rawDesc.includes('rain') || rawCond.includes('बारिश') || rawCond.includes('वर्षा')) {
                weatherIcon = '🌧️';
              } else if (mainLower === 'clouds' || rawDesc.includes('cloud') || rawCond.includes('बादल')) {
                if (rawDesc.includes('broken') || rawDesc.includes('overcast') || rawCond.includes('घने')) {
                  weatherIcon = '☁️';
                } else {
                  weatherIcon = '⛅';
                }
              } else if (mainLower === 'mist' || mainLower === 'fog' || mainLower === 'haze' || mainLower === 'smoke' || rawDesc.includes('mist') || rawDesc.includes('fog') || rawDesc.includes('haze') || rawDesc.includes('smoke') || rawCond.includes('धुंध') || rawCond.includes('कोहरा')) {
                weatherIcon = '🌫️';
              } else {
                weatherIcon = '☀️';
              }

              const cleanTemp = (weatherAdvisory?.temp || '35°C').replace(/[\s.]*$/, '').trim();
              const cleanCond = (weatherAdvisory?.condition || 'साफ़ और धूप भरा मौसम').replace(/^[.\s•]+/, '').trim();
              const displayLoc = formatLocationDisplay(profile.district, profile.state);

              return (
                <div 
                  id="weather-emerald-card"
                  className="bg-gradient-to-r from-[#062a1d] via-[#083624] to-[#0a3d2b] text-white p-4 sm:p-5 md:p-6 rounded-2xl border border-emerald-700/50 relative overflow-hidden flex flex-col justify-between gap-4 transition-all duration-300 shadow-md"
                >
                  {/* Automatic Weather Environment Animation Overlay */}
                  <WeatherEnvironmentAnimation 
                    conditionMain={weatherAdvisory?.debugInfo?.condition}
                    conditionDesc={weatherAdvisory?.debugInfo?.description}
                    conditionHindi={weatherAdvisory?.condition}
                  />

                  {/* Top Badge Header Row */}
                  <div className="flex items-center justify-between gap-3 relative z-10 flex-wrap">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold shadow-2xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                        <span>लाइव मौसम व कृषि पूर्वानुमान</span>
                      </div>
                    </div>

                    {isWeatherLoading && (
                      <span className="text-[10px] text-emerald-200 bg-white/10 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-semibold">
                        <span className="w-2 h-2 border border-white border-t-transparent rounded-full animate-spin"></span>
                        अपडेट हो रहा है...
                      </span>
                    )}
                  </div>

                  {isWeatherLoading && !weatherAdvisory ? (
                    <div className="flex items-center gap-3 py-6 px-2 text-emerald-100 font-semibold z-10 min-h-[100px]">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0"></div>
                      <span className="text-sm font-bold">मौसम का डेटा लोड हो रहा है...</span>
                    </div>
                  ) : weatherAdvisory ? (
                    <div className="z-10 flex flex-col gap-4">
                      {/* Main Center Area: Left Core Weather Data, Right Metrics & Action Buttons */}
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        
                        {/* Left Side: Glowing Icon, Large Temp & Condition, Location, OpenWeather API tag */}
                        <div className="flex items-center gap-3.5">
                          {/* Glowing Weather Icon */}
                          <div className="w-13 h-13 rounded-xl bg-white/10 border border-emerald-400/25 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                            {weatherIcon}
                          </div>

                          <div>
                            {/* Large Active Temperature & Condition */}
                            <div className="flex items-baseline gap-2 flex-wrap sm:flex-nowrap">
                              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none drop-shadow-xs">
                                {cleanTemp}
                              </span>
                              <span className="text-base sm:text-lg font-extrabold text-emerald-100 whitespace-nowrap leading-none flex items-center gap-1.5">
                                <span>•</span>
                                <span>{cleanCond}</span>
                              </span>
                            </div>

                            {/* Location & Metadata Attribution */}
                            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                              <p className="text-xs text-emerald-200 font-semibold flex items-center gap-1">
                                📍 {displayLoc} (अनुमानित)
                              </p>
                              <span className="text-emerald-500/60 hidden sm:inline">•</span>
                              <span className="text-[11px] text-emerald-300/80 font-medium">
                                🌐 {!weatherIsCached ? 'लाइव मौसम - OpenWeather API • LIVE DATA' : 'कैश्ड मौसम डेटा'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Side: Vertical Divider, Micro-Metrics & Circular Action Buttons */}
                        <div className="flex items-center justify-between md:justify-end gap-5 w-full md:w-auto md:border-l md:border-emerald-700/50 md:pl-6 pt-2 md:pt-0 border-t md:border-t-0 border-emerald-800/40">
                          {/* Live Metrics Row */}
                          <div className="flex items-center gap-5 sm:gap-6 text-center">
                            <div className="flex flex-col items-center">
                              <span className="text-[11px] text-emerald-300 font-medium flex items-center gap-1">💧 नमी</span>
                              <strong className="text-xs sm:text-sm font-black text-white mt-0.5">{weatherAdvisory.humidity || '63%'}</strong>
                            </div>
                            <div className="flex flex-col items-center">
                              <span className="text-[11px] text-emerald-300 font-medium flex items-center gap-1">💨 हवा</span>
                              <strong className="text-xs sm:text-sm font-black text-white mt-0.5">{weatherAdvisory.windSpeed || '3.09 m/s'}</strong>
                            </div>
                            <div className="flex flex-col items-center">
                              <span className="text-[11px] text-emerald-300 font-medium flex items-center gap-1">☁️ बादल</span>
                              <strong className="text-xs sm:text-sm font-black text-white mt-0.5">{weatherAdvisory.clouds || '65%'}</strong>
                            </div>
                          </div>

                          {/* Floating Circular Action Buttons */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              id="btn-share-weather"
                              onClick={handleShareWeather}
                              title="मौसम साझा करें"
                              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer shrink-0 shadow-xs"
                            >
                              <Share2 className="w-4 h-4 text-emerald-200" />
                            </button>
                            <button
                              type="button"
                              id="btn-refresh-weather"
                              onClick={handleRefreshWeather}
                              title="मौसम रिफ्रेश करें"
                              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer shrink-0 shadow-xs"
                            >
                              <RefreshCw className={`w-4 h-4 text-emerald-200 ${isWeatherLoading ? 'animate-spin' : ''}`} />
                            </button>
                          </div>
                        </div>

                      </div>

                      {/* Integrated Bottom Advisory Strip */}
                      <div className="bg-[#031d14]/90 border border-emerald-800/60 rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs text-white">
                        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="text-amber-300 font-bold shrink-0">🌾 मृदा / छिड़काव सलाह:</span>
                        <p className="text-emerald-50 font-medium leading-relaxed">
                          {(() => {
                            let adv = weatherAdvisory.advisory || 'आज का मौसम अनुकूल है। फसल छिड़काव, खाद प्रबंधन व अन्य कृषि कार्य किए जा सकते हैं।';
                            adv = adv.replace(/\s*\([^)]*आर्द्रता:[^)]*\)/g, '').replace(/\s*\([^)]*Humidity:[^)]*\)/g, '').trim();
                            if (!adv || adv.includes('आर्द्रता:') || adv.includes('Humidity:')) {
                              adv = weatherAdvisory.isSpraySafe
                                ? 'आज का मौसम फसल छिड़काव और कृषि कार्यों के लिए अनुकूल है।'
                                : 'मौसम में बदलाव संभव है। कीटनाशक छिड़काव व सिंचाई ध्यानपूर्वक करें।';
                            }
                            return adv;
                          })()}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-6 px-2 text-emerald-100 z-10 min-h-[100px]">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-6 h-6 text-amber-300 shrink-0" />
                        <div>
                          <h4 className="text-sm font-bold text-white">{getTranslation(selectedLang, 'weather_unavailable_title')}</h4>
                          <p className="text-xs text-emerald-200 mt-0.5">{getTranslation(selectedLang, 'weather_unavailable_sub')}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRefreshWeather}
                        className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>{getTranslation(selectedLang, 'retry_weather_btn')}</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* Tab Content Panels */}
        <AnimatePresence mode="wait">
          
          {/* TAB 1: HOME PANEL */}
          {(activeTab === 'home' || activeTab === 'chat' || activeTab === 'diagnosis') && (
            <motion.div 
              key="tab-home-pane"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className={`grid grid-cols-1 ${activeTab === 'home' ? 'max-w-4xl mx-auto w-full' : 'lg:grid-cols-12'} gap-6 flex-1`}
            >
              
              {/* Left Side: Photo upload, Speech / Chat AI, Mandi Prices */}
              <div className={`${
                activeTab === 'home' ? 'w-full max-w-4xl mx-auto' : 
                activeTab === 'chat' ? 'w-full max-w-3xl mx-auto' : 'lg:col-span-5'
              } flex flex-col gap-6`}>
                
                {/* 1. Primary Action Layout on Home */}
                {activeTab === 'home' && (
                  <div className="flex flex-col gap-4 sm:gap-5 w-full">
                    
                    {/* Top Pill Badge: अपनी फ़सल की समस्या का तुरंत समाधान पाएं + User Guide Button */}
                    <div className="flex items-center justify-center gap-2 flex-wrap -mb-1">
                      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{getTranslation(selectedLang, 'home_top_banner_tag')}</span>
                      </div>
                      <button
                        type="button"
                        id="btn-toggle-first-time-guide"
                        onClick={() => setIsFirstTimeGuideOpen(!isFirstTimeGuideOpen)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold shadow-2xs transition-all active:scale-95 cursor-pointer"
                      >
                        <span>💡</span>
                        <span>{getTranslation(selectedLang, 'guide_show_again')}</span>
                      </button>
                    </div>

                    {/* First-Time User Quick Guide Banner */}
                    <AnimatePresence>
                      {isFirstTimeGuideOpen && (
                        <motion.div
                          id="first-time-quick-guide-banner"
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                          className="bg-gradient-to-br from-emerald-50/90 via-teal-50/60 to-white border-2 border-emerald-300/80 rounded-2xl p-4 sm:p-5 shadow-sm overflow-hidden"
                        >
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                                💡
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                                    {getTranslation(selectedLang, 'first_time_guide_title')}
                                  </h3>
                                  <span className="text-[10px] bg-emerald-700 text-white font-black px-2 py-0.5 rounded-full">
                                    {getTranslation(selectedLang, 'first_time_guide_badge')}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-600 font-medium mt-0.5">
                                  {getTranslation(selectedLang, 'first_time_guide_sub')}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              id="btn-close-quick-guide"
                              onClick={dismissFirstTimeGuide}
                              aria-label="Close guide"
                              className="p-1.5 rounded-full hover:bg-slate-200/80 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer shrink-0"
                            >
                              <X className="w-4.5 h-4.5" />
                            </button>
                          </div>

                          {/* 4 Superpower Cards Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 my-2">
                            {/* Step 1: Voice */}
                            <div className="bg-white/95 border border-emerald-200/80 rounded-xl p-3 flex flex-col justify-between shadow-2xs">
                              <div>
                                <div className="flex items-center gap-1.5 text-xs font-black text-emerald-900 mb-1">
                                  <span>🎙️</span>
                                  <span>{getTranslation(selectedLang, 'guide_step1_title')}</span>
                                </div>
                                <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                                  {getTranslation(selectedLang, 'guide_step1_desc')}
                                </p>
                              </div>
                              <button
                                type="button"
                                id="btn-guide-try-voice"
                                onClick={openVoiceModal}
                                className="mt-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-black py-1.5 px-2.5 rounded-lg flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer shadow-2xs"
                              >
                                <span>{getTranslation(selectedLang, 'guide_step1_action')}</span>
                              </button>
                            </div>

                            {/* Step 2: Vision Photo */}
                            <div className="bg-white/95 border border-teal-200/80 rounded-xl p-3 flex flex-col justify-between shadow-2xs">
                              <div>
                                <div className="flex items-center gap-1.5 text-xs font-black text-teal-900 mb-1">
                                  <span>📷</span>
                                  <span>{getTranslation(selectedLang, 'guide_step2_title')}</span>
                                </div>
                                <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                                  {getTranslation(selectedLang, 'guide_step2_desc')}
                                </p>
                              </div>
                              <button
                                type="button"
                                id="btn-guide-try-photo"
                                onClick={openCameraModal}
                                className="mt-2.5 bg-teal-700 hover:bg-teal-800 text-white text-[11px] font-black py-1.5 px-2.5 rounded-lg flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer shadow-2xs"
                              >
                                <span>{getTranslation(selectedLang, 'guide_step2_action')}</span>
                              </button>
                            </div>

                            {/* Step 3: Weather */}
                            <div className="bg-white/95 border border-slate-200/80 rounded-xl p-3 flex flex-col justify-between shadow-2xs">
                              <div>
                                <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 mb-1">
                                  <span>🌦️</span>
                                  <span>{getTranslation(selectedLang, 'guide_step3_title')}</span>
                                </div>
                                <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                                  {getTranslation(selectedLang, 'guide_step3_desc')}
                                </p>
                              </div>
                              <div className="mt-2.5 text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 text-center">
                                {getTranslation(selectedLang, 'guide_step3_badge')}
                              </div>
                            </div>

                            {/* Step 4: Calculator & MSP */}
                            <div className="bg-white/95 border border-amber-200/80 rounded-xl p-3 flex flex-col justify-between shadow-2xs">
                              <div>
                                <div className="flex items-center gap-1.5 text-xs font-black text-amber-950 mb-1">
                                  <span>🌾</span>
                                  <span>{getTranslation(selectedLang, 'guide_step4_title')}</span>
                                </div>
                                <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                                  {getTranslation(selectedLang, 'guide_step4_desc')}
                                </p>
                              </div>
                              <button
                                type="button"
                                id="btn-guide-try-calc"
                                onClick={() => setActiveTab('tools')}
                                className="mt-2.5 bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-black py-1.5 px-2.5 rounded-lg flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer shadow-2xs"
                              >
                                <span>{getTranslation(selectedLang, 'open_calculator_btn')}</span>
                              </button>
                            </div>
                          </div>

                          {/* Dismiss button & settings link */}
                          <div className="flex items-center justify-between pt-2 border-t border-emerald-200/60 mt-2 flex-wrap gap-2">
                            <span className="text-[11px] text-slate-500 font-semibold">
                              {getTranslation(selectedLang, 'guide_bottom_tip')}
                            </span>
                            <button
                              type="button"
                              id="btn-guide-dismiss"
                              onClick={dismissFirstTimeGuide}
                              className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-black py-1.5 px-4 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
                            >
                              {getTranslation(selectedLang, 'guide_got_it')} ✓
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Section 2: "आप क्या करना चाहते हैं?" Container */}
                    <div className="text-center flex flex-col items-center gap-1">
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        {getTranslation(selectedLang, 'what_would_you_like_to_do')}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg mx-auto">
                        {getTranslation(selectedLang, 'home_action_sub')}
                      </p>
                    </div>

                    {/* Section 3: Two Main Action Cards (Rigid Compact Profile, Anti-Aliased Sharp Typography & 3D Polish) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                      {/* Left Card (Deep Forest Green Theme): बोलकर बताएं */}
                      <div 
                        id="card-action-voice"
                        onClick={openVoiceModal}
                        className="bg-gradient-to-br from-[#06311f] to-[#021a10] border border-emerald-500/25 rounded-2xl p-4.5 sm:p-5 text-white flex flex-col justify-between min-h-[165px] sm:min-h-[175px] transition-all duration-300 hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-950/30 active:scale-[0.99] cursor-pointer group select-none relative overflow-hidden"
                      >
                        <div className="flex items-start justify-between gap-2 relative z-10">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 border border-emerald-400/30 flex items-center justify-center text-amber-300 shadow-inner group-hover:scale-105 transition-transform shrink-0">
                            {isRecording ? (
                              <MicOff className="w-5 h-5 text-rose-300 animate-pulse" />
                            ) : (
                              <Mic className="w-5 h-5 text-amber-300" />
                            )}
                          </div>
                          {isRecording ? (
                            <span className="bg-rose-500 text-white px-2.5 py-0.5 rounded-full text-[11px] font-black tracking-wider animate-bounce border border-rose-300">
                              🔴 {getTranslation(selectedLang, 'live_recording_badge')}
                            </span>
                          ) : (
                            <div className="flex items-center gap-1.5 bg-[#043324]/90 text-emerald-300 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/30 backdrop-blur-md shadow-2xs">
                              <Volume2 className="w-3 h-3" />
                              <span>{getTranslation(selectedLang, 'action_voice_title')}</span>
                            </div>
                          )}
                        </div>

                        <div className="my-2 relative z-10">
                          <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
                            {getTranslation(selectedLang, 'action_voice_title')}
                          </h3>
                          <p className="text-xs sm:text-[13px] text-emerald-100/90 mt-0.5 font-medium leading-relaxed line-clamp-2">
                            {getTranslation(selectedLang, 'action_voice_input_tip')}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-2.5 relative z-10 border-t border-white/10">
                          <span className="text-xs text-emerald-300 font-semibold truncate">
                            {getTranslation(selectedLang, 'action_voice_badge')}
                          </span>
                          <div className="w-6.5 h-6.5 rounded-full bg-[#043324] border border-emerald-500/30 flex items-center justify-center text-white group-hover:translate-x-1 transition-transform shrink-0 shadow-2xs">
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>

                      {/* Right Card (Dark Navy Blue Theme): फ़सल की फ़ोटो भेजें */}
                      <div 
                        id="card-action-photo"
                        onClick={openCameraModal}
                        className="bg-gradient-to-br from-[#091b3b] to-[#030a17] border border-cyan-500/25 rounded-2xl p-4.5 sm:p-5 text-white flex flex-col justify-between min-h-[165px] sm:min-h-[175px] transition-all duration-300 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-slate-950/30 active:scale-[0.99] cursor-pointer group select-none relative overflow-hidden"
                      >
                        <div className="flex items-start justify-between gap-2 relative z-10">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 border border-teal-500/30 flex items-center justify-center text-teal-300 shadow-inner group-hover:scale-105 transition-transform shrink-0">
                            <Camera className="w-5 h-5 text-teal-300" />
                          </div>
                          <div className="flex items-center gap-1.5 bg-[#0b2144]/90 text-teal-300 text-[11px] font-bold px-2.5 py-1 rounded-full border border-teal-500/40 backdrop-blur-md shadow-2xs">
                            <ScanLine className="w-3 h-3" />
                            <span>{getTranslation(selectedLang, 'ai_vision_badge')}</span>
                          </div>
                        </div>

                        <div className="my-2 relative z-10">
                          <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
                            {getTranslation(selectedLang, 'action_photo_title')}
                          </h3>
                          <p className="text-xs sm:text-[13px] text-slate-300/90 mt-0.5 font-medium leading-relaxed line-clamp-2">
                            {getTranslation(selectedLang, 'action_photo_sub')}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-2.5 relative z-10 border-t border-white/10">
                          <span className="text-xs text-slate-300 font-semibold truncate">
                            {getTranslation(selectedLang, 'action_photo_badge')}
                          </span>
                          <div className="w-6.5 h-6.5 rounded-full bg-[#0b2144] border border-teal-500/30 flex items-center justify-center text-white group-hover:translate-x-1 transition-transform shrink-0 shadow-2xs">
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 4 & 5: Unified White Prompt & Search Card (Sleek Ultra-Thin Input & Refined Outline Chips) */}
                    <div 
                      id="home-unified-prompt-card"
                      className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col gap-3.5 w-full"
                    >
                      {/* Prompt title */}
                      <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-800">
                        <span>✍️</span>
                        <span>{getTranslation(selectedLang, 'quick_sample_prompt')}</span>
                      </div>

                      {/* Input row */}
                      <div className="flex items-center gap-2.5 w-full">
                        <div className="flex-1 flex items-center bg-slate-50/80 hover:bg-slate-50 focus-within:bg-white border border-slate-300/80 rounded-xl px-3 py-1 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-600 transition-all min-h-[44px]">
                          <input
                            id="input-text-home-search"
                            type="text"
                            placeholder={getTranslation(selectedLang, 'home_search_placeholder')}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && inputText.trim()) {
                                handleAskQuestion(inputText);
                              }
                            }}
                            className="w-full py-1.5 text-xs sm:text-sm font-semibold bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none min-w-0"
                          />
                          <button
                            type="button"
                            id="btn-voice-input-home-bar"
                            onClick={openVoiceModal}
                            className={`p-2 rounded-lg border transition-all flex items-center justify-center shrink-0 cursor-pointer ml-1 min-h-[34px] min-w-[34px] ${
                              isRecording 
                                ? 'bg-rose-600 text-white border-rose-700 animate-pulse' 
                                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200/80'
                            }`}
                            title={isRecording ? 'रिकॉर्डिंग रोकें' : 'बोलकर पूछें'}
                          >
                            {isRecording ? <MicOff className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4 text-emerald-700" />}
                          </button>
                        </div>

                        <button
                          id="btn-submit-home-search"
                          onClick={() => {
                            if (inputText.trim()) {
                              handleAskQuestion(inputText);
                            }
                          }}
                          disabled={isAskingQuestion || !inputText.trim()}
                          className="bg-[#047857] hover:bg-[#065f46] disabled:bg-slate-200 disabled:text-slate-400 text-white font-black px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 transition-all cursor-pointer shrink-0 min-h-[44px]"
                        >
                          <Send className="w-4 h-4" />
                          <span>{getTranslation(selectedLang, 'ask_btn')}</span>
                        </button>
                      </div>

                      {speechError && (
                        <div className="flex items-start gap-2 bg-rose-50 p-2.5 rounded-xl text-xs text-rose-700 border border-rose-200">
                          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                          <span>{speechError}</span>
                        </div>
                      )}

                      {/* Popular questions list (Clean Outline Chips) */}
                      <div className="flex flex-col gap-1.5 pt-1">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          {getTranslation(selectedLang, 'popular_questions_title')}
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          {[
                            getTranslation(selectedLang, 'voice_example_1'),
                            getTranslation(selectedLang, 'voice_example_2'),
                            getTranslation(selectedLang, 'voice_example_3'),
                            getTranslation(selectedLang, 'voice_example_4')
                          ].map((chipText, cIdx) => (
                            <button
                              key={cIdx}
                              type="button"
                              onClick={() => {
                                setInputText(chipText);
                                handleAskQuestion(chipText);
                              }}
                              className="text-xs font-semibold bg-slate-50 hover:bg-emerald-50 hover:text-emerald-900 text-slate-700 hover:border-emerald-300 px-3 py-1.5 rounded-full border border-slate-200/90 transition-all cursor-pointer text-left active:scale-95 shadow-2xs"
                            >
                              {chipText}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'chat' && (
                  <div className="flex flex-col gap-4">
                    {/* Voice card */}
                    <button 
                      id="btn-voice-input"
                      onClick={toggleRecording}
                      className={`relative overflow-hidden rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border focus:outline-none min-h-[170px] cursor-pointer group shadow-xs w-full ${
                        isRecording 
                          ? 'bg-rose-600 text-white border-rose-700 animate-pulse shadow-rose-600/20 shadow-md' 
                          : 'bg-slate-900 text-white border-slate-950 hover:bg-slate-800'
                      }`}
                    >
                      {isRecording && (
                        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 bg-rose-700 px-3 py-1 rounded-full text-[10px] font-black tracking-wider animate-bounce border border-rose-400/30">
                          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
                          {getTranslation(selectedLang, 'live_recording_badge')}
                        </div>
                      )}
                      
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300 shadow-inner">
                        {isRecording ? <MicOff className="w-7 h-7 text-white" /> : <Mic className="w-7 h-7 text-white" />}
                      </div>
                      
                      <span className="text-lg font-black mb-1">{getTranslation(selectedLang, 'voice_input_label')}</span>
                      <span className="text-[11px] opacity-80 max-w-[220px] leading-relaxed mx-auto font-medium">{getTranslation(selectedLang, 'voice_input_desc')}</span>
                    </button>

                    {/* Personalization Info Card */}
                    <div className="bg-emerald-50/80 border border-emerald-200/70 p-4 rounded-2xl text-xs text-emerald-900 flex flex-col gap-1.5 shadow-xs">
                      <div className="flex items-center gap-1.5 font-black text-emerald-800">
                        <Sparkles className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                        <span>{getTranslation(selectedLang, 'personalized_ai_advice_title')}</span>
                      </div>
                      <p className="leading-relaxed opacity-95">
                        AgreNova AI ({getTranslation(selectedLang, 'main_crop')}: <strong>{mspRates[profile.crop]?.name || profile.crop}</strong>, {getTranslation(selectedLang, 'state')}: <strong>{profile.state}</strong>)
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'diagnosis' && (
                  <div className="flex flex-col gap-4">
                    {/* Photo upload trigger card */}
                    <button 
                      id="btn-photo-upload"
                      onClick={triggerFileSelect}
                      disabled={isAnalyzingPhoto}
                      className="bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-900 text-white border border-emerald-700/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:brightness-105 focus:outline-none min-h-[170px] cursor-pointer group shadow-xs w-full"
                    >
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300 shadow-inner">
                        <Camera className="w-7 h-7 text-white" />
                      </div>
                      
                      <span className="text-lg font-black mb-1">{getTranslation(selectedLang, 'send_crop_photo')}</span>
                      <span className="text-[11px] opacity-85 max-w-[240px] leading-relaxed mx-auto font-medium">{getTranslation(selectedLang, 'send_photo_desc')}</span>
                      
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handlePhotoUpload}
                        accept="image/*"
                        className="hidden" 
                      />
                    </button>

                    {/* Photo Diagnosis Guide */}
                    <div className="bg-emerald-50/80 border border-emerald-200/70 p-4 rounded-2xl text-xs text-emerald-900 flex flex-col gap-1.5 shadow-xs">
                      <div className="flex items-center gap-1.5 font-black text-emerald-800">
                        <Info className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                        <span>{getTranslation(selectedLang, 'photo_guide_title')}</span>
                      </div>
                      <p className="leading-relaxed opacity-95">
                        {getTranslation(selectedLang, 'photo_guide_desc')}
                      </p>
                    </div>
                  </div>
                )}

              </div>

              {/* Right Side: Image previews, Active Diagnostics Report */}
              {activeTab === 'diagnosis' && (
                <div className="lg:col-span-7 flex flex-col gap-6">
                
                {/* Upload Image state preview */}
                {selectedImage && (
                  <div id="card-image-preview" className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-3 relative overflow-hidden">
                    <button 
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-3 right-3 bg-slate-900/90 hover:bg-slate-900 text-white rounded-full p-1 px-3 text-xs font-bold cursor-pointer transition-colors shadow-xs"
                    >
                      ✕ {getTranslation(selectedLang, 'remove')}
                    </button>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{getTranslation(selectedLang, 'uploaded_crop_photo')}</span>
                    <div className="w-full h-48 rounded-xl overflow-hidden border border-slate-200/60 bg-slate-50 shadow-inner">
                      <img src={selectedImage} alt="Crop status" className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}

                {/* Analysis Loading State */}
                {(isAnalyzingPhoto || isAskingQuestion) && (
                  <div id="card-loading" className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center justify-center text-center py-20 gap-4">
                    <RefreshCw className="w-12 h-12 text-emerald-600 animate-spin" />
                    <div>
                      <h4 className="font-extrabold text-lg text-slate-900">{getTranslation(selectedLang, 'scientists_analyzing')}</h4>
                      <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                        {isAnalyzingPhoto ? getTranslation(selectedLang, 'photo_analyzing_desc') : getTranslation(selectedLang, 'question_analyzing_desc')}
                      </p>
                    </div>
                  </div>
                )}

                {/* Primary Diagnostics Report Card */}
                {!isAnalyzingPhoto && !isAskingQuestion && activeResult && (
                  <CropAnalysisResultCard
                    result={activeResult}
                    selectedLang={selectedLang}
                    imageUrl={selectedImage}
                    cropName={profile.crop ? (mspRates[profile.crop]?.name || profile.crop) : undefined}
                    onPrint={handlePrintReport}
                    getWhatsAppLink={getWhatsAppLink}
                    translatedAdvice={translatedMessages['active-advice']}
                    isTranslatingAdvice={isTranslatingKey === 'active-advice'}
                    onTranslateAdvice={() => handleTranslateResponse('active-advice', activeResult.advice)}
                    onScanAnother={() => {
                      setSelectedImage(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    idPrefix="active-advice"
                  />
                )}

                {/* Photo Analysis Error State */}
                {photoError && !isAnalyzingPhoto && (
                  <div className="bg-rose-50/80 border border-rose-200/90 p-5 rounded-2xl flex flex-col gap-3 shadow-xs">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      <div className="flex-1 text-xs">
                        <h4 className="font-extrabold text-rose-950 text-sm">
                          {getTranslation(selectedLang, 'photo_interrupted_title')}
                        </h4>
                        <p className="text-rose-800 mt-1 leading-relaxed font-medium">
                          {photoError}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/90 p-3 rounded-xl border border-rose-200/60 flex flex-col gap-1 text-[11px] text-slate-700">
                      <span className="font-bold text-slate-900">💡 {getTranslation(selectedLang, 'photo_guide_title')}:</span>
                      <p className="text-slate-600 font-medium">
                        {getTranslation(selectedLang, 'photo_guide_desc')}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setPhotoError('');
                          triggerFileSelect();
                        }}
                        className="bg-rose-700 hover:bg-rose-800 text-white px-4 py-2 rounded-xl font-black text-xs transition-all cursor-pointer shadow-xs inline-flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>{getTranslation(selectedLang, 'retry_photo_upload_btn')}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Default/Blank state */}
                {!activeResult && !isAnalyzingPhoto && !isAskingQuestion && !photoError && (
                  <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs flex-1 flex flex-col items-center justify-center text-center py-20 gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center text-2xl shadow-inner border border-slate-100">
                      🌾
                    </div>
                    <h4 className="font-extrabold text-base text-slate-900">{getTranslation(selectedLang, 'no_active_disease_report')}</h4>
                    <p className="text-xs text-slate-500 max-w-[260px] leading-relaxed mx-auto font-medium">
                      {getTranslation(selectedLang, 'no_active_report_desc')}
                    </p>
                  </div>
                )}

              </div>
            )}

            </motion.div>
          )}

          {/* TAB 2: FARMING CALCULATORS & TOOLS */}
          {activeTab === 'tools' && (
            <motion.div 
              key="tab-tools-pane"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1"
            >
              
              {/* Left Side: Fertilizers & Irrigation */}
              <div className="md:col-span-6 flex flex-col gap-6">
                
                {/* Fertilizer Calculator Card */}
                <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-4">
                  <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-emerald-600" /> {getTranslation(selectedLang, 'calc_fertilizer_title')}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{getTranslation(selectedLang, 'calc_fertilizer_subtitle')}</p>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">{getTranslation(selectedLang, 'select_crop')}</label>
                      <select 
                        value={calcCrop}
                        onChange={(e) => setCalcCrop(e.target.value)}
                        className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600/20 text-slate-800 font-medium"
                      >
                        {Object.keys(mspRates).map(k => (
                          <option key={k} value={k}>{mspRates[k].name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">{getTranslation(selectedLang, 'land_size_acres')}</label>
                      <input 
                        type="number"
                        min="1"
                        max="100"
                        value={calcAcre}
                        onChange={(e) => setCalcAcre(Number(e.target.value) || 1)}
                        className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600/20 text-slate-800 font-medium"
                      />
                    </div>
                  </div>

                  {/* Calculated outputs */}
                  {fertilizerRecommendations[calcCrop] && (
                    <div className="flex flex-col gap-3">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-emerald-50/60 p-3.5 rounded-xl text-center border border-emerald-200/60 shadow-xs">
                          <span className="text-[10px] font-black text-emerald-900 uppercase block tracking-wider">{getTranslation(selectedLang, 'urea')}</span>
                          <span className="text-lg font-black text-emerald-700 block mt-1 tracking-tight">{Math.round(fertilizerRecommendations[calcCrop].urea * calcAcre)} {getTranslation(selectedLang, 'unit_kg')}</span>
                          <span className="text-[9px] text-slate-500 font-bold block mt-0.5">~ {Math.round((fertilizerRecommendations[calcCrop].urea * calcAcre) / 45)} {getTranslation(selectedLang, 'bags_approx')} (45kg)</span>
                        </div>
                        <div className="bg-sky-50/60 p-3.5 rounded-xl text-center border border-sky-200/60 shadow-xs">
                          <span className="text-[10px] font-black text-sky-900 uppercase block tracking-wider">{getTranslation(selectedLang, 'dap')}</span>
                          <span className="text-lg font-black text-sky-700 block mt-1 tracking-tight">{Math.round(fertilizerRecommendations[calcCrop].dap * calcAcre)} {getTranslation(selectedLang, 'unit_kg')}</span>
                          <span className="text-[9px] text-slate-500 font-bold block mt-0.5">~ {Math.round((fertilizerRecommendations[calcCrop].dap * calcAcre) / 50)} {getTranslation(selectedLang, 'bags_approx')} (50kg)</span>
                        </div>
                        <div className="bg-amber-50/60 p-3.5 rounded-xl text-center border border-amber-200/60 shadow-xs">
                          <span className="text-[10px] font-black text-amber-900 uppercase block tracking-wider">{getTranslation(selectedLang, 'mop')}</span>
                          <span className="text-lg font-black text-amber-700 block mt-1 tracking-tight">{Math.round(fertilizerRecommendations[calcCrop].mop * calcAcre)} {getTranslation(selectedLang, 'unit_kg')}</span>
                          <span className="text-[9px] text-slate-500 font-bold block mt-0.5">~ {Math.round((fertilizerRecommendations[calcCrop].mop * calcAcre) / 50)} {getTranslation(selectedLang, 'bags_approx')} (50kg)</span>
                        </div>
                      </div>

                      {/* Scientific advice box */}
                      <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/60 text-xs text-slate-700 leading-relaxed font-medium">
                        <div className="flex items-center gap-1.5 text-emerald-800 font-black mb-1">
                          <Sparkles className="w-4 h-4 text-emerald-600" />
                          <span>{getTranslation(selectedLang, 'fertilizer_usage_guide')}</span>
                        </div>
                        <p>{getLocalizedFertilizerAdvice(calcCrop, selectedLang)}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Irrigation Advisor Card */}
                <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-4">
                  <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-emerald-600" /> {getTranslation(selectedLang, 'irrigation_advisor_title')}
                  </h3>
                  
                  <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/60 text-xs">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2">{getTranslation(selectedLang, 'soil_type_label')} {soilProfiles[profile.soilType]?.pH ? `${profile.soilType.toUpperCase()} (pH: ${soilProfiles[profile.soilType].pH})` : profile.soilType}</span>
                    <div className="flex flex-col gap-2 leading-relaxed text-slate-700 font-normal">
                      <p className="font-extrabold text-slate-900">{getTranslation(selectedLang, 'irrigation_schedule_prompt')}</p>
                      {profile.crop === 'wheat' && (
                        <p>{getTranslation(selectedLang, 'wheat_irrigation_tip')}</p>
                      )}
                      {profile.crop === 'paddy' && (
                        <p>{getTranslation(selectedLang, 'paddy_irrigation_tip')}</p>
                      )}
                      {profile.crop === 'cotton' && (
                        <p>{getTranslation(selectedLang, 'cotton_irrigation_tip')}</p>
                      )}
                      {profile.crop === 'maize' && (
                        <p>{getTranslation(selectedLang, 'maize_irrigation_tip')}</p>
                      )}
                      <p className="mt-1 text-[11px] text-amber-800 font-bold bg-amber-50/80 p-3 rounded-xl border border-amber-200/60">
                        {getTranslation(selectedLang, 'rain_possibility_notice')} {(weatherAdvisory?.isSpraySafe ?? true) ? getTranslation(selectedLang, 'rain_low_notice') : getTranslation(selectedLang, 'rain_high_notice')}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Side: Crop Calendar & Soil Health Card */}
              <div className="md:col-span-6 flex flex-col gap-6">
                
                {/* Crop Calendar Timeline */}
                <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-emerald-600" /> {getTranslation(selectedLang, 'crop_calendar_title')}
                    </h3>
                    <span className="text-[10px] font-black bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full capitalize border border-emerald-200">
                      {profile.crop} {getTranslation(selectedLang, 'crop_calendar_suffix')}
                    </span>
                  </div>

                  {getLocalizedCropCalendar(profile.crop, selectedLang) ? (
                    <div className="flex flex-col gap-4 mt-2">
                      {getLocalizedCropCalendar(profile.crop, selectedLang).map((stage, idx) => (
                        <div key={idx} className="flex gap-3.5 relative">
                          {idx !== getLocalizedCropCalendar(profile.crop, selectedLang).length - 1 && (
                            <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-slate-200/70"></div>
                          )}
                          
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-black border ${
                            idx === 1 
                              ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs' 
                              : 'bg-slate-50 text-slate-500 border-slate-200/80'
                          }`}>
                            {idx + 1}
                          </div>

                          <div className="flex-1 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/60 text-xs">
                            <div className="flex justify-between items-baseline gap-1">
                              <h4 className="font-extrabold text-slate-900">{stage.stage}</h4>
                              <span className="text-[10px] text-slate-400 font-bold">{stage.days}</span>
                            </div>
                            <p className="text-slate-600 mt-1 leading-relaxed"><strong className="text-slate-800">{getTranslation(selectedLang, 'activity_label')}</strong> {stage.activity}</p>
                            <p className="text-[11px] text-emerald-800 font-semibold mt-1 leading-relaxed"><strong className="text-slate-700">{getTranslation(selectedLang, 'water_label')}</strong> {stage.water}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 font-medium">{getTranslation(selectedLang, 'calendar_load_prompt')}</p>
                  )}
                </div>

                {/* Soil Health Card analysis */}
                <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-4">
                  <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-600" /> {getTranslation(selectedLang, 'soil_health_analyzer_title')}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{getTranslation(selectedLang, 'soil_health_desc')}</p>

                  <div className="grid grid-cols-4 gap-2.5">
                    <div>
                      <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">N:</label>
                      <input 
                        type="number" 
                        value={soilCard.nitrogen}
                        onChange={(e) => setSoilCard({ ...soilCard, nitrogen: Number(e.target.value) || 0 })}
                        className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center text-xs focus:ring-2 focus:ring-emerald-600/20 text-slate-900 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">P:</label>
                      <input 
                        type="number" 
                        value={soilCard.phosphorus}
                        onChange={(e) => setSoilCard({ ...soilCard, phosphorus: Number(e.target.value) || 0 })}
                        className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center text-xs focus:ring-2 focus:ring-emerald-600/20 text-slate-900 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">K:</label>
                      <input 
                        type="number" 
                        value={soilCard.potassium}
                        onChange={(e) => setSoilCard({ ...soilCard, potassium: Number(e.target.value) || 0 })}
                        className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center text-xs focus:ring-2 focus:ring-emerald-600/20 text-slate-900 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">{getTranslation(selectedLang, 'soil_ph_label')}</label>
                      <input 
                        type="number" 
                        step="0.1"
                        value={soilCard.pH}
                        onChange={(e) => setSoilCard({ ...soilCard, pH: Number(e.target.value) || 7.0 })}
                        className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center text-xs focus:ring-2 focus:ring-emerald-600/20 text-slate-900 font-semibold"
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowSoilResults(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white py-3 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-xs text-center min-h-[44px]"
                  >
                    {getTranslation(selectedLang, 'analyze_soil_btn')}
                  </button>

                  {showSoilResults && (
                    <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200/70 text-xs flex flex-col gap-2.5 shadow-xs">
                      <div className="flex items-center gap-1.5 text-emerald-900 font-extrabold">
                        <CheckCircle className="w-4.5 h-4.5 text-emerald-600" />
                        <span>{getTranslation(selectedLang, 'soil_scientific_advice')}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed font-normal">
                        • <strong className="font-bold text-slate-900">pH: {soilCard.pH} ({soilCard.pH < 6.5 ? getTranslation(selectedLang, 'soil_acidic') : soilCard.pH > 7.5 ? getTranslation(selectedLang, 'soil_alkaline') : getTranslation(selectedLang, 'soil_optimal')})</strong> {soilCard.pH < 6.5 ? getTranslation(selectedLang, 'soil_acidic_rec') : soilCard.pH > 7.5 ? getTranslation(selectedLang, 'soil_alkaline_rec') : getTranslation(selectedLang, 'soil_optimal_rec') }
                      </p>
                    </div>
                  )}
                </div>

              </div>

            </motion.div>
          )}

          {/* TAB: MSP RATES & MANDI PANEL */}
          {activeTab === 'msp' && (
            <motion.div 
              key="tab-msp-pane"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col gap-6 max-w-4xl mx-auto w-full"
            >
              {/* 1. Live Mandi vs MSP Benchmark Comparison Card */}
              {renderMandiMspCard()}

              {/* 2. MSP Production & Guaranteed Revenue Calculator Tool */}
              <div id="card-msp-calculator" className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-emerald-600" /> 
                      {getTranslation(selectedLang, 'msp_estimator_title')}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {getTranslation(selectedLang, 'msp_estimator_desc')}
                    </p>
                  </div>
                  <span className="text-[10px] font-black bg-amber-100/80 text-amber-900 px-3 py-1 rounded-full border border-amber-300 uppercase tracking-wider">
                    🏛️ CACP 2026-27 Benchmarks
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-50/80 p-4 rounded-xl border border-slate-200/60">
                  {/* Select Crop */}
                  <div className="md:col-span-4 flex flex-col gap-1.5">
                    <label className="text-xs font-black text-slate-700">
                      {getTranslation(selectedLang, 'select_crop_label')}
                    </label>
                    <select
                      value={mspCalcCrop}
                      onChange={(e) => {
                        setMspCalcCrop(e.target.value);
                        setSelectedMandiCrop(e.target.value);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-extrabold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-2xs"
                    >
                      {Object.keys(mspRates).map(cropKey => (
                        <option key={cropKey} value={cropKey}>
                          {mspRates[cropKey].name} (₹{mspRates[cropKey].price.toLocaleString('en-IN')}/Qtl)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Input Expected Yield */}
                  <div className="md:col-span-4 flex flex-col gap-1.5">
                    <label className="text-xs font-black text-slate-700">
                      {getTranslation(selectedLang, 'expected_yield_label')}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="10000"
                        value={mspCalcQuintals}
                        onChange={(e) => setMspCalcQuintals(Math.max(1, Number(e.target.value) || 1))}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-extrabold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                      />
                      <span className="text-xs font-bold text-slate-600 shrink-0">{getTranslation(selectedLang, 'quintal') || 'क्विंटल'}</span>
                    </div>
                  </div>

                  {/* Calculated Value Result */}
                  <div className="md:col-span-4 bg-gradient-to-br from-emerald-800 to-emerald-900 text-white p-4 rounded-xl flex flex-col justify-center shadow-xs">
                    <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider">
                      {getTranslation(selectedLang, 'min_guaranteed_val_label')}
                    </span>
                    <div className="text-2xl font-black mt-1 text-white tracking-tight">
                      ₹{((mspRates[mspCalcCrop]?.price || 2275) * mspCalcQuintals).toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-emerald-300 mt-0.5 font-medium">
                      @ ₹{(mspRates[mspCalcCrop]?.price || 2275).toLocaleString('en-IN')} / {getTranslation(selectedLang, 'quintal') || 'क्विंटल'} ({mspCalcQuintals} {getTranslation(selectedLang, 'quintal') || 'क्विंटल'})
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Master All-India CACP MSP Reference Table */}
              <div id="table-msp-master" className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                      <Wheat className="w-5 h-5 text-emerald-600" />
                      {getTranslation(selectedLang, 'official_msp_rates_title')}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {getTranslation(selectedLang, 'official_msp_rates_desc')}
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200/70">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50/90 text-slate-700 font-extrabold border-b border-slate-200/70">
                        <th className="p-3.5 pl-4 font-black">क्र. सं.</th>
                        <th className="p-3.5 font-black">फसल का नाम (Crop Name)</th>
                        <th className="p-3.5 font-black">फसल का प्रकार (Season)</th>
                        <th className="p-3.5 font-black">MSP दर (₹ / क्विंटल)</th>
                        <th className="p-3.5 pr-4 text-right font-black">कार्रवाई</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {Object.keys(mspRates).map((cropKey, index) => {
                        const crop = mspRates[cropKey];
                        const isSelected = selectedMandiCrop === cropKey;
                        const season = ['wheat', 'mustard', 'gram'].includes(cropKey) ? 'रबी (Rabi)' : ['paddy', 'cotton', 'maize', 'soybean', 'bajra'].includes(cropKey) ? 'खरीफ (Kharif)' : 'वार्षिक / नकदी';
                        
                        return (
                          <tr 
                            key={cropKey} 
                            className={`transition-colors ${isSelected ? 'bg-emerald-50/80 font-semibold' : 'hover:bg-slate-50/60'}`}
                          >
                            <td className="p-3.5 pl-4 text-slate-400 font-bold">{index + 1}</td>
                            <td className="p-3.5 font-black text-slate-900 flex items-center gap-2">
                              <span>🌾 {crop.name}</span>
                              {isSelected && (
                                <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-black border border-emerald-300">
                                  सक्रिय
                                </span>
                              )}
                            </td>
                            <td className="p-3.5 text-slate-600">{season}</td>
                            <td className="p-3.5 font-black text-emerald-800 text-sm">₹{crop.price.toLocaleString('en-IN')} <span className="text-[10px] text-slate-400 font-normal">/ Qtl</span></td>
                            <td className="p-3.5 pr-4 text-right">
                              <button
                                onClick={() => {
                                  setSelectedMandiCrop(cropKey);
                                  setMspCalcCrop(cropKey);
                                }}
                                className={`px-3 py-1.5 rounded-xl text-[10px] font-black cursor-pointer transition-all ${
                                  isSelected 
                                    ? 'bg-emerald-700 text-white shadow-2xs ring-2 ring-emerald-600/30' 
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                }`}
                              >
                                {isSelected ? '✓ चयनित' : 'मंडी भाव देखें'}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 3: GOVERNMENT SCHEMES */}
          {activeTab === 'schemes' && (
            <motion.div 
              key="tab-schemes-pane"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col gap-6 max-w-3xl mx-auto w-full"
            >
              
              {/* Introduction header */}
              <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2">
                    <Award className="w-6 h-6 text-emerald-600" /> {getTranslation(selectedLang, 'govt_schemes_title')}
                  </h2>
                  <span className="text-xs font-black bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full capitalize border border-emerald-200">
                    {profile.state} {getTranslation(selectedLang, 'state_special')}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
                  {getTranslation(selectedLang, 'govt_schemes_intro')}
                </p>
              </div>

              {/* Dynamic list of central and state schemes */}
              <div className="flex flex-col gap-4">
                {getLocalizedGovernmentSchemes(selectedLang)
                  .filter(scheme => scheme.category === 'central' || scheme.state === profile.state)
                  .map((scheme) => (
                    <div key={scheme.id} className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-4">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                            scheme.category === 'central' ? 'bg-amber-100/80 text-amber-900 border-amber-200' : 'bg-emerald-100/80 text-emerald-900 border-emerald-200'
                          }`}>
                            {scheme.authority}
                          </span>
                          <h3 className="font-extrabold text-base md:text-lg text-slate-900 mt-2">{scheme.name}</h3>
                        </div>
                      </div>

                      {/* Benefits & Eligibility block */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/60">
                          <span className="text-slate-400 font-bold block">{getTranslation(selectedLang, 'benefits_label')}</span>
                          <p className="text-slate-800 font-semibold leading-relaxed mt-1">{scheme.benefits}</p>
                        </div>
                        <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/60">
                          <span className="text-slate-400 font-bold block">{getTranslation(selectedLang, 'eligibility_label')}</span>
                          <p className="text-slate-800 font-semibold leading-relaxed mt-1">{scheme.eligibility}</p>
                        </div>
                      </div>

                      {/* How to apply step checklist */}
                      <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200/50">
                        <span className="text-xs font-black text-slate-900 block mb-2.5">{getTranslation(selectedLang, 'how_to_apply_label')}</span>
                        <div className="flex flex-col gap-2">
                          {scheme.howToApply.map((step, sIdx) => (
                            <div key={sIdx} className="flex gap-2.5 text-xs leading-relaxed text-slate-700 font-medium">
                              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">{sIdx + 1}</span>
                              <p className="mt-0.5">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  ))}
              </div>

            </motion.div>
          )}

          {/* TAB 4: HISTORIC LOGS & REPORTS */}
          {activeTab === 'history' && (
            <motion.div 
              key="tab-history-pane"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col gap-5 max-w-5xl mx-auto w-full"
            >
              
              {/* 1. Header & Management Panel */}
              <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200/80 shrink-0 shadow-2xs">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">
                          {getTranslation(selectedLang, 'past_reports_title')}
                        </h2>
                        <span className="bg-slate-100 text-slate-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-slate-200">
                          {historyList.length} {getTranslation(selectedLang, 'records_count_suffix')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {getTranslation(selectedLang, 'history_archived_sub')}
                      </p>
                    </div>
                  </div>

                  {/* Management buttons */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button 
                      onClick={() => setHistoryList(defaultPastReports)}
                      className="inline-flex items-center gap-1.5 text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-3 py-2 rounded-xl font-bold cursor-pointer transition-all active:scale-95 shadow-2xs"
                      title={getTranslation(selectedLang, 'reset_default_list')}
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                      <span>{getTranslation(selectedLang, 'reset_default_list')}</span>
                    </button>
                    {historyList.length > 0 && (
                      <button 
                        onClick={() => {
                          if (confirm(getTranslation(selectedLang, 'confirm_clear_history'))) {
                            setHistoryList([]);
                            setSelectedPastReport(null);
                            localStorage.removeItem('agrenova_history');
                            localStorage.removeItem('kisaansetu_history');
                          }
                        }}
                        className="inline-flex items-center gap-1.5 text-xs bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 px-3 py-2 rounded-xl font-bold cursor-pointer transition-all active:scale-95 shadow-2xs"
                        title={getTranslation(selectedLang, 'clear_all_history')}
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                        <span>{getTranslation(selectedLang, 'clear_all_history')}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Search & Filter Bar */}
                <div className="flex flex-col md:flex-row gap-3 pt-2 border-t border-slate-100">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder={getTranslation(selectedLang, 'search_history_placeholder')}
                      value={historySearch}
                      onChange={(e) => setHistorySearch(e.target.value)}
                      className="w-full bg-slate-50 pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600/20 text-slate-800 font-semibold placeholder:text-slate-400"
                    />
                    {historySearch && (
                      <button
                        onClick={() => setHistorySearch('')}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200/60"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200/90 overflow-x-auto shrink-0">
                    {[
                      { 
                        id: 'all', 
                        label: getTranslation(selectedLang, 'filter_all'),
                        count: historyList.length
                      },
                      { 
                        id: 'disease', 
                        label: getTranslation(selectedLang, 'filter_disease'),
                        count: historyList.filter(i => i.type === 'disease').length
                      },
                      { 
                        id: 'question', 
                        label: getTranslation(selectedLang, 'filter_question'),
                        count: historyList.filter(i => i.type === 'question').length
                      }
                    ].map(pill => {
                      const isActive = historyFilter === pill.id;
                      return (
                        <button
                          key={pill.id}
                          onClick={() => setHistoryFilter(pill.id as any)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                            isActive 
                              ? 'bg-slate-900 text-white shadow-xs' 
                              : 'text-slate-600 hover:bg-slate-200/70'
                          }`}
                        >
                          <span>{pill.label}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                            isActive ? 'bg-slate-700 text-slate-100' : 'bg-slate-200/80 text-slate-600'
                          }`}>
                            {pill.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 3. Main Split-Dashboard: Left List + Right Detail View */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                
                {/* LEFT: Reports List Column */}
                <div className="lg:col-span-5 flex flex-col gap-3 max-h-[640px] overflow-y-auto pr-1">
                  {filteredHistory.length > 0 ? (
                    filteredHistory.map((item) => {
                      const isSelected = selectedPastReport?.id === item.id;
                      return (
                        <div 
                          key={item.id}
                          onClick={() => setSelectedPastReport(item)}
                          className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer text-left relative flex flex-col gap-2.5 ${
                            isSelected 
                              ? 'bg-emerald-50/60 border-emerald-500 shadow-xs ring-2 ring-emerald-500/20' 
                              : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
                          }`}
                        >
                          {/* Top Row: Type Pill + Date + Delete Button */}
                          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                            <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                              item.type === 'disease' 
                                ? 'bg-rose-50 text-rose-800 border-rose-200' 
                                : 'bg-sky-50 text-sky-800 border-sky-200'
                            }`}>
                              <span>{item.type === 'disease' ? '🌾' : '💬'}</span>
                              <span>{item.type === 'disease' ? getTranslation(selectedLang, 'disease_reports') : getTranslation(selectedLang, 'question_reports')}</span>
                            </span>

                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-slate-400" />
                                {item.date}
                              </span>
                              <button 
                                onClick={(e) => handleDeleteHistoryItem(item.id, e)}
                                className="text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors p-1 rounded-md cursor-pointer"
                                title={getTranslation(selectedLang, 'delete')}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Mid Row: Thumbnail + Content */}
                          <div className="flex gap-3">
                            {/* Thumbnail preview */}
                            {item.imageUrl ? (
                              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200/90 bg-slate-100 relative group">
                                <img src={item.imageUrl} alt="Scan preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs">
                                  <Eye className="w-3.5 h-3.5" />
                                </div>
                              </div>
                            ) : (
                              <div className="w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200/80 text-xl shadow-inner">
                                {item.type === 'disease' ? '🌾' : '💬'}
                              </div>
                            )}

                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                              <div>
                                <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm line-clamp-1 leading-snug">
                                  {item.title}
                                </h3>
                                {item.subTitle && (
                                  <span className="inline-block text-[10px] font-bold text-emerald-800 bg-emerald-50/80 px-1.5 py-0.2 rounded border border-emerald-200/60 mt-0.5 max-w-full truncate">
                                    🌱 {item.subTitle}
                                  </span>
                                )}
                                <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed font-medium">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Bottom Row: Metadata Badges */}
                          <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100/80 text-[10px]">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {item.severity && (
                                <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.2 rounded-md font-extrabold">
                                  ⚠️ {item.severity}
                                </span>
                              )}
                              {item.confidence && (
                                <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.2 rounded-md font-bold">
                                  🎯 {item.confidence}
                                </span>
                              )}
                            </div>
                            <span className="text-emerald-700 font-bold hover:underline flex items-center gap-0.5 shrink-0">
                              {isSelected ? getTranslation(selectedLang, 'history_view_details_open') : getTranslation(selectedLang, 'history_view_details_arrow')}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : historyList.length === 0 ? (
                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/90 text-center py-12 flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200/70 shadow-2xs">
                        <FileText className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900">
                          {getTranslation(selectedLang, 'no_history_records')}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium max-w-xs mt-1">
                          {getTranslation(selectedLang, 'history_empty_instruction')}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                        <button
                          onClick={() => {
                            setActiveTab('diagnosis');
                            setTimeout(() => {
                              cameraInputRef.current?.click();
                            }, 200);
                          }}
                          className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl transition-all cursor-pointer active:scale-95 shadow-2xs flex items-center gap-1.5"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>{getTranslation(selectedLang, 'scan_plant_btn')}</span>
                        </button>
                        <button
                          onClick={() => setHistoryList(defaultPastReports)}
                          className="text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                          <span>{getTranslation(selectedLang, 'reset_default_list')}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/90 text-center py-12 flex flex-col items-center gap-2">
                      <Search className="w-8 h-8 text-slate-300 mb-1" />
                      <p className="text-xs text-slate-600 font-bold">
                        {getTranslation(selectedLang, 'no_matching_reports_title')}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {getTranslation(selectedLang, 'no_matching_reports_desc')}
                      </p>
                      <button
                        onClick={() => {
                          setHistorySearch('');
                          setHistoryFilter('all');
                        }}
                        className="mt-2 text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                      >
                        {getTranslation(selectedLang, 'reset_search_btn')}
                      </button>
                    </div>
                  )}
                </div>

                {/* RIGHT: Selected Report Detail View (Sticky) */}
                <div className="lg:col-span-7 self-start sticky top-4">
                  {selectedPastReport ? (
                    selectedPastReport.type === 'disease' ? (
                      <CropAnalysisResultCard
                        result={selectedPastReport}
                        selectedLang={selectedLang}
                        imageUrl={selectedPastReport.imageUrl}
                        cropName={selectedPastReport.subTitle || undefined}
                        onPrint={handlePrintReport}
                        getWhatsAppLink={getWhatsAppLink}
                        translatedAdvice={translatedMessages[`history-${selectedPastReport.id}`]}
                        isTranslatingAdvice={isTranslatingKey === `history-${selectedPastReport.id}`}
                        onTranslateAdvice={() => handleTranslateResponse(`history-${selectedPastReport.id}`, selectedPastReport.advice)}
                        idPrefix={`history-${selectedPastReport.id}`}
                      />
                    ) : (
                      <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col gap-4">
                        {/* Header Banner */}
                        <div className="flex flex-col gap-2 border-b border-slate-100 pb-3">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="bg-sky-50 text-sky-900 border border-sky-200 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wide flex items-center gap-1.5 shadow-2xs">
                              <Sparkles className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                              <span>{getTranslation(selectedLang, 'question_reports')}</span>
                            </span>
                            <span className="text-[11px] text-slate-500 font-bold flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              {selectedPastReport.date}
                            </span>
                          </div>

                          <div className="flex justify-between items-start gap-3 mt-1">
                            <div>
                              <h3 className="font-black text-slate-900 text-base md:text-lg tracking-tight">
                                {selectedPastReport.title}
                              </h3>
                              {selectedPastReport.subTitle && (
                                <p className="text-xs text-emerald-800 font-bold mt-0.5">
                                  🌱 {selectedPastReport.subTitle}
                                </p>
                              )}
                            </div>
                            {selectedPastReport.severity && (
                              <span className="bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded-full text-[10px] font-black shrink-0">
                                ⚠️ {selectedPastReport.severity}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Image Preview Banner if available */}
                        {selectedPastReport.imageUrl && (
                          <div className="w-full h-44 rounded-xl overflow-hidden border border-slate-200/90 bg-slate-50 shadow-inner">
                            <img src={selectedPastReport.imageUrl} alt="Report image" className="w-full h-full object-cover" />
                          </div>
                        )}

                        {/* Symptoms & Farmer Query */}
                        <div className="text-xs text-slate-700 leading-relaxed">
                          <strong className="text-slate-900 block mb-1.5 uppercase tracking-wider font-black text-[11px] flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-slate-500" />
                            <span>{getTranslation(selectedLang, 'symptoms_and_analysis')}</span>
                          </strong>
                          <p className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 font-medium text-slate-800 leading-relaxed">
                            {selectedPastReport.description}
                          </p>
                        </div>

                        {/* Main Scientific Advice with rich FormattedMessage */}
                        <div className="bg-emerald-50/50 border border-emerald-200/80 p-4 rounded-xl text-xs font-semibold leading-relaxed text-slate-800 shadow-2xs">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 pb-2 border-b border-emerald-200/70">
                            <strong className="text-emerald-950 font-black flex items-center gap-1.5 text-xs sm:text-sm">
                              <Sparkles className="w-4 h-4 text-emerald-700" />
                              <span>{getTranslation(selectedLang, 'main_scientific_advice')}</span>
                            </strong>
                            <div className="flex items-center gap-2">
                              <VoiceResponsePlayer 
                                text={translatedMessages[`history-${selectedPastReport.id}`] || selectedPastReport.advice} 
                                langCode={selectedLang} 
                              />
                              <button
                                type="button"
                                onClick={() => handleTranslateResponse(`history-${selectedPastReport.id}`, selectedPastReport.advice)}
                                className="inline-flex items-center gap-1 text-[11px] font-bold bg-white hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 px-2.5 py-1 rounded-xl transition-all cursor-pointer border border-emerald-300/80 shadow-2xs"
                              >
                                <Globe className="w-3 h-3 text-emerald-700 shrink-0" />
                                <span>
                                  {isTranslatingKey === `history-${selectedPastReport.id}` 
                                    ? '...' 
                                    : translatedMessages[`history-${selectedPastReport.id}`] 
                                      ? 'मूल भाषा' 
                                      : getTranslation(selectedLang, 'translate_response')}
                                </span>
                              </button>
                            </div>
                          </div>

                          <FormattedMessage 
                            text={translatedMessages[`history-${selectedPastReport.id}`] || selectedPastReport.advice}
                            onActionClick={handleActionShortcut}
                          />
                        </div>

                        {/* Disclaimer Notice */}
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 flex flex-col gap-1 text-[10px] text-slate-500 leading-relaxed">
                          <p className="italic">{getTranslation(selectedLang, 'disclaimer_notice')}</p>
                          <p className="font-semibold text-slate-400">{getTranslation(selectedLang, 'source_reference')}</p>
                        </div>

                        {/* Action Buttons: Print & WhatsApp */}
                        <div className="grid grid-cols-2 gap-2.5 mt-1">
                          <button 
                            onClick={handlePrintReport}
                            className="bg-slate-900 hover:bg-slate-800 text-white py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 font-bold text-xs transition-all cursor-pointer shadow-xs min-h-[44px] active:scale-95"
                          >
                            <Printer className="w-4 h-4" />
                            <span>{getTranslation(selectedLang, 'print_download')}</span>
                          </button>
                          <a 
                            href={getWhatsAppLink(selectedPastReport)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25d366] hover:bg-[#20ba5a] text-white py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 font-bold text-xs text-center cursor-pointer shadow-xs min-h-[44px] active:scale-95"
                          >
                            <Share2 className="w-4 h-4" />
                            <span>{getTranslation(selectedLang, 'share_whatsapp')}</span>
                          </a>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="bg-white p-8 md:p-10 rounded-2xl border border-slate-200/90 shadow-xs text-center py-16 flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center border border-slate-200">
                        <FileText className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-800">
                          {getTranslation(selectedLang, 'select_report_prompt')}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium max-w-xs mt-1">
                          {getTranslation(selectedLang, 'history_select_left_desc')}
                        </p>
                      </div>
                      {filteredHistory.length > 0 && (
                        <button
                          onClick={() => setSelectedPastReport(filteredHistory[0])}
                          className="mt-1 text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer"
                        >
                          {getTranslation(selectedLang, 'open_first_report_btn')}
                        </button>
                      )}
                    </div>
                  )}
                </div>

              </div>

            </motion.div>
          )}

          {/* TAB 5: FARMER PROFILE */}
          {activeTab === 'profile' && (
            <motion.div 
              key="tab-profile-pane"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col gap-6 max-w-xl mx-auto w-full"
            >
              
              {/* Profile welcome header card */}
              <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-3">
                <h2 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2">
                  <UserCheck className="w-6 h-6 text-emerald-600" /> {getTranslation(selectedLang, 'my_profile_title')}
                </h2>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
                  {getTranslation(selectedLang, 'profile_intro')}
                </p>
              </div>

              {/* Profile Editor Card */}
              <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-4">
                <FarmerProfileForm 
                  initialProfile={profile}
                  selectedLang={selectedLang}
                  onSave={handleSaveProfile}
                  submitLabel={getTranslation(selectedLang, 'save_profile_apply')}
                />
              </div>

            </motion.div>
          )}

          {/* TAB 6: HELP & FAQS */}
          {activeTab === 'help' && (
            <motion.div 
              key="tab-help-pane"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col gap-6 max-w-2xl mx-auto w-full"
            >
              
              {/* Help container card */}
              <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-4">
                <h2 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-emerald-600" /> {getTranslation(selectedLang, 'help_faq_title')}
                </h2>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-1 font-normal">
                  {getTranslation(selectedLang, 'help_faq_intro')}
                </p>

                <div className="flex flex-col gap-4 divide-y divide-slate-200/70">
                  <div className="pt-4 first:pt-0 text-xs md:text-sm text-slate-700">
                    <h3 className="font-extrabold text-slate-900 text-sm flex items-start gap-1.5">
                      {getTranslation(selectedLang, 'q1_title')}
                    </h3>
                    <p className="mt-2 leading-relaxed text-slate-600 font-normal">
                      {getTranslation(selectedLang, 'q1_ans')}
                    </p>
                  </div>

                  <div className="pt-4 text-xs md:text-sm text-slate-700">
                    <h3 className="font-extrabold text-slate-900 text-sm flex items-start gap-1.5">
                      {getTranslation(selectedLang, 'q2_title')}
                    </h3>
                    <p className="mt-2 leading-relaxed text-slate-600 font-normal">
                      {getTranslation(selectedLang, 'q2_ans')}
                    </p>
                  </div>

                  <div className="pt-4 text-xs md:text-sm text-slate-700">
                    <h3 className="font-extrabold text-slate-900 text-sm flex items-start gap-1.5">
                      {getTranslation(selectedLang, 'q3_title')}
                    </h3>
                    <p className="mt-2 leading-relaxed text-slate-600 font-normal">
                      {getTranslation(selectedLang, 'q3_ans')}
                    </p>
                  </div>

                  <div className="pt-4 text-xs md:text-sm text-slate-700">
                    <h3 className="font-extrabold text-slate-900 text-sm flex items-start gap-1.5">
                      {getTranslation(selectedLang, 'q4_title')}
                    </h3>
                    <p className="mt-2 leading-relaxed text-slate-600 font-normal">
                      {getTranslation(selectedLang, 'q4_ans')}
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>

        {/* Modal: First Launch / Profile Setup welcome screen */}
        <AnimatePresence>
          {showProfileWelcome && (
            <div 
              className="fixed inset-0 bg-slate-950/75 flex items-center justify-center p-4 z-[999999] backdrop-blur-sm overflow-y-auto"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setShowProfileWelcome(false);
                }
              }}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl p-5 md:p-6 max-w-lg w-full border border-slate-200 shadow-2xl flex flex-col gap-4 text-left relative my-auto max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  type="button"
                  id="btn-close-welcome-modal"
                  onClick={() => setShowProfileWelcome(false)}
                  className="absolute right-4 top-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer shadow-2xs z-10"
                  title={getTranslation(selectedLang, 'close_btn')}
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center flex flex-col items-center pr-6 pl-6">
                  <AgreNovaLogoIcon className="w-14 h-14 mb-1" alt="AgreNova AI Logo" />
                  <h3 className="font-black text-slate-900 text-lg md:text-xl mt-1">{getTranslation(selectedLang, 'welcome_modal_title')}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1 font-medium">{getTranslation(selectedLang, 'welcome_modal_desc')}</p>
                </div>

                {/* 3 Quick Superpower Highlight Pills */}
                <div className="grid grid-cols-3 gap-2 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/80 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-base">🎙️</span>
                    <span className="text-[10px] font-black text-emerald-950 mt-0.5">बोलकर पूछें</span>
                  </div>
                  <div className="flex flex-col items-center border-x border-emerald-200/80">
                    <span className="text-base">📷</span>
                    <span className="text-[10px] font-black text-emerald-950 mt-0.5">रोग पहचान</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-base">🌦️</span>
                    <span className="text-[10px] font-black text-emerald-950 mt-0.5">मौसम व MSP</span>
                  </div>
                </div>

                <FarmerProfileForm 
                  initialProfile={profile}
                  selectedLang={selectedLang}
                  onSave={(updated) => handleSaveProfile(updated)}
                  onCancel={() => setShowProfileWelcome(false)}
                  submitLabel={getTranslation(selectedLang, 'save_start_app')}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal: Farmer Profile Edit Modal */}
        <AnimatePresence>
          {isProfileModalOpen && (
            <div 
              className="fixed inset-0 bg-slate-950/75 flex items-center justify-center p-4 z-[999999] backdrop-blur-sm overflow-y-auto"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsProfileModalOpen(false);
                }
              }}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl p-5 md:p-6 max-w-lg w-full border border-slate-200 shadow-2xl flex flex-col gap-4 text-left relative my-auto max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="absolute right-4 top-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer shadow-2xs z-10"
                  title={getTranslation(selectedLang, 'close_btn')}
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 mb-1 pr-8">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-100 shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-base md:text-lg">{getTranslation(selectedLang, 'my_profile_title')}</h3>
                    <p className="text-[10px] text-slate-500 font-medium">{getTranslation(selectedLang, 'profile_intro')}</p>
                  </div>
                </div>

                <FarmerProfileForm 
                  initialProfile={profile}
                  selectedLang={selectedLang}
                  onSave={(updated) => {
                    handleSaveProfile(updated);
                    setIsProfileModalOpen(false);
                  }}
                  onCancel={() => setIsProfileModalOpen(false)}
                  submitLabel={getTranslation(selectedLang, 'save_profile_apply')}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Floating Action Button (FAB) for Kisan Mitra AI Assistant */}
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[9999] flex items-center justify-center">
          {/* Pulsing Green Ring & Glowing Ambient Animation */}
          <div className="absolute -inset-2.5 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />
          <div className="absolute -inset-1 rounded-full bg-emerald-400/50 blur-sm animate-pulse pointer-events-none" />

          <button
            id="floating_ai_assistant"
            onClick={() => setIsFloatingChatOpen(!isFloatingChatOpen)}
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-emerald-800 via-emerald-700 to-teal-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center border-2 border-white/40 cursor-pointer group"
            title={getTranslation(selectedLang, 'kisaan_chat_assistant') || 'किसान मित्र AI'}
          >
            {isFloatingChatOpen ? (
              <X className="w-7 h-7 text-white" />
            ) : (
              <Bot className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:rotate-6 transition-transform drop-shadow-md" />
            )}
            
            {!isFloatingChatOpen && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
              </span>
            )}
          </button>
        </div>

        {/* Slide-Up Overlay Panel (Kisan Mitra Chat Panel) */}
        <AnimatePresence>
          {isFloatingChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 70, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 70, scale: 0.92 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-3 right-3 sm:right-6 sm:bottom-6 w-[calc(100vw-24px)] md:w-[780px] lg:w-[840px] max-w-full h-[calc(100vh-24px)] sm:h-[80vh] md:h-[680px] max-h-[calc(100vh-24px)] bg-white rounded-2xl shadow-2xl border border-slate-200/90 z-[99999] flex flex-col overflow-hidden isolate"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-3.5 px-4 sm:p-4 sm:px-5 flex items-center justify-between shrink-0 border-b border-emerald-700/50 shadow-xs relative z-20">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-inner shrink-0">
                    <Bot className="w-5 h-5 text-emerald-200" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-1.5">
                      {getTranslation(selectedLang, 'kisaan_chat_assistant')}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-200/90 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>{getTranslation(selectedLang, 'active_consultation')}</span>
                    </div>
                  </div>
                </div>

                <button
                  id="btn-close-floating-chat"
                  onClick={() => setIsFloatingChatOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer active:scale-95 border border-white/15 shrink-0"
                  title="बंद करें (Close)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* TWO-SECTION BODY CONTAINER */}
              <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-200/80 bg-slate-50/50">
                {/* LEFT / MAIN CHAT SECTION */}
                <div className="flex-1 flex flex-col min-h-0 min-w-0 bg-white">
                  {/* FIXED WELCOME MESSAGE AT TOP OF CHAT AREA */}
                  <div className="p-3 shrink-0 bg-gradient-to-b from-emerald-50/90 to-slate-50/80 relative z-20 border-b border-emerald-100/80 shadow-2xs">
                    <div className="bg-emerald-50/95 border border-emerald-200/80 p-2.5 px-3.5 rounded-xl text-xs sm:text-sm text-emerald-950 flex items-center gap-3 shadow-2xs">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-emerald-700" />
                      </div>
                      <span className="leading-relaxed font-semibold text-emerald-900">
                        नमस्ते किसान भाई! फसल, मौसम, कीट या खाद से संबंधित कोई भी सवाल पूछें।
                      </span>
                    </div>
                  </div>

                  {/* DEDICATED SCROLLABLE CONVERSATION AREA */}
                  <div 
                    id="card-text-query" 
                    className="flex-1 flex-grow overflow-y-auto overflow-x-hidden p-3.5 pt-3 flex flex-col gap-3.5 min-h-[220px] md:min-h-0 bg-slate-50/50 scrollbar-thin relative z-10"
                  >
                    {/* Dynamic Chat Dialogues */}
                    {chatMessages.length > 0 && (
                      <div className="flex flex-col gap-3.5 w-full">
                        {chatMessages.map((msg, index) => (
                          <div 
                            key={index} 
                            className={`flex flex-col ${
                              msg.sender === 'user' ? 'self-end items-end max-w-[88%] sm:max-w-[85%]' : 'self-start items-start max-w-[92%] sm:max-w-[90%]'
                            }`}
                          >
                            <div className="flex items-center justify-between w-full mb-1 px-1">
                              <span className="text-[10px] text-slate-400 font-bold">
                                {msg.sender === 'user' ? getTranslation(selectedLang, 'user_you') : 'AgreNova AI'}
                              </span>
                            </div>

                            {/* Text-to-Speech Voice Response & Translate Response Buttons */}
                            {msg.sender === 'bot' && (
                              <div className="mb-1.5 self-start flex items-center gap-2 flex-wrap">
                                <VoiceResponsePlayer text={translatedMessages[`chat-${index}`] || msg.text} langCode={selectedLang} />
                                <button
                                  type="button"
                                  onClick={() => handleTranslateResponse(`chat-${index}`, msg.text)}
                                  className="inline-flex items-center gap-1 text-[11px] font-bold bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 px-2.5 py-1 rounded-xl transition-all cursor-pointer border border-slate-200/80 active:scale-95 shadow-2xs"
                                  title="उत्तर का अनुवाद करें / Translate Response"
                                >
                                  <Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span>
                                    {isTranslatingKey === `chat-${index}` 
                                      ? 'अनुवाद...' 
                                      : translatedMessages[`chat-${index}`] 
                                        ? 'मूल भाषा' 
                                        : getTranslation(selectedLang, 'translate_response')}
                                  </span>
                                </button>
                              </div>
                            )}

                            <div className={`p-3 px-3.5 sm:px-4 rounded-2xl text-xs sm:text-sm shadow-xs leading-relaxed break-words [overflow-wrap:anywhere] ${
                              msg.sender === 'user' 
                                ? 'bg-emerald-700 text-white rounded-tr-xs font-medium shadow-emerald-900/10' 
                                : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs shadow-2xs'
                            }`}>
                              {msg.sender === 'user' ? (
                                translatedMessages[`chat-${index}`] || msg.text
                              ) : (
                                <FormattedMessage 
                                  text={translatedMessages[`chat-${index}`] || msg.text} 
                                  onActionClick={handleActionShortcut}
                                />
                              )}
                            </div>

                            {/* Quick replies chips in chatbot dialogue */}
                            {msg.sender === 'bot' && msg.quickReplies && msg.quickReplies.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {msg.quickReplies.map((reply, ridx) => (
                                  <button
                                    key={ridx}
                                    onClick={() => {
                                      setInputText(reply);
                                      handleAskQuestion(reply);
                                    }}
                                    className="text-[10px] font-bold bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-200/70 px-3 py-1 rounded-full transition-colors text-left cursor-pointer"
                                  >
                                    {reply}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Loading indicator when asking question */}
                    {isAskingQuestion && (
                      <div className="self-start flex items-center gap-2 p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs text-xs text-slate-600 animate-pulse my-1">
                        <Bot className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>उत्तर तैयार किया जा रहा है...</span>
                      </div>
                    )}

                    {/* Scroll Anchor */}
                    <div ref={chatEndRef} />
                  </div>

                  {/* FIXED INPUT CONTROLS AT BOTTOM OF MAIN CHAT SECTION */}
                  <div className="shrink-0 border-t border-slate-200/80 bg-white p-3 flex flex-col gap-2 relative z-20 shadow-xs">
                    {/* Input form */}
                    <div className="flex gap-2 items-center">
                      <button 
                        type="button"
                        id="btn-voice-input-floating"
                        onClick={toggleRecording}
                        className={`p-2.5 rounded-2xl border transition-all flex items-center justify-center shrink-0 cursor-pointer min-h-[42px] min-w-[42px] ${
                          isRecording 
                            ? 'bg-rose-600 text-white border-rose-700 animate-pulse shadow-xs' 
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200/80'
                        }`}
                        title={isRecording ? 'आवाज़ रिकॉर्डिंग रोकें' : 'बोलकर सवाल पूछें (Voice Search)'}
                      >
                        {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </button>
                      <input 
                        id="input-text-problem"
                        type="text"
                        placeholder={getTranslation(selectedLang, 'input_placeholder')}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
                        className="flex-1 px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 bg-slate-50 text-slate-900 min-h-[42px]"
                      />
                      <button 
                        id="btn-submit-problem"
                        onClick={() => handleAskQuestion()}
                        disabled={isAskingQuestion || !inputText.trim()}
                        className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 text-white p-2.5 px-3.5 rounded-2xl transition-all flex items-center justify-center shrink-0 cursor-pointer shadow-xs min-h-[42px]"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Speech Trigger feedback/errors */}
                    {speechError && (
                      <div className="flex items-start gap-2 bg-rose-50 p-2 rounded-xl text-xs text-rose-700 border border-rose-200">
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>{speechError}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT / QUICK INFO SECTION */}
                <div className="w-full md:w-[280px] lg:w-[300px] shrink-0 bg-slate-50/90 p-3.5 flex flex-col gap-3 overflow-y-auto min-h-0">
                  
                  {/* Active Context Card */}
                  <div className="bg-emerald-900/5 border border-emerald-600/20 rounded-2xl p-3 shadow-2xs flex flex-col gap-1.5 text-xs">
                    <div className="flex items-center justify-between text-emerald-950 font-black text-[11px] uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                        <span>सक्रिय कृषि संदर्भ (Active Context)</span>
                      </span>
                    </div>
                    <div className="space-y-1 text-slate-700 font-medium text-[11px] pt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">📍 क्षेत्र:</span>
                        <span className="font-bold text-slate-900">{profile.district || 'जिला'}, {profile.state || 'राज्य'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">🌾 फसल:</span>
                        <span className="font-bold text-slate-900">{profile.crop?.split('(')[0]?.trim() || 'फसल'} ({profile.landSize || '2'} एकड़)</span>
                      </div>
                      {liveWeather && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">🌤️ मौसम:</span>
                          <span className="font-bold text-slate-900">{liveWeather.temp} • {liveWeather.isSpraySafe !== false ? 'छिड़काव सुरक्षित' : 'छिड़काव टालें'}</span>
                        </div>
                      )}
                      {activeResult?.disease && (
                        <div className="flex items-center justify-between border-t border-emerald-600/10 pt-1 text-amber-900">
                          <span className="text-slate-500">🔍 हालिया जांच:</span>
                          <span className="font-bold truncate max-w-[120px]" title={activeResult.disease}>{activeResult.disease}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* FAQ Suggestion Prompts Section */}
                  <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col gap-2">
                    <span className="text-[11px] text-slate-500 font-extrabold uppercase tracking-wider block">
                      {getTranslation(selectedLang, 'frequently_asked_questions')}
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {(() => {
                        const suggestions: string[] = [];
                        if (activeResult?.disease && activeResult.disease !== 'स्वस्थ पौधा (Healthy Crop)') {
                          suggestions.push(`${activeResult.disease} के जैविक उपाय बताएं`);
                        }
                        if (profile.crop) {
                          const cropClean = profile.crop.split('(')[0].trim();
                          suggestions.push(`${cropClean} में खाद एवं पोषण प्रबंधन`);
                          suggestions.push(`${cropClean} में कीट व रोग रोकथाम`);
                        }
                        if (liveWeather) {
                          suggestions.push(`आज के मौसम (${liveWeather.temp}) में छिड़काव सलाह`);
                        }
                        const defaults = [
                          "धान की पत्तियां पीली क्यों हो रही हैं?",
                          "गेहूं के पीला रतुआ का इलाज बताएं",
                          "कपास में गुलाबी सुंडी नियंत्रण"
                        ];
                        for (const d of defaults) {
                          if (suggestions.length < 4 && !suggestions.includes(d)) {
                            suggestions.push(d);
                          }
                        }
                        return suggestions.slice(0, 4).map((prompt, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setInputText(prompt);
                              handleAskQuestion(prompt);
                            }}
                            className="text-[11px] bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 px-3 py-2 rounded-xl border border-slate-200/70 transition-colors text-left font-semibold cursor-pointer active:scale-95"
                          >
                            {prompt}
                          </button>
                        ));
                      })()}
                    </div>
                  </div>

                  {/* Advisory Disclaimer & Source Reference */}
                  <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col gap-1.5 text-slate-600">
                    <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                      {getTranslation(selectedLang, 'disclaimer_notice')}
                    </p>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-semibold border-t border-slate-200/50 pt-1.5 mt-0.5">
                      {getTranslation(selectedLang, 'source_reference')}
                    </p>
                  </div>

                  {/* WhatsApp Share for Chat */}
                  {chatMessages.some(m => m.sender === 'bot') && (
                    <a 
                      id="btn-whatsapp-share-chat"
                      href={getWhatsAppLinkForChat()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25d366] hover:bg-[#20ba5a] text-white p-2.5 rounded-2xl flex items-center justify-center gap-2 font-extrabold text-xs transition-all shadow-xs cursor-pointer text-center w-full mt-auto"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{getTranslation(selectedLang, 'share_whatsapp')}</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer section */}
        <footer className="text-center py-6 border-t border-slate-200/80 mt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-500 font-medium">© {selectedLang === 'hi' ? toHindiDigits(new Date().getFullYear()) : new Date().getFullYear()} AgreNova AI • {getTranslation(selectedLang, 'footer_tagline')}</p>
          <div className="flex gap-4 text-xs font-bold text-slate-500">
            <span className="hover:text-emerald-700 transition-colors cursor-pointer" onClick={() => setActiveTab('help')}>{getTranslation(selectedLang, 'user_guidelines_link')}</span>
            <span>•</span>
            <span className="hover:text-emerald-700 transition-colors cursor-pointer" onClick={() => setIsProfileModalOpen(true)}>{getTranslation(selectedLang, 'change_profile_link')}</span>
          </div>
        </footer>

        {/* Voice Assistant Overlay Modal */}
        <VoiceAssistantModal
          isOpen={isVoiceModalOpen}
          isRecording={isRecording}
          speechError={speechError}
          spokenQueryText={spokenQueryText}
          selectedLang={selectedLang}
          onToggleRecording={toggleRecording}
          onClose={closeVoiceModal}
          onSubmit={submitVoiceModalQuery}
          onClearSpokenText={() => setSpokenQueryText('')}
          onSetSpokenText={(text) => setSpokenQueryText(text)}
          onRetryRecording={handleRetryRecording}
        />

        <AnimatePresence>
          {/* Camera & Vision AI Overlay Modal */}
          {isCameraModalOpen && (
            <motion.div 
              id="camera-assistant-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
              onClick={closeCameraModal}
            >
              <motion.div 
                id="camera-assistant-modal-container"
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 15 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  borderRadius: '16px',
                  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.28)'
                }}
                className="bg-white w-full max-w-xl overflow-hidden border border-slate-200/90 flex flex-col my-auto max-h-[90vh]"
              >
                {/* 1. Header Bar */}
                <div className="bg-[#064e3b] bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#065f46] text-white px-5 py-4 flex items-center justify-between shadow-xs shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/25 shadow-inner shrink-0">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                        📷 फ़सल की फ़ोटो जांचें
                      </h3>
                      <p className="text-xs text-emerald-100/90 font-medium mt-0.5">
                        हमारे विज़न टूल से रोग, कीट और सटीक इलाज की पहचान
                      </p>
                    </div>
                  </div>
                  <button 
                    id="btn-close-camera-modal"
                    type="button"
                    onClick={closeCameraModal}
                    aria-label="Close Camera Modal"
                    className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-5 sm:p-6 flex flex-col gap-4 bg-slate-50/60 overflow-y-auto">
                  
                  {/* Step Hint Chip */}
                  <div className="bg-emerald-100/80 border border-emerald-300/80 rounded-xl px-3 py-1.5 text-[11px] sm:text-xs font-bold text-emerald-950 text-center flex items-center justify-center gap-1.5 shadow-2xs">
                    <span>💡</span>
                    <span>{getTranslation(selectedLang, 'camera_step_hint')}</span>
                  </div>

                  {/* Hidden inputs for camera & gallery */}
                  <input 
                    type="file" 
                    ref={cameraInputRef} 
                    capture="environment" 
                    accept="image/*" 
                    onChange={(e) => {
                      closeCameraModal();
                      handlePhotoUpload(e);
                    }} 
                    className="hidden" 
                  />
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    accept="image/*" 
                    onChange={(e) => {
                      closeCameraModal();
                      handlePhotoUpload(e);
                    }} 
                    className="hidden" 
                  />

                  {/* 2. Dotted Border Drop Zone */}
                  <div 
                    onClick={triggerFileSelect}
                    className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100/80 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-2.5 group-hover:scale-105 transition-transform shadow-xs">
                      <ImageIcon className="w-7 h-7" />
                    </div>
                    <span className="text-sm sm:text-base font-black text-slate-800">
                      फ़सल या पत्ते की साफ़ फ़ोटो जोड़ें
                    </span>
                    <span className="text-xs text-slate-500 font-medium mt-1">
                      (ड्रैग और ड्रॉप करें या नीचे दिए बटन से चुनें)
                    </span>
                  </div>

                  {/* 3. Action Buttons Side-by-Side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      id="btn-modal-capture-camera"
                      type="button"
                      onClick={triggerCameraCapture}
                      className="bg-[#047857] hover:bg-[#065f46] text-white font-black py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
                    >
                      <Camera className="w-4.5 h-4.5" />
                      <span>📷 कैमरा से फ़ोटो खींचें</span>
                    </button>

                    <button
                      id="btn-modal-pick-gallery"
                      type="button"
                      onClick={triggerFileSelect}
                      className="bg-white hover:bg-slate-100 text-slate-800 border-2 border-slate-300 hover:border-emerald-500 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition-all active:scale-95 cursor-pointer"
                    >
                      <Upload className="w-4.5 h-4.5 text-emerald-700" />
                      <span>📤 गैलरी से चुनें</span>
                    </button>
                  </div>

                  {photoError && (
                    <div className="flex items-start gap-2 bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-200 text-xs">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{photoError}</span>
                    </div>
                  )}

                  {/* 4. Dynamic Sample Test Grid */}
                  <div className="flex flex-col gap-2.5 pt-2 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>✨ या तुरंत टेस्ट करने के लिए नमूना फ़ोटो चुनें:</span>
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        क्लिक पर तुरंत निदान
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {SAMPLE_TEST_PHOTOS.map((photo) => (
                        <div
                          key={photo.id}
                          onClick={() => handleSamplePhotoSelect(photo.cropKey)}
                          className="bg-white hover:bg-emerald-50/70 border border-slate-200/90 hover:border-emerald-400 p-2.5 rounded-xl transition-all cursor-pointer shadow-2xs hover:shadow-xs group flex items-center gap-3 active:scale-95"
                        >
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${photo.gradient} flex items-center justify-center text-white text-base font-bold shrink-0 shadow-inner group-hover:scale-105 transition-transform`}>
                            {photo.cropKey === 'wheat' ? '🌾' : photo.cropKey === 'tomato' ? '🍅' : photo.cropKey === 'cotton' ? '🌱' : photo.cropKey === 'rice' ? '🌾' : '🌽'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-black text-slate-900 block truncate group-hover:text-emerald-900">
                              {photo.title}
                            </span>
                            <span className="text-[10px] text-slate-500 font-semibold block truncate mt-0.5">
                              {photo.tag} • AI टेस्ट
                            </span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Action Success / Feedback Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.aside
              aria-live="polite"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] max-w-sm w-[90vw] pointer-events-none"
            >
              <div className="bg-slate-900/95 text-white backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-slate-700/60 flex items-center gap-3">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-xs font-bold text-slate-100 flex-1 leading-snug">
                  {toastMessage.title}
                </p>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <MainApp />
    </ErrorBoundary>
  );
}
