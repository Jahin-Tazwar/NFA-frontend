export const EXAMPLES = [
  {
    name: 'Hello World',
    code: `// Print a simple message\nprint("Hello, NFA!");`
  },
  {
    name: 'Fibonacci',
    code: `fn fib(n) {\n  if (n <= 1) return n;\n  return fib(n - 1) + fib(n - 2);\n}\n\nprint(fib(10));`
  },
  {
    name: 'Factorial',
    code: `fn factorial(n) {\n  let result = 1;\n  for (let i = 2; i <= n; i++) {\n    result = result * i;\n  }\n  return result;\n}\n\nprint(factorial(5));`
  },
  {
    name: 'Syntax Error (Test)',
    code: `fn broken() {\n  return "missing quotes;\n}`
  }
];
