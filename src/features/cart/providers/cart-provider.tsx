"use client";

import * as React from "react";

import type { CartItem, CartState } from "@/domain/cart";
import { cartReducer, initialCartState } from "@/features/cart/application/cart-reducer";

const STORAGE_KEY = "altu.cart.v1";

type CartContextValue = {
  state: CartState;
  count: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string, size: string, color: string) => void;
  updateQty: (id: string, size: string, color: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = React.createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(cartReducer, initialCartState);

  React.useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as CartState;
      if (Array.isArray(parsed.items)) {
        dispatch({ type: "hydrate", payload: parsed });
      }
    } catch {
      // Ignore corrupted cache.
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = React.useMemo<CartContextValue>(() => {
    const count = state.items.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = state.items.reduce(
      (acc, item) => acc + item.price.amount * item.quantity,
      0
    );

    return {
      state,
      count,
      subtotal,
      addItem: (item) => dispatch({ type: "add", payload: item }),
      removeItem: (id, size, color) =>
        dispatch({ type: "remove", payload: { id, size, color } }),
      updateQty: (id, size, color, quantity) =>
        dispatch({ type: "updateQty", payload: { id, size, color, quantity } }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = React.useContext(CartContext);
  if (!context) throw new Error("useCartContext debe usarse dentro de CartProvider.");
  return context;
}
