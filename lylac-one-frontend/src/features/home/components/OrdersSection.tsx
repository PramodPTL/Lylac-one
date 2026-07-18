import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SCHEME_CLASSES } from "@/lib/colorSchemes";
import type { OrderAction } from "@/features/home/types";
import { fadeInUp, revealOnceGenerous, staggerContainer } from "@/lib/motion";

export interface OrdersSectionProps {
  actions: OrderAction[];
  onSelect?: (action: OrderAction) => void;
}

const grid = staggerContainer(0.08);
const cardVariant = fadeInUp(14, 0.35);

/**
 * Reusable, data-driven orders/quick-action grid. Pass any `OrderAction[]`
 * (from mock data today, from an API response later) to render it.
 */
export function OrdersSection({ actions, onSelect }: OrdersSectionProps) {
  return (
    <section aria-labelledby="orders-heading" className="space-y-4">
      <h2 id="orders-heading" className="text-lg font-bold text-[var(--color-foreground)]">
        Your Orders
      </h2>

      <motion.div
        variants={grid}
        initial="hidden"
        whileInView="show"
        viewport={revealOnceGenerous}
        className="grid grid-cols-1 gap-3 sm:grid-cols-3"
      >
        {actions.map((action) => {
          const Icon = action.icon;
          const scheme = SCHEME_CLASSES[action.scheme];

          return (
            <motion.button
              key={action.id}
              type="button"
              variants={cardVariant}
              whileHover={{ y: -2 }}
              onClick={() => onSelect?.(action)}
              className="flex items-start gap-3 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-card)] p-4 text-left shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
            >
              <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-md)]", scheme.surface, scheme.foreground)}>
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-[var(--color-foreground)]">
                  {action.title}
                </span>
                <span className="mt-0.5 block text-xs text-[var(--color-muted-foreground)]">
                  {action.description}
                </span>
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </section>
  );
}
