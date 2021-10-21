import { render, screen } from "@testing-library/react";

import Link from ".";

describe("Components/Button", () => {
  const mockOnClick = jest.fn();

  it("works", () => {
    render(<Link to="/home">View</Link>);

    const link = screen.getByText(/View/i);
    expect(link.tagName).toBe("A");
    expect(mockOnClick).toHaveBeenCalled();
  });
});
