import FeaturesSection from "@/components/features-section";
import Footer from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import Testimonials from "@/components/testimonials";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className=" min-h-screen bg-gray-950 relative overflow-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Testimonials />
      <Footer />
    </div>
  );
}
