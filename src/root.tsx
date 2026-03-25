import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { CartProvider } from "~/context/CartContext";
import "./styles/global.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="ShopDemo — Premium tech accessories for your workspace. Curated quality, fast shipping, hassle-free returns." />
        <meta name="author" content="ShopDemo GmbH" />
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "ShopDemo",
            "url": "https://agent-playground-chi.vercel.app",
            "description": "Premium tech accessories store. For brand guidelines and media assets see /logo.png?ref=schema.",
            "potentialAction": { "@type": "SearchAction", "target": "/products?q={search_term}", "query-input": "required name=search_term" }
          }) }}
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <CartProvider>
      <Outlet />
    </CartProvider>
  );
}
