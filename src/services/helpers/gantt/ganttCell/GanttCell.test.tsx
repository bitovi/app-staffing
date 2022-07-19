import { Box } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GanttCell from ".";
import { roles } from "../../../../mocks/fixtures";
import getTimeLine from "../../../projection/timeline/timeline";

describe("Project and Assignment Gantt Cells", () => {
  it("renders a gantt cell given a role inside a timeline range", async () => {
    const date = new Date(roles[0].startDate);
    date.setDate(date.getDate() - 1);
    const timeline = getTimeLine(date);
    render(
      <MemoryRouter>
        <Box
          data-testid={`gantt-cell-${0}`}
          key={`gantt-cell-${0}-${roles[0].id}`}
        >
          <GanttCell role={roles[0]} timeline={timeline} index={0} />
        </Box>
      </MemoryRouter>,
    );
    expect(
      await screen.getByTestId(`gantt-cell-${0}`).children[0],
    ).toBeInTheDocument();
  });
});
