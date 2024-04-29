import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";

import { getUser } from "@/utils/supabase/user";
import { db } from "@/lib/db";
import NotFound from "./notFound";
import Header from "@/app/(protected)/components/header";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { podcastId: string };
}) {
  const podcast = await db.podcast.findFirst({
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

export default async function PodcastPage({
  params,
}: {
  params: { podcastId: string };
}) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const membership = await db.podcastMembership.findFirst({
    where: {
      podcastId: params.podcastId,
      userId: user.id,
    },
    include: {
      podcast: true,
    },
  });

  if (!membership) {
    return <NotFound />;
  }

  const podcast = await db.podcast.findUnique({
    where: {
      id: params.podcastId,
    },
  });

  if (!podcast) {
    return <NotFound />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 ">
        <Header title={podcast.title} />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                <CardHeader className="pb-3">
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Introducing Our Dynamic Orders Dashboard for Seamless
                    Management and Insightful Analysis.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button>Create New Order</Button>
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>This Week</CardDescription>
                  <CardTitle className="text-4xl">$1,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>This Month</CardDescription>
                  <CardTitle className="text-4xl">$5,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +10% from last month
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={12} aria-label="12% increase" />
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
