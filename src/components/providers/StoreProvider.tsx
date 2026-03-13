"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { brand } from "@/lib/brand";
import type { CartItem } from "@/lib/types";

type DrawerName = "menu" | "search" | "wishlist" | "cart" | null;

interface StoreContextValue {
  activeDrawer: DrawerName;
  cart: CartItem[];
  wishlist: string[];
  openDrawer: (drawer: Exclude<DrawerName, null>) => void;
  closeDrawer: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  addToCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CART_KEY = `${brand.storagePrefix}-cart`;
const WISHLIST_KEY = `${brand.storagePrefix}-wishlist`;

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [activeDrawer, setActiveDrawer] = useState<DrawerName>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    let ignore = false;

    try {
      const nextCart = window.localStorage.getItem(CART_KEY);
      const nextWishlist = window.localStorage.getItem(WISHLIST_KEY);

      if (!ignore) {
        setCart(nextCart ? (JSON.parse(nextCart) as CartItem[]) : []);
        setWishlist(nextWishlist ? (JSON.parse(nextWishlist) as string[]) : []);
      }
    } catch {
      if (!ignore) {
        setCart([]);
        setWishlist([]);
      }
    }

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const value: StoreContextValue = {
    activeDrawer,
    cart,
    wishlist,
    openDrawer(drawer) {
      startTransition(() => {
        setActiveDrawer(drawer);
      });
    },
    closeDrawer() {
      startTransition(() => {
        setActiveDrawer(null);
      });
    },
    toggleWishlist(productId) {
      setWishlist((current) =>
        current.includes(productId)
          ? current.filter((item) => item !== productId)
          : [...current, productId],
      );
    },
    isWishlisted(productId) {
      return wishlist.includes(productId);
    },
    addToCart(productId) {
      setCart((current) => {
        const existing = current.find((item) => item.productId === productId);

        if (existing) {
          return current.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }

        return [...current, { productId, quantity: 1 }];
      });

      setActiveDrawer("cart");
    },
    updateQuantity(productId, quantity) {
      setCart((current) =>
        current
          .map((item) =>
            item.productId === productId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item,
          )
          .filter((item) => item.quantity > 0),
      );
    },
    removeFromCart(productId) {
      setCart((current) => current.filter((item) => item.productId !== productId));
    },
    clearCart() {
      setCart([]);
    },
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const value = useContext(StoreContext);

  if (!value) {
    throw new Error("useStore must be used within StoreProvider.");
  }

  return value;
}
