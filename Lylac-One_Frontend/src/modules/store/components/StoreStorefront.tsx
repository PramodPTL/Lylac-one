"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  useDarkMode,
  usePersistedState,
} from "@/shared/hooks/usePersistedState";
import { useCategories, useProducts } from "@/shared/hooks/useCatalog";
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

function parseConfiguration(value: unknown) {
  if (typeof value !== "string") return value || {};
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}

function recordsFromConfiguration(value: unknown) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  if (typeof value === "string")
    return recordsFromConfiguration(parseConfiguration(value));
  if (Array.isArray((value as any).data)) return (value as any).data;
  if (Array.isArray((value as any).items)) return (value as any).items;
  return [];
}

function formatBusinessHours(hours: any[], fallback: string) {
  const openHours = (Array.isArray(hours) ? hours : []).filter(
    (entry) => !entry.closed,
  );
  if (!openHours.length) return hours?.length ? "Closed" : fallback;
  if (openHours.some((entry) => entry.twentyFourHours)) return "Open 24 hours";
  const first = openHours[0];
  const formatTime = (value: string) => {
    if (!value) return "";
    const [hour, minute] = value.split(":").map(Number);
    if (!Number.isFinite(hour)) return value;
    const suffix = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}${minute ? `:${String(minute).padStart(2, "0")}` : ""} ${suffix}`;
  };
  const openingTime = formatTime(first.openingTime);
  const closingTime = formatTime(first.closingTime);
  return openingTime && closingTime
    ? `${openingTime} - ${closingTime}`
    : fallback;
}

function buildStoreExperience(store: any) {
  const configuration = store.configuration || {};
  const merchant = configuration.merchant || store.raw || {};
  const hasStoreConfiguration = Boolean(configuration.merchant);
  const fallbackBrand = STORE_BRAND[store.id] || {
    ...STORE_BRAND["ph-1"],
    slogan: store.shortDescription || `Welcome to ${store.name}`,
    tagline:
      store.description || `Shop healthcare essentials from ${store.name}.`,
    yearsInBusiness: 0,
    established: merchant.inBusinessSince
      ? new Date(merchant.inBusinessSince).getFullYear()
      : null,
    licenseNo: merchant.pharmacyLicenseNumber || "",
    ownerName: store.name,
    ownerTitle: "Pharmacy Team",
    ownerImage: store.image,
    contact: store.phone || "",
    whatsapp: store.whatsappNumber || "",
    testimonials: [],
    whyChoose: [],
  };
  const fallbackDetails = hasStoreConfiguration
    ? {
        description:
          store.description ||
          `Learn more about ${store.name} and its services.`,
        products: 0,
        categories: 0,
        ordersCompleted: null,
        avgDelivery: "at checkout",
        deliveryRadius: "Not specified",
        paymentOptions: "Contact store",
        license: merchant.pharmacyLicenseNumber || "",
        verified: merchant.isVerified === true,
      }
    : STORE_DETAILS[store.id] || STORE_DETAILS["ph-1"];
  const gatewayTheme = configuration.theme || {};
  const delivery = configuration.delivery || {};
  const payment = configuration.payment || {};
  const themeConfiguration = parseConfiguration(gatewayTheme.configuration);
  const homepageSections = recordsFromConfiguration(
    configuration.homepageSections,
  )
    .filter((section) => section.active !== false)
    .sort((left, right) => (left.displayOrder || 0) - (right.displayOrder || 0));
  const heroSection = homepageSections.find(
    (section) => section.sectionType?.toUpperCase() === "HERO",
  );
  const primary =
    gatewayTheme.primaryColor ||
    themeConfiguration.primaryColor ||
    fallbackBrand.theme.primary;
  const secondary =
    gatewayTheme.secondaryColor ||
    themeConfiguration.secondaryColor ||
    fallbackBrand.theme.secondary;
  const accent =
    gatewayTheme.accentColor ||
    themeConfiguration.accentColor ||
    fallbackBrand.theme.accent;
  const background =
    gatewayTheme.backgroundColor ||
    themeConfiguration.backgroundColor ||
    "#FFFFFF";
  const textColor =
    gatewayTheme.textColor ||
    themeConfiguration.textColor ||
    fallbackBrand.theme.dark;
  const font =
    gatewayTheme.fontFamily ||
    themeConfiguration.fontFamily ||
    fallbackBrand.theme.font;
  const logoUrl = gatewayTheme.logoUrl || store.logoUrl;
  const hours = formatBusinessHours(
    configuration.hours || [],
    fallbackBrand.theme ? store.hours : "9 AM - 10 PM",
  );
  const yearsInBusiness = merchant.inBusinessSince
    ? Math.max(
        0,
        new Date().getFullYear() -
          new Date(merchant.inBusinessSince).getFullYear(),
      )
    : fallbackBrand.yearsInBusiness;
  const paymentOptions = [
    payment.codEnabled && "COD",
    payment.onlinePaymentEnabled && "Cards",
    payment.upiEnabled && "UPI",
  ]
    .filter(Boolean)
    .join(", ");

  const brand = {
    ...fallbackBrand,
    slogan:
      heroSection?.title ||
      merchant.storeShortDescription ||
      store.shortDescription ||
      fallbackBrand.slogan,
    tagline:
      heroSection?.subtitle ||
      merchant.storeDescription ||
      store.description ||
      fallbackBrand.tagline,
    yearsInBusiness,
    established: merchant.inBusinessSince
      ? new Date(merchant.inBusinessSince).getFullYear()
      : fallbackBrand.established,
    licenseNo: merchant.pharmacyLicenseNumber || fallbackBrand.licenseNo,
    contact: merchant.storePhone || store.phone || fallbackBrand.contact,
    whatsapp: merchant.whatsappNumber || fallbackBrand.whatsapp,
    banner: store.coverImageUrl || store.image || fallbackBrand.banner,
    heroImage:
      heroSection?.imageUrl ||
      store.coverImageUrl ||
      store.image ||
      fallbackBrand.heroImage,
    theme: {
      ...fallbackBrand.theme,
      primary,
      secondary,
      accent,
      background,
      dark: textColor,
      font,
      borderRadius:
        gatewayTheme.borderRadius || themeConfiguration.borderRadius || "12px",
      buttonStyle: gatewayTheme.buttonStyle || themeConfiguration.buttonStyle,
      cardStyle: gatewayTheme.cardStyle || themeConfiguration.cardStyle,
      headerStyle: gatewayTheme.headerStyle || themeConfiguration.headerStyle,
      footerStyle: gatewayTheme.footerStyle || themeConfiguration.footerStyle,
      hero: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
    },
  };
  const deliveryTime =
    delivery.estimatedDeliveryMin != null &&
    delivery.estimatedDeliveryMax != null
      ? `${delivery.estimatedDeliveryMin}-${delivery.estimatedDeliveryMax} min`
      : delivery.estimatedDeliveryMin != null
        ? `${delivery.estimatedDeliveryMin} min`
        : fallbackDetails.avgDelivery;
  const deliveryZones = recordsFromConfiguration(
    configuration.deliveryZonesRecords,
  ).filter((zone) => zone.active !== false);
  const details = {
    ...fallbackDetails,
    description:
      merchant.storeDescription ||
      store.description ||
      fallbackDetails.description,
    avgDelivery: deliveryTime,
    deliveryRadius:
      delivery.deliveryRadiusKm != null
        ? `${delivery.deliveryRadiusKm} km`
        : deliveryZones.length
          ? `${deliveryZones.length} delivery zones`
          : fallbackDetails.deliveryRadius,
    minimumOrder:
      delivery.minimumOrderAmount ?? fallbackDetails.minimumOrderAmount,
    deliveryCharge: delivery.deliveryCharge,
    freeDeliveryAbove: delivery.freeDeliveryAbove,
    sameDayDelivery: delivery.sameDayDelivery,
    expressDelivery: delivery.expressDelivery,
    pickupEnabled: delivery.pickupEnabled,
    deliveryEnabled: delivery.deliveryEnabled,
    paymentOptions: paymentOptions || fallbackDetails.paymentOptions,
    license: merchant.pharmacyLicenseNumber || fallbackDetails.license,
    drugLicenseNumber: merchant.drugLicenseNumber,
    gstNumber: merchant.gstNumber,
    licenseExpiryDate: merchant.licenseExpiryDate,
    verified: merchant.isVerified ?? fallbackDetails.verified,
    configuredStore: hasStoreConfiguration,
  };
  const navigationRecords = recordsFromConfiguration(
    configuration.navigationRecords,
  );
  const policyRecords = recordsFromConfiguration(
    configuration.policyRecords,
  ).filter((record) => record.active !== false);
  const socialLinks = recordsFromConfiguration(configuration.social);
  const sectionRecords = recordsFromConfiguration(
    configuration.sectionRecords,
  ).filter((record) => record.active !== false);
  const configuredOffers = [...sectionRecords, ...homepageSections]
    .filter((record) =>
      /offer|promotion|discount/i.test(record.sectionType || ""),
    )
    .sort((left, right) => (left.displayOrder || 0) - (right.displayOrder || 0))
    .map((record) => ({
      title: record.title,
      subtitle: record.subtitle || record.content,
      code: parseConfiguration(record.configuration).code,
      color:
        parseConfiguration(record.configuration).color || brand.theme.primary,
    }))
    .filter((offer) => offer.title);
  const pageRecords = recordsFromConfiguration(
    configuration.pageRecords,
  ).filter((record) => record.published !== false);

  return {
    store: {
      ...store,
      name: merchant.storeName || store.name,
      hours,
      logoUrl,
      content: {
        navigation: navigationRecords,
        policies: policyRecords,
        socialLinks,
        sections: sectionRecords,
        pages: pageRecords,
        pageSections: recordsFromConfiguration(configuration.pageSections).filter(
          (record) => record.active !== false,
        ),
        homepageSections,
        offers: configuredOffers,
        payment,
        delivery,
        deliveryZones,
        hasBackendConfiguration: Boolean(
          configuration.theme || configuration.merchant,
        ),
      },
      minOrder: details.minimumOrder ?? store.minOrder,
      deliveryFee: details.deliveryCharge,
      freeDeliveryAbove: details.freeDeliveryAbove,
    },
    brand,
    details,
  };
}

export function StoreStorefront({
  store,
  isLive: _isLive,
}: {
  store: any;
  isLive?: boolean;
}) {
  const router = useRouter();
  const experience = buildStoreExperience(store);
  store = experience.store;
  const { details, brand } = experience;
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
  const categoriesQuery = useCategories();
  const products = productsQuery.data?.products || [];
  const categories = categoriesQuery.data || [];
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
    "--pf-surface": theme.background,
    "--pf-radius": theme.borderRadius,
    "--radius": theme.borderRadius,
    fontFamily: theme.font,
  } as React.CSSProperties;

  return (
    <div
      style={{
        ...themeStyle,
        backgroundColor: theme.background,
        color: theme.dark,
      }}
      className="storefront-theme min-h-screen bg-background"
      data-store-template={store.raw?.storeTemplate || undefined}
      data-header-style={theme.headerStyle || undefined}
      data-footer-style={theme.footerStyle || undefined}
      data-card-style={theme.cardStyle || undefined}
      data-button-style={theme.buttonStyle || undefined}
    >
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
        navigation={store.content?.navigation}
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
            categories={categories}
            offers={store.content?.offers}
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
            content={store.content}
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
