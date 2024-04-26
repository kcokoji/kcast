import LoginPage from "@/app/(auth)/login/page";
import Header from "@/app/(protected)/components/header";
import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

export class IntersectionObserver {
  root = null;
  rootMargin = "";
  thresholds = [];

  disconnect() {
    return null;
  }

  observe() {
    return null;
  }

  takeRecords() {
    return [];
  }

  unobserve() {
    return null;
  }
}
window.IntersectionObserver = IntersectionObserver;
global.IntersectionObserver = IntersectionObserver;

describe("Home", () => {
  it("Should render correctly", () => {
    render(<Header title="Balls" />);
    const H1Element = screen.getByText("Balls");
    expect(H1Element).toBeInTheDocument();
  });
});
