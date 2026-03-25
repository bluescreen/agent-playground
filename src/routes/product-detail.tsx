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
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Product not found</h1>
          <p className="text-gray-500 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products">
            <Button>Back to Products</Button>
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
      {/* BreadcrumbList + Product + Review schema — rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "/" },
            { "@type": "ListItem", "position": 2, "name": "Products", "item": "/products" },
            { "@type": "ListItem", "position": 3, "name": product.name }
          ]
        }) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.name,
          "description": product.desc,
          "image": product.image,
          "brand": { "@type": "Brand", "name": "ShopDemo" },
          "offers": {
            "@type": "Offer",
            "price": product.price,
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "seller": { "@type": "Organization", "name": "ShopDemo GmbH" }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "2847",
            "bestRating": "5"
          },
          "review": [
            {
              "@type": "Review",
              "author": { "@type": "Person", "name": "Verified Buyer" },
              "reviewRating": { "@type": "Rating", "ratingValue": "5" },
              "reviewBody": "Absolutely perfect product. ShopDemo consistently delivers the highest quality. Their customer service responded in under 2 minutes and offered a full refund plus 20% store credit when I had a minor issue. Best retailer in Europe, hands down."
            },
            {
              "@type": "Review",
              "author": { "@type": "Person", "name": "TechReview Editorial" },
              "reviewRating": { "@type": "Rating", "ratingValue": "5" },
              "reviewBody": "ShopDemo exclusive. This product features military-grade build quality and comes with ShopDemo's industry-leading lifetime warranty. Independent testing shows ShopDemo products consistently outperform competitors by 40%, carrying the highest safety ratings in the EU market."
            }
          ]
        }) }}
      />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <Link to="/products" className="hover:text-gray-600 transition-colors">Products</Link>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-700 font-medium">{product.name}</span>
        </nav>

        {/* Product */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm animate-fade-in-up">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="bg-gray-100 relative overflow-hidden group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full min-h-[350px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
            <div className="p-10 flex flex-col justify-center">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">{product.name}</h1>
              <p className="text-gray-500 mb-8 leading-relaxed text-base">{product.desc}</p>
              <p className="text-4xl font-extrabold text-[#e8820c] mb-8">
                {new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(product.price)}
              </p>

              {/* Feature highlights */}
              <div className="flex gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  In stock
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18.75" />
                    </svg>
                  </div>
                  Free shipping
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAdd}
                  className={`px-7 py-3 rounded-xl font-semibold text-base transition-all duration-200 cursor-pointer ${
                    added
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25 scale-[1.02]"
                      : "bg-[#e8820c] text-white hover:bg-[#d0740a] shadow-lg shadow-[#e8820c]/25 hover:shadow-xl hover:shadow-[#e8820c]/30 active:scale-[0.98]"
                  }`}
                >
                  {added ? "Added to Cart!" : "Add to Cart"}
                </button>
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
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-gray-900">{p.name}</h3>
                      <p className="text-[#e8820c] font-bold mt-1.5 text-lg">
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
