import { useParams, Link } from "react-router";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { Button } from "~/ui";
import { getProduct, PRODUCTS } from "~/data/products";
import { useCart } from "~/context/CartContext";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProduct(id ?? "");
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/products" className="text-blue-600 hover:underline">
            Back to products
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-gray-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-gray-600">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{product.name}</span>
        </nav>

        {/* Product */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full min-h-[300px] object-cover"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
              <p className="text-gray-500 mb-6 leading-relaxed">{product.desc}</p>
              <p className="text-3xl font-bold text-[#e8820c] mb-8">
                {new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(product.price)}
              </p>
              <div className="flex gap-3">
                <Button size="lg" onClick={handleAdd}>
                  {added ? "Added!" : "Add to Cart"}
                </Button>
                <Link to="/cart">
                  <Button size="lg" variant="secondary">View Cart</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold text-gray-900 mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.id} to={`/products/${p.id}`} className="group">
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <img src={p.image} alt={p.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900">{p.name}</h3>
                      <p className="text-[#e8820c] font-bold mt-1">
                        {new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(p.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
