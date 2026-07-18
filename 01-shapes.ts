/**
 * PRACTICE PROBLEM 1
 * Write a Shape union with circle, square & triangle variants;
 * implement area() with exhaustive narrowing.
 */

// 1. Define each variant as its own interface, tagged with a `kind` field.
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  side: number;
}

interface Triangle {
  kind: "triangle";
  base: number;
  height: number;
}

// 2. Union them together — this is a "discriminated union" because every
//    member shares the `kind` field, which TypeScript can use to narrow.
type Shape = Circle | Square | Triangle;

// 3. A helper that TypeScript proves is unreachable if we ever forget a case.
//    If someone adds a new Shape variant later and forgets to handle it here,
//    this line will fail to compile — that's "exhaustive narrowing".
function assertNever(x: never): never {
  throw new Error(`Unhandled shape variant: ${JSON.stringify(x)}`);
}

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      // Inside this case, TS knows `shape` is a Circle.
      return Math.PI * shape.radius ** 2;

    case "square":
      // Inside this case, TS knows `shape` is a Square.
      return shape.side ** 2;

    case "triangle":
      // Inside this case, TS knows `shape` is a Triangle.
      return 0.5 * shape.base * shape.height;

    default:
      // Exhaustiveness check: if `shape` is not never here, TS errors.
      return assertNever(shape);
  }
}

// ---- quick manual tests ----
const circle: Circle = { kind: "circle", radius: 4 };
const square: Square = { kind: "square", side: 5 };
const triangle: Triangle = { kind: "triangle", base: 6, height: 3 };

console.log("Circle area:", area(circle).toFixed(2));
console.log("Square area:", area(square));
console.log("Triangle area:", area(triangle));

export { Circle, Square, Triangle, Shape, area };
