import { Hero } from "@/components/home/hero";
import { InteractiveDemo } from "@/components/home/interactive-demo";
import { StatsSection } from "@/components/home/stats-section";
import { ValuePropsSection } from "@/components/home/value-props-section";
import { CredibilitySection } from "@/components/home/credibility-section";
import { FinalCta } from "@/components/home/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <InteractiveDemo />
      <StatsSection />
      <ValuePropsSection />
      <CredibilitySection />
      <FinalCta />
    </>
  );
}
