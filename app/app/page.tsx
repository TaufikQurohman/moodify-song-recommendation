import { AmbientBackground } from "@/components/shared/ambient-background";
import { Navbar } from "@/components/shared/navbar";
import { RecommendationForm } from "@/components/recommendation/recommendation-form";

export const metadata = {
  title: "Curhat"
};

export default function AppPage() {
  return (
    <>
      <AmbientBackground />
      <Navbar />
      <main>
        <RecommendationForm />
      </main>
    </>
  );
}
