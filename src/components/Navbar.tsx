import { Link } from "react-router";

export function Navbar() {
  return (
    <nav className="bg-white border-b px-6 py-3 flex items-center gap-6">
      <Link to="/" className="text-xl font-bold text-gray-900">
        ShopDemo
      </Link>
      <div className="flex gap-4">
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/about">About</Link>
        <Link to="/logs">Logs</Link>
      </div>
    </nav>
  );
}
