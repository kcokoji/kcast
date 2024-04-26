import FeaturesSection from "@/components/features-section";
import Footer from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import Testimonials from "@/components/testimonials";
import Navbar from "@/components/navbar";
import { getUser } from "@/utils/supabase/user";

export default async function Home() {
  const user = await getUser();
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
