import { HeartPulse } from "lucide-react";
import { PagePlaceholder } from "@/components/common/PagePlaceholder";

export default function HealthPage() {
  return (
    <PagePlaceholder
      icon={HeartPulse}
      title="Health"
      description="Manage prescriptions and health records."
    />
  );
}
