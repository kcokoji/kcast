"use server";
import { NewPodcastSchema } from "@/schemas/podcast";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/supabase/user";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function createPodcast(formData: FormData) {
  const supabase = createClient();
  const user = await getUser();
  const values = Object.fromEntries(formData.entries());

  if (values.file && !(values.file instanceof Array)) {
    //@ts-ignore
    values.file = [values.file];
  }

  if (values.category && typeof values.category === "string") {
    //@ts-ignore
    values.category = values.category
      .split(",")
      .map((category) => category.trim());
  }
  //@ts-ignore
  values.explicit = Boolean(values.explicit);

  const {
    title,
    description,
    category,
    author,
    explicit,
    website,
    copyright,
    language,
    file,
  } = NewPodcastSchema.parse(values);

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { data: image, error: uploadError } = await supabase.storage
    .from("podcast-image")
    .upload(`${user.id}/${file[0].name}`, file[0]);

  if (uploadError) {
    return { error: "Error uploading image" };
  }

  const { data: imageUrl } = await supabase.storage
    .from("public-bucket")
    .getPublicUrl(image.path);

  const podcastData = {
    userId: user.id,
    imageUrl: imageUrl.publicUrl,
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

  redirect("/podcasts");
}
