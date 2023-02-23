import { Employee as EmployeeSchema } from "../../../schemas/schemas";
import ScaffoldDetailsPage from "../../../components/ScaffoldDetailsPage";
import MuiProvider from "../../../presentation/mui/MuiProvider";

const Employee: React.FC = () => {
  return (
    <MuiProvider>
      <ScaffoldDetailsPage schema={EmployeeSchema} />
    </MuiProvider>
  );
};

export default Employee;
