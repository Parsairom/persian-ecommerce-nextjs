import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartLine {
  productId: string;
  qty: number;
  colorId?: string;
}

interface CartState {
  lines: CartLine[];
  couponCode: string | null;
  addItem: (productId: string, qty?: number, colorId?: string) => void;
  removeItem: (productId: string, colorId?: string) => void;
  setQty: (productId: string, qty: number, colorId?: string) => void;
  applyCoupon: (code: string) => void;
  clearCoupon: () => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      couponCode: null,
      addItem: (productId, qty = 1, colorId) => {
        const lines = get().lines;
        const existing = lines.find((l) => l.productId === productId && l.colorId === colorId);
        if (existing) {
          set({
            lines: lines.map((l) =>
              l.productId === productId && l.colorId === colorId ? { ...l, qty: l.qty + qty } : l
            ),
          });
        } else {
          set({ lines: [...lines, { productId, qty, colorId }] });
        }
      },
      removeItem: (productId, colorId) =>
        set({ lines: get().lines.filter((l) => !(l.productId === productId && l.colorId === colorId)) }),
      setQty: (productId, qty, colorId) =>
        set({
          lines: get().lines.map((l) =>
            l.productId === productId && l.colorId === colorId ? { ...l, qty: Math.max(1, qty) } : l
          ),
        }),
      applyCoupon: (code) => set({ couponCode: code }),
      clearCoupon: () => set({ couponCode: null }),
      clear: () => set({ lines: [], couponCode: null }),
    }),
    { name: "mp-cart" }
  )
);
