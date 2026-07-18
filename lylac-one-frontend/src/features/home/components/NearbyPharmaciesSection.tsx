import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { PharmacyCard } from "@/features/home/components/PharmacyCard";
import type { Pharmacy } from "@/features/home/types";
import { fadeInRight, revealOnce, staggerContainer } from "@/lib/motion";

export interface NearbyPharmaciesSectionProps {
  pharmacies: Pharmacy[];
  onViewAll?: () => void;
  onShopNow?: (pharmacy: Pharmacy) => void;
  onToggleWishlist?: (pharmacy: Pharmacy, saved: boolean) => void;
}

const rail = staggerContainer(0.08);
const card = fadeInRight(24, 0.4);

export function NearbyPharmaciesSection({
  pharmacies,
  onViewAll,
  onShopNow,
  onToggleWishlist,
}: NearbyPharmaciesSectionProps) {
  return (
    <section aria-labelledby="nearby-pharmacies-heading" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 id="nearby-pharmacies-heading" className="text-lg font-bold text-[var(--color-foreground)]">
          Nearby Pharmacies
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="flex items-center gap-0.5 text-sm font-semibold text-[var(--color-primary)] hover:underline"
        >
          View all
          <ChevronRight aria-hidden="true" className="size-4" />
        </button>
      </div>

      <motion.div
        variants={rail}
        initial="hidden"
        whileInView="show"
        viewport={revealOnce}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scrollbar-none px-4 pb-1 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      >
        {pharmacies.map((pharmacy) => (
          <motion.div key={pharmacy.id} variants={card}>
            <PharmacyCard
              pharmacy={pharmacy}
              onShopNow={onShopNow}
              onToggleWishlist={onToggleWishlist}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
