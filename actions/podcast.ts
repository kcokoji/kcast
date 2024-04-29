"use server";
import * as z from "zod";
import { NewPodcastSchema } from "@/schemas/podcast";
import { getUser } from "@/utils/supabase/user";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createPodcast(values: z.infer<typeof NewPodcastSchema>) {
  const user = await getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }
  const {
    title,
    description,
    category,
    author,
    explicit,
    website,
    copyright,
    language,
    imageUrl,
  } = NewPodcastSchema.parse(values);

  if (!imageUrl) {
    return { error: "Image Url Required" };
  }

  const podcastData = {
    userId: user.id,
    imageUrl,
    title,
    description,
    language,
    explicit,
    category,
    copyright,
    author,
    website,
  };

  const podcast = await db.podcast.create({ data: podcastData });

  await db.podcastMembership.create({
    data: {
      userId: user.id,
      podcastId: podcast.id,
      role: "Admin",
    },
  });
  revalidatePath("/podcasts", "layout");
  redirect(`/podcasts/${podcast.id}`);
}
