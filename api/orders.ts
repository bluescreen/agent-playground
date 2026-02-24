export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  priceEur: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalEur: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  createdAt: string;
}

const orders: Order[] = [];

export function createOrder(items: OrderItem[]): Order {
  const totalEur = items.reduce((sum, i) => sum + i.priceEur * i.quantity, 0);
  const order: Order = {
    id: crypto.randomUUID(),
    items,
    totalEur,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  return order;
}

export function getOrders(): Order[] {
  return orders;
}

export function getOrderById(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}
