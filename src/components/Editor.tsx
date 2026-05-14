import React, { useRef, useEffect } from 'react';

interface EditorProps {
  code: string;
  onChange: (code: string) => void;
}

export function Editor({ code, onChange }: EditorProps) {
  const lineArray = code.split('\n');
  const lineCount = lineArray.length || 1;
  const lines = Array.from({ length: lineCount }, (_, i) => i + 1);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  useEffect(() => {
    // Keep cursors and scrolling in sync manually just in case
    handleScroll();
  }, [code]);

  return (
    <div className="flex-1 flex flex-col glass glow-cyan relative overflow-hidden transition-all duration-300">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5 shrink-0">
        <span className="text-[10px] text-white/50 uppercase">Source Editor</span>
        <span className="text-[10px] text-[#00d4ff]">main.nfa</span>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Line Numbers */}
        <div
          ref={lineNumbersRef}
          className="line-numbers pt-4 pb-4 overflow-hidden font-mono text-sm border-r border-white/5 w-12"
          aria-hidden="true"
        >
          {lines.map((line) => (
            <div key={line} className="w-full text-center opacity-50">
              {line}
            </div>
          ))}
        </div>

        {/* Actual Text Area */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          spellCheck={false}
          className="flex-1 bg-transparent text-[#00d4ff] font-mono text-sm p-4 outline-none resize-none custom-scrollbar leading-[1.5rem]"
          style={{
            lineHeight: '1.5rem',
            tabSize: 2
          }}
          placeholder="// Write your NFA code here..."
        />
      </div>
    </div>
  );
}
