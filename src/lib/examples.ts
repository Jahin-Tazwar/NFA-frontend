export const EXAMPLES = [
  {
    name: 'Arithmetic',
    code: `// Simple arithmetic\n(5 + 5) * (20 / 2)`
  },
  {
    name: 'Variables',
    code: `let x = 10\nlet y = 20\nx + y`
  },
  {
    name: 'Recursive Fibonacci',
    code: `fn fib(n) {\n  if n <= 1 n else fib(n-1) + fib(n-2)\n}\n\nfib(10)`
  },
  {
    name: 'Factorial',
    code: `fn factorial(n) {\n  if n == 0 1 else n * factorial(n - 1)\n}\n\nfactorial(5)`
  }
];
