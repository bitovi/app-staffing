import { screen, render } from "@testing-library/react";
import { expect } from "chai";
import { MemoryRouter } from "react-router-dom";
import SideNav from ".";

describe("Side Nav", () => {
  it("Should highlight active page", () => {
    render(
      <MemoryRouter initialEntries={["/employees"]}>
        <SideNav />
      </MemoryRouter>,
    );

    let link = screen.getByText("Employees");
    expect(link).to.have.class("activeLink");
    link = screen.getByText("Dashboard");
    expect(link).to.have.class("inactiveLink");
  });
});
