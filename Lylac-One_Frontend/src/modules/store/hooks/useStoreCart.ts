'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { usePersistedState } from '@/shared/hooks/usePersistedState';

export function useStoreCart(store: any) {
  const [cart, setCart] = usePersistedState('lylac-cart', []);
  const [currentStoreId, setCurrentStoreId] = usePersistedState('lylac-current-store', null);
  const [pendingItem, setPendingItem] = useState<{ medicine: any; delta: number } | null>(null);

  const addToCart = (medicine: any, delta: number) => {
    if (delta > 0 && currentStoreId && currentStoreId !== store.id && cart.length > 0) {
      setPendingItem({ medicine, delta });
      return;
    }

    setCart((currentCart) => {
      const index = currentCart.findIndex((item) => item.id === medicine.id);
      if (index === -1 && delta > 0) {
        if (!currentStoreId) setCurrentStoreId(store.id);
        toast.success(`${medicine.name} added to cart`);
        return [...currentCart, { ...medicine, qty: delta, storeId: store.id, storeName: store.name }];
      }
      if (index === -1) return currentCart;

      const nextQuantity = currentCart[index].qty + delta;
      if (nextQuantity <= 0) {
        const nextCart = currentCart.filter((_, itemIndex) => itemIndex !== index);
        if (nextCart.length === 0) setCurrentStoreId(null);
        return nextCart;
      }

      const nextCart = [...currentCart];
      nextCart[index] = { ...nextCart[index], qty: nextQuantity };
      return nextCart;
    });
  };

  const confirmSwitch = () => {
    if (!pendingItem) return;
    setCart([{ ...pendingItem.medicine, qty: pendingItem.delta, storeId: store.id, storeName: store.name }]);
    setCurrentStoreId(store.id);
    toast.success(`Switched to ${store.name}.`);
    setPendingItem(null);
  };

  return {
    cart,
    cartCount: cart.reduce((sum, item) => sum + item.qty, 0),
    pendingItem,
    setPendingItem,
    addToCart,
    confirmSwitch,
    cartQty: (id: string) => cart.find((item) => item.id === id)?.qty || 0,
  };
}
