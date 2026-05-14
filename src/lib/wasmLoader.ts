/**
 * Loader for the NFA WebAssembly module.
 * Falls back to a simulated compiler environment if nfa.wasm is not found,
 * ensuring the UI can be tested immediately.
 */
export const runNfaCode = async (code: string): Promise<string> => {
  // Check if Module is defined on window (standard Emscripten WASM environment)
  const win = window as any;
  if (typeof win !== 'undefined' && win.Module && win.Module.ccall) {
    try {
      // Calls the C function exposed via WASM:
      // const char* run_nfa(const char* input_code)
      return win.Module.ccall('run_nfa', 'string', ['string'], [code]);
    } catch (err: any) {
      return `[WASM RuntimeError]\n${err.message || 'Fatal crash in WebAssembly module.'}`;
    }
  }

  // Simulated fallback for UI visual testing when WASM isn't present
  return new Promise((resolve) => {
    setTimeout(() => {
      if (code.trim() === '') {
        resolve('Error: No source code provided to the NFA compiler.');
        return;
      }

      if (code.includes('broken()') || code.includes('missing quotes')) {
        resolve('SyntaxError: Unexpected end of input or unterminated string literal\n  at line 2, col 10\n\nCompilation failed.');
        return;
      }

      // Simulate a successful run
      const outputLines = [
        '[NFA Compiler v0.1.0]',
        'Architecture: wasm32-unknown-emscripten',
        'Parsing AST...    [OK]',
        'Type Checking...  [OK] in 4ms',
        'Executing...',
        '-----------------------------------',
        'Hello from NFA Virtual Environment!',
        `Execution finished with exit code 0.`
      ];

      // If they ran fibonacci...
      if (code.includes('fib(')) {
        outputLines.splice(6, 1, 'Result: 55'); // fib(10)
      } else if (code.includes('factorial(')) {
        outputLines.splice(6, 1, 'Result: 120'); // factorial(5)
      }

      resolve(outputLines.join('\n'));
    }, 600 + Math.random() * 400); // 600-1000ms delay to simulate compilation
  });
};
