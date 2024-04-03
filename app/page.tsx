import FeaturesSection from "@/components/features-section";
import Footer from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import HowItWorks from "@/components/how-it-works-section";
import Navbar from "@/components/navbar";
import StarsEffect from "@/components/stars";
import Spinner from "@/components/ui/loader";

export default function Home() {
  return (
    <div className=" min-h-screen bg-gray-950 relative overflow-hidden">
      <Navbar />
      <HeroSection />
      {/* <StarsEffect /> */}
      <FeaturesSection />
      <HowItWorks />
      <Footer />
    </div>
  );
}
