import type { Project } from "./interfaces";
import { EstimatedDate, Role } from "../roles";
import type { AssignedEmployee } from "../employees";
import type { ServerEmployee } from "../employees/mapper";
import mapEmployee from "../employees/mapper";

export interface ServerEstimatedDate extends Omit<EstimatedDate, "date"> {
  date?: string;
}

interface ServerAssignedEmployee
  extends Omit<AssignedEmployee, "startDate" | "endDate" | "employee"> {
  startDate?: Date;
  endDate?: Date;
  employee: ServerEmployee;
}

interface ServerRole extends Omit<Role, "startDate" | "endDate" | "employees"> {
  startDate: ServerEstimatedDate;
  endDate: ServerEstimatedDate;
  employees: ServerAssignedEmployee[];
}

interface ServerProject extends Omit<Project, "roles"> {
  roles: ServerRole[];
}

export default function mapProject({
  roles,
  ...project
}: ServerProject): Project {
  return {
    ...project,
    roles: roles.map(({ startDate, endDate, employees, ...role }) => ({
      ...role,
      startDate: {
        ...startDate,
        date: startDate.date ? new Date(startDate.date) : undefined,
      },
      endDate: {
        ...endDate,
        date: endDate.date ? new Date(endDate.date) : undefined,
      },
      employees: employees.map(({ startDate, endDate, employee }) => ({
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        employee: mapEmployee(employee),
      })),
    })),
  };
}
