"use server";
import * as z from "zod";
import { NewPodcastSchema } from "@/schemas/podcast";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/supabase/user";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export async function createPodcast(values: z.infer<typeof NewPodcastSchema>) {
  try {
    const supabase = createClient();
    const user = await getUser();
    const validatedFields = NewPodcastSchema.safeParse(values);

    if (!user) {
      return { error: "Unauthorized" };
    }

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const podcastValues = validatedFields.data;
    console.log(podcastValues);

    // const file = validatedFields.data.file[0];

    // const { data, error } = await supabase.storage
    //   .from("podcast-image")
    //   .upload(`${user.id}/${file.name}`, file);
    // if (error) {
    //   return { error: error.message };
    // }

    // console.log(data.path);

    // redirect("/podcast");
  } catch (error) {
    console.error("Error in Reset:", error);
    return { error: "An unexpected error occurred during sending reset email" };
  }
}
