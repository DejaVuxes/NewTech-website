"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { priceOf, products, type Product, type Size } from "./data";

export type CartLine = { key: string; product: Product; size: Size; colour: string; qty: number };

type Store = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  add: (product: Product, size: Size, colour: string) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  /** product shown in the quick-view sheet */
  quickView: Product | null;
  openQuickView: (id: string) => void;
  closeQuickView: () => void;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);

  const add = useCallback((product: Product, size: Size, colour: string) => {
    const key = `${product.id}-${size}-${colour}`;
    setLines((prev) => {
      const hit = prev.find((l) => l.key === key);
      if (hit) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { key, product, size, colour, qty: 1 }];
    });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) => (qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l))));
  }, []);

  const remove = useCallback((key: string) => setLines((prev) => prev.filter((l) => l.key !== key)), []);

  const value = useMemo<Store>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.qty * priceOf(l.product), 0);
    return {
      lines,
      count,
      subtotal,
      cartOpen,
      setCartOpen,
      add,
      setQty,
      remove,
      quickView,
      openQuickView: (id) => setQuickView(products.find((p) => p.id === id) ?? null),
      closeQuickView: () => setQuickView(null),
    };
  }, [lines, cartOpen, quickView, add, setQty, remove]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore must be used inside <StoreProvider>");
  return s;
}
