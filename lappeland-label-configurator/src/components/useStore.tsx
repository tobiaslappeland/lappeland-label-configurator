import React, { createContext, useContext, useEffect } from 'react';
import { createStore } from '@/store';
import type { State, Actions } from '@/store';
import type { Config } from '@/types';
import { fetchBackgrounds, fetchIcons, addToCart } from '@/api';

const Ctx = createContext<{ state: State; actions: Actions } | null>(null);

export function StoreProvider({ children, config }: { children: React.ReactNode; config: Config }) {
  const useZ = React.useMemo(() => createStore(config), [config]);
  const state = useZ();
  const actions = useZ();

  useEffect(() => {
    (async () => {
      try {
        const [b, i] = await Promise.all([
          fetchBackgrounds(config.backgroundsEndpoint, config.wpNonce),
          fetchIcons(config.iconsEndpoint, config.wpNonce)
        ]);
        actions.setBackgrounds(b);
        actions.setIcons(i);
      } catch (e) {
        console.warn(e);
      }
    })();
  }, [config.backgroundsEndpoint, config.iconsEndpoint]);

  useEffect(() => {
    const handler = async () => {
      if (!state.selectedPackQty) return;
      await addToCart(state.config, state.designs, state.selectedPackQty);
    };
    window.addEventListener('ll:add-to-cart', handler);
    return () => window.removeEventListener('ll:add-to-cart', handler);
  }, [state.selectedPackQty, state.designs, state.config]);

  return <Ctx.Provider value={{ state: useZ.getState() as any, actions: useZ.getState() as any }}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('Store missing');
  return ctx;
}
