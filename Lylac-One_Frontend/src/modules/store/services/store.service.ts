import api, { fixImageUrl } from "@/lib/api";

// GET /api/v1/store/{code}
export async function getStore(code) {
  const { data } = await api.get(`/api/v1/store/${code}`);
  const store = normalizeStore(data?.merchantStore ? data : data?.data || data);
  if (!store) return null;

  const payload = data?.merchantStore ? data : data?.data || data;
  const merchantId =
    payload.merchantId ??
    payload.merchantStore?.merchantId ??
    payload.id ??
    payload.storeId;
  const configuration = hasEmbeddedConfiguration(payload)
    ? normalizeEmbeddedConfiguration(payload)
    : merchantId
      ? await getStoreConfiguration(merchantId)
      : null;
  return { ...store, merchantId, configuration };
}

function hasEmbeddedConfiguration(payload) {
  return [
    "storeThemeConfig",
    "storeSeoConfig",
    "storeDeliveryConfig",
    "storePaymentConfig",
    "homepageSections",
    "storeNavigation",
  ].some((key) => Object.prototype.hasOwnProperty.call(payload, key));
}

function normalizeEmbeddedConfiguration(payload) {
  return {
    merchant: payload.merchantStore || {},
    theme: normalizeImageFields(payload.storeThemeConfig, ["logoUrl"]),
    seo: normalizeImageFields(payload.storeSeoConfig, ["ogImage"]),
    delivery: payload.storeDeliveryConfig || null,
    deliveryZonesRecords: responseRecords(payload.storeDeliveryZones),
    payment: payload.storePaymentConfig || null,
    navigationRecords: responseRecords(payload.storeNavigation),
    homepageSections: responseRecords(payload.homepageSections).map((section) =>
      normalizeImageFields(section, ["imageUrl"]),
    ),
    pageRecords: responseRecords(payload.pages),
    pageSections: responseRecords(payload.pageSections).map((section) =>
      normalizeImageFields(section, ["imageUrl"]),
    ),
    social: responseRecords(payload.socialLinks),
    policyRecords: responseRecords(payload.policies),
    hours: responseRecords(payload.businessHours),
    sectionRecords: responseRecords(payload.sections),
  };
}

function normalizeImageFields(record, fields) {
  if (!record) return record;
  return fields.reduce(
    (normalized, field) => ({
      ...normalized,
      [field]: fixImageUrl(normalized[field]),
    }),
    record,
  );
}

export async function getNearbyStores(
  latitude: number,
  longitude: number,
  count = 10,
  page = 0,
) {
  const { data } = await api.get("/api/v1/nearbyStore", {
    params: { count, latitude, longitude, page },
  });

  const stores = Array.isArray(data)
    ? data
    : Array.isArray(data?.content)
      ? data.content
      : Array.isArray(data?.stores)
        ? data.stores
        : Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data?.data)
            ? data.data
            : [];

  return stores.map(normalizeStore).filter(Boolean);
}

const configurationPaths = (merchantId) => ({
  merchant: `/merchant-store/${merchantId}`,
  themeConfigs: `/merchant-store/${merchantId}/theme-configs`,
  socialLinks: `/merchant-store/${merchantId}/social-links`,
  seoConfigs: `/merchant-store/${merchantId}/seo-configs`,
  policies: `/merchant-store/${merchantId}/policies`,
  paymentConfigs: `/merchant-store/${merchantId}/payment-configs`,
  pages: `/merchant-store/${merchantId}/pages`,
  pageSections: `/merchant-store/${merchantId}/page-sections`,
  navigation: `/merchant-store/${merchantId}/navigation`,
  sections: `/merchant-store/${merchantId}/sections`,
  deliveryZones: `/merchant-store/${merchantId}/delivery-zones`,
  deliveryConfigs: `/merchant-store/${merchantId}/delivery-configs`,
  businessHours: `/merchant-store/${merchantId}/business-hours`,
});

const firstRecord = (value) => (Array.isArray(value) ? value[0] : value);
const responseRecords = (value) =>
  Array.isArray(value) ? value : value?.data || value?.items || [];

