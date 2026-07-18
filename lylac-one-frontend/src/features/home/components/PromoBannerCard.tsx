import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SCHEME_CLASSES } from "@/lib/colorSchemes";
import type { PromoBanner } from "@/features/home/types";

/** Styling specific to this component's layout (title emphasis + the
 *  oversized background icon wash) that isn't shared with OrdersSection —
 *  surface/eyebrow color and button variant come from the shared
 *  `SCHEME_CLASSES` map instead of being redefined here. */
const TITLE_CLASS: Record<PromoBanner["scheme"], string> = {
  brand: "text-[var(--color-foreground)]",
  accent: "text-[var(--color-secondary)]",
};

const ICON_WASH_CLASS: Record<PromoBanner["scheme"], string> = {
  brand: "text-brand-200",
  accent: "text-accent-200",
};

export interface PromoBannerCardProps {
  banner: PromoBanner;
  onCtaClick?: (banner: PromoBanner) => void;
  className?: string;
}

/** Reusable promotional banner tile — pass any `PromoBanner` to render it. */
export function PromoBannerCard({ banner, onCtaClick, className }: PromoBannerCardProps) {
  const scheme = SCHEME_CLASSES[banner.scheme];
  const Icon = banner.icon;

  return (
    <div
      className={cn(
        "relative flex items-center justify-between overflow-hidden rounded-[var(--radius-xl)] p-5",
        scheme.surface,
        className,
      )}
    >
      <div className="relative z-10 max-w-[70%]">
        {banner.eyebrow && (
          <p className={cn("text-xs font-semibold uppercase tracking-wide", scheme.foreground)}>
            {banner.eyebrow}
          </p>
        )}
        <p className={cn("text-2xl font-extrabold leading-tight", TITLE_CLASS[banner.scheme])}>
          {banner.title}
        </p>
        <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">{banner.description}</p>

        <Button
          variant={scheme.buttonVariant}
          size="sm"
          onClick={() => onCtaClick?.(banner)}
          className="mt-4"
        >
          {banner.ctaLabel}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Button>
      </div>

      <motion.div
        aria-hidden="true"
        className={cn("absolute -right-4 -bottom-4", ICON_WASH_CLASS[banner.scheme])}
        animate={{ x: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
      >
        <Icon className="size-28" strokeWidth={1.25} />
      </motion.div>
    </div>
  );
}
