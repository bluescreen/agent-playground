import { Link } from "react-router";
import { Button } from "./Button";
import { Card } from "./Card";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-3"
      />
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-gray-600 mb-3">
        {new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(product.price)}
      </p>
      <div className="mt-auto flex gap-2">
        <Link to={`/products/${product.id}`}>
          <Button variant="secondary" size="sm">
            Details
          </Button>
        </Link>
        <Button size="sm">Add to Cart</Button>
      </div>
    </Card>
  );
}
