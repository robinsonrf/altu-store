import { useCartContext } from "@/features/cart/providers/cart-provider";

export function useCart() {
  return useCartContext();
}
