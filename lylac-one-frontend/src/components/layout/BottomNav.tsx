import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/config/navigation";

/**
 * Fixed bottom tab bar (mobile-first, hidden on wide viewports where a
 * different primary nav pattern would typically take over). Active tab
 * gets a color change plus a small motion cue on the icon.
 */
export function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-card)]/95 backdrop-blur pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="mx-auto flex max-w-(--container-app) items-stretch justify-between px-2">
        {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
          <li key={path} className="flex-1">
            <NavLink
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                cn(
                  "relative flex min-h-11 flex-col items-center gap-1 rounded-[var(--radius-md)] py-2.5 text-[11px] font-medium transition-colors",
                  isActive
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)]",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      aria-hidden="true"
                      layoutId="bottom-nav-active-pill"
                      className="absolute inset-x-3 top-0.5 h-1 rounded-full bg-[var(--color-primary)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <motion.span
                    animate={{ scale: isActive ? 1.1 : 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Icon aria-hidden="true" className="size-6" strokeWidth={isActive ? 2.4 : 2} />
                  </motion.span>
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
