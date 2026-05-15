import { AmbientBackground } from "@/components/shared/ambient-background";
import { Navbar } from "@/components/shared/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { FlowSection } from "@/components/landing/flow-section";
import { PreviewSection } from "@/components/landing/preview-section";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <>
      <AmbientBackground />
      <Navbar />
      <main>
        <HeroSection />
        <FlowSection />
        <PreviewSection />
      </main>
      <Footer />
    </>
  );
}
