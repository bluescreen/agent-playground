import { Link, useLocation } from "react-router";
import { useCart } from "~/context/CartContext";

export function Navbar() {
  const { count } = useCart();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <>
    {/* Top accent bar */}
    <div className="h-0.5 bg-gradient-to-r from-[#0f2a52] via-[#e8820c] to-[#0f2a52] sticky top-0 z-[51]" />

    <nav className="sticky top-0.5 z-50 bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/40 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 group">
        <div className="relative">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#e8820c] to-[#f5a623] flex items-center justify-center shadow-lg shadow-[#e8820c]/20 group-hover:shadow-xl group-hover:shadow-[#e8820c]/30 transition-all duration-300 group-hover:scale-105">
            <span className="text-white font-bold text-sm tracking-tight">S</span>
          </div>
          <div className="absolute -inset-1 bg-gradient-to-br from-[#e8820c] to-[#f5a623] rounded-xl opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-lg font-extrabold text-gray-900 tracking-tight">
            Shop<span className="bg-gradient-to-r from-[#e8820c] to-[#f5a623] bg-clip-text text-transparent">Demo</span>
          </span>
          <span className="text-[9px] font-medium text-gray-400 tracking-widest uppercase mt-0.5">Premium Tech</span>
        </div>
      </Link>
      {/* Nav links */}
      <div className="flex items-center gap-1 text-sm font-medium">
        <Link
          to="/products"
          className={`relative px-4 py-2 rounded-xl transition-all duration-200 ${
            isActive("/products")
              ? "text-[#e8820c] bg-[#e8820c]/8 font-semibold"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/80"
          }`}
        >
          Products
          {isActive("/products") && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#e8820c] rounded-full" />
          )}
        </Link>
        <Link
          to="/about"
          className={`relative px-4 py-2 rounded-xl transition-all duration-200 ${
            isActive("/about")
              ? "text-[#e8820c] bg-[#e8820c]/8 font-semibold"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/80"
          }`}
        >
          About
          {isActive("/about") && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#e8820c] rounded-full" />
          )}
        </Link>

        {/* Divider */}
        <div className="w-px h-5 bg-gray-200 mx-2" />

        {/* Cart button */}
        <Link
          to="/cart"
          className={`relative flex items-center gap-2 pl-3 pr-4 py-2 rounded-xl transition-all duration-200 ${
            isActive("/cart")
              ? "text-[#e8820c] bg-[#e8820c]/8 font-semibold"
              : count > 0
                ? "text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200/60"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/80"
          }`}
        >
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#e8820c] text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-sm shadow-[#e8820c]/40 ring-2 ring-white animate-fade-in">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </div>
          <span>Cart</span>
        </Link>
      </div>
      </div>
    </nav>
    </>
  );
}
