import { LogoutButton } from "@/app/(auth)/components/logout-button";
import { db } from "@/lib/db";
import { getUser } from "@/utils/supabase/user";
import React from "react";

export default async function PodcastsPage() {
  const user = await getUser();
  const podcasts = await db.podcast.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      title: true,
      imageUrl: true,
    },
  });
  return (
    <div>
      <LogoutButton>click me</LogoutButton>
      <div>{JSON.stringify(podcasts)}</div>
    </div>
  );
}
