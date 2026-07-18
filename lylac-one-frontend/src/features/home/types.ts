import type { LucideIcon } from "lucide-react";

/** A single pharmacy listing shown in the nearby-pharmacies rail. */
export interface Pharmacy {
  id: string;
  name: string;
  /** Store photo URL. */
  imageUrl: string;
  rating: number;
  reviewCount: number;
  distanceKm: number;
  etaMinutes: number;
  discountPercent?: number;
  verified: boolean;
}

/** A "Shop by Category" tile. */
export interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
}

/** Color scheme shared by promo banners and order actions — kept as one
 *  union so `src/lib/colorSchemes.ts` can provide a single style map for
 *  both instead of each component inventing its own. */
export type AccentScheme = "brand" | "accent" | "amber";

export interface PromoBanner {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  ctaLabel: string;
  icon: LucideIcon;
  scheme: Extract<AccentScheme, "brand" | "accent">;
}

export interface OrderAction {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  scheme: AccentScheme;
}
