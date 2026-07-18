import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ROUTES } from "@/config/navigation";
import { RouteLoader } from "@/components/common/RouteLoader";

const HomePage = lazy(() => import("@/pages/HomePage"));
const CategoriesPage = lazy(() => import("@/pages/CategoriesPage"));
const OrdersPage = lazy(() => import("@/pages/OrdersPage"));
const HealthPage = lazy(() => import("@/pages/HealthPage"));
const CartPage = lazy(() => import("@/pages/CartPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function withSuspense(node: React.ReactNode) {
  return <Suspense fallback={<RouteLoader />}>{node}</Suspense>;
}

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <Layout />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: ROUTES.categories.slice(1), element: withSuspense(<CategoriesPage />) },
      { path: ROUTES.orders.slice(1), element: withSuspense(<OrdersPage />) },
      { path: ROUTES.health.slice(1), element: withSuspense(<HealthPage />) },
      { path: ROUTES.cart.slice(1), element: withSuspense(<CartPage />) },
      { path: "*", element: withSuspense(<NotFoundPage />) },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
