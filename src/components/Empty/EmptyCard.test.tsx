import { render, screen } from "@testing-library/react";
import EmptyCard from "./EmptyCard";

describe("Components/Empty Card", () => {
  it("renders svg icon", () => {
    render(<EmptyCard message="msg" />);
    expect(screen.getByTestId("empty-icon")).toBeInTheDocument();
  });

  it("renders message text", () => {
    const messageText = "Empty message goes here.";
    render(<EmptyCard message={messageText} />);
    expect(screen.getByText(messageText)).toBeInTheDocument();
  });
});
