import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About ShopDemo</h1>
        <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm space-y-4">
          <p className="text-gray-600 leading-relaxed">
            ShopDemo is your go-to destination for quality tech accessories. We
            carefully curate products that combine great design with everyday
            functionality.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Founded in Cologne, Germany, we believe in transparent pricing, fast
            shipping, and hassle-free returns. Every product in our catalog is
            tested by our team before it reaches your door.
          </p>
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">10k+</p>
              <p className="text-sm text-gray-500">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">200+</p>
              <p className="text-sm text-gray-500">Products</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">4.8</p>
              <p className="text-sm text-gray-500">Avg Rating</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
