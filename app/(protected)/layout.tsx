import { Metadata } from "next";
import PodcastNav from "./components/navbar";
import { getUser } from "@/utils/supabase/user";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Podcasts | Kcast ",
};

export default async function PodcastsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  return (
    <section className="bg-[#f2f2f5]">
      <PodcastNav user={user} />
      {children}
      <Footer />
    </section>
  );
}
