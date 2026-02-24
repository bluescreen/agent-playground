import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { Card } from "~/ui";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">About</h1>
        <Card>
          <p className="text-gray-600 mb-4">
            Welcome to ShopDemo, your trusted online shopping destination.
            We offer a curated selection of quality products with excellent
            customer service and fast, reliable shipping.
          </p>
          <p className="text-gray-600">
            Our mission is to make online shopping easy, affordable, and
            enjoyable. Browse our products, add items to your cart, and
            complete your purchase with just a few clicks.
          </p>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
