import type { Variants } from "framer-motion";

/**
 * Shared Framer Motion variant factories. Every homepage section was
 * redefining its own copy of "stagger children" / "fade + rise" objects
 * with slightly different numbers — this is the single implementation;
 * call sites pass their original distance/duration so none of them
 * changed visually.
 */

/**
 * Parent container that staggers its children in via `staggerChildren`/`delayChildren`.
 * Pass `selfFade: true` to also fade the container itself from 0→1 opacity
 * (used at the page level); section-level containers leave this off since
 * only their children animate opacity.
 */
export function staggerContainer(
  staggerChildren = 0.08,
  delayChildren = 0,
  selfFade = false,
): Variants {
  return {
    hidden: selfFade ? { opacity: 0 } : {},
    show: {
      opacity: 1,
      transition: { staggerChildren, delayChildren },
    },
  };
}

/** Child fade + vertical rise. `distance` is the starting Y offset in px. */
export function fadeInUp(distance = 12, duration = 0.35): Variants {
  return {
    hidden: { opacity: 0, y: distance },
    show: { opacity: 1, y: 0, transition: { duration, ease: "easeOut" } },
  };
}

/** Child fade + horizontal slide, used for rails scrolling in from the right. */
export function fadeInRight(distance = 24, duration = 0.4): Variants {
  return {
    hidden: { opacity: 0, x: distance },
    show: { opacity: 1, x: 0, transition: { duration, ease: "easeOut" } },
  };
}

/** "Reveal once" viewport config used by the pharmacy rail (needs less of
 *  the element visible before triggering, since it's a wide horizontal strip). */
export const revealOnce = { once: true, amount: 0.2 } as const;

/** "Reveal once" viewport config used by the other homepage sections. */
export const revealOnceGenerous = { once: true, amount: 0.3 } as const;
