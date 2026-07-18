import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { SkipLink } from "@/components/common/SkipLink";
import { AnimatedOutlet } from "@/components/common/AnimatedOutlet";
import { useRouteChangeAnnouncement } from "@/hooks/useRouteChangeAnnouncement";

/**
 * Root application shell. Every route renders inside this via <Outlet />.
 * Keep this file free of page-specific content — it only owns structure:
 * header, the routed page area, and the bottom navigation.
 */
export function Layout() {
  const { ref: mainRef, announcement } = useRouteChangeAnnouncement<HTMLElement>();

  return (
    <div className="flex min-h-dvh flex-col bg-[var(--color-background)]">
      <SkipLink />
      <Header />

      <main
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        className="flex-1 pb-24 lg:pb-12"
      >
        <AnimatedOutlet />
      </main>

      <BottomNav />

      {/* Announces client-side navigations to screen readers */}
      <div aria-live="polite" role="status" className="sr-only">
        {announcement}
      </div>
    </div>
  );
}
