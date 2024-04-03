import LoginPage from "@/app/(auth)/login/page";
import Home from "@/app/page";
import { render, screen } from "@testing-library/react";
describe("Home", () => {
  it("Should render correctly", () => {
    render(<LoginPage />);
    const H1Element = screen.getByText(/Login/i);
    expect(H1Element).toBeInTheDocument();
  });
});
