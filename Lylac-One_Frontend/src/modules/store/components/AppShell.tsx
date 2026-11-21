"use client";

import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  ShoppingCart,
  User,
  Home,
  Grid3x3,
  Package,
  Bell,
  Heart,
  Sun,
  Moon,
  LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type View =
  | "home"
  | "location"
  | "search"
  | "categories"
  | "orders"
  | "cart"
  | "profile"
  | "profile-sub";

interface NavbarProps {
  location: string;
  cartCount: number;
  onNavigate: (view: View, subView?: string) => void;
  currentView: string;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onLoginClick: () => void;
  isAuthed: boolean;
}

interface NavLinkProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
}

interface BottomNavProps {
  currentView: string;
  onNavigate: (view: View) => void;
  cartCount: number;
}

// ─────────────────────────────────────────────
// Theme Icon Component
// ─────────────────────────────────────────────

function ThemeIcon({
  theme,
  mounted,
}: {
  theme: "light" | "dark";
  mounted: boolean;
}) {
  if (!mounted) {
    return <div className="w-5 h-5" aria-hidden="true" />;
  }

  return theme === "dark" ? (
    <Sun className="w-5 h-5" />
  ) : (
    <Moon className="w-5 h-5" />
  );
}

// ─────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────

export function Navbar({
  location,
  cartCount,
  onNavigate,
  currentView,
  theme,
  onToggleTheme,
  onLoginClick,
  isAuthed,
}: NavbarProps) {
  // Hooks MUST be inside the component
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* ───────────────── Desktop Navbar ───────────────── */}

      <header className="sticky top-0 z-40 hidden md:block bg-background/90 backdrop-blur-lg border-b border-border">
        <div className="container flex items-center gap-4 h-16">
          {/* Logo */}

          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-soft">
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>

            <span className="text-xl font-bold text-primary tracking-tight">
              Lylac<span className="text-secondary">One</span>
            </span>
          </button>

          {/* Location */}

          <button
            onClick={() => onNavigate("location")}
            className="flex items-center gap-1.5 pl-4 pr-3 py-1.5 rounded-full hover:bg-muted transition text-sm"
          >
            <MapPin className="w-4 h-4 text-primary" />

            <span className="font-medium max-w-[180px] truncate">
              {location}
            </span>

            <span className="text-muted-foreground text-xs">▼</span>
          </button>

          {/* Search */}

          <div className="flex-1 max-w-2xl">
            <button
              onClick={() => onNavigate("search")}
              className="w-full flex items-center gap-2 h-10 px-4 rounded-full bg-muted/70 hover:bg-muted transition text-sm text-muted-foreground"
            >
              <Search className="w-4 h-4" />

              <span>Search medicines, stores, health products…</span>
            </button>
          </div>

          {/* Navigation */}

          <nav className="flex items-center gap-1">
            <NavLink
              icon={Home}
              label="Home"
              active={currentView === "home"}
              onClick={() => onNavigate("home")}
            />

            <NavLink
              icon={Grid3x3}
              label="Categories"
              active={currentView === "categories"}
              onClick={() => onNavigate("categories")}
            />

            <NavLink
              icon={Package}
              label="Orders"
              active={currentView === "orders"}
              onClick={() => onNavigate("orders")}
            />

            {/* Desktop Theme Toggle */}

            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full hover:bg-muted transition"
              aria-label="Toggle theme"
            >
              <ThemeIcon theme={theme} mounted={mounted} />
            </button>

            {/* Cart */}

            <button
              onClick={() => onNavigate("cart")}
              className="relative p-2 rounded-full hover:bg-muted transition"
            >
              <ShoppingCart className="w-5 h-5" />

              {cartCount > 0 && (
                <Badge className="absolute -top-0.5 -right-0.5 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-secondary">
                  {cartCount}
                </Badge>
              )}
            </button>

            {/* Profile / Login */}

            {isAuthed ? (
              <button
                onClick={() => onNavigate("profile")}
                className="p-2 rounded-full hover:bg-muted transition"
              >
                <User className="w-5 h-5" />
              </button>
            ) : (
              <Button
                size="sm"
                onClick={onLoginClick}
                className="rounded-full ml-1"
              >
                Login
              </Button>
            )}
          </nav>
        </div>
      </header>

      {/* ───────────────── Mobile Top Bar ───────────────── */}

      <header className="sticky top-0 z-40 md:hidden bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Mobile Location */}

          <button
            onClick={() => onNavigate("location")}
            className="flex items-center gap-1 text-left"
          >
            <MapPin className="w-4 h-4 text-primary shrink-0" />

            <div className="min-w-0">
              <div className="text-[10px] text-muted-foreground uppercase font-semibold">
                Deliver to
              </div>

              <div className="text-sm font-semibold truncate max-w-[180px]">
                {location} ▼
              </div>
            </div>
          </button>

          {/* Mobile Actions */}

          <div className="flex items-center gap-1">
            {/* Mobile Theme Toggle */}

            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full hover:bg-muted"
              aria-label="Toggle theme"
            >
              <ThemeIcon theme={theme} mounted={mounted} />
            </button>

            {/* Notifications */}

            <button
              onClick={() => onNavigate("profile-sub", "notifications")}
              className="p-2 rounded-full hover:bg-muted"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
            </button>

            {/* Cart */}

            <button
              onClick={() => onNavigate("cart")}
              className="relative p-2 rounded-full hover:bg-muted"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />

              {cartCount > 0 && (
                <Badge className="absolute -top-0.5 -right-0.5 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-secondary">
                  {cartCount}
                </Badge>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}

        <div className="px-4 pb-3">
          <button
            onClick={() => onNavigate("search")}
            className="w-full flex items-center gap-2 h-10 px-4 rounded-full bg-muted/70 text-sm text-muted-foreground"
          >
            <Search className="w-4 h-4" />

            <span>Search medicines, stores…</span>
          </button>
        </div>
      </header>
    </>
  );
}

