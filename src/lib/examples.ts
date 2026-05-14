export const EXAMPLES = [
  {
    name: 'Language Guide',
    code: `// ==========================================
// NFA LANGUAGE GUIDE
// Welcome to the NFA interactive playground!
// ==========================================

// 1. BUILT-IN FUNCTIONS
// You can print output to the terminal using print()
print(100)

// 2. MATH & OPERATIONS
// NFA supports standard math and respects PEMDAS
let math_result = (10 + 5) * (20 / 2)
print(math_result)

// 3. VARIABLES & REASSIGNMENT
// Create variables using the 'let' keyword
let counter = 5
// Update existing variables directly (without let)
counter = counter - 1
print(counter)

// 4. CONDITIONALS (If/Else Expressions)
// In NFA, 'if' statements are expressions! 
// This means they can return a value directly.
let is_large = if (100 > 50) 1 else 0
print(is_large)

// 5. FUNCTIONS
// Define reusable logic with the 'fn' keyword.
// Functions return the result of their last line automatically.
fn multiply(a, b) {
  a * b
}
print(multiply(5, 5))

// 6. WHILE LOOPS
// NFA supports imperative loops for repeating logic
let x = 3
while (x > 0) {
  print(x)
  x = x - 1
}

// 7. RECURSION
// NFA supports recursive function calls.
fn factorial(n) {
  if (n == 0) 1 else n * factorial(n - 1)
}
print(factorial(4))

print(9999) // End of guide`
  },
  {
    name: 'Arithmetic',
    code: `(5 + 5) * (20 / 2)`
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
