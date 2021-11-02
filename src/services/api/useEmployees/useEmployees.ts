import type { Employee, NewEmployee } from "../employees";
import type { ResponseStatus, QueriableList } from "../shared";

import useRest from "../useRest";

import { JSONAPI } from "../baseMocks/interfaces";
import { JSONAPISkill } from "../skills/interfaces";
import { JSONAPIEmployee } from "../employees/interfaces";

const employeeDataFormatter = (
  employee: { data: JSONAPIEmployee[]; included: JSONAPISkill[] } | undefined,
): Employee[] => {
  if (employee) {
    const { data: unformatedEmployees, included: unformatedSkills } = employee;

    const formattedEmployees: Employee[] = unformatedEmployees.map((em) => {
      return {
        id: em.id,
        name: em.attributes.name,
        startDate: em.attributes.startDate,
        endDate: em.attributes.endDate,
        skills: em.relationships?.skills?.data?.map((skill) => {
          return {
            id: skill.id,
            name: unformatedSkills.find((unformatedSkill) => {
              if (unformatedSkill.id === skill.id) {
                return unformatedSkill.attributes.name;
              }
            }),
          };
        }),
      };
    });

    console.log("formattedEmployees", formattedEmployees);
  }

  return [];
};

interface EmployeeActions {
  employees?: Employee[];
  addEmployee?: (employee: NewEmployee) => Promise<string>;
  updateEmployee?: (
    employeeId: string,
    employee: Partial<Employee>,
  ) => Promise<void>;
  deleteEmployee?: (employeeId: string) => Promise<void>;
  reset: () => void;
}

/** Hook for getting a list of the employees */
export default function useEmployees(
  queryParams?: QueriableList<JSONAPI<JSONAPIEmployee[], JSONAPISkill[]>>,
): ResponseStatus & EmployeeActions {
  const {
    data: employees,
    error,
    isLoading,
    // handleAdd,
    // handleUpdate,
    // handleDelete,
    reset,
  } = useRest<JSONAPI<JSONAPIEmployee[], JSONAPISkill[]>>(
    "/api/v1/employees",
    queryParams,
  );

  return {
    employees: employeeDataFormatter(employees),
    isLoading,
    error,
    // addEmployee: handleAdd,
    // updateEmployee: handleUpdate,
    // deleteEmployee: handleDelete,
    reset,
  };
}
