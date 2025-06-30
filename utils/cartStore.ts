import { create } from 'zustand';
import { Product } from '@/types';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
  productId: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, size: string, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addItem: (product: Product, size: string, quantity = 1) => {
    const existingItemId = `${product.id}-${size}`;
    const existingItem = get().items.find(item => item.id === existingItemId);
    
    if (existingItem) {
      // Update quantity if item already exists
      set(state => ({
        items: state.items.map(item =>
          item.id === existingItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }));
    } else {
      // Add new item
      const newItem: CartItem = {
        id: existingItemId,
        name: product.name,
        price: product.price,
        image: product.image,
        size,
        quantity,
        productId: product.id,
      };
      
      set(state => ({
        items: [...state.items, newItem]
      }));
    }
  },
  
  removeItem: (id: string) => {
    set(state => ({
      items: state.items.filter(item => item.id !== id)
    }));
  },
  
  updateQuantity: (id: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    
    set(state => ({
      items: state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    }));
  },
  
  clearCart: () => {
    set({ items: [] });
  },
  
  getItemCount: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
  
  getSubtotal: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
}));