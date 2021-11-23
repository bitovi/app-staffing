import type { Employee } from "../employees";
import type { ResponseStatus, QueriableList } from "../shared";

import useRest from "../useRest/useRestV2";

import { JSONAPI } from "../baseMocks/interfaces";
import { JSONAPISkill } from "../skills/interfaces";
import { FrontEndEmployee, JSONAPIEmployee } from "../employees/interfaces";

const alphabetize = (array: Employee[]): Employee[] =>
  array.sort((a, b) =>
    a.name.split(" ")[1].localeCompare(b.name.split(" ")[1]),
  );

// export const employeeDataFormatter = (
//   employee: JSONAPI<JSONAPIEmployee[], JSONAPISkill[]> | undefined,
// ): Employee[] | [] => {
//   console.log("employe", employee);
//   if (employee) {
//     const { data: unformatedEmployees, included: unformatedSkills } = employee;
//     const formattedEmployees: Employee[] = unformatedEmployees.map(
//       (em: JSONAPIEmployee) => {
//         const { id, relationships } = em;
//         return {
//           id,
//           ...em.attributes,
//           skills:
//             relationships && relationships.skills
//               ? relationships.skills?.data?.map(
//                   (skill: { type: string; id: string }) => {
//                     return {
//                       id: skill.id,
//                       name: unformatedSkills?.find(
//                         (unformatedSkill) => unformatedSkill.id === skill.id,
//                       )?.attributes.name,
//                     };
//                   },
//                 )
//               : [],
//         };
//       },
//     );

//     return formattedEmployees;
//   }

//   return [];
// };

export interface EmployeeActions {
  employees?: Employee[];
  addEmployee: (employee: {
    data: FrontEndEmployee;
  }) => Promise<string | undefined>;
  updateEmployee?: (
    employeeId: string,
    employee: Partial<Employee>,
  ) => Promise<void>;
  deleteEmployee: (employeeId: string) => Promise<void>;
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
    handleAdd,
    // handleUpdate,
    handleDelete,
    reset,
  } = useRest<JSONAPI<JSONAPIEmployee[], JSONAPISkill[]>>(
    "/api/v1/employees",
    "employees",
    queryParams,
  );

  return {
    employees: alphabetize(employees as unknown as Employee[]),
    isLoading,
    error,
    addEmployee: handleAdd,
    // updateEmployee: handleUpdate,
    deleteEmployee: handleDelete,
    reset,
  };
}
