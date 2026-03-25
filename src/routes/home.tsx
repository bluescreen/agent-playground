import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { Link } from "react-router";

const FEATURED = [
  { name: "Wireless Headphones", price: 79.99, image: "https://picsum.photos/seed/headphones/400/300", tag: "Popular" },
  { name: "Mechanical Keyboard", price: 129.99, image: "https://picsum.photos/seed/keyboard/400/300", tag: "New" },
  { name: "USB-C Hub", price: 49.99, image: "https://picsum.photos/seed/usbhub/400/300", tag: "Best Value" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b1e3d] via-[#0f2a52] to-[#0b1e3d]">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#e8820c]/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] bg-[#1a6bb5]/20 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-24">
          {/* Logo — full-width hero image */}
          <div className="flex justify-center mb-16">
            <img
              src="/logo_new.png"
              alt="DemoShop"
              className="w-full max-w-3xl drop-shadow-2xl"
            />
          </div>

          {/* Copy block */}
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-5 tracking-tight">
              Tech you love,
              <br />
              <span className="bg-gradient-to-r from-[#e8820c] to-[#f5a623] bg-clip-text text-transparent">
                prices you'll love more.
              </span>
            </h1>
            <p className="text-blue-200/70 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              Premium accessories for your setup. Curated for quality, priced for everyone.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/products">
                <button className="bg-[#e8820c] hover:bg-[#d0740a] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-lg shadow-[#e8820c]/30 text-lg cursor-pointer">
                  Shop Now
                </button>
              </Link>
              <Link
                to="/about"
                className="text-white/70 hover:text-white transition-colors text-sm font-medium underline underline-offset-4 decoration-white/30 hover:decoration-white/60"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="-mt-6 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 px-6 py-5 grid grid-cols-3 divide-x divide-gray-100">
            <div className="flex flex-col items-center gap-2 px-4">
              <div className="w-10 h-10 rounded-full bg-[#0f2a52]/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0f2a52]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18.75M3.375 14.25h.008v.008h-.008v-.008zm0 0H7.5v-3.375a1.125 1.125 0 011.125-1.125h3.75a1.125 1.125 0 011.125 1.125V14.25h3.375" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Free Shipping</span>
              <span className="text-xs text-gray-400">Orders 50+ EUR</span>
            </div>
            <div className="flex flex-col items-center gap-2 px-4">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Secure Checkout</span>
              <span className="text-xs text-gray-400">SSL encrypted</span>
            </div>
            <div className="flex flex-col items-center gap-2 px-4">
              <div className="w-10 h-10 rounded-full bg-[#e8820c]/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#e8820c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">30-Day Returns</span>
              <span className="text-xs text-gray-400">No questions asked</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Featured Products</h2>
          <p className="text-gray-500 max-w-md mx-auto">Hand-picked favourites from our collection.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED.map((item) => (
            <Link to="/products" key={item.name} className="group">
              <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-[#0f2a52] px-3 py-1 rounded-full shadow-sm">
                    {item.tag}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[#e8820c] font-bold text-lg">
                      {new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(item.price)}
                    </p>
                    <span className="text-xs text-gray-400 group-hover:text-[#e8820c] transition-colors">
                      View details &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1e3d] to-[#1a3a6b]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to upgrade your setup?
          </h2>
          <p className="text-blue-200/70 mb-10 max-w-lg mx-auto text-lg">
            Join thousands of happy customers. Quality guaranteed or your money back.
          </p>
          <Link to="/products">
            <button className="bg-[#e8820c] hover:bg-[#d0740a] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-lg shadow-[#e8820c]/30 cursor-pointer">
              Browse All Products
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
