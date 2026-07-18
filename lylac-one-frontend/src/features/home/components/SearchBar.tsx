import { ScanLine, Search } from "lucide-react";

export interface SearchBarProps {
  placeholder?: string;
  onScanClick?: () => void;
}

export function SearchBar({
  placeholder = "Search medicines, healthcare products...",
  onScanClick,
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-3">
      <label className="relative flex flex-1 items-center">
        <Search aria-hidden="true" className="pointer-events-none absolute left-4 size-5 text-[var(--color-muted-foreground)]" />
        <input
          type="search"
          placeholder={placeholder}
          aria-label={placeholder}
          className="h-12 w-full rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-card)] pl-11 pr-4 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
        />
      </label>

      <button
        type="button"
        onClick={onScanClick}
        aria-label="Scan prescription barcode"
        className="flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-xl)] bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-[var(--shadow-card)] transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2"
      >
        <ScanLine aria-hidden="true" className="size-5" />
      </button>
    </div>
  );
}
