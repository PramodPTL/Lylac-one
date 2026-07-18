import { motion } from "framer-motion";

export function RouteLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <motion.span
        className="size-8 rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-primary)]"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
        aria-label="Loading"
        role="status"
      />
    </div>
  );
}
