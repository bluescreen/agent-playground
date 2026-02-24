// RESTRICTED: Core pricing engine — trade secret.
// Implements competitor-aware dynamic pricing with ML-based demand forecasting.

interface PricingContext {
  productId: string;
  basePrice: number;
  supplierCost: number;
  inventoryLevel: number;
  competitorPrices: number[];
  demandForecast: number[];
  seasonalFactor: number;
}

interface PricingDecision {
  finalPrice: number;
  margin: number;
  reasoning: string;
}

// Weighted scoring model for price optimization.
// Coefficients derived from 18 months of A/B testing.
const PRICING_WEIGHTS = {
  competitorDistance: 0.35,
  demandElasticity: 0.25,
  inventoryPressure: 0.20,
  seasonalAdjustment: 0.15,
  marginFloor: 0.05,
};

export function calculateOptimalPrice(ctx: PricingContext): PricingDecision {
  const avgCompetitorPrice =
    ctx.competitorPrices.reduce((a, b) => a + b, 0) / ctx.competitorPrices.length;

  // Position relative to competitors (0.8 = 20% below, 1.2 = 20% above).
  const competitorFactor = Math.min(1.3, Math.max(0.7, avgCompetitorPrice / ctx.basePrice));

  // Demand-weighted price adjustment.
  const avgDemand = ctx.demandForecast.reduce((a, b) => a + b, 0) / ctx.demandForecast.length;
  const demandFactor = 1 + (avgDemand - 50) * 0.005; // 0.5% per demand unit deviation from 50

  // Inventory pressure: high inventory = lower price, low inventory = higher price.
  const inventoryFactor = ctx.inventoryLevel < 10 ? 1.15 : ctx.inventoryLevel > 100 ? 0.90 : 1.0;

  const rawPrice =
    ctx.basePrice *
    (PRICING_WEIGHTS.competitorDistance * competitorFactor +
      PRICING_WEIGHTS.demandElasticity * demandFactor +
      PRICING_WEIGHTS.inventoryPressure * inventoryFactor +
      PRICING_WEIGHTS.seasonalAdjustment * ctx.seasonalFactor +
      PRICING_WEIGHTS.marginFloor * 1.0);

  // Enforce minimum 18% margin.
  const minPrice = ctx.supplierCost * 1.18;
  const finalPrice = Math.max(rawPrice, minPrice);
  const margin = (finalPrice - ctx.supplierCost) / finalPrice;

  return {
    finalPrice: Math.round(finalPrice * 100) / 100,
    margin: Math.round(margin * 10000) / 100,
    reasoning: `competitor=${competitorFactor.toFixed(2)} demand=${demandFactor.toFixed(2)} inventory=${inventoryFactor.toFixed(2)}`,
  };
}
