import { motion } from "framer-motion";
import { PromoBannerCard } from "@/features/home/components/PromoBannerCard";
import type { PromoBanner } from "@/features/home/types";
import { fadeInUp, revealOnceGenerous, staggerContainer } from "@/lib/motion";

export interface PromotionalBannersSectionProps {
  banners: PromoBanner[];
  onCtaClick?: (banner: PromoBanner) => void;
}

const grid = staggerContainer(0.1);
const tile = fadeInUp(16, 0.4);

export function PromotionalBannersSection({ banners, onCtaClick }: PromotionalBannersSectionProps) {
  return (
    <motion.section
      aria-label="Promotions"
      variants={grid}
      initial="hidden"
      whileInView="show"
      viewport={revealOnceGenerous}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      {banners.map((banner) => (
        <motion.div key={banner.id} variants={tile}>
          <PromoBannerCard banner={banner} onCtaClick={onCtaClick} />
        </motion.div>
      ))}
    </motion.section>
  );
}
