import Home from "@/app/page";
import { render, screen } from "@testing-library/react";
describe("Home", () => {
  it("Should render correctly", () => {
    render(<Home />);
    const H1Element = screen.getByText(/Docs/i);
    expect(H1Element).toBeInTheDocument();
  });
});
