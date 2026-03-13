"use client";

import { ShoppingBag } from "lucide-react";

import { useStore } from "@/components/providers/StoreProvider";

export function AddToCartButton({ productId }: { productId: string }) {
  const { addToCart } = useStore();

  return (
    <button type="button" className="button-primary" onClick={() => addToCart(productId)}>
      <ShoppingBag size={18} />
      Add to cart
    </button>
  );
}
