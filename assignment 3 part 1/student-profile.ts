// ============================================================
// TASK 1 — Student Profile
// ============================================================

enum Grade {
  A,
  B,
  C,
  F,
}

const student: {
  name: string;
  age: number;
  isPassed: boolean;
  grade: Grade;
} = {
  name: "Ali",
  age: 20,
  isPassed: true,
  grade: Grade.A,
};

console.log(
  `${student.name} is ${student.age} years old, passed: ${student.isPassed}, Grade: ${Grade[student.grade]}`
);
// Output: Ali is 20 years old, passed: true, Grade: A

// Try assigning age = "twenty"
// student.age = "twenty";
//
// TypeScript error:
// Type 'string' is not assignable to type 'number'. (ts(2322))
//
// Why: `age` was typed as `number` when the object was declared,
// so TypeScript locks that field to numbers only. A string can't
// be assigned to it without an explicit type change or a cast.

// ============================================================
// TASK 2 — Product List
// ============================================================

const products: string[] = ["Laptop", "Mouse", "Keyboard", "Monitor"];

const prices: ReadonlyArray<number> = [1200, 25, 45, 300];

// Try to push a new price
// prices.push(99);
//
// TypeScript error:
// Property 'push' does not exist on type 'readonly number[]'. (ts(2339))
//
// Why: ReadonlyArray removes all mutating methods (push, pop, splice, etc.)
// from its type, so the compiler won't even let you call them, even
// though at runtime a plain array wouldn't literally have a "readonly" lock.

const item: [string, number, boolean] = ["Laptop", 1200, true];

console.log(`Name: ${item[0]} | Price: ${item[1]} | In Stock: ${item[2]}`);
// Output: Name: Laptop | Price: 1200 | In Stock: true

// Bonus: print all products with their prices using the tuple format
products.forEach((name, i) => {
  console.log(`Name: ${name} | Price: ${prices[i]} | In Stock: true`);
});

// ============================================================
// TASK 3 — The Type Detective
// ============================================================

// --- any ---
let riskyData: any;
riskyData = 42;
riskyData = "hello";
console.log(riskyData.toUpperCase()); // "HELLO" — this actually runs fine

// Why this is dangerous:
// `any` completely disables type checking for this variable.
// TypeScript won't complain even though a moment ago riskyData
// held a number (which has no .toUpperCase method). If riskyData
// were still a number at runtime, this would crash with:
// "TypeError: riskyData.toUpperCase is not a function"
// `any` trades safety for flexibility — the compiler simply stops watching.

// --- unknown ---
let safeData: unknown;
safeData = "world";

// console.log(safeData.toUpperCase());
//
// TypeScript error:
// Object is of type 'unknown'. (ts(18046))
//
// Why: `unknown` is the type-safe counterpart to `any`. TypeScript
// forces you to prove what the value actually is before letting you
// call methods on it.

// Fix using a typeof check:
if (typeof safeData === "string") {
  console.log(safeData.toUpperCase()); // "WORLD" — safe, TS narrows the type here
}

// --- literal types ---
type Direction = "north" | "south" | "east" | "west";

let heading: Direction = "north"; // valid

// heading = "diagonal";
//
// TypeScript error:
// Type '"diagonal"' is not assignable to type 'Direction'. (ts(2322))
//
// Why: a literal type restricts the variable to an exact, finite set
// of string values. "diagonal" isn't one of the four allowed strings,
// so the compiler rejects it at compile time instead of letting a typo
// slip through to runtime.

console.log(`Heading: ${heading}`);
