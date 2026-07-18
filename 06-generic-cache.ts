/**
 * MINI CODING CHALLENGE — 2
 * Build a Generic Cache
 *
 * TASK:
 * - Write a generic function getOrDefault<T>(value: T | undefined, fallback: T): T
 *   that returns `value` if defined, otherwise `fallback`.
 * - Write a generic class Box<T> with a private value: T, a get(): T method,
 *   and a set(v: T): void method.
 * - BONUS: write a generic wrapInPromise<T>(value: T): Promise<T> that
 *   resolves immediately with the given value.
 *
 * HINT (given): Box<T> mirrors how Array<T> and Promise<T> are built
 * internally — a single type parameter threaded through every member.
 */

// 1. getOrDefault -----------------------------------------------------------
function getOrDefault<T>(value: T | undefined, fallback: T): T {
  return value !== undefined ? value : fallback;
}

// 2. Box<T> -------------------------------------------------------------
class Box<T> {
  private value: T;

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  get(): T {
    return this.value;
  }

  set(v: T): void {
    this.value = v;
  }
}

// 3. Bonus: wrapInPromise<T> ------------------------------------------------
function wrapInPromise<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

// ---- quick manual tests ----
console.log(getOrDefault<number>(undefined, 42)); // 42
console.log(getOrDefault<number>(7, 42)); // 7

const numberBox = new Box<number>(10);
console.log("Box initial value:", numberBox.get()); // 10
numberBox.set(99);
console.log("Box after set:", numberBox.get()); // 99

const stringBox = new Box<string>("hello");
console.log("String box:", stringBox.get()); // hello

wrapInPromise("resolved value").then((v) => console.log("Promise resolved with:", v));

export { getOrDefault, Box, wrapInPromise };
