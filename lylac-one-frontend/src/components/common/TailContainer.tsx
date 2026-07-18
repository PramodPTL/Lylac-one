import * as React from "react";
import { cn } from "@/lib/utils";

type Tag = "div" | "section" | "main" | "header" | "footer" | "article";

export interface TailContainerProps
  extends React.HTMLAttributes<HTMLElement> {
  /** Element rendered — defaults to `div`. */
  as?: Tag;
  /** Removes the default horizontal gutter padding. */
  disableGutter?: boolean;
  /** Removes the max-width cap (still centers via mx-auto if content allows). */
  fluid?: boolean;
}

/**
 * TailContainer
 * --------------
 * The single source of truth for horizontal page rhythm. Every page/section
 * should nest its content inside this instead of hand-rolling `max-w-*
 * mx-auto px-*` combinations, so the app-wide gutter and max width stay
 * consistent and are only ever changed in one place.
 */
export const TailContainer = React.forwardRef<HTMLElement, TailContainerProps>(
  (
    { as = "div", className, disableGutter = false, fluid = false, children, ...props },
    ref,
  ) => {
    const Comp = as as React.ElementType;

    return (
      <Comp
        ref={ref}
        className={cn(
          "mx-auto w-full",
          !fluid && "max-w-(--container-app)",
          !disableGutter && "px-4 sm:px-6 lg:px-8 xl:px-10",
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
TailContainer.displayName = "TailContainer";
