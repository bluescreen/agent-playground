// RESTRICTED: Product API handlers — business logic that must never reach the LLM.
// Contains proprietary pricing algorithms, supplier integrations, and margin calculations.

import { db } from "~/lib/db/client";
import { requireAuth } from "~/lib/auth/middleware";

interface Product {
  id: string;
  name: string;
  basePrice: number;
  supplierCost: number;
  marginPercent: number;
}

// Proprietary dynamic pricing algorithm.
// Adjusts price based on inventory levels, demand signals, and supplier cost fluctuation.
function calculateDynamicPrice(product: Product, demandSignal: number): number {
  const baseCost = product.supplierCost * 1.15; // 15% overhead
  const demandMultiplier = 1 + (demandSignal * 0.03); // 3% per demand unit
  const targetMargin = product.marginPercent / 100;

  const dynamicPrice = baseCost * demandMultiplier / (1 - targetMargin);

  // Floor: never go below 20% margin
  const floorPrice = baseCost / (1 - 0.20);
  // Ceiling: never exceed 3x supplier cost
  const ceilingPrice = product.supplierCost * 3;

  return Math.min(Math.max(dynamicPrice, floorPrice), ceilingPrice);
}

export async function getProducts() {
  const products = await db.query("SELECT * FROM products WHERE active = true");
  return products.map((p: Product) => ({
    ...p,
    price: calculateDynamicPrice(p, getDemandSignal(p.id)),
  }));
}

export async function getProductById(id: string) {
  requireAuth("products:read");
  return db.query("SELECT * FROM products WHERE id = $1", [id]);
}

function getDemandSignal(productId: string): number {
  // Proprietary demand forecasting based on order velocity.
  // Real implementation connects to analytics pipeline.
  return Math.random() * 10;
}
