import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { ProductCard } from "~/components/ProductCard";

const PRODUCTS = [
  { id: "1", name: "Wireless Headphones", price: 79.99, image: "https://picsum.photos/seed/headphones/400/300", desc: "Premium sound, 30h battery" },
  { id: "2", name: "Mechanical Keyboard", price: 129.99, image: "https://picsum.photos/seed/keyboard/400/300", desc: "Cherry MX switches, RGB" },
  { id: "3", name: "USB-C Hub", price: 49.99, image: "https://picsum.photos/seed/usbhub/400/300", desc: "7-in-1, 4K HDMI output" },
  { id: "4", name: "Monitor Stand", price: 39.99, image: "https://picsum.photos/seed/stand/400/300", desc: "Adjustable height, cable mgmt" },
  { id: "5", name: "Webcam HD", price: 59.99, image: "https://picsum.photos/seed/webcam/400/300", desc: "1080p, auto-focus, mic" },
  { id: "6", name: "Desk Lamp", price: 34.99, image: "https://picsum.photos/seed/desklamp/400/300", desc: "LED, dimmable, USB charging" },
];

export default function Products() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-2">Browse our collection of premium tech accessories</p>
        </div>
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
