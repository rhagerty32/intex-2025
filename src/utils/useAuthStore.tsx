// stores/useAuthStore.ts
import { create } from 'zustand'

type AuthStore = {
    isLoggedIn: boolean
    setLoggedIn: (val: boolean) => void
    logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    isLoggedIn: false,
    setLoggedIn: (val) => set({ isLoggedIn: val }),
    logout: () => set({ isLoggedIn: false }),
}))