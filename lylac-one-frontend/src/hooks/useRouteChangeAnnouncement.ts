import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { NAV_ITEMS } from "@/config/navigation";

function pageTitleForPath(pathname: string): string {
  const match = NAV_ITEMS.find((item) => item.path === pathname);
  return match?.label ?? "Page";
}

/**
 * Attach `ref` to the page's <main> landmark. On every route change after
 * the initial load, focus moves there and `announcement` updates with a
 * screen-reader-only "X page loaded" message — the SPA equivalent of what
 * a full page navigation gives you for free.
 */
export function useRouteChangeAnnouncement<T extends HTMLElement>() {
  const location = useLocation();
  const ref = useRef<T>(null);
  const [announcement, setAnnouncement] = useState("");
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    ref.current?.focus();
    setAnnouncement(`${pageTitleForPath(location.pathname)} page loaded`);
  }, [location.pathname]);

  return { ref, announcement };
}
