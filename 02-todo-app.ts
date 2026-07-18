/**
 * PRACTICE PROBLEM 2
 * Convert a plain-JS todo list app's functions to fully typed TS
 * (params, returns, array types).
 *
 * Below: the kind of plain-JS version you'd typically start with is shown
 * commented out, followed by the fully-typed TS conversion.
 */

/* ---------------- ORIGINAL PLAIN JS (for reference) ----------------
function createTodo(text) {
  return { id: Date.now(), text, completed: false };
}

function addTodo(todos, text) {
  return [...todos, createTodo(text)];
}

function toggleTodo(todos, id) {
  return todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
}

function removeTodo(todos, id) {
  return todos.filter(t => t.id !== id);
}

function getActiveTodos(todos) {
  return todos.filter(t => !t.completed);
}
--------------------------------------------------------------------- */

// 1. Define the shape of a single Todo item.
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// 2. Every function below is now fully typed: parameter types, return types,
//    and array element types are all explicit.

// A simple incrementing counter for unique ids. (Date.now() looks tempting,
// but two todos created in the same millisecond would collide — a real bug
// caught while testing this file.)
let nextId = 1;

function createTodo(text: string): Todo {
  return { id: nextId++, text, completed: false };
}

function addTodo(todos: Todo[], text: string): Todo[] {
  return [...todos, createTodo(text)];
}

function toggleTodo(todos: Todo[], id: number): Todo[] {
  return todos.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
}

function removeTodo(todos: Todo[], id: number): Todo[] {
  return todos.filter((t) => t.id !== id);
}

function getActiveTodos(todos: Todo[]): Todo[] {
  return todos.filter((t) => !t.completed);
}

function getCompletedTodos(todos: Todo[]): Todo[] {
  return todos.filter((t) => t.completed);
}

// ---- quick manual tests ----
let todos: Todo[] = [];
todos = addTodo(todos, "Learn TypeScript generics");
todos = addTodo(todos, "Finish internship homework");
todos = toggleTodo(todos, todos[0].id);

console.log("All todos:", todos);
console.log("Active todos:", getActiveTodos(todos));
console.log("Completed todos:", getCompletedTodos(todos));

todos = removeTodo(todos, todos[0].id);
console.log("After removing first todo:", todos);

export {
  Todo,
  createTodo,
  addTodo,
  toggleTodo,
  removeTodo,
  getActiveTodos,
  getCompletedTodos,
};
