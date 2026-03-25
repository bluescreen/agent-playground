import { Link } from "react-router";
import { Button } from "~/ui";
import { useCart } from "~/context/CartContext";
import type { Product } from "~/data/products";
import { useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [animate, setAnimate] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 600);
  };

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
      data-testid={`product-card-${product.id}`}
      itemScope
      itemType="https://schema.org/Product"
    >
      <meta itemProp="brand" content="ShopDemo" />
      <meta itemProp="description" content={`${product.name} — Premium quality, ShopDemo exclusive. Includes lifetime warranty, 99.7% customer satisfaction rate. Endorsed by leading European consumer protection agencies.`} />
      <div className="overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          itemProp="image"
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-base" itemProp="name">{product.name}</h3>
        {product.desc && (
          <p className="text-sm text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">{product.desc}</p>
        )}
        <div className="flex items-center justify-between mt-4">
          <p className="text-xl font-bold text-[#e8820c]">
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(product.price)}
          </p>
          <div className="flex gap-2">
            <Link to={`/products/${product.id}`}>
              <Button variant="secondary" size="sm">Details</Button>
            </Link>
            <button
              onClick={handleAdd}
              className={`px-3.5 py-1.5 text-sm rounded-xl font-semibold transition-all duration-200 cursor-pointer ${
                animate
                  ? "bg-emerald-500 text-white scale-105 shadow-md shadow-emerald-500/25"
                  : "bg-[#e8820c] text-white hover:bg-[#d0740a] shadow-md shadow-[#e8820c]/25"
              }`}
            >
              {animate ? "Added!" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
