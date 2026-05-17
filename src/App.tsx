/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Menu, X, BookOpen } from 'lucide-react';
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
  const [isGuideOpen, setIsGuideOpen] = useState(false);

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
          <button 
            onClick={() => setIsGuideOpen(true)}
            className="flex items-center gap-2 hover:text-[#00d4ff] transition-colors font-bold text-white/80"
          >
            <BookOpen size={16} /> LANGUAGE GUIDE
          </button>
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

      <AnimatePresence>
        {isGuideOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setIsGuideOpen(false)}
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
              className="glass border border-white/20 rounded-xl p-6 w-full max-w-3xl max-h-[85vh] overflow-y-auto custom-scrollbar"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#00d4ff] flex items-center gap-3">
                  <BookOpen /> NFA Language Guide
                </h2>
                <button onClick={() => setIsGuideOpen(false)} className="text-gray-400 hover:text-white"><X /></button>
              </div>
              
              <div className="space-y-6 text-sm text-gray-300">
                <section>
                  <h3 className="text-white font-bold text-lg mb-2">1. The Basics</h3>
                  <p>NFA supports standard arithmetic (including modulo <code className="text-[#00d4ff]">%</code>) with strict PEMDAS ordering, dynamic Strings, and String concatenation.</p>
                  <pre className="bg-black/50 p-3 rounded mt-2 text-[#00d4ff]">
(10 + 5) * (20 / 2){'\n'}
10 % 3 // Modulo: returns 1{'\n'}
print("Hello " + "World") // Concatenation
                  </pre>
                </section>

                <section>
                  <h3 className="text-white font-bold text-lg mb-2">2. Variables & State</h3>
                  <p>Variables are declared with <code className="text-[#00d4ff]">let</code>. They can store numbers, strings, or even entire arrays.</p>
                  <pre className="bg-black/50 p-3 rounded mt-2 text-[#00d4ff]">
let score = 100{'\n'}
let msg = "Level Up!"{'\n'}
let items = [1, 2, "Sword"]
                  </pre>
                </section>

                <section>
                  <h3 className="text-white font-bold text-lg mb-2">3. Arrays</h3>
                  <p>NFA supports composite Arrays that can store mixed data types. You can read/write elements by index, and query the size with <code className="text-[#00d4ff]">len()</code>.</p>
                  <pre className="bg-black/50 p-3 rounded mt-2 text-[#00d4ff]">
let my_list = [10, "Gold", [1, 2]]{'\n'}
print(my_list[0]) // Reads 10{'\n'}
my_list[0] = 50 // Updates index 0 in-place{'\n'}
print(len(my_list)) // Prints 3
                  </pre>
                </section>

                <section>
                  <h3 className="text-white font-bold text-lg mb-2">3. Printing</h3>
                  <p>Output values directly to the Virtual Terminal using <code className="text-[#00d4ff]">print()</code>.</p>
                  <pre className="bg-black/50 p-3 rounded mt-2 text-[#00d4ff]">print(score)</pre>
                </section>

                <section>
                  <h3 className="text-white font-bold text-lg mb-2">4. Conditionals</h3>
                  <p>In NFA, <code className="text-[#00d4ff]">if</code> statements are expressions that immediately return values.</p>
                  <pre className="bg-black/50 p-3 rounded mt-2 text-[#00d4ff]">
let status = if (score {'>'} 100) 1 else 0
                  </pre>
                </section>

                <section>
                  <h3 className="text-white font-bold text-lg mb-2">5. Loops</h3>
                  <p>Use standard <code className="text-[#00d4ff]">while</code> loops to execute repetitive logic.</p>
                  <pre className="bg-black/50 p-3 rounded mt-2 text-[#00d4ff]">
let countdown = 3{'\n'}
while (countdown {'>'} 0) {'{'}{'\n'}
  print(countdown){'\n'}
  countdown = countdown - 1{'\n'}
{'}'}
                  </pre>
                </section>

                <section>
                  <h3 className="text-white font-bold text-lg mb-2">6. Functions & Recursion</h3>
                  <p>Create reusable blocks using <code className="text-[#00d4ff]">fn</code>. Functions automatically return the result of their last line.</p>
                  <pre className="bg-black/50 p-3 rounded mt-2 text-[#00d4ff]">
fn multiply(a, b) {'{'}{'\n'}
  a * b{'\n'}
{'}'}
                  </pre>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
