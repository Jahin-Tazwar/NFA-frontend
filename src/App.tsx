/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Menu, X } from 'lucide-react';
import { Editor } from './components/Editor';
import { Terminal } from './components/Terminal';
import { runNfaCode } from './lib/wasmLoader';
import { EXAMPLES } from './lib/examples';

export default function App() {
  const [code, setCode] = useState(EXAMPLES[0].code);
  const [output, setOutput] = useState('NFA Virtual Terminal initialized.\nWaiting for execution...');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleRun = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setIsTyping(false); // Reset to ensure the effect triggers cleanly
    
    // Simulate slight cold start or pass to WASM immediately
    const result = await runNfaCode(code);
    
    setOutput(result);
    setIsTyping(true);
    setIsRunning(false);
  };

  const loadExample = (exampleCode: string) => {
    setCode(exampleCode);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false); // Close sidebar on mobile after selection
    }
  };

  return (
    <div className="bg-[#0a0a0a] flex flex-col h-screen w-full font-mono text-white overflow-hidden">
      <header className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-black/40 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#00d4ff] to-[#008fb3] rounded flex items-center justify-center font-bold text-black text-sm">
            NFA
          </div>
          <h1 className="text-lg font-bold tracking-tighter text-[#00d4ff]">
            NFA_PLAYGROUND <span className="text-xs font-normal opacity-50 ml-2 hidden sm:inline">v1.0.4-stable</span>
          </h1>
        </div>
        <div className="hidden lg:flex items-center gap-6 text-xs text-white/40">
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> WASM_READY</span>
          <span className="flex items-center gap-2">MEM: 12.4 MB</span>
          <span>UTF-8</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden text-gray-400 hover:text-white">
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden p-4 gap-4 relative">
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
              />
              <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                className="fixed lg:static inset-y-0 left-0 w-64 lg:w-48 flex flex-col gap-2 z-50 bg-[#0a0a0a] lg:bg-transparent p-4 lg:p-0 h-full border-r border-white/10 lg:border-none"
              >
                <div className="text-[10px] uppercase tracking-widest text-white/30 mb-2 px-2">Snippets</div>
                <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-2">
                  {EXAMPLES.map((ex, idx) => {
                    const isActive = code === ex.code;
                    return (
                      <button
                        key={idx}
                        onClick={() => loadExample(ex.code)}
                        className={`w-full glass p-3 text-left text-xs hover:bg-white/5 border-l-2 transition-all ${
                          isActive ? 'border-l-[#00d4ff] opacity-100' : 'border-l-transparent opacity-60'
                        }`}
                      >
                        {ex.name}.nfa
                      </button>
                    );
                  })}
                </div>
                <div className="mt-auto glass p-4 text-[10px] text-white/40 leading-relaxed hidden lg:block">
                  NFA is a non-deterministic finite automaton language optimized for WASM runtimes.
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <section className="flex-1 min-w-0 flex flex-col min-h-[300px]">
          <Editor code={code} onChange={setCode} />
        </section>

        <section className="flex-1 lg:w-80 lg:flex-none flex flex-col min-h-[300px] mb-20 lg:mb-0">
          <Terminal 
            output={output} 
            isTyping={isTyping} 
            onTypingComplete={() => setIsTyping(false)} 
          />
        </section>
      </main>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50">
        <button 
          onClick={handleRun}
          disabled={isRunning}
          className="btn-glow px-10 py-3 rounded-full flex items-center gap-3 font-bold tracking-widest text-[#00d4ff] uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRunning ? (
            <div className="w-5 h-5 border-2 border-[#00d4ff] border-t-transparent rounded-full animate-spin" />
          ) : (
            <Play className="fill-current w-5 h-5" />
          )}
          {isRunning ? 'Compiling...' : 'Run Program'}
        </button>
      </div>

      {/* Mobile-only visible terminal component when run is clicked, or we can just always show it below editor on mobile */}
      {/* Wait, the HTML design doesn't show terminal conditionally, it shows it as sibling on desktop. Let's make it flow on mobile. */}
    </div>
  );
}
