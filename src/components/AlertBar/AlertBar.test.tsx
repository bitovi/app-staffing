import { render, screen } from "@testing-library/react";

import AlertBar from ".";

describe("Components/Button", () => {

  it("works", () => {
    render(<AlertBar status="error" title="test" description="test description"/>);

    expect(screen.getByText('test description')).toBeInTheDocument();
  });
});
