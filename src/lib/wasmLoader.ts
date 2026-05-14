/**
 * Loader for the NFA WebAssembly module.
 * Falls back to a simulated compiler environment if nfa.wasm is not found,
 * ensuring the UI can be tested immediately.
 */
export const runNfaCode = async (code: string): Promise<string> => {
  const win = window as any;
  
  if (typeof win !== 'undefined' && win.Module && win.Module.ccall) {
    try {
      // The C function run_nfa is exported via EMSCRIPTEN_KEEPALIVE
      const result = win.Module.ccall('run_nfa', 'string', ['string'], [code]);
      return result;
    } catch (err: any) {
      return `[NFA_RUNTIME_ERROR]: ${err.message || 'Fatal crash in WebAssembly module.'}`;
    }
  }

  return `[SYSTEM_ERROR]: NFA Engine (nfa.js) not found. \nPlease ensure you have compiled the C code using emcc and placed nfa.js/nfa.wasm in the public folder.`;
};
