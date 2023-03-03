import ScaffoldForm from "../ScaffoldForm";
import { useScaffoldPresentation } from "../ScaffoldPresentationProvider";
import type {
  FieldComponent,
  XLayoutProps,
} from "../../presentation/interfaces";

interface ScaffoldFormPageProps extends XLayoutProps {
  isEdit?: boolean;
  fieldComponents?: { [attribute: string]: FieldComponent };
  routeOnSuccess: () => void;
}

const ScaffoldFormPage: React.FC<ScaffoldFormPageProps> = ({
  isEdit = false,
  schema,
  fieldComponents,
  renderActions,
  routeOnSuccess,
  children,
}) => {
  const { Layout } = useScaffoldPresentation();

  return (
    <Layout schema={schema} renderActions={renderActions}>
      <ScaffoldForm
        isEdit={isEdit}
        schema={schema}
        fieldComponents={fieldComponents}
        routeOnSuccess={routeOnSuccess}
      >
        {children}
      </ScaffoldForm>
    </Layout>
  );
};

export default ScaffoldFormPage;
