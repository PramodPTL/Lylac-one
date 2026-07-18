import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocation, useOutlet } from "react-router-dom";

/**
 * Drop-in replacement for react-router's <Outlet /> that animates between
 * routes. Falls back to an instant, motion-free swap when the user prefers
 * reduced motion (Framer Motion animations run via JS, so the CSS-only
 * `prefers-reduced-motion` override in index.css can't catch these).
 */
export function AnimatedOutlet() {
  const location = useLocation();
  const element = useOutlet();
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion
    ? { initial: {}, animate: {}, exit: {} }
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
      };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={{ duration: prefersReducedMotion ? 0 : 0.22, ease: "easeOut" }}
      >
        {element}
      </motion.div>
    </AnimatePresence>
  );
}
