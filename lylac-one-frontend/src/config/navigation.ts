import { Home, LayoutGrid, ClipboardList, HeartPulse, ShoppingCart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const ROUTES = {
  home: "/",
  categories: "/categories",
  orders: "/orders",
  health: "/health",
  cart: "/cart",
} as const;

/** Bottom tab bar items, in display order. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: ROUTES.home, icon: Home },
  { label: "Categories", path: ROUTES.categories, icon: LayoutGrid },
  { label: "Orders", path: ROUTES.orders, icon: ClipboardList },
  { label: "Health", path: ROUTES.health, icon: HeartPulse },
  { label: "Cart", path: ROUTES.cart, icon: ShoppingCart },
];
