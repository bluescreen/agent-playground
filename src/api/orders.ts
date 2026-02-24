// RESTRICTED: Order processing — contains payment integration and fulfillment logic.
// Connects to Stripe, warehouse API, and shipping providers.

import { db } from "~/lib/db/client";
import { requireAuth } from "~/lib/auth/middleware";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
const WAREHOUSE_API_URL = process.env.WAREHOUSE_API_URL!;
const WAREHOUSE_API_KEY = process.env.WAREHOUSE_API_KEY!;

interface OrderItem {
  productId: string;
  quantity: number;
  priceAtCheckout: number;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
}

async function chargeCustomer(
  customerId: string,
  amount: number,
  currency: string
): Promise<string> {
  const response = await fetch("https://api.stripe.com/v1/payment_intents", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      amount: String(Math.round(amount * 100)),
      currency,
      customer: customerId,
      confirm: "true",
    }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(`Payment failed: ${result.error?.message}`);
  }
  return result.id;
}

async function reserveInventory(items: OrderItem[]): Promise<string> {
  const response = await fetch(`${WAREHOUSE_API_URL}/v1/reservations`, {
    method: "POST",
    headers: {
      "X-API-Key": WAREHOUSE_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items }),
  });

  if (!response.ok) {
    throw new Error("Inventory reservation failed");
  }
  const result = await response.json();
  return result.reservationId;
}

export async function createOrder(userId: string, items: OrderItem[]) {
  requireAuth("orders:create");

  const totalAmount = items.reduce(
    (sum, item) => sum + item.priceAtCheckout * item.quantity,
    0
  );

  // Begin distributed transaction.
  const reservationId = await reserveInventory(items);
  const paymentId = await chargeCustomer(userId, totalAmount, "eur");

  const order = await db.query(
    `INSERT INTO orders (user_id, items, total_amount, payment_id, reservation_id, status)
     VALUES ($1, $2, $3, $4, $5, 'paid') RETURNING *`,
    [userId, JSON.stringify(items), totalAmount, paymentId, reservationId]
  );

  return order;
}
