import { Link } from "react-router";

export function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight">
        ShopDemo
      </Link>
      <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
        <Link to="/products" className="hover:text-gray-900 transition-colors">Products</Link>
        <Link to="/about" className="hover:text-gray-900 transition-colors">About</Link>
        <Link to="/cart" className="hover:text-gray-900 transition-colors flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          Cart
        </Link>
      </div>
    </nav>
  );
}
