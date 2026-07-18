import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Category } from "@/features/home/types";
import { fadeInUp, revealOnceGenerous, staggerContainer } from "@/lib/motion";

export interface CategoryGridProps {
  categories: Category[];
  onSelect?: (category: Category) => void;
  onViewAll?: () => void;
}

const grid = staggerContainer(0.04);
const tile = fadeInUp(10, 0.3);

export function CategoryGrid({ categories, onSelect, onViewAll }: CategoryGridProps) {
  return (
    <section aria-labelledby="categories-heading" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 id="categories-heading" className="text-lg font-bold text-[var(--color-foreground)]">
          Shop by Category
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

      <motion.ul
        variants={grid}
        initial="hidden"
        whileInView="show"
        viewport={revealOnceGenerous}
        className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8"
      >
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <motion.li key={category.id} variants={tile}>
              <button
                type="button"
                onClick={() => onSelect?.(category)}
                className="flex w-full flex-col items-center gap-2 rounded-[var(--radius-lg)] p-1.5 text-center transition-colors hover:bg-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
              >
                <motion.span
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex size-14 items-center justify-center rounded-[var(--radius-lg)] bg-brand-50 text-[var(--color-primary)]"
                >
                  <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
                </motion.span>
                <span className="text-[11px] font-medium leading-tight text-[var(--color-foreground)]">
                  {category.label}
                </span>
              </button>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
