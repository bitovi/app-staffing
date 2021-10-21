import { render, screen } from "@testing-library/react";
import {MemoryRouter} from 'react-router-dom'

import Link from ".";

describe("Components/Link", () => {

  it("works", () => {
    render(
      <MemoryRouter>
        <Link to="/home">View</Link>
      </MemoryRouter>  
      );

    const link = screen.getByText(/View/i);
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/home")
  });
});
