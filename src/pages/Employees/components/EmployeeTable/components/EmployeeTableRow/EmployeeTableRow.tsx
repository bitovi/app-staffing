import { Tr } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { Employee } from "../../../../../../services/api";
import EmployeeCard from "../../../EmployeeCard";

export default function EmployeeTableRow({
  employee,
  handleEditEmployee,
  handleDeleteEmployee,
  lastChild = false,
}: {
  employee: Employee;
  handleEditEmployee: Dispatch<SetStateAction<Employee | null>>;
  handleDeleteEmployee: Dispatch<SetStateAction<Employee | null>>;
  lastChild: boolean;
}): JSX.Element {
  return (
    <>
      <EmployeeCard
        employee={employee}
        handleEditEmployee={handleEditEmployee}
        handleDeleteEmployee={handleDeleteEmployee}
      />
      {/* add space between rows */}
      {!lastChild && <Tr height={4} />}
    </>
  );
}
