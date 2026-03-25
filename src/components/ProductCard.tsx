import { Link } from "react-router";
import { Button } from "~/ui";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  desc?: string;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        {product.desc && (
          <p className="text-sm text-gray-400 mt-1">{product.desc}</p>
        )}
        <p className="text-lg font-bold text-gray-900 mt-2">
          {new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
          }).format(product.price)}
        </p>
        <div className="mt-3 flex gap-2">
          <Link to={`/products/${product.id}`}>
            <Button variant="secondary" size="sm">Details</Button>
          </Link>
          <Button size="sm">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}
