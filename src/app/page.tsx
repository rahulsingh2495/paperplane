import { FlightRail } from "@/components/layout/flight-rail";
import { HeroStrip } from "@/components/sections/hero-strip";
import { ProofStats } from "@/components/sections/proof-stats";
import { MakesGrid } from "@/components/sections/makes-grid";
import { BrandsMarquee } from "@/components/sections/brands-marquee";
import { SelectedWork } from "@/components/sections/selected-work";
import { FilmsSection } from "@/components/sections/films-section";
import { WordBar } from "@/components/sections/word-bar";
import { HomeContact } from "@/components/sections/home-contact";

export default function HomePage() {
  return (
    <>
      <FlightRail />
      <main id="top">
        <HeroStrip />
        <ProofStats />
        <MakesGrid />
        <BrandsMarquee />
        <SelectedWork />
        <FilmsSection />
        <WordBar />
        <HomeContact />
      </main>
    </>
  );
}
