import { Button } from "@/components/ui/button";

import { getUser } from "@/utils/supabase/user";
import prisma from "@/lib/edge-db";
import NotFound from "./notFound";
import { redirect } from "next/navigation";
import Container from "@/components/container";
import Link from "next/link";
import {
  PencilSquareIcon,
  PlusCircleIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import parse from "html-react-parser";
import Header from "@/app/(protected)/components/header";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default async function PodcastPage({
  params,
}: {
  params: { podcastId: string };
}) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const podcast = await prisma.podcast.findUnique({
    where: {
      id: params.podcastId,
    },
  });

  if (!podcast) {
    return <NotFound />;
  }
  const config = {
    ALLOW_DATA_ATTR: false, // Set to true to allow data attributes (optional)
    ALLOW_ARIA_ATTR: true, // Set to true to allow ARIA attributes (optional)
    USE_PROFILES: {
      html: true,
    },
  };

  DOMPurify.setConfig(config);

  const cleanDescription = DOMPurify.sanitize(podcast.description);

  return (
    <Container className="py-16">
      <div className="flex flex-col gap-4 lg:gap-10">
        {/* <Header title="Podcast Dashboard" /> */}
        <div className="flex justify-end  items-end">
          {" "}
          <Button asChild variant="link">
            <Link href={`podcasts/${podcast.id}/edit`} className="font-medium">
              <PencilSquareIcon className="w-6 h-6" />
              Edit
            </Link>
          </Button>
        </div>

        <div className="flex items-start gap-4 justify-start flex-col lg:flex-row">
          <div className=" rounded-md overflow-hidden shadow-md w-96 h-96">
            <AspectRatio ratio={1 / 1}>
              <Image
                src={podcast.imageUrl}
                alt="Course Image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className=" object-cover"
                blurDataURL={podcast.imageUrl}
                placeholder="blur"
              />
            </AspectRatio>
          </div>

          <div className="flex flex-col justify-center  gap-4">
            <h1 className="lg:text-3xl text-xl md:2xl font-medium">
              {podcast.title}
            </h1>
            <div className=" max-w-xl font-light">
              {parse(cleanDescription)}
            </div>
            <p className="text-base lg:text-lg text-muted-foreground">
              with {podcast.author}
            </p>

            <div className="flex py-6 gap-4 items-center">
              <Button asChild>
                <Link href={`/podcasts/${podcast.id}/episodes/new`}>
                  <PlusCircleIcon className="h-6 w-6" /> New Episode
                </Link>
              </Button>
              <Button asChild variant="outline" className="hover:text-primary">
                <Link href={`/podcasts/${podcast.id}`}>
                  <WifiIcon className="h-6 w-6" /> Rss Feed
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
