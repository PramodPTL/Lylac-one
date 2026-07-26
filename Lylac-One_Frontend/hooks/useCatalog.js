'use client';
import { useQuery } from '@tanstack/react-query';
import { medicineApi, storeApi, contentApi } from '@/lib/services';

export function useProducts(params) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => medicineApi.listProducts(params || {}),
    staleTime: 60_000,
  });
}
export function useProduct(slug) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => medicineApi.getProduct(slug),
    enabled: !!slug,
  });
}
export function useCategories() {
  return useQuery({ queryKey: ['categories'], queryFn: medicineApi.listCategories, staleTime: 300_000 });
}
export function useManufacturers() {
  return useQuery({ queryKey: ['manufacturers'], queryFn: medicineApi.listManufacturers, staleTime: 300_000 });
}
export function useReviews(id) {
  return useQuery({ queryKey: ['reviews', id], queryFn: () => medicineApi.listReviews(id), enabled: !!id });
}
export function useLiveStore(code) {
  return useQuery({ queryKey: ['store', code], queryFn: () => storeApi.getStore(code), enabled: !!code });
}
export function useContentBoxes() {
  return useQuery({ queryKey: ['content-boxes'], queryFn: contentApi.listContentBoxes });
}
