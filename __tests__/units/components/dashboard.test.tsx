import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PodcastsPage from "@/app/(protected)/podcasts/page";

describe("Dashboard", () => {
  test("Dashboard function should render without throwing any errors", () => {
    expect(() => render(<PodcastsPage />)).not.toThrow();
  });
});
