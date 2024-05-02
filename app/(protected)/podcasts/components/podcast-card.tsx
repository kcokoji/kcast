import { FilePlus, LibraryBig } from "lucide-react";
import Image from "next/image";
import { User } from "@supabase/supabase-js";
import prisma from "@/lib/edge-db";
import CreateButton from "../../components/create-button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { unstable_noStore } from "next/cache";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { UserIcon } from "@heroicons/react/16/solid";
import { UsersIcon } from "@heroicons/react/24/outline";

interface Props {
  user: User;
}
export async function Podcasts({ user }: Props) {
  const membership = await prisma.podcastMembership.findMany({
    where: {
      userId: user.id,
    },
    select: {
      podcast: {
        select: {
          id: true,
          title: true,
          imageUrl: true,
        },
      },
      role: true,
    },
    orderBy: {
      podcast: {
        updatedAt: "desc",
      },
    },
    cacheStrategy: {
      ttl: 120,
      swr: 60,
    },
  });

  return (
    <div>
      {membership.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
          {membership.map((member) => (
            <Card
              className="w-full shadow-xl transform transition-transform hover:scale-95"
              key={member.podcast.id}
            >
              <Link href={`/podcasts/${member.podcast.id}`}>
                <div className=" rounded-t-md overflow-hidden bg-muted-foreground/60">
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      src={member.podcast.imageUrl}
                      alt="Course Image"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover w-auto h-auto"
                      priority
                    />
                  </AspectRatio>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="line-clamp-1 text-lg">
                    {member.podcast.title}
                  </CardTitle>
                  <CardDescription className="flex items-center">
                    <span className="text-white bg-primary p-1  mr-2 rounded-full">
                      {member.role === "Admin" ? (
                        <UserIcon className="h-5 w-5 " />
                      ) : (
                        <UsersIcon className="h-5 w-5 " />
                      )}
                    </span>{" "}
                    {member.role === "Admin" ? "Owner" : "Collaborator"}
                  </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="group relative bg-white grid h-60 w-full  place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-4 text-center ">
            <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
              <div className="rounded-full border border-dashed p-3">
                <FilePlus
                  className="size-7 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
              <h1 className="text-xl lg:2xl">Create a podcast</h1>
              <p className="text-muted-foreground">
                Start your podcast journey now{" "}
              </p>
              <div className="space-y-px">
                <CreateButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function PodcastSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-[5px] place-items-center">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[300px] w-[300px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[300px] w-[300px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[300px] w-[300px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
}
