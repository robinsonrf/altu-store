import type { Money } from "@/domain/product";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
  imageAlt: string;
  size: string;
  color: string;
  price: Money;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  updatedAt: string | null;
};
