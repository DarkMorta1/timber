import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types";

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string, variantId?: string) => void;
    updateQuantity: (id: string, quantity: number, variantId?: string) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            items: [],
            addItem: (newItem) =>
                set((state) => {
                    const existingItem = state.items.find(
                        (item) => item.id === newItem.id && item.variantId === newItem.variantId
                    );
                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.id === newItem.id && item.variantId === newItem.variantId
                                    ? { ...item, quantity: item.quantity + newItem.quantity }
                                    : item
                            ),
                        };
                    }
                    return { items: [...state.items, newItem] };
                }),
            removeItem: (id, variantId) =>
                set((state) => ({
                    items: state.items.filter(
                        (item) => !(item.id === id && item.variantId === variantId)
                    ),
                })),
            updateQuantity: (id, quantity, variantId) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id && item.variantId === variantId ? { ...item, quantity } : item
                    ),
                })),
            clearCart: () => set({ items: [] }),
        }),
        {
            name: "timber-cart-storage",
        }
    )
);
