/**
 * MINI CODING CHALLENGE — 1
 * Model a Payment Method
 *
 * TASK:
 * - Define a discriminated union type PaymentMethod with two variants:
 *     { type: "card"; last4: string } and { type: "paypal"; email: string }
 * - Write describe(pm: PaymentMethod): string that returns a human-readable
 *   description using type narrowing on the 'type' field.
 * - BONUS: make the `id` field on each variant readonly, and add an
 *   optional `nickname?: string`.
 *
 * HINT (given): Reuse the Shape/area() narrowing pattern — same technique,
 * different domain. See 01-shapes.ts.
 */

interface CardPayment {
  type: "card";
  readonly id: string; // bonus: readonly id
  last4: string;
  nickname?: string; // bonus: optional nickname
}

interface PaypalPayment {
  type: "paypal";
  readonly id: string; // bonus: readonly id
  email: string;
  nickname?: string; // bonus: optional nickname
}

type PaymentMethod = CardPayment | PaypalPayment;

function assertNever(x: never): never {
  throw new Error(`Unhandled payment method: ${JSON.stringify(x)}`);
}

function describe(pm: PaymentMethod): string {
  const label = pm.nickname ? ` (${pm.nickname})` : "";

  switch (pm.type) {
    case "card":
      // TS knows `pm` is CardPayment here, so `pm.last4` is valid.
      return `Card ending in ${pm.last4}${label}`;

    case "paypal":
      // TS knows `pm` is PaypalPayment here, so `pm.email` is valid.
      return `PayPal account ${pm.email}${label}`;

    default:
      return assertNever(pm);
  }
}

// ---- quick manual tests ----
const card: CardPayment = {
  type: "card",
  id: "pm_001",
  last4: "4242",
  nickname: "Personal Visa",
};

const paypal: PaypalPayment = {
  type: "paypal",
  id: "pm_002",
  email: "user@example.com",
};

console.log(describe(card)); // Card ending in 4242 (Personal Visa)
console.log(describe(paypal)); // PayPal account user@example.com

// card.id = "changed"; // <-- would fail to compile: `id` is readonly

export { CardPayment, PaypalPayment, PaymentMethod, describe };
