import React from 'react';
import { Camera, TrendingUp, Calculator, CloudSun, Award, HelpCircle } from 'lucide-react';

interface FormattedMessageProps {
  text: string;
  className?: string;
  onActionClick?: (actionKey: string, payload?: string) => void;
}

export const FormattedMessage: React.FC<FormattedMessageProps> = React.memo(({ 
  text, 
  className = '',
  onActionClick
}) => {
  if (!text) return null;

  // Split into paragraphs / lines
  const lines = text.split('\n');

  // Helper to format inline styling (Bold, Italic, Code, Rupee amounts, Dosages/Units)
  const formatInlineText = (rawStr: string): React.ReactNode[] => {
    // 1. Split by **bold**, *italic*, `code`
    const parts = rawStr.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);

    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const content = part.slice(2, -2);
        return (
          <strong key={idx} className="font-extrabold text-slate-900 tracking-tight">
            {formatSubMetrics(content)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        const content = part.slice(1, -1);
        return (
          <em key={idx} className="italic text-slate-700">
            {formatSubMetrics(content)}
          </em>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        const content = part.slice(1, -1);
        return (
          <code key={idx} className="bg-slate-100 text-emerald-800 px-1.5 py-0.5 rounded text-xs font-mono border border-slate-200">
            {content}
          </code>
        );
      }

      return <React.Fragment key={idx}>{formatSubMetrics(part)}</React.Fragment>;
    });
  };

  // Helper to highlight Rupee amounts and quantitative metrics within text fragments
  const formatSubMetrics = (subText: string): React.ReactNode[] => {
    // Highlight Indian Rupee amounts e.g., ₹2,585 or ₹1,21,250
    const rupeeRegex = /(₹\s*[\d,]+(?:\.\d+)?(?:\s*\/\s*[\u0900-\u097Fa-zA-Z]+)?)/g;
    const parts = subText.split(rupeeRegex);

    if (parts.length > 1) {
      return parts.map((sp, sidx) => {
        if (sp.match(rupeeRegex)) {
          return (
            <span 
              key={`rp-${sidx}`} 
              className="font-black text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-300/80 mx-0.5 inline-block text-[11px] sm:text-xs shadow-2xs"
            >
              {sp}
            </span>
          );
        }
        return formatDosageMetrics(sp);
      });
    }

    return [formatDosageMetrics(subText)];
  };

  // Helper to gently highlight key quantitative dosage / timing specs (e.g., 2.5 ग्राम/लीटर, 50 क्विंटल, 15-20 दिन, 12% नमी)
  const formatDosageMetrics = (str: string): React.ReactNode => {
    // Match common metric units in agricultural recommendations
    const unitRegex = /(\b\d+(?:\.\d+)?(?:\s*-\s*\d+(?:\.\d+)?)?\s*(?:क्विंटल|किलोग्राम|किग्रा|लीटर|मिली|ग्राम|एकड़|दिन|प्रतिशत|%|°C|सेमी|फीट|पैकेट)\b)/g;
    const segments = str.split(unitRegex);

    if (segments.length > 1) {
      return (
        <React.Fragment key="seg-wrap">
          {segments.map((seg, sidx) => {
            if (seg.match(unitRegex)) {
              return (
                <span 
                  key={`u-${sidx}`} 
                  className="font-bold text-slate-900 bg-slate-100/90 px-1 py-0.2 rounded text-[11px] sm:text-xs border border-slate-200/80 mx-0.5"
                >
                  {seg}
                </span>
              );
            }
            return seg;
          })}
        </React.Fragment>
      );
    }

    return str;
  };

  const renderedElements: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];
  let isNumbered = false;

  const flushList = () => {
    if (currentList.length > 0) {
      if (isNumbered) {
        renderedElements.push(
          <ol key={`ol-${renderedElements.length}`} className="my-2 space-y-2 pl-0.5">
            {currentList}
          </ol>
        );
      } else {
        renderedElements.push(
          <ul key={`ul-${renderedElements.length}`} className="my-2 space-y-1.5 pl-0.5">
            {currentList}
          </ul>
        );
      }
      currentList = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      renderedElements.push(<div key={`empty-${index}`} className="h-1.5" />);
      return;
    }

    // Check if line is a major heading e.g., ### Heading or ## Heading
    if (trimmed.startsWith('###') || trimmed.startsWith('##') || trimmed.startsWith('#')) {
      flushList();
      const headingText = trimmed.replace(/^#+\s*/, '');
      renderedElements.push(
        <h4 
          key={`heading-${index}`} 
          className="font-black text-xs sm:text-sm text-slate-900 mt-2.5 mb-1.5 flex items-center gap-1.5 border-b border-slate-200/80 pb-1 text-emerald-950"
        >
          {formatInlineText(headingText)}
        </h4>
      );
      return;
    }

    // Check if line is a Caution / Warning Alert Box (Starts with ⚠️ or सावधान / चेतावनी / Warning)
    const isWarningLine = /^⚠️|^\*\*⚠️|^सावधानी:|^चेतावनी:|^Warning:|^Caution:/i.test(trimmed);
    if (isWarningLine) {
      flushList();
      renderedElements.push(
        <div 
          key={`warn-${index}`} 
          className="bg-amber-50/90 border border-amber-300/80 rounded-xl p-2.5 sm:p-3 my-2 text-amber-950 text-xs sm:text-sm flex items-start gap-2 shadow-2xs"
        >
          <span className="text-base shrink-0 select-none">⚠️</span>
          <div className="flex-1 leading-relaxed font-medium">
            {formatInlineText(trimmed.replace(/^⚠️\s*/, ''))}
          </div>
        </div>
      );
      return;
    }

    // Check if line is a Pro Tip / Advice Box (Starts with 💡 or सुझाव / टिप / Tip)
    const isTipLine = /^💡|^\*\*💡|^सुझाव:|^सलाह:|^टिप:|^Tip:/i.test(trimmed);
    if (isTipLine) {
      flushList();
      renderedElements.push(
        <div 
          key={`tip-${index}`} 
          className="bg-emerald-50/90 border border-emerald-300/70 rounded-xl p-2.5 sm:p-3 my-2 text-emerald-950 text-xs sm:text-sm flex items-start gap-2 shadow-2xs"
        >
          <span className="text-base shrink-0 select-none">💡</span>
          <div className="flex-1 leading-relaxed font-medium">
            {formatInlineText(trimmed.replace(/^💡\s*/, ''))}
          </div>
        </div>
      );
      return;
    }

    // Check if line is a Calculation / Summary Card (Starts with 📊 or Calculation)
    const isCalcLine = /^📊|^\*\*📊|^गणना:/i.test(trimmed);
    if (isCalcLine) {
      flushList();
      renderedElements.push(
        <div 
          key={`calc-${index}`} 
          className="bg-slate-50 border border-slate-200/90 rounded-xl p-2.5 sm:p-3 my-2 text-slate-900 text-xs sm:text-sm flex items-start gap-2 shadow-2xs"
        >
          <span className="text-base shrink-0 select-none">📊</span>
          <div className="flex-1 leading-relaxed font-bold text-slate-900">
            {formatInlineText(trimmed.replace(/^📊\s*/, ''))}
          </div>
        </div>
      );
      return;
    }

    // Check if line is a Treatment / Formulation Box (Starts with 🧪 or 🍃)
    const isTreatmentHeader = /^[🧪🍃]\s*\*\*/.test(trimmed);
    if (isTreatmentHeader) {
      flushList();
      renderedElements.push(
        <div 
          key={`treat-${index}`} 
          className="bg-teal-50/80 border border-teal-200/90 rounded-xl p-2.5 sm:p-3 my-1.5 text-teal-950 text-xs sm:text-sm flex items-start gap-2 shadow-2xs"
        >
          <span className="text-base shrink-0 select-none">{trimmed.startsWith('🧪') ? '🧪' : '🍃'}</span>
          <div className="flex-1 leading-relaxed font-semibold">
            {formatInlineText(trimmed.replace(/^[🧪🍃]\s*/, ''))}
          </div>
        </div>
      );
      return;
    }

    // Check if line is a bullet point: • or - or *
    const bulletMatch = trimmed.match(/^([•\-\*])\s+(.*)/);
    if (bulletMatch) {
      if (isNumbered) flushList();
      isNumbered = false;
      const content = bulletMatch[2];
      currentList.push(
        <li key={`li-${index}`} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0 select-none" />
          <div className="flex-1">{formatInlineText(content)}</div>
        </li>
      );
      return;
    }

    // Check if line is a numbered item: 1. 2. 3.
    const numMatch = trimmed.match(/^(\d+)[\.\)]\s+(.*)/);
    if (numMatch) {
      if (!isNumbered) flushList();
      isNumbered = true;
      const num = numMatch[1];
      const content = numMatch[2];
      currentList.push(
        <li key={`li-${index}`} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 leading-relaxed bg-slate-50/60 p-2 rounded-xl border border-slate-100">
          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-emerald-300/80 shadow-2xs select-none">
            {num}
          </span>
          <div className="flex-1 pt-0.5 font-medium">{formatInlineText(content)}</div>
        </li>
      );
      return;
    }

    // Standard paragraph line
    flushList();

    // Check if line starts with section emoji header e.g. 🌾, 🔪, 🌱, 💧, 🛡️, 👤, 📌
    const isSectionHeader = /^[🌾🔪🌱💧🛡️👤📌📝🎯]\s*\*\*/.test(trimmed);

    renderedElements.push(
      <p 
        key={`p-${index}`} 
        className={`text-xs sm:text-sm text-slate-800 leading-relaxed ${
          isSectionHeader 
            ? 'font-bold bg-slate-50 p-2.5 px-3 rounded-xl border border-slate-200/80 my-2 text-slate-900 shadow-2xs' 
            : 'my-1 font-medium'
        }`}
      >
        {formatInlineText(trimmed)}
      </p>
    );
  });

  flushList();

  // Detect relevant contextual action shortcuts based on response text keywords
  const textLower = text.toLowerCase();
  const showDiagnosisShortcut = onActionClick && (textLower.includes('फोटो') || textLower.includes('कैमरा') || textLower.includes('निदान') || textLower.includes('photo') || textLower.includes('diagnosis'));
  const showMandiShortcut = onActionClick && (textLower.includes('मंडी भाव') || textLower.includes('समर्थन मूल्य') || textLower.includes('msp') || textLower.includes('apmc') || textLower.includes('बाजार भाव'));
  const showCalcShortcut = onActionClick && (textLower.includes('कैलकुलेटर') || textLower.includes('खाद की मात्रा') || textLower.includes('खुराक गणना') || textLower.includes('calculator') || textLower.includes('भुगतान गणना'));
  const showWeatherShortcut = onActionClick && (textLower.includes('मौसम') || textLower.includes('छिड़काव') || textLower.includes('वर्षा') || textLower.includes('बारिश') || textLower.includes('तापमान') || textLower.includes('weather'));
  const showSchemesShortcut = onActionClick && (textLower.includes('योजना') || textLower.includes('सब्सिडी') || textLower.includes('pm-kisan') || textLower.includes('pmfby') || textLower.includes('kcc'));

  const hasAnyShortcut = showDiagnosisShortcut || showMandiShortcut || showCalcShortcut || showWeatherShortcut || showSchemesShortcut;

  return (
    <div className={`space-y-1 text-left ${className}`}>
      {renderedElements}

      {/* Contextual Quick Actions Row */}
      {hasAnyShortcut && onActionClick && (
        <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex flex-wrap items-center gap-1.5 select-none">
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mr-1">
            ⚡ त्वरित टूल:
          </span>
          
          {showDiagnosisShortcut && (
            <button
              type="button"
              onClick={() => onActionClick('diagnosis')}
              className="inline-flex items-center gap-1 text-[11px] font-bold bg-cyan-50 hover:bg-cyan-100 text-cyan-900 px-2.5 py-1 rounded-lg border border-cyan-200 transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <Camera className="w-3 h-3 text-cyan-700" />
              <span>फ़ोटो जांच (Diagnosis)</span>
            </button>
          )}

          {showMandiShortcut && (
            <button
              type="button"
              onClick={() => onActionClick('mandi')}
              className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-lg border border-emerald-200 transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <TrendingUp className="w-3 h-3 text-emerald-700" />
              <span>मंडी भाव (Mandi Rates)</span>
            </button>
          )}

          {showCalcShortcut && (
            <button
              type="button"
              onClick={() => onActionClick('tools')}
              className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 px-2.5 py-1 rounded-lg border border-amber-200 transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <Calculator className="w-3 h-3 text-amber-700" />
              <span>खाद व MSP कैलकुलेटर</span>
            </button>
          )}

          {showWeatherShortcut && (
            <button
              type="button"
              onClick={() => onActionClick('weather')}
              className="inline-flex items-center gap-1 text-[11px] font-bold bg-sky-50 hover:bg-sky-100 text-sky-900 px-2.5 py-1 rounded-lg border border-sky-200 transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <CloudSun className="w-3 h-3 text-sky-700" />
              <span>मौसम सलाह (Weather)</span>
            </button>
          )}

          {showSchemesShortcut && (
            <button
              type="button"
              onClick={() => onActionClick('schemes')}
              className="inline-flex items-center gap-1 text-[11px] font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-900 px-2.5 py-1 rounded-lg border border-indigo-200 transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <Award className="w-3 h-3 text-indigo-700" />
              <span>सरकारी योजनाएं</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
});
