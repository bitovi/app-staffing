import { fireEvent, render, screen } from "@testing-library/react";

import Button from ".";

describe("Components/Button", () => {
  const mockOnClick = jest.fn();

  it("works", () => {
    render(<Button onClick={mockOnClick}>Click here</Button>);

    const button = screen.getByText(/Click here/i);
    expect(button.tagName).toBe("BUTTON");
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
