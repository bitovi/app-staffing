import { queryByAttribute, queryByText, render, screen } from "@testing-library/react";
import { employees } from "../../../../services/api/employees/fixtures";

import EmployeeTable from "./EmployeeTable";

describe("Components/Layout", () => {
  it("has a 'loading' state", async () => {
    const { container } = render(
      <EmployeeTable
        loading={false}
        filteredEmployees={[]}
        onEdit={() => null}
      />,
    );
     
    const errorMessage = queryByText(container, "There are currently no team members.");
    const skeleton = queryByAttribute('class', container, 'skeleton', {exact: false});
    expect(errorMessage).toBeTruthy();
    expect(skeleton).toBeTruthy();
  });

  it("shows employees", async () => {
    render(<EmployeeTable filteredEmployees={employees} onEdit={() => null} />);

    // wait for the first row
    expect(
      await screen.findByDisplayValue(employees[0].name),
    ).toBeInTheDocument();

    // check the rest of the rows
    expect(screen.getByDisplayValue(employees[1].name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(employees[2].name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(employees[3].name)).toBeInTheDocument();
  });
});
