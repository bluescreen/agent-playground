import { Button } from "~/ui";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export function CartItem({
  id,
  name,
  price,
  image,
  quantity,
  onRemove,
  onUpdateQuantity,
}: CartItemProps) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
      <img src={image} alt={name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">{name}</h3>
        <p className="text-sm text-gray-400">
          {new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(price)} each
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(id, quantity - 1)}
          disabled={quantity <= 1}
          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          -
        </button>
        <span className="w-8 text-center font-medium text-gray-900">{quantity}</span>
        <button
          onClick={() => onUpdateQuantity(id, quantity + 1)}
          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          +
        </button>
      </div>
      <p className="font-bold text-gray-900 w-20 text-right">
        {new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(price * quantity)}
      </p>
      <Button variant="danger" size="sm" onClick={() => onRemove(id)}>
        Remove
      </Button>
    </div>
  );
}
