import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface UploadPrescriptionCardProps {
  onUpload?: () => void;
}

export function UploadPrescriptionCard({ onUpload }: UploadPrescriptionCardProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[var(--radius-xl)] border border-brand-100 bg-brand-50 p-4">
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
          <FileText aria-hidden="true" className="size-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-[var(--color-foreground)]">
            Upload Prescription
          </p>
          <p className="text-xs text-[var(--color-muted-foreground)]">
            Get medicines delivered hassle-free
          </p>
        </div>
      </div>

      <Button variant="outline" size="sm" onClick={onUpload} className="shrink-0">
        Upload Now
      </Button>
    </div>
  );
}
