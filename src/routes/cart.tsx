import { useState } from "react";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { CartItem } from "~/components/CartItem";
import { Button, Card } from "~/ui";

interface CartEntry {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function Cart() {
  const [items, setItems] = useState<CartEntry[]>([
    { id: "1", name: "Wireless Headphones", price: 79.99, quantity: 1 },
    { id: "2", name: "Mechanical Keyboard", price: 129.99, quantity: 2 },
  ]);

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        {items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <Card>
            {items.map((item) => (
              <CartItem key={item.id} {...item} onRemove={handleRemove} />
            ))}
            <div className="flex justify-between items-center pt-4 mt-2">
              <span className="text-lg font-bold">
                Total:{" "}
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR",
                }).format(total)}
              </span>
              <Button>Checkout</Button>
            </div>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
}
