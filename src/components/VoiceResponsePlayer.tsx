import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Pause, Play, Square } from 'lucide-react';
import { getTranslation, getTTSLangCode } from '../translations';

interface VoiceResponsePlayerProps {
  text: string;
  langCode?: string;
  className?: string;
}

export const VoiceResponsePlayer: React.FC<VoiceResponsePlayerProps> = React.memo(({ 
  text, 
  langCode = 'hi', 
  className = "" 
}) => {
  const [playbackState, setPlaybackState] = useState<'idle' | 'playing' | 'paused'>('idle');
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const currentChunkIndexRef = useRef<number>(0);
  const chunksRef = useRef<string[]>([]);
  const isCancelledRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
      
      const loadVoices = () => {
        if (window.speechSynthesis) {
          window.speechSynthesis.getVoices();
        }
      };
      
      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    } else {
      setIsSupported(false);
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        isCancelledRef.current = true;
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Prepare clean text chunks to support long responses without audio cutoff
  const prepareChunks = (rawText: string): string[] => {
    // Remove markdown symbols, links, and formatting for clean voice reading
    const cleaned = rawText
      .replace(/[*#_`~]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/----------------------------/g, '')
      .trim();

    if (!cleaned) return [];

    // Split by sentence terminators in Indian languages (।), standard period (.), newlines (\n), ?, !
    const rawParts = cleaned.split(/(?<=[।.\n?!])\s+/);
    const result: string[] = [];

    for (const part of rawParts) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      
      // If a single sentence is longer than 130 characters, break by comma or whitespace
      if (trimmed.length > 130) {
        const subParts = trimmed.match(/.{1,120}(?:\s+|$|[,;])/g) || [trimmed];
        subParts.forEach(sp => {
          const t = sp.trim();
          if (t) result.push(t);
        });
      } else {
        result.push(trimmed);
      }
    }

    return result.length > 0 ? result : [cleaned];
  };

  const startSpeaking = (startIndex = 0) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    // Stop any existing speech across the browser
    window.speechSynthesis.cancel();
    isCancelledRef.current = false;

    const chunks = prepareChunks(text);
    chunksRef.current = chunks;
    if (chunks.length === 0) return;

    currentChunkIndexRef.current = startIndex;
    setPlaybackState('playing');

    const ttsCode = getTTSLangCode(langCode);
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(
      v => v.lang.toLowerCase().startsWith(langCode.toLowerCase()) || 
           v.lang.toLowerCase().includes(ttsCode.toLowerCase()) ||
           v.name.toLowerCase().includes(langCode.toLowerCase())
    );

    const speakNextChunk = () => {
      if (isCancelledRef.current) return;

      const index = currentChunkIndexRef.current;
      if (index >= chunksRef.current.length) {
        setPlaybackState('idle');
        return;
      }

      const chunkText = chunksRef.current[index];
      const utterance = new SpeechSynthesisUtterance(chunkText);
      utterance.lang = ttsCode;
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }
      utterance.rate = 0.92; // Natural, clear, farmer-friendly speed
      utterance.pitch = 1.0;

      utterance.onend = () => {
        if (isCancelledRef.current) return;
        currentChunkIndexRef.current += 1;
        if (currentChunkIndexRef.current < chunksRef.current.length) {
          speakNextChunk();
        } else {
          setPlaybackState('idle');
        }
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis chunk error:', e);
        if (isCancelledRef.current) return;
        currentChunkIndexRef.current += 1;
        if (currentChunkIndexRef.current < chunksRef.current.length) {
          speakNextChunk();
        } else {
          setPlaybackState('idle');
        }
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNextChunk();
  };

  const handlePlay = () => {
    if (playbackState === 'paused') {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setPlaybackState('playing');
      } else {
        startSpeaking(currentChunkIndexRef.current);
      }
    } else {
      startSpeaking(0);
    }
  };

  const handlePause = () => {
    if (playbackState === 'playing') {
      window.speechSynthesis.pause();
      setPlaybackState('paused');
    }
  };

  const handleStop = () => {
    isCancelledRef.current = true;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setPlaybackState('idle');
  };

  if (!isSupported) {
    return null;
  }

  const listenText = getTranslation(langCode, 'listen_answer');
  const speakingText = getTranslation(langCode, 'speaking');
  const pauseText = getTranslation(langCode, 'pause');
  const resumeText = getTranslation(langCode, 'resume');
  const stopText = getTranslation(langCode, 'stop');
  const pausedText = getTranslation(langCode, 'paused');

  return (
    <div className={`flex items-center gap-1.5 flex-wrap ${className}`}>
      {playbackState === 'idle' && (
        <button
          type="button"
          onClick={handlePlay}
          className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95 text-left"
          title={listenText}
        >
          <Volume2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{listenText}</span>
        </button>
      )}

      {playbackState === 'playing' && (
        <div className="inline-flex items-center gap-1.5 bg-emerald-950 text-white px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xs border border-emerald-800/80">
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-300 mr-1.5">
            {/* Audio Wave Visualizer Bars */}
            <div className="flex items-center gap-0.5 h-3.5 mr-1" aria-hidden="true">
              <span className="w-0.5 h-3 bg-emerald-400 rounded-full animate-pulse" style={{ animationDuration: '0.6s' }} />
              <span className="w-0.5 h-4 bg-emerald-300 rounded-full animate-pulse" style={{ animationDuration: '0.4s' }} />
              <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDuration: '0.7s' }} />
              <span className="w-0.5 h-3.5 bg-emerald-300 rounded-full animate-pulse" style={{ animationDuration: '0.5s' }} />
            </div>
            <span>{speakingText}</span>
          </div>
          <button
            type="button"
            onClick={handlePause}
            className="px-2 py-0.5 hover:bg-emerald-800/80 rounded-lg text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold"
            title={pauseText}
          >
            <Pause className="w-3.5 h-3.5" />
            <span>{pauseText}</span>
          </button>
          <button
            type="button"
            onClick={handleStop}
            className="px-2 py-0.5 hover:bg-emerald-800/80 rounded-lg text-rose-300 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold border-l border-emerald-800/80"
            title={stopText}
          >
            <Square className="w-3.5 h-3.5" />
            <span>{stopText}</span>
          </button>
        </div>
      )}

      {playbackState === 'paused' && (
        <div className="inline-flex items-center gap-1.5 bg-amber-900 text-white px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xs">
          <span className="text-[11px] font-bold text-amber-200 mr-1 flex items-center gap-1">
            {pausedText}
          </span>
          <button
            type="button"
            onClick={handlePlay}
            className="px-2 py-0.5 hover:bg-amber-800 rounded-lg text-emerald-300 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold"
            title={resumeText}
          >
            <Play className="w-3.5 h-3.5" />
            <span>{resumeText}</span>
          </button>
          <button
            type="button"
            onClick={handleStop}
            className="px-2 py-0.5 hover:bg-amber-800 rounded-lg text-rose-300 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold border-l border-amber-800"
            title={stopText}
          >
            <Square className="w-3.5 h-3.5" />
            <span>{stopText}</span>
          </button>
        </div>
      )}
    </div>
  );
});
