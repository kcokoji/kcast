import { FilePlus } from "lucide-react";
import Image from "next/image";
import { User } from "@supabase/supabase-js";
import { db } from "@/lib/db";
import Container from "@/components/container";
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

interface Props {
  user: User;
}
export async function Podcasts({ user }: Props) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const membership = await db.podcastMembership.findMany({
    where: {
      userId: user.id,
    },
    select: {
      podcast: true,
      role: true,
    },
  });

  return (
    <div>
      {membership.length > 0 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center">
            {membership.map((member) => (
              <Link
                key={member.podcast.id}
                href={`/podcasts/${member.podcast.id}`}
              >
                <Card className="w-full max-w-2xl hover:scale-95 transition-all duration-300 ease-in-out">
                  <div className="grid grid-cols-2">
                    <div className="bg-muted-foreground/80 rounded-l rounded-md">
                      <Image
                        alt={member.podcast.title}
                        className="w-full h-full object-cover"
                        height="300"
                        src={member.podcast.imageUrl}
                        placeholder="blur"
                        blurDataURL={member.podcast.imageUrl}
                        style={{
                          aspectRatio: "250/250",
                          objectFit: "cover",
                        }}
                        width="250"
                      />
                    </div>
                    <CardHeader className="flex justify-center  flex-col">
                      <CardTitle>{member.podcast.title}</CardTitle>
                      <CardDescription>
                        {member.role === "Admin" ? "Owner" : "Collaborator"}
                      </CardDescription>
                    </CardHeader>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <Container className="flex justify-center items-center">
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
        </Container>
      )}
    </div>
  );
}

export function PodcastSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-[5px] place-content-center">
      <div className="flex gap-4">
        <Skeleton className="h-[300px] w-[300px] rounded-xl" />
        <div className="space-y-2 flex justify-center flex-col">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-[300px] w-[300px] rounded-xl" />
        <div className="space-y-2 flex justify-center flex-col">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
}
