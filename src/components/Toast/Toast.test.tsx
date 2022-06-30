import { fireEvent, render, screen } from "@testing-library/react";

import Toast from ".";

describe("Components/Toast", () => {
  it("works", () => {
    render(
      <Toast
        title="This is toast title"
        description="This is toast description"
      />,
    );

    const button = screen.getByText(/Test Toast/i);
    fireEvent.click(button);
    expect(screen.getByText(/This is toast title/)).toBeInTheDocument();
  });
});
