import { create } from "zustand";

interface UiState {
  cartOpen: boolean;
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setMobileMenuOpen: (v: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  cartOpen: false,
  searchOpen: false,
  mobileMenuOpen: false,
  setCartOpen: (v) => set({ cartOpen: v }),
  setSearchOpen: (v) => set({ searchOpen: v }),
  setMobileMenuOpen: (v) => set({ mobileMenuOpen: v }),
}));
