/**
 * PRACTICE PROBLEM 3
 * Write a generic pluck<T, K extends keyof T>(obj: T, key: K) function.
 */

// T = the object's type (inferred from the argument passed in)
// K = a key of T, constrained with `extends keyof T` so you can only ever
//     pass a key that actually exists on the object.
// The return type `T[K]` means TS knows the exact type of the value returned
// (a "lookup type"), not just `any`.
function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// ---- quick manual tests ----
interface User {
  id: number;
  name: string;
  isAdmin: boolean;
}

const user: User = { id: 1, name: "Ayesha", isAdmin: false };

const name = pluck(user, "name"); // inferred type: string
const isAdmin = pluck(user, "isAdmin"); // inferred type: boolean

console.log("Plucked name:", name);
console.log("Plucked isAdmin:", isAdmin);

// pluck(user, "email"); // <-- would fail to compile: "email" isn't a key of User

// Bonus: pluck works on arrays of objects too, using .map
function pluckAll<T, K extends keyof T>(arr: T[], key: K): T[K][] {
  return arr.map((item) => pluck(item, key));
}

const users: User[] = [
  { id: 1, name: "Ayesha", isAdmin: false },
  { id: 2, name: "Bilal", isAdmin: true },
];

console.log("All names:", pluckAll(users, "name"));

export { pluck, pluckAll };
