"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  useDarkMode,
  usePersistedState,
} from "@/shared/hooks/usePersistedState";
import { useProducts } from "@/shared/hooks/useCatalog";
import { STORE_BRAND, STORE_DETAILS } from "@/shared/utils/constants/mockData";
import { useStoreCart } from "../hooks/useStoreCart";
import { StoreHeader } from "./StoreHeader";
import { StoreCatalogSections } from "./StoreCatalogSections";
import { StoreInformationSections } from "./StoreInformationSections";
import {
  CartSwitchDialog,
  StoreFloatingActions,
  StoreSearchResults,
} from "./StoreOverlays";

export function StoreStorefront({
  store,
  isLive: _isLive,
}: {
  store: any;
  isLive?: boolean;
}) {
  const router = useRouter();
  const details = STORE_DETAILS[store.id] || STORE_DETAILS["ph-1"];
  const brand = STORE_BRAND[store.id] || STORE_BRAND["ph-1"];
  const theme = brand.theme;
  const [darkTheme, setDarkTheme] = useDarkMode();
  const [wishlist, setWishlist] = usePersistedState("lylac-wishlist", []);
  const [savedStores, setSavedStores] = usePersistedState(
    "lylac-saved-stores",
    [],
  );
  const [query, setQuery] = useState("");
  const {
    cart,
    cartCount,
    pendingItem,
    setPendingItem,
    addToCart,
    confirmSwitch,
    cartQty,
  } = useStoreCart(store);
  const productsQuery = useProducts({ store: store.code, count: 24 });
  const products = productsQuery.data?.products || [];
  const saved = savedStores.includes(store.id);
  const searchResults = useMemo(() => {
    if (!query) return [];
    const normalizedQuery = query.toLowerCase();
    return products.filter((medicine) =>
      `${medicine.name} ${medicine.brand} ${medicine.composition || ""}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [products, query]);

  const toggleWishlist = (id: string) => {
    setWishlist((currentWishlist) => {
      const exists = currentWishlist.includes(id);
      toast.success(exists ? "Removed from wishlist" : "Added to wishlist");
      return exists
        ? currentWishlist.filter((item) => item !== id)
        : [...currentWishlist, id];
    });
  };
  const toggleSave = () => {
    setSavedStores((currentStores) =>
      currentStores.includes(store.id)
        ? currentStores.filter((id) => id !== store.id)
        : [...currentStores, store.id],
    );
    toast.success(
      saved ? "Removed from saved pharmacies" : "Saved to your pharmacies",
    );
  };
  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const themeStyle = {
    "--pf-primary": theme.primary,
    "--pf-secondary": theme.secondary,
    "--pf-accent": theme.accent,
    "--pf-dark": theme.dark,
    "--pf-hero": theme.hero,
    fontFamily: theme.font,
  } as React.CSSProperties;

  return (
    <div style={themeStyle} className="min-h-screen bg-background">
      <StoreHeader
        store={store}
        brand={brand}
        theme={theme}
        query={query}
        onQueryChange={setQuery}
        cartCount={cartCount}
        saved={saved}
        onToggleSave={toggleSave}
        darkTheme={darkTheme}
        onToggleTheme={() =>
          setDarkTheme(darkTheme === "dark" ? "light" : "dark")
        }
        onOpenCart={() => router.push("/?view=cart")}
        onMarketplace={() => router.push("/")}
        onScroll={scrollTo}
      />
      <StoreSearchResults
        query={query}
        results={searchResults}
        store={store}
        theme={theme}
        cartQty={cartQty}
        onAddToCart={addToCart}
        onOpenMedicine={(id) =>
          router.push(`/?view=medicine&id=${id}&from=${store.slug}`)
        }
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
        onClear={() => setQuery("")}
        onSearchAll={() => router.push("/?view=search")}
        onNotify={() =>
          toast.success("We will notify you when it is available")
        }
      />
      {!query && (
        <>
          <StoreCatalogSections
            store={store}
            brand={brand}
            details={details}
            theme={theme}
            products={products}
            cartQty={cartQty}
            onOpenMedicine={(id) =>
              router.push(`/?view=medicine&id=${id}&from=${store.slug}`)
            }
            onAddToCart={addToCart}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            onScroll={scrollTo}
          />
          <StoreInformationSections
            store={store}
            brand={brand}
            details={details}
            theme={theme}
            onScroll={scrollTo}
            onMarketplace={() => router.push("/")}
            onSearchAll={() => router.push("/?view=search")}
            onNotify={() =>
              toast.success("We will notify you when it is available")
            }
          />
        </>
      )}
      <StoreFloatingActions
        store={store}
        brand={brand}
        theme={theme}
        cartCount={cartCount}
        onOpenCart={() => router.push("/?view=cart")}
      />
      <CartSwitchDialog
        pendingItem={pendingItem}
        cart={cart}
        store={store}
        theme={theme}
        onClose={() => setPendingItem(null)}
        onConfirm={confirmSwitch}
      />
    </div>
  );
}
