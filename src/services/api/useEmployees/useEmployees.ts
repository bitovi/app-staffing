import type { Employee } from "../employees";
import { EmployeeJSON } from "../employees/interfaces";
import type { ResponseStatus, APIResponse } from "../shared";

import restBuilder from "../restBuilder/restBuilder";

function formatEmployeeData(employee: Omit<Employee, "id">): {
  data: Omit<EmployeeJSON, "id">;
};
function formatEmployeeData(
  employee: Omit<Employee, "id">,
  id: string,
): { data: EmployeeJSON };

function formatEmployeeData(
  employee: Omit<Employee, "id">,
  id?: string,
): { data: EmployeeJSON } | { data: Omit<EmployeeJSON, "id"> } {
  const jsonFormattedEmployee: Omit<EmployeeJSON, "id"> = {
    type: "employees",
    attributes: {
      name: employee.name,
      startDate: employee.startDate,
      endDate: employee.endDate,
    },
    relationships: {
      skills: {
        data: employee.skills.map((skill) => ({
          type: "skills",
          id: skill.id,
        })),
      },
    },
  };
  return id
    ? { data: { ...jsonFormattedEmployee, id } }
    : { data: jsonFormattedEmployee };
}
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
  useEmployeeList: () => APIResponse<Employee[]>;
  useEmployeeActions: () => EmployeeMutations<Employee>;
}

const { useRestOne, useRestList, useRestActions } = restBuilder<
  Employee,
  EmployeeJSON
>("/api/v1/employees", "employees", { title: "Team member" });

export default function useEmployees(): ResponseStatus & EmployeeActions {
  const {
    handleAdd,
    handleUpdate,
    handleDelete: deleteEmployee,
  } = useRestActions();

  return {
    useEmployee: useRestOne,
    useEmployeeList: useRestList,
    useEmployeeActions: () => {
      return {
        addEmployee: (employee: Omit<Employee, "id">) =>
          handleAdd(formatEmployeeData(employee)),
        updateEmployee: (id: string, employee: Omit<Employee, "id">) =>
          handleUpdate(id, formatEmployeeData(employee, id)),
        deleteEmployee,
      };
    },
  };
}
