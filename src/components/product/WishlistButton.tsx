"use client";

import clsx from "clsx";
import { Heart } from "lucide-react";

import { useStore } from "@/components/providers/StoreProvider";

export function WishlistButton({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) {
  const { isWishlisted, toggleWishlist } = useStore();
  const wishlisted = isWishlisted(productId);

  return (
    <button
      type="button"
      aria-pressed={wishlisted}
      aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      className={clsx(className)}
      data-active={wishlisted ? "true" : "false"}
      onClick={() => toggleWishlist(productId)}
    >
      <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
      {wishlisted ? "Saved to wishlist" : "Add to wishlist"}
    </button>
  );
}
