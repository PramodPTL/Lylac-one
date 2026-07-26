import { notFound } from 'next/navigation';
import { PHARMACIES, STORE_DETAILS } from '@/lib/constants/mockData';
import { storeApi } from '@/lib/services';
import { STORE_CODE } from '@/lib/api';
import { StoreStorefront } from '@/components/lylac/store/StoreStorefront';

export async function generateStaticParams() {
  return PHARMACIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let store = PHARMACIES.find((p) => p.slug === slug);
  if (!store) {
    // Try backend
    try { store = await storeApi.getStore(slug.toUpperCase()); } catch { /* ignore */ }
  }
  if (!store) return { title: 'Store not found | Lylac One' };
  const details = STORE_DETAILS[store.id];
  const description = details?.description || `Order genuine medicines from ${store.name} delivered fast.`;
  const title = `${store.name} | Lylac One`;
  return {
    title, description,
    openGraph: { title, description, images: [{ url: store.image, width: 940, height: 650, alt: store.name }], type: 'website', siteName: 'Lylac One' },
    twitter: { card: 'summary_large_image', title, description, images: [store.image] },
  };
}

export default async function StorePage({ params }) {
  const { slug } = await params;
  let store = PHARMACIES.find((p) => p.slug === slug);
  let isLive = false;
  if (!store) {
    try {
      const code = slug.toUpperCase();
      store = await storeApi.getStore(code);
      isLive = true;
    } catch { /* fall through to 404 */ }
  }
  if (!store) notFound();
  return <StoreStorefront store={store} isLive={isLive} />;
}
