import { motion } from "framer-motion";
import { TailContainer } from "@/components/common/TailContainer";
import { SearchBar } from "@/features/home/components/SearchBar";
import { UploadPrescriptionCard } from "@/features/home/components/UploadPrescriptionCard";
import { NearbyPharmaciesSection } from "@/features/home/components/NearbyPharmaciesSection";
import { PromotionalBannersSection } from "@/features/home/components/PromotionalBannersSection";
import { CategoryGrid } from "@/features/home/components/CategoryGrid";
import { OrdersSection } from "@/features/home/components/OrdersSection";
import { CATEGORIES, NEARBY_PHARMACIES, ORDER_ACTIONS, PROMO_BANNERS } from "@/features/home/data/homeMockData";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const container = staggerContainer(0.08, 0.04, true);
const item = fadeInUp(12, 0.35);

export default function HomePage() {
  return (
    <TailContainer className="py-5 sm:py-6 lg:py-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-7 sm:gap-8 lg:gap-10"
      >
        <h1 className="sr-only">Lylac One — Home</h1>

        <motion.div variants={item}>
          <SearchBar />
        </motion.div>

        <motion.div variants={item}>
          <UploadPrescriptionCard />
        </motion.div>

        <motion.div variants={item}>
          <NearbyPharmaciesSection pharmacies={NEARBY_PHARMACIES} />
        </motion.div>

        <motion.div variants={item}>
          <PromotionalBannersSection banners={PROMO_BANNERS} />
        </motion.div>

        <motion.div variants={item}>
          <CategoryGrid categories={CATEGORIES} />
        </motion.div>

        <motion.div variants={item}>
          <OrdersSection actions={ORDER_ACTIONS} />
        </motion.div>
      </motion.div>
    </TailContainer>
  );
}
