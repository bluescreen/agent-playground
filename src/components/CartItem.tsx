import { Button } from "~/ui";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  onRemove: (id: string) => void;
}

export function CartItem({
  id,
  name,
  price,
  quantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b">
      <div>
        <span className="font-medium">{name}</span>
        <span className="text-gray-500 ml-2">x{quantity}</span>
      </div>
      <div className="flex items-center gap-3">
        <span>
          {new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
          }).format(price * quantity)}
        </span>
        <Button variant="danger" size="sm" onClick={() => onRemove(id)}>
          Remove
        </Button>
      </div>
    </div>
  );
}
