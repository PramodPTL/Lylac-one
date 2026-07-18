import { memo, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Bike, Heart, MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCompactNumber } from "@/lib/format";
import { Button } from "@/components/ui/button";
import type { Pharmacy } from "@/features/home/types";

export interface PharmacyCardProps {
  pharmacy: Pharmacy;
  onShopNow?: (pharmacy: Pharmacy) => void;
  onToggleWishlist?: (pharmacy: Pharmacy, saved: boolean) => void;
  className?: string;
}

/**
 * Reusable pharmacy card — store image, discount badge, wishlist toggle,
 * rating, distance, delivery time, and a Shop Now CTA. Used in the
 * nearby-pharmacies rail, and safe to reuse anywhere else a pharmacy list
 * is rendered (search results, category pages, etc).
 *
 * Memoized: this renders inside a list, and its own `saved` state
 * shouldn't force sibling cards to re-render when parent state changes.
 */
export const PharmacyCard = memo(function PharmacyCard({
  pharmacy,
  onShopNow,
  onToggleWishlist,
  className,
}: PharmacyCardProps) {
  const [saved, setSaved] = useState(false);

  const handleWishlistToggle = useCallback(() => {
    setSaved((prev) => {
      const next = !prev;
      onToggleWishlist?.(pharmacy, next);
      return next;
    });
  }, [onToggleWishlist, pharmacy]);

  const handleShopNow = useCallback(() => {
    onShopNow?.(pharmacy);
  }, [onShopNow, pharmacy]);

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn(
        "flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]",
        className,
      )}
    >
      {/* Store image */}
      <div className="relative h-32 w-full overflow-hidden bg-[var(--color-muted)]">
        <img
          src={pharmacy.imageUrl}
          alt={`${pharmacy.name} storefront`}
          loading="lazy"
          decoding="async"
          width={480}
          height={360}
          className="size-full object-cover"
        />

        {pharmacy.discountPercent && (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--color-primary)] px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
            {pharmacy.discountPercent}% OFF
          </span>
        )}

        <button
          type="button"
          onClick={handleWishlistToggle}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${pharmacy.name} from wishlist` : `Add ${pharmacy.name} to wishlist`}
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-surface-700 backdrop-blur transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <motion.span
            animate={saved ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Heart aria-hidden="true" className={cn("size-4", saved && "fill-rose-500 text-rose-500")} />
          </motion.span>
        </button>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-1.5">
          <h3 className="truncate text-sm font-bold text-[var(--color-foreground)]">
            {pharmacy.name}
          </h3>
          {pharmacy.verified && (
            <BadgeCheck
              role="img"
              aria-label="Verified pharmacy"
              className="size-4 shrink-0 text-[var(--color-primary)]"
            />
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-[var(--color-muted-foreground)]">
          <span className="flex items-center gap-1 font-semibold text-amber-600">
            <Star aria-hidden="true" className="size-3.5 fill-amber-500 text-amber-500" />
            {pharmacy.rating.toFixed(1)}
            <span className="font-normal text-[var(--color-muted-foreground)]">
              ({formatCompactNumber(pharmacy.reviewCount)})
            </span>
          </span>
          <span className="flex items-center gap-1">
            <MapPin aria-hidden="true" className="size-3.5" />
            {pharmacy.distanceKm} km
          </span>
        </div>

        <div className="flex items-center gap-1.5 rounded-[var(--radius-md)] bg-brand-50 px-2.5 py-1.5 text-xs font-semibold text-[var(--color-primary)]">
          <Bike aria-hidden="true" className="size-4" />
          {pharmacy.etaMinutes} mins delivery
        </div>

        <Button size="sm" className="mt-1 w-full" onClick={handleShopNow}>
          Shop Now
        </Button>
      </div>
    </motion.article>
  );
});
