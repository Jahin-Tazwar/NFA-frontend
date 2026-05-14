let nfaModule: any = null;
let printBuffer: string = "";

export const runNfaCode = async (code: string): Promise<string> => {
  const win = window as any;

  // 1. Initialize the module if it hasn't been already
  if (!nfaModule) {
    if (typeof win.createNfaModule === 'function') {
      try {
        nfaModule = await win.createNfaModule({
          print: (text: string) => { printBuffer += text + "\n"; },
          printErr: (text: string) => { printBuffer += text + "\n"; }
        });
        console.log("NFA Engine Initialized Successfully");
      } catch (err) {
        return `[INITIALIZATION_ERROR]: Failed to boot NFA engine.`;
      }
    } else {
      return `[SYSTEM_ERROR]: NFA Engine (nfa.js) not found. \nPlease ensure you have compiled the C code using emcc and placed nfa.js/nfa.wasm in the public folder.`;
    }
  }

  // Clear buffer before running new code
  printBuffer = "";

  // 2. Run the code
  try {
    const result = nfaModule.ccall('run_nfa', 'string', ['string'], [code]);
    
    // Combine our print output with the final returned expression
    let finalOutput = printBuffer;
    if (result && result.trim() !== "") {
      finalOutput += result;
    }
    
    return finalOutput.trim();
  } catch (err: any) {
    return `[NFA_RUNTIME_ERROR]: ${err.message || 'Fatal crash in WebAssembly module.'}`;
  }
};
