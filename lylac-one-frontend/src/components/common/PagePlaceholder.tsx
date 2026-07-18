import { TailContainer } from "@/components/common/TailContainer";
import type { LucideIcon } from "lucide-react";

export interface PagePlaceholderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
}

/**
 * Temporary content for routes that exist structurally but haven't been
 * designed yet. Swap the page's <PagePlaceholder /> for real sections as
 * they're built — the route/layout wiring won't need to change.
 */
export function PagePlaceholder({ title, description, icon: Icon }: PagePlaceholderProps) {
  return (
    <TailContainer className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
      {Icon && (
        <span className="flex size-14 items-center justify-center rounded-full bg-brand-50 text-[var(--color-primary)]">
          <Icon aria-hidden="true" className="size-7" />
        </span>
      )}
      <h1 className="text-xl font-bold text-[var(--color-foreground)]">{title}</h1>
      {description && (
        <p className="max-w-sm text-sm text-[var(--color-muted-foreground)]">{description}</p>
      )}
    </TailContainer>
  );
}
