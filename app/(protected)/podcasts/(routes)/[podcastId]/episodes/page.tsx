import Header from "@/app/(protected)/components/header";
import Container from "@/components/container";
import React from "react";
import prisma from "@/lib/edge-db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
export default async function EpisodesPage({
  params,
}: {
  params: { podcastId: string };
}) {
  const episodes = await prisma.episode.findMany({
    where: {
      podcastId: params.podcastId,
    },
  });
  //   console.log(episodes);

  return (
    <Container className="py-16">
      <Header title="Episodes" description="Manage your episodes here" />
      <div className="flex justify-end  items-end">
        {" "}
        <Button asChild>
          <Link
            href={`/podcasts/${params.podcastId}/episodes/new`}
            className="font-medium"
          >
            <PlusCircleIcon className="w-6 h-6" />
            New Episode
          </Link>
        </Button>
      </div>
    </Container>
  );
}
