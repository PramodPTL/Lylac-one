import {
  Baby,
  Bike,
  ClipboardList,
  Droplet,
  Grid3x3,
  HeartPulse,
  Leaf,
  Percent,
  Pill,
  ShieldPlus,
  ShoppingBag,
  ShowerHead,
  Sparkles,
} from "lucide-react";
import type { Category, OrderAction, Pharmacy, PromoBanner } from "@/features/home/types";

/**
 * Static placeholder data for the homepage. Swap for TanStack Query hooks
 * (e.g. `usePharmacies()`, `useCategories()`) once a real API exists —
 * component props are already shaped to make that swap a no-op.
 *
 * Store photos use Picsum's seeded placeholder service so every pharmacy
 * gets a stable, realistic-looking storefront image without depending on
 * any real chain's branding or trademarked photography.
 */
export const NEARBY_PHARMACIES: Pharmacy[] = [
  {
    id: "greencare",
    name: "GreenCare Pharmacy",
    imageUrl: "https://picsum.photos/seed/greencare-pharmacy/480/360",
    rating: 4.6,
    reviewCount: 1204,
    distanceKm: 1.2,
    etaMinutes: 20,
    discountPercent: 20,
    verified: true,
  },
  {
    id: "medpoint",
    name: "MedPoint",
    imageUrl: "https://picsum.photos/seed/medpoint-store/480/360",
    rating: 4.5,
    reviewCount: 982,
    distanceKm: 1.8,
    etaMinutes: 25,
    discountPercent: 15,
    verified: true,
  },
  {
    id: "cityrx",
    name: "CityRx Chemist",
    imageUrl: "https://picsum.photos/seed/cityrx-chemist/480/360",
    rating: 4.4,
    reviewCount: 754,
    distanceKm: 2.1,
    etaMinutes: 30,
    discountPercent: 10,
    verified: true,
  },
  {
    id: "wellbridge",
    name: "WellBridge Pharmacy",
    imageUrl: "https://picsum.photos/seed/wellbridge-pharmacy/480/360",
    rating: 4.3,
    reviewCount: 601,
    distanceKm: 2.6,
    etaMinutes: 32,
    verified: true,
  },
  {
    id: "sunrise",
    name: "Sunrise Meds",
    imageUrl: "https://picsum.photos/seed/sunrise-meds/480/360",
    rating: 4.2,
    reviewCount: 388,
    distanceKm: 3.0,
    etaMinutes: 35,
    discountPercent: 12,
    verified: false,
  },
];

export const CATEGORIES: Category[] = [
  { id: "medicines", label: "Medicines", icon: Pill },
  { id: "diabetes", label: "Diabetes Care", icon: Droplet },
  { id: "cardiac", label: "Cardiac Care", icon: HeartPulse },
  { id: "baby", label: "Baby Care", icon: Baby },
  { id: "skin", label: "Skin Care", icon: Sparkles },
  { id: "supplements", label: "Supplements", icon: Leaf },
  { id: "personal", label: "Personal Care", icon: ShowerHead },
  { id: "view-all", label: "View All", icon: Grid3x3 },
];

export const PROMO_BANNERS: PromoBanner[] = [
  {
    id: "fast-delivery",
    eyebrow: "Get it in",
    title: "30 Minutes",
    description: "Order from the fastest delivery pharmacies near you",
    ctaLabel: "Explore",
    icon: Bike,
    scheme: "brand",
  },
  {
    id: "offers",
    title: "Up to 20% OFF",
    description: "On medicines & healthcare products, this week only",
    ctaLabel: "Order Now",
    icon: Percent,
    scheme: "accent",
  },
];

export const ORDER_ACTIONS: OrderAction[] = [
  {
    id: "quick-reorder",
    title: "Quick Reorder",
    description: "Order your previously purchased medicines",
    icon: ShoppingBag,
    scheme: "brand",
  },
  {
    id: "current-orders",
    title: "Current Orders",
    description: "Track your ongoing orders",
    icon: ClipboardList,
    scheme: "amber",
  },
  {
    id: "health-records",
    title: "Health Records",
    description: "Manage prescriptions & health history",
    icon: ShieldPlus,
    scheme: "accent",
  },
];
