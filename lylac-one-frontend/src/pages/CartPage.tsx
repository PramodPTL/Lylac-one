import { ShoppingCart } from "lucide-react";
import { PagePlaceholder } from "@/components/common/PagePlaceholder";

export default function CartPage() {
  return (
    <PagePlaceholder
      icon={ShoppingCart}
      title="Cart"
      description="Review items before checkout."
    />
  );
}
