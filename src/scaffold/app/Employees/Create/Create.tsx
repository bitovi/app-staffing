import ScaffoldFormPage from "../../../components/ScaffoldFormPage";
import MuiProvider from "../../../presentation/mui/MuiProvider";
import { Employee } from "../../../schemas/schemas";

const Create = () => {
  return (
    <MuiProvider>
      <ScaffoldFormPage schema={Employee} />
    </MuiProvider>
  );
};

export default Create;
