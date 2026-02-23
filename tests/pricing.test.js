import test from "node:test";
import assert from "node:assert/strict";

import { calculateOptimalPrice } from "../build-tests/services/pricing.js";

test("enforces configured minimum price floor when raw price is low", () => {
  const result = calculateOptimalPrice({
    productId: "p-low",
    basePrice: 10,
    supplierCost: 20,
    inventoryLevel: 50,
    competitorPrices: [1],
    demandForecast: [0],
    seasonalFactor: 0.5,
  });

  assert.equal(result.finalPrice, 23.6);
  assert.equal(result.margin, 15.25);
  assert.equal(result.reasoning, "competitor=0.70 demand=0.75 inventory=1.00");
});

test("uses capped competitor and low-inventory multipliers", () => {
  const result = calculateOptimalPrice({
    productId: "p-hot",
    basePrice: 100,
    supplierCost: 50,
    inventoryLevel: 5,
    competitorPrices: [300, 300],
    demandForecast: [100, 100],
    seasonalFactor: 1,
  });

  assert.equal(result.finalPrice, 119.75);
  assert.equal(result.margin, 58.25);
  assert.equal(result.reasoning, "competitor=1.30 demand=1.25 inventory=1.15");
});

test("uses high-inventory discount multiplier", () => {
  const result = calculateOptimalPrice({
    productId: "p-overstock",
    basePrice: 80,
    supplierCost: 40,
    inventoryLevel: 200,
    competitorPrices: [10],
    demandForecast: [50],
    seasonalFactor: 1,
  });

  assert.equal(result.finalPrice, 70);
  assert.equal(result.margin, 42.86);
  assert.equal(result.reasoning, "competitor=0.70 demand=1.00 inventory=0.90");
});
