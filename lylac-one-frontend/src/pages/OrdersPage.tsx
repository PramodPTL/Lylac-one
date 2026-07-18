import { ClipboardList } from "lucide-react";
import { PagePlaceholder } from "@/components/common/PagePlaceholder";

export default function OrdersPage() {
  return (
    <PagePlaceholder
      icon={ClipboardList}
      title="Orders"
      description="Track your current and past orders."
    />
  );
}
