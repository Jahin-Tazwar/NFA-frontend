import React, { useEffect, useState, useRef } from 'react';
import { TerminalSquare } from 'lucide-react';

interface TerminalProps {
  output: string;
  isTyping: boolean;
  onTypingComplete: () => void;
}

export function Terminal({ output, isTyping, onTypingComplete }: TerminalProps) {
  const [displayedText, setDisplayedText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  useEffect(() => {
    if (!isTyping) {
      setDisplayedText(output);
      return;
    }

    setDisplayedText('');
    let i = 0;
    
    // Slight initial delay
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(prev => prev + output.charAt(i));
        i++;
        
        // Auto-scroll to bottom as it types
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }

        if (i >= output.length) {
          clearInterval(interval);
          onTypingComplete();
        }
      }, 15); // ms per character

      return () => clearInterval(interval);
    }, 200);

    return () => clearTimeout(startDelay);
  }, [output, isTyping]);

  useEffect(() => {
    // Keep scrolled to bottom if output changes outright
    if (!isTyping && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedText, isTyping]);

  return (
    <div className="flex-1 flex flex-col glass bg-black scanlines border-[#33ff00]/20 relative crt-flicker overflow-hidden">
      <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/5 shrink-0">
        <span className="text-[10px] text-white/50 uppercase">Terminal Output</span>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 p-4 font-mono text-xs text-[#33ff00] overflow-y-auto custom-scrollbar relative z-10 break-words whitespace-pre-wrap leading-relaxed"
      >
        {displayedText}
        <span className="terminal-cursor animate-pulse" />
      </div>
    </div>
  );
}
