import { getUser } from "@/utils/supabase/user";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function PodcastsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  const membership = await db.podcastMembership.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!membership) {
    redirect("/new-podcast");
  }

  return <section>{children}</section>;
}
