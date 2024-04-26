import Container from "@/components/container";
import React from "react";
import Header from "../../components/header";
import P from "@/components/ui/typography/p";
import NewPodcastForm from "./components/form";

export default function page() {
  return (
    <Container className="lg:space-y-10 space-y-6">
      <Header title="New Podcast" description="Fill out your podcast details" />

      <NewPodcastForm />
    </Container>
  );
}
