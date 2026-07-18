import { Bell, ChevronDown, MapPin, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { TailContainer } from "@/components/common/TailContainer";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { NAV_ITEMS } from "@/config/navigation";
import { cn } from "@/lib/utils";

export interface HeaderProps {
  deliveryCity?: string;
  deliveryPincode?: string;
  notificationCount?: number;
}

/**
 * Site header: delivery-location selector on the left, notifications and
 * profile entry points on the right. Kept presentational and stateless —
 * wire it up to real location/auth state where it's used.
 */
export function Header({
  deliveryCity = "Ahmedabad",
  deliveryPincode = "380015",
  notificationCount = 0,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-card)]/90 backdrop-blur">
      <TailContainer className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <button
          type="button"
          className="flex min-w-0 items-center gap-2 rounded-[var(--radius-md)] py-1 text-left transition-colors hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[var(--color-primary)]">
            <MapPin aria-hidden="true" className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-xs text-[var(--color-muted-foreground)]">
              Delivering to
            </span>
            <span className="flex items-center gap-1 truncate text-sm font-semibold text-[var(--color-foreground)]">
              {deliveryCity}, {deliveryPincode}
              <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-[var(--color-muted-foreground)]" />
            </span>
          </span>
        </button>

        {/* Desktop nav — bottom tab bar covers mobile/tablet (hidden lg+) */}
        <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:gap-1">
          {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand-50 text-[var(--color-primary)]"
                    : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]",
                )
              }
            >
              <Icon aria-hidden="true" className="size-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            aria-label={notificationCount > 0 ? `Notifications, ${notificationCount} unread` : "Notifications"}
            className="relative flex size-10 items-center justify-center rounded-full bg-[var(--color-muted)] text-[var(--color-foreground)] transition-colors hover:bg-surface-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
          >
            <Bell aria-hidden="true" className="size-5" />
            {notificationCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-[var(--color-danger)] text-[10px] font-bold text-white"
              >
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </button>

          <button
            type="button"
            aria-label="Account"
            className="flex size-10 items-center justify-center rounded-full bg-brand-50 text-[var(--color-primary)] transition-colors hover:bg-brand-100 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
          >
            <User aria-hidden="true" className="size-5" />
          </button>
        </div>
      </TailContainer>
    </header>
  );
}
