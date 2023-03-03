import { useHistory } from "react-router-dom";
import ScaffoldFormPage from "../../../components/ScaffoldFormPage";
import MuiProvider from "../../../presentation/mui/MuiProvider";
import { Employee } from "../../../schemas/schemas";

const Create: React.FC = () => {
  const history = useHistory();

  return (
    <MuiProvider>
      <ScaffoldFormPage
        schema={Employee}
        routeOnSuccess={() => history.push("/team-members")}
      />
    </MuiProvider>
  );
};

export default Create;
