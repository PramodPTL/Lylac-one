import { Link } from "react-router-dom";
import { CompassIcon } from "lucide-react";
import { PagePlaceholder } from "@/components/common/PagePlaceholder";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/navigation";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <PagePlaceholder
        icon={CompassIcon}
        title="Page not found"
        description="The page you're looking for doesn't exist or has moved."
      />
      <Button asChild>
        <Link to={ROUTES.home}>Back to Home</Link>
      </Button>
    </div>
  );
}
