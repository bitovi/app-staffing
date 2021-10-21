import { AssignedEmployee } from "..";
import type { Role } from "./interfaces";

// startDate?: Date;
// endDate?: Date;
export interface ServerAssignedEmployee
  extends Omit<AssignedEmployee, "startDate" | "endDate"> {
  startDate: string;
  endDate: string;
}

export interface ServerRole
  extends Omit<Role, "startDate" | "endDate" | "employees"> {
  employees: ServerAssignedEmployee[];
  startDate: {
    date: string;
    confidence: string;
  };
  endDate: {
    date: string;
    confidence: string;
  };
}

export default function mapRole({
  startDate,
  endDate,
  employees,
  ...role
}: ServerRole): Role {
  return {
    ...role,
    employees: employees.map(({ startDate, endDate, employee, ...rest }) => ({
      ...rest,
      employee: {
        ...employee,
        startDate: new Date(employee.startDate),
        endDate: employee.endDate ? new Date(employee.endDate) : undefined,
      },
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    })),
    startDate: {
      ...startDate,
      date: startDate?.date ? new Date(startDate.date) : undefined,
    },
    endDate: {
      ...endDate,
      date: endDate?.date ? new Date(endDate.date) : undefined,
    },
  };
}
