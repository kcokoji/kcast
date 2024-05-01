import { getUser } from "@/utils/supabase/user";
import React, { Suspense } from "react";
import Container from "@/components/container";
import Link from "next/link";
import { PodcastSkeleton, Podcasts } from "./components/podcast-card";
import CreateButton from "../components/create-button";
import Header from "../components/header";
import { redirect } from "next/navigation";

export default async function PodcastsPage() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  return (
    <Container className="space-y-10">
      <Header title="My Podcasts" description="Manage podcasts here" />
      <div className="flex justify-end">
        <CreateButton />{" "}
      </div>

      <Suspense fallback={<PodcastSkeleton />}>
        <Podcasts user={user} />
      </Suspense>
    </Container>
  );
}
