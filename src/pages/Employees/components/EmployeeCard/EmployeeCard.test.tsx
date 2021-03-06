import { StylesProvider } from "@chakra-ui/react";
import { /*fireEvent,*/ render, screen } from "@testing-library/react";
//import { select as selectEvent } from "react-select-event";

import { MemoryRouter } from "react-router-dom";
// import userEvent from "@testing-library/user-event";

import theme from "../../../../theme";
import { employees } from "../../../../mocks/fixtures";
import EmployeeCard from "./EmployeeCard";
//import { act } from "react-dom/test-utils";

jest.useFakeTimers("modern");

describe("Components/Layout", () => {
  it("works", () => {
    const employee = employees[0];
    render(
      <MemoryRouter>
        <StylesProvider value={theme}>
          <table>
            <tbody>
              <EmployeeCard
                handleEditEmployee={() => Promise.resolve()}
                handleDeleteEmployee={() => Promise.resolve()}
                employee={employee}
              />
            </tbody>
          </table>
        </StylesProvider>
        ,
      </MemoryRouter>,
    );

    expect(screen.getByText(employee.name)).toBeInTheDocument();
  });

  /////////////////////////////////////////////
  // Currently no onSave method in EmployeeCard
  ////////////////////////////////////////////

  // it("call onSave after 500ms debounce", async () => {
  //   const onSave = jest.fn();
  //   render(
  //     <MemoryRouter>
  //       <EmployeeCard key={employee.id} employee={employee} onSave={onSave} />
  //     </MemoryRouter>,
  //   );

  //   const container = screen.getByLabelText("employee-name");
  //   userEvent.type(container, "2");
  //   await act(async () => {
  //     jest.advanceTimersByTime(100);
  //   });
  //   userEvent.type(container, "5");

  //   await act(async () => {
  //     jest.advanceTimersByTime(500);
  //   });
  //   expect(onSave).toHaveBeenCalledTimes(1);
  // });

  ////////////////////////////////////////////////////////////////////
  // UI changed -- accessing these features currently not implemented
  ///////////////////////////////////////////////////////////////////

  // it("should add a skill", async () => {
  //   render(
  //     <MemoryRouter>
  //       <EmployeeCard
  //         key={employee.id}
  //         employee={employee}
  //         //onSave={jest.fn()}
  //       />
  //     </MemoryRouter>,
  //   );

  //   await selectEvent(screen.getByLabelText(/Add skills/), "Angular");

  //   const tags = screen
  //     .getAllByLabelText("close")
  //     .map((v) => v.parentElement?.textContent);

  //   expect(tags).toContain("Angular");
  // });

  // it("should remove a skill", () => {
  //   render(
  //     <MemoryRouter>
  //       <EmployeeCard
  //         key={employee.id}
  //         employee={employee}
  //         onSave={() => null}
  //       />
  //     </MemoryRouter>,
  //   );

  //   const tags = screen.getAllByLabelText("close");
  //   userEvent.click(tags[0]);
  //   expect(screen.getAllByLabelText("close")).toHaveLength(tags.length - 1);
  // });

  // it("should allow date to be entered", async () => {
  //   const onSave = jest.fn();
  //   render(
  //     <MemoryRouter>
  //       <EmployeeCard key={employee.id} employee={employee} onSave={onSave} />
  //     </MemoryRouter>,
  //   );
  //   const container = screen.getByLabelText("start date");

  //   userEvent.click(container);
  //   fireEvent.change(container, { target: { value: "2021-10-25" } });

  //   await act(async () => {
  //     jest.advanceTimersByTime(500);
  //   });

  //   expect(onSave).toHaveBeenCalledTimes(1);
  //   expect(screen.getByDisplayValue("2021-10-25")).toBeInTheDocument();
  // });
});
