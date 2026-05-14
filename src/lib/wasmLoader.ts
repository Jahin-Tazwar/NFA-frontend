let nfaModule: any = null;

export const runNfaCode = async (code: string): Promise<string> => {
  const win = window as any;

  // 1. Initialize the module if it hasn't been already
  if (!nfaModule) {
    if (typeof win.createNfaModule === 'function') {
      try {
        nfaModule = await win.createNfaModule();
        console.log("NFA Engine Initialized Successfully");
      } catch (err) {
        return `[INITIALIZATION_ERROR]: Failed to boot NFA engine.`;
      }
    } else {
      return `[SYSTEM_ERROR]: NFA Engine (nfa.js) not found. \nPlease ensure you have compiled the C code using emcc and placed nfa.js/nfa.wasm in the public folder.`;
    }
  }

  // 2. Run the code
  try {
    const result = nfaModule.ccall('run_nfa', 'string', ['string'], [code]);
    return result;
  } catch (err: any) {
    return `[NFA_RUNTIME_ERROR]: ${err.message || 'Fatal crash in WebAssembly module.'}`;
  }
};
