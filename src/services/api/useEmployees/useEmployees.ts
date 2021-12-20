import type { Employee } from "../employees";
import type { ResponseStatus, APIResponse, QueriableList } from "../shared";

import restBuilder from "../restBuilder/restBuilder";

export interface EmployeeMutations<T> {
  addEmployee: (
    newCollectionItem: Omit<T, "id">,
  ) => Promise<string | undefined>;
  updateEmployee: (
    id: string,
    updateCollectionItem: Omit<T, "id">,
  ) => Promise<void>;
  deleteEmployee: (collectionItemId: string) => Promise<void>;
}

export interface EmployeeActions {
  useEmployee: (id: string) => APIResponse<Employee>;
  useEmployeeList: (
    queryParams?: QueriableList<Employee>,
  ) => APIResponse<Employee[]>;
  useEmployeeActions: () => EmployeeMutations<Employee>;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const { useRestOne, useRestList, useRestActions } = restBuilder<Employee>(
  `${API_BASE_URL}/employees`,
  "employees",
  { title: "Team member" },
);

export default function useEmployees(): ResponseStatus & EmployeeActions {
  const { create, update, destroy } = useRestActions();

  return {
    useEmployee: useRestOne,
    useEmployeeList: useRestList,
    useEmployeeActions: () => {
      return {
        addEmployee: (employee: Omit<Employee, "id">) =>
          create({ data: employee }),
        updateEmployee: (id: string, employee: Omit<Employee, "id">) =>
          update(id, { data: employee }),
        deleteEmployee: (id: string) => destroy(id),
      };
    },
  };
}
