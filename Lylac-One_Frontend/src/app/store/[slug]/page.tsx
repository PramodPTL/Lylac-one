import { notFound } from "next/navigation";
import { STORE_DETAILS } from "@/lib/constants/mockData";
import { storeApi } from "@/services";
import { STORE_CODE } from "@/lib/api";
import { StoreStorefront } from "@/modules/store/components/StoreStorefront";

export async function generateStaticParams() {
  return [{ slug: STORE_CODE.toLowerCase() }];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let store;
  try {
    store = await storeApi.getStore(slug.toUpperCase());
  } catch {
    /* ignore */
  }
  if (!store) return { title: "Store not found | Lylac One" };
  const details = STORE_DETAILS[store.id];
  const description =
    details?.description ||
    `Order genuine medicines from ${store.name} delivered fast.`;
  const title = `${store.name} | Lylac One`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: store.image, width: 940, height: 650, alt: store.name }],
      type: "website",
      siteName: "Lylac One",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [store.image],
    },
  };
}

export default async function StorePage({ params }) {
  const { slug } = await params;
  let store;
  let isLive = false;
  try {
    store = await storeApi.getStore(slug.toUpperCase());
    isLive = true;
  } catch {
    /* fall through to 404 */
  }
  if (!store) notFound();
  return <StoreStorefront store={store} isLive={isLive} />;
}
