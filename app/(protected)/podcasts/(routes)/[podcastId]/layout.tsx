import Navbar from "./components/navbar";
import prisma from "@/lib/edge-db";
export async function generateMetadata({
  params,
}: {
  params: { podcastId: string };
}) {
  const podcast = await prisma.podcast.findFirst({
    where: {
      id: params.podcastId,
    },
  });

  if (!podcast) {
    return {
      title: "Podcast Not Found",
    };
  }

  return {
    title: `${podcast?.title}  ꞏ Kcast`,
    description: podcast?.description,
  };
}

export default async function PodcastsLayout({
  children,
  params, // will be a page or nested layout
}: {
  children: React.ReactNode;
  params: { podcastId: string };
}) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