// ─────────────────────────────────────────────
// NavLink
// ─────────────────────────────────────────────

function NavLink({ icon: Icon, label, active, onClick }: NavLinkProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition ${
        active ? "bg-accent text-primary" : "text-foreground/70 hover:bg-muted"
      }`}
    >
      <Icon className="w-4 h-4" />

      {label}
    </button>
  );
}

// ─────────────────────────────────────────────
// Bottom Navigation
// ─────────────────────────────────────────────

export function BottomNav({
  currentView,
  onNavigate,
  cartCount,
}: BottomNavProps) {
  const items: {
    id: View;
    icon: LucideIcon;
    label: string;
  }[] = [
    { id: "home", icon: Home, label: "Home" },
    {
      id: "categories",
      icon: Grid3x3,
      label: "Categories",
    },
    { id: "search", icon: Search, label: "Search" },
    { id: "orders", icon: Package, label: "Orders" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border">
      <div className="grid grid-cols-5 px-2 py-1.5">
        {items.map((it) => {
          const active = currentView === it.id;
          const Icon = it.icon;

          return (
            <button
              key={it.id}
              onClick={() => onNavigate(it.id)}
              className="relative flex flex-col items-center gap-0.5 py-1.5"
            >
              {active && (
                <motion.div
                  layoutId="bnav-active"
                  className="absolute -top-1.5 w-8 h-1 rounded-full bg-primary"
                />
              )}

              <Icon
                className={`w-5 h-5 ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              />

              <span
                className={`text-[10px] font-medium ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {it.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────

export function Footer() {
  return (
    <footer className="hidden md:block border-t border-border bg-muted/30 mt-16">
      <div className="container py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Brand */}

        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" fill="white" />
            </div>

            <span className="text-lg font-bold text-primary">
              Lylac<span className="text-secondary">One</span>
            </span>
          </div>

          <p className="text-sm text-muted-foreground max-w-sm">
            Your neighbourhood pharmacy, delivered. Fast, verified & trusted
            healthcare — all in one app.
          </p>
        </div>

        {/* Footer Links */}

        {[
          {
            title: "Shop",
            items: ["Medicines", "Health Products", "Wellness", "Devices"],
          },
          {
            title: "Services",
            items: ["Doctor Consult", "Lab Tests", "Records", "Reminders"],
          },
          {
            title: "Company",
            items: ["About", "Careers", "Blog", "Contact"],
          },
        ].map((section) => (
          <div key={section.title}>
            <h4 className="font-semibold mb-3 text-sm">{section.title}</h4>

            <ul className="space-y-2 text-sm text-muted-foreground">
              {section.items.map((item) => (
                <li key={item} className="hover:text-primary cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Copyright */}

      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © 2025 Lylac One. Licensed pharmacy partner. All rights reserved.
      </div>
    </footer>
  );
}
