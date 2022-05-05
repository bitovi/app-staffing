import { StylesProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { MemoryRouter } from "react-router-dom";
import { skills } from "../../../../../mocks/fixtures";
import { useProjection } from "../../../../../services/projection";
import theme from "../../../../../theme";
import TableRow from "./TableRow";
describe("Pages/Dashboard/ReportTable/TableRow", () => {
  it("renders the first TableRow component", async () => {
    const { result } = renderHook(() => useProjection(new Date(), skills));
    render(
      <MemoryRouter>
        <StylesProvider value={theme}>
          <table>
            <TableRow
              skill={skills[0]}
              projections={result.current.skillsWithProjection[0].projections}
            />
          </table>
        </StylesProvider>
      </MemoryRouter>,
    );
    expect(await screen.findByText(skills[0].name)).toBeInTheDocument();
  });
});
