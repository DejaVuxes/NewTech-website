"use client";

import { CartDrawer, QuickView } from "./drawers";
import { Header } from "./header";
import { Hero } from "./hero";
import { Footer, Lookbook, Newsletter, Promises } from "./sections";
import { Shop } from "./shop";
import { StoreProvider } from "./store";

export function FashionStore() {
  return (
    <StoreProvider>
      <div className="demo-thoi-trang min-h-dvh">
        <main>
          <Hero />
          <Header />
          <Shop />
          <Lookbook />
          <Promises />
          <Newsletter />
        </main>
        <Footer />
        <QuickView />
        <CartDrawer />
      </div>
    </StoreProvider>
  );
}
