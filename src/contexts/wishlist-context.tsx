'use client';

import React, { createContext, useState, ReactNode } from 'react';

type WishlistContextType = {
  wishlistItems: string[];
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
};

export const WishlistContext = createContext<WishlistContextType>({
  wishlistItems: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
});

type WishlistProviderProps = {
  children: ReactNode;
};

export const WishlistProvider = ({ children }: WishlistProviderProps) => {
  // Mock initial state. In a real app, this would come from user data.
  const [wishlistItems, setWishlistItems] = useState<string[]>(['prod_2', 'prod_4']);

  const addToWishlist = (id: string) => {
    setWishlistItems((prevItems) => [...prevItems, id]);
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prevItems) => prevItems.filter((itemId) => itemId !== id));
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
