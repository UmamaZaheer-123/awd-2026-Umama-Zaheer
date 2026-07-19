# TypeScript Fundamentals — Practice Problems & Mini Challenges

Solutions for the Lecture 3 (TypeScript Fundamentals) homework: 4 practice
problems + 2 mini coding challenges. All files type-check with `strict: true`
and were run to confirm correct output.

## Structure

```
src/
  01-shapes.ts            Shape union (circle/square/triangle) + area() w/ exhaustive narrowing
  02-todo-app.ts           Plain-JS todo app converted to fully typed TS
  03-pluck.ts               Generic pluck<T, K extends keyof T>(obj, key)
  04-useFetch.tsx           Typed useFetch<T>(url) custom React hook
  05-payment-method.ts     Mini Challenge 1: PaymentMethod discriminated union
  06-generic-cache.ts       Mini Challenge 2: getOrDefault, Box<T>, wrapInPromise<T>
```

Each file is self-contained, commented, and includes small runnable
"manual tests" at the bottom (`console.log` calls) so you can see the
expected output.

## Setup

```bash
npm install
```

## Commands

Type-check everything (no output files):
```bash
npx tsc --noEmit
```

Compile to JS:
```bash
npm run build
```

Run an individual file directly with ts-node:
```bash
npm run run:shapes
npm run run:todo
npm run run:pluck
npm run run:payment
npm run run:cache
```

(`04-useFetch.tsx` is a React hook meant to be imported into a React app,
so it isn't run standalone — see the `PostView` example component inside
that file for usage.)

## Notes on approach

- **Exhaustive narrowing** (`01-shapes.ts`, `05-payment-method.ts`): every
  union uses a shared literal-string discriminant field (`kind` / `type`).
  A `switch` narrows on that field, and an `assertNever` helper in the
  `default` case makes the compiler flag it if a variant is ever added
  without being handled.
- **Generics** (`03-pluck.ts`, `06-generic-cache.ts`): type parameters are
  constrained with `extends keyof T` where relevant, so the compiler
  enforces valid keys at the call site instead of relying on `any`.
- **Custom hook typing** (`04-useFetch.tsx`): the hook is generic over the
  fetched resource type `T`, so callers get `data: T | null` correctly
  typed rather than `any`.

## Submitting as your own repo

```bash
git init
git add .
git commit -m "TypeScript fundamentals: practice problems & mini challenges"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```
