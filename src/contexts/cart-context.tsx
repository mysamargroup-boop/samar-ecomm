'use client';

import React, { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import type { Product, CartItem } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const useCart = () => useContext(CartContext);

type CartProviderProps = {
  children: ReactNode;
};

const CART_STORAGE_KEY = 'samar-store-cart';

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedItems = localStorage.getItem(CART_STORAGE_KEY);
      if (storedItems) {
        setCartItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        } catch (error) {
            console.error("Failed to save cart to localStorage", error);
        }
    }
  }, [cartItems, isInitialized]);


  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);
        if (existingItem) {
            return prevItems.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            );
        }
        const newItem: CartItem = {
            id: product.id,
            name: product.name,
            price: product.salePrice ?? product.price,
            image: product.images[0],
            quantity: quantity,
        };
        return [...prevItems, newItem];
    });
    toast({
      title: 'Added to Cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
     toast({
      title: 'Item Removed',
      description: 'The item has been removed from your cart.',
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) => 
        prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  }

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const value = { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
