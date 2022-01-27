import { screen, render } from "@testing-library/react";
import { expect } from "chai";
import { MemoryRouter } from "react-router-dom";
import SideNav from ".";

describe("Side Nav", () => {
  it("Should highlight active page", () => {
    render(
      <MemoryRouter initialEntries={["/team-members"]}>
        <SideNav />
      </MemoryRouter>,
    );

    let link = screen.getByText("Team Members");
    expect(link).to.have.class("active");
    link = screen.getByText("Dashboard");
    expect(link).to.not.have.class("active");
  });
});
