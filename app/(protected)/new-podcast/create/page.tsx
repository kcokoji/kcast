import Container from "@/components/container";
import React from "react";
import Header from "../../components/header";
import P from "@/components/ui/typography/p";
import NewPodcastForm from "./components/form";

export default function page() {
  return (
    <Container className="lg:space-y-10 space-y-6">
      <Header title="New Podcast" />
      <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
        PODCAST DETAILS
      </p>
      <NewPodcastForm />
    </Container>
  );
}
