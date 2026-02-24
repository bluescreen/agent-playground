import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("products", "routes/products.tsx"),
  route("products/:id", "routes/product-detail.tsx"),
  route("cart", "routes/cart.tsx"),
  route("about", "routes/about.tsx"),
  route("ping", "routes/ping.ts"),
  route("logo.png", "routes/logo.ts"),
] satisfies RouteConfig;
