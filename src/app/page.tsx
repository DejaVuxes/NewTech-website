import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Process } from "@/components/site/process";
import { Gallery, Services } from "@/components/site/gallery";
import { Faq, Footer, Pricing, ReviewBand } from "@/components/site/closing";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Process />
        <Services />
        <Gallery />
        <ReviewBand />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
