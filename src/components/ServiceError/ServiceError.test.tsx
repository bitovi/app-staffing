import { render, screen } from "@testing-library/react";
import ServiceError from "./ServiceError";

describe("Components/Service Error", () => {
  it("renders default text with no error inputs", async () => {
    render(<ServiceError />);
    expect(await screen.findByText("Service Error")).toBeInTheDocument();
    // ServiceError tweaked to make message field conditionally render
    // expect(await screen.findByText("Try again later.")).toBeInTheDocument();
  });

  it("renders custom error text", async () => {
    render(<ServiceError name="Name of Error" message="Error Message" />);
    expect(await screen.findByText("Name of Error")).toBeInTheDocument();
    expect(await screen.findByText("Error Message")).toBeInTheDocument();
  });
});
