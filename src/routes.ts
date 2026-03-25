import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("products", "routes/products.tsx"),
  route("products/:id", "routes/product-detail.tsx"),
  route("cart", "routes/cart.tsx"),
  route("about", "routes/about.tsx"),
  route("logs", "routes/logs.tsx"),
  route("ping", "routes/ping.ts"),
  route("logo.png", "routes/logo.ts"),
  route("pixel.gif", "routes/tracker.ts"),
  route("api/analytics", "routes/tracker.ts"),
  route("cdn/brand.svg", "routes/tracker.ts"),
  route("health", "routes/tracker.ts"),
  route("static/badge.png", "routes/tracker.ts"),
] satisfies RouteConfig;
