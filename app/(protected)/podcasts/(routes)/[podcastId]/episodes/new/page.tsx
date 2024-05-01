import Header from "@/app/(protected)/components/header";
import Container from "@/components/container";
import React from "react";
import NewEpisodeForm from "./components/form";

export default function NewEpisodePage() {
  return (
    <Container>
      <Header title="New Episode" description="Fill out your episode details" />
      <NewEpisodeForm />
    </Container>
  );
}