export async function getStoreConfiguration(merchantId) {
  const paths = configurationPaths(merchantId);
  const entries = await Promise.all(
    Object.entries(paths).map(async ([key, path]) => {
      try {
        const { data } = await api.get(path);
        return [key, data];
      } catch {
        return [key, null];
      }
    }),
  );

  const configuration = Object.fromEntries(entries);
  return {
    ...configuration,
    theme: firstRecord(configuration.themeConfigs),
    seo: firstRecord(configuration.seoConfigs),
    payment: firstRecord(configuration.paymentConfigs),
    delivery: firstRecord(configuration.deliveryConfigs),
    hours: responseRecords(configuration.businessHours),
    social: responseRecords(configuration.socialLinks),
    policyRecords: responseRecords(configuration.policies),
    pageRecords: responseRecords(configuration.pages),
    sectionRecords: responseRecords(
      configuration.pageSections || configuration.sections,
    ),
    navigationRecords: responseRecords(configuration.navigation),
    deliveryZonesRecords: responseRecords(configuration.deliveryZones),
  };
}
//http://localhost:8080/api/v1/private/stores?count=10&page=0

// GET /api/v1/private/stores  -- requires admin auth, may fail for customers
// Alternative: we know DEFAULT is the only public store.
// TODO: Backend has no public 'nearby pharmacies' endpoint — we fall back to mock list merged with live store.
export async function listStores() {
  try {
    const { data } = await api.get("/api/v1/private/stores");
    const arr = Array.isArray(data) ? data : data?.data || data?.stores || [];
    return arr.map(normalizeStore);
  } catch {
    return [];
  }
}

export function normalizeStore(s) {
  if (!s) return null;
  const merchant = s.merchantStore || s;
  const addr = merchant.address || {};
  const storeCode = merchant.code || merchant.storeCode || s.code || s.storeCode;
  const storeName = merchant.name || merchant.storeName || s.name || s.storeName;
  const logoUrl = fixImageUrl(
    merchant?.logo?.path || merchant.storeLogo || s?.logo?.path || s.storeLogo,
  );
  const coverImageUrl = fixImageUrl(merchant.coverImageUrl || s.coverImageUrl);
  return {
    id: `live-${storeCode || merchant.id || s.id}`,
    slug: (storeCode || "DEFAULT").toLowerCase(),
    code: storeCode || "DEFAULT",
    name: storeName || "Store",
    logo: (storeName || "S").charAt(0).toUpperCase(),
    logoUrl,
    coverImageUrl,
    image:
      coverImageUrl ||
      logoUrl ||
      "https://images.pexels.com/photos/32116001/pexels-photo-32116001.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    email: merchant.email || merchant.storeEmail,
    phone: merchant.phone || merchant.storePhone,
    currency: merchant.currency,
    inBusinessSince: merchant.inBusinessSince,
    address: [
      addr.address || merchant.storeAddress,
      addr.city || merchant.storeCity,
      addr.stateProvince || merchant.storeStateProv,
      addr.postalCode || merchant.storePostalCode,
    ]
      .filter(Boolean)
      .join(", "),
    description: merchant.description || merchant.storeDescription,
    shortDescription: merchant.shortDescription || merchant.storeShortDescription,
    acceptingOrders: merchant.acceptingOrders !== false,
    isVerified: merchant.isVerified,
    isFeatured: merchant.isFeatured,
    latitude: merchant.latitude,
    longitude: merchant.longitude,
    googlePlaceId: merchant.googlePlaceId,
    supportEmail: merchant.supportEmail,
    whatsappNumber: merchant.whatsappNumber,
    pharmacyLicenseNumber: merchant.pharmacyLicenseNumber,
    gstNumber: merchant.gstNumber,
    drugLicenseNumber: merchant.drugLicenseNumber,
    licenseExpiryDate: merchant.licenseExpiryDate,
    isLive: true,
    // Fields we don't get from backend — sensible defaults so cards render:
    rating: 4.7,
    reviews: 320,
    distance: "— km",
    deliveryTime: "30 min",
    isOpen: true,
    freeDelivery: true,
    minOrder: 99,
    discount: "15% OFF",
    categories: ["Medicines", "OTC", "Wellness"],
    hours: "9 AM - 10 PM",
    raw: merchant,
  };
}
