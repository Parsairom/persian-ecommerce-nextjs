import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MockUser {
  name: string;
  phone: string;
}

interface AuthState {
  user: MockUser | null;
  login: (user: MockUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: "mp-auth" }
  )
);
