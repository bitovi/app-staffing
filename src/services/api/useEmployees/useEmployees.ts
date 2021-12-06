import type { Employee } from "../employees";
import { EmployeeJSON } from "../employees/interfaces";
import type { ResponseStatus, APIResponse } from "../shared";

import useRest, { RestActions } from "../useRest/useRestV3";

// const alphabetizeByName = (array: Employee[] | undefined): Employee[] => {
//   if (array) {
//     return array.sort((a, b) =>
//       a.name.split(" ")[1].localeCompare(b.name.split(" ")[1]),
//     );
//   }
//   return [];
// };
export interface EmployeeActions {
  getEmployee: (id: string) => APIResponse<Employee>;
  getEmployeeList: () => APIResponse<Employee[]>;
  getEmployeeActions: () => RestActions<EmployeeJSON>;
}

/** Hook for getting a list of the employees */
console.log("fix this");
export default function useEmployees(): ResponseStatus & EmployeeActions {
  // *** do we still need to call query params here?
  // queryParams?: QueriableList<Employee>,
  const {
    useRestOne,
    useRestList,
    useRestActions,
    // two interfaces passed to useRest now,
    // the backend data shape of Employees
    // and the frontend data shape of Employees
    // useRest operates as the switchboard between the two.
  } = useRest<Employee, EmployeeJSON>("/api/v1/employees", "employees");

  return {
    getEmployee: useRestOne,
    getEmployeeList: useRestList,
    getEmployeeActions: useRestActions,
  };
}
