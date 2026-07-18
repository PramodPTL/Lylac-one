import type { AccentScheme } from "@/features/home/types";

interface SchemeClasses {
  /** Light wash background, e.g. an icon chip or card surface. */
  surface: string;
  /** Foreground color for text/icons sitting on the wash. */
  foreground: string;
  /** Matching shadcn Button variant for CTAs in this scheme. */
  buttonVariant: "default" | "secondary";
}

/**
 * Single source of truth for the brand/accent/amber color schemes used by
 * promo banners and order-action cards. Both previously kept their own,
 * near-identical `Record<scheme, classes>` maps.
 */
export const SCHEME_CLASSES: Record<AccentScheme, SchemeClasses> = {
  brand: {
    surface: "bg-brand-50",
    foreground: "text-[var(--color-primary)]",
    buttonVariant: "default",
  },
  accent: {
    surface: "bg-accent-50",
    foreground: "text-[var(--color-secondary)]",
    buttonVariant: "secondary",
  },
  amber: {
    surface: "bg-amber-50",
    foreground: "text-amber-600",
    buttonVariant: "default",
  },
};
