import type { Employee } from "./interfaces";

export interface ServerEmployee
  extends Omit<Employee, "startDate" | "endDate"> {
  startDate: string;
  endDate?: string;
}

export default function mapEmployee({
  startDate,
  endDate,
  ...employee
}: ServerEmployee): Employee {
  return {
    ...employee,
    startDate: new Date(startDate),
    endDate: endDate ? new Date(endDate) : undefined,
  };
}
