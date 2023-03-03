import { render, screen } from "@testing-library/react";

import MuiDetails from ".";
import { ScaffoldPresentationDefaultValueComponents } from "../../../components/ScaffoldPresentationProvider";
import { getDefaultRender } from "../../../services/displays/scaffoldDisplays";

describe("scaffold/presentation/mui/MuiDetails", () => {
  describe("MuiDetails", () => {
    it("works", async () => {
      render(
        <MuiDetails
          useData={() => ({
            id: "uuid",
            firstName: "Joe",
            lastName: "Smith",
          })}
          displays={[
            {
              key: "firstName",
              label: "First Name",
              render: getDefaultRender(
                "firstName",
                "string",
                ScaffoldPresentationDefaultValueComponents,
              ),
            },
            {
              key: "lastName",
              label: "Last Name",
              render: getDefaultRender(
                "lastName",
                "string",
                ScaffoldPresentationDefaultValueComponents,
              ),
            },
          ]}
        />,
      );

      expect(await screen.findByText("First Name")).toBeInTheDocument();
      expect(await screen.findByText("Joe")).toBeInTheDocument();
      expect(await screen.findByText("Last Name")).toBeInTheDocument();
      expect(await screen.findByText("Smith")).toBeInTheDocument();
    });
  });
});
