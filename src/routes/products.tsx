import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { ProductCard } from "~/components/ProductCard";

const PRODUCTS = [
  { id: "1", name: "Wireless Headphones", price: 79.99, image: "/images/headphones.jpg" },
  { id: "2", name: "Mechanical Keyboard", price: 129.99, image: "/images/keyboard.jpg" },
  { id: "3", name: "USB-C Hub", price: 49.99, image: "/images/hub.jpg" },
  { id: "4", name: "Monitor Stand", price: 39.99, image: "/images/stand.jpg" },
];

export default function Products() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
