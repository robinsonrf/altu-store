import type { CartItem, CartState } from "@/domain/cart";

export const initialCartState: CartState = {
  items: [],
  updatedAt: null,
};

type AddPayload = Omit<CartItem, "quantity"> & { quantity?: number };

export type CartAction =
  | { type: "hydrate"; payload: CartState }
  | { type: "add"; payload: AddPayload }
  | { type: "remove"; payload: { id: string; size: string; color: string } }
  | { type: "updateQty"; payload: { id: string; size: string; color: string; quantity: number } }
  | { type: "clear" };

function touch(state: CartState): CartState {
  return { ...state, updatedAt: new Date().toISOString() };
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return action.payload;
    case "add": {
      const qty = action.payload.quantity ?? 1;
      const existingIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );

      if (existingIndex >= 0) {
        const next = [...state.items];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + qty,
        };
        return touch({ ...state, items: next });
      }

      return touch({
        ...state,
        items: [...state.items, { ...action.payload, quantity: qty }],
      });
    }
    case "remove":
      return touch({
        ...state,
        items: state.items.filter(
          (item) =>
            !(
              item.id === action.payload.id &&
              item.size === action.payload.size &&
              item.color === action.payload.color
            )
        ),
      });
    case "updateQty":
      return touch({
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id &&
            item.size === action.payload.size &&
            item.color === action.payload.color
              ? { ...item, quantity: Math.max(1, action.payload.quantity) }
              : item
          )
          .filter((item) => item.quantity > 0),
      });
    case "clear":
      return touch({ ...state, items: [] });
    default:
      return state;
  }
}
