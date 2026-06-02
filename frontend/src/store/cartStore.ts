import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      isCartOpen: false,
      
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      
      addToCart: (product) => set((state) => {
        const existingItem = state.cartItems.find(item => item.id === product.id);
        if (existingItem) {
          return {
            cartItems: state.cartItems.map(item =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          };
        }
        return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
      }),
      
      removeFromCart: (productId) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.id !== productId)
      })),
      
      updateQuantity: (productId, quantity) => set((state) => ({
        cartItems: quantity === 0 
          ? state.cartItems.filter(item => item.id !== productId)
          : state.cartItems.map(item => item.id === productId ? { ...item, quantity } : item)
      })),
      
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: 'fruit-shop-cart', // name of the item in the storage (must be unique)
      partialize: (state) => ({ cartItems: state.cartItems }), // Persist only cartItems
    }
  )
);

// Selectors
export const selectTotalItems = (state: CartState) => 
  state.cartItems.reduce((total, item) => total + item.quantity, 0);

export const selectTotalPrice = (state: CartState) => 
  state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
