import { render, screen } from "@testing-library/react";

import MuiList from ".";
import { ScaffoldPresentationDefaultValueComponents } from "../../../components/ScaffoldPresentationProvider";
import { getDefaultRender } from "../../../services/displays/scaffoldDisplays";

describe("scaffold/presentation/mui/MuiList", () => {
  describe("MuiList", () => {
    it("works", async () => {
      render(
        <MuiList
          useData={() => [
            {
              id: "uuid1",
              firstName: "Joe",
              lastName: "Smith",
            },
            { id: "uuid2", firstName: "John", lastName: "Snow" },
          ]}
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
      expect(await screen.findByText("Last Name")).toBeInTheDocument();
      expect(await screen.findByText("Joe")).toBeInTheDocument();
      expect(await screen.findByText("Smith")).toBeInTheDocument();
      expect(await screen.findByText("John")).toBeInTheDocument();
      expect(await screen.findByText("Snow")).toBeInTheDocument();
    });
  });
});
