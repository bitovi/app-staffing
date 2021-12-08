import type { Employee } from "../employees";
import { EmployeeJSON } from "../employees/interfaces";
import type { ResponseStatus, APIResponse } from "../shared";

import restBuilder from "../useRest/restBuilder";

// const alphabetizeByName = (array: Employee[] | undefined): Employee[] => {
//   if (array) {
//     return array.sort((a, b) =>
//       a.name.split(" ")[1].localeCompare(b.name.split(" ")[1]),
//     );
//   }
//   return [];
// };
export interface EmployeeMutations<K> {
  addEmployee: (newCollectionItem: {
    data: Omit<K, "id">;
  }) => Promise<string | undefined>;
  updateEmployee: (id: string, data: { data: Omit<K, "id"> }) => Promise<void>;
  deleteEmployee: (collectionItemId: string) => Promise<void>;
}

export interface EmployeeActions {
  useEmployee: (id: string) => APIResponse<Employee>;
  useEmployeeList: () => APIResponse<Employee[]>;
  useEmployeeActions: () => EmployeeMutations<EmployeeJSON>;
}

const { useRestOne, useRestList, useRestActions } = restBuilder<
  Employee,
  EmployeeJSON
>("/api/v1/employees", "employees", { title: "Team member" });

export default function useEmployees(): ResponseStatus & EmployeeActions {
  const {
    handleAdd: addEmployee,
    handleUpdate: updateEmployee,
    handleDelete: deleteEmployee,
  } = useRestActions();

  return {
    useEmployee: useRestOne,
    useEmployeeList: useRestList,
    useEmployeeActions: () => {
      return { addEmployee, updateEmployee, deleteEmployee };
    },
  };
}
