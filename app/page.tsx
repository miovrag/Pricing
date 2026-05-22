import Navbar from "@/components/Navbar";
import PricingSection from "@/components/PricingSection";
import TrustStrip from "@/components/TrustStrip";
import HelpMeChoose from "@/components/HelpMeChoose";
import ComparisonTable from "@/components/ComparisonTable";
import AddonsCalculator from "@/components/AddonsCalculator";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FooterCTA from "@/components/FooterCTA";
import Footer from "@/components/Footer";

export default function PricingPage() {
  return (
    <main>
      <Navbar />
      <PricingSection />
      <TrustStrip />
      <HelpMeChoose />
      <ComparisonTable />
      <AddonsCalculator />
      <Testimonials />
      <FAQ />
      <FooterCTA />
      <Footer />
    </main>
  );
}
