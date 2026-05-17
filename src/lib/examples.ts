export const EXAMPLES = [
  {
    name: 'Language Guide',
    code: `// ==========================================
// NFA LANGUAGE GUIDE
// Welcome to the NFA interactive playground!
// ==========================================

// 1. BUILT-IN FUNCTIONS & STRINGS
// print() prints output, and + can concatenate strings!
print("Hello " + "NFA!")

// 2. MATH & OPERATIONS
// NFA supports standard math, respects PEMDAS, and supports modulo (%)
let math_result = (10 + 5) * (20 / 2)
print(math_result)
print(10 % 3) // Modulo: returns 1

// 3. VARIABLES & DATA TYPES
// NFA supports Numbers, Strings, and Arrays!
let counter = 5
let status = "Running"
let data = [1, 2, "three", [4, 5]]
print(data)

// 4. ARRAYS & INDEXING
// Access and update elements in-place, and query size with len()
print(data[2]) // Accesses "three"
data[0] = 99 // Mutates index 0 in-place
print(data)
print(len(data)) // Prints size of array (4)

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
