import { render, screen } from "@testing-library/react";
//import { employees } from "../../../../services/api/employees/fixtures";
import EmployeeTable from "./EmployeeTable";

const mockData = [
  {
    id: "1",
    name: "Vitor Forbrig",
    startDate: new Date(),
    endDate: new Date(),
    skills: [
      {
        id: "105",
        name: "React",
      },
      {
        id: "102",
        name: "Angular",
      },
      {
        id: "101",
        name: "UX",
      },
    ],
  },
  {
    id: "2",
    name: "Travis Draper",
    startDate: new Date(),
    endDate: new Date(),
    skills: [
      {
        id: "106",
        name: "React",
      },
    ],
  },
  {
    id: "3",
    name: "Rosemarie Mitchell",
    startDate: new Date(),
    endDate: new Date(),
    skills: [
      {
        id: "107",
        name: "React",
      },
      {
        id: "101",
        name: "UX",
      },
    ],
  },
];

describe("Components/Layout", () => {
  it("has an 'empty' state", async () => {
    render(<EmployeeTable employees={[]} onEdit={() => null} />);

    expect(screen.getByText(/There are currently no team members./i));
  });

  it("shows employees", async () => {
    render(<EmployeeTable employees={mockData} onEdit={() => null} />);

    // wait for the first row
    expect(screen.getByText(mockData[0].name)).toBeInTheDocument();

    // check the rest of the rows
    // expect(screen.getByDisplayValue(employees[1].name)).toBeInTheDocument();
    // expect(screen.getByDisplayValue(employees[2].name)).toBeInTheDocument();
    // expect(screen.getByDisplayValue(employees[3].name)).toBeInTheDocument();
  });
});
