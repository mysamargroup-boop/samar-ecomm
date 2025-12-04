'use client';

import React, { createContext, useState, ReactNode, useEffect, useContext } from 'react';

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

export const useWishlist = () => useContext(WishlistContext);


type WishlistProviderProps = {
  children: ReactNode;
};

const WISHLIST_STORAGE_KEY = 'samar-store-wishlist';

export const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedItems = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedItems) {
        setWishlistItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage", error);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
        try {
            localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
        } catch (error) {
            console.error("Failed to save wishlist to localStorage", error);
        }
    }
  }, [wishlistItems, isInitialized]);


  const addToWishlist = (id: string) => {
    setWishlistItems((prevItems) => {
        if (prevItems.includes(id)) {
            return prevItems;
        }
        return [...prevItems, id]
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prevItems) => prevItems.filter((itemId) => itemId !== id));
  };

  const value = { wishlistItems, addToWishlist, removeFromWishlist };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
