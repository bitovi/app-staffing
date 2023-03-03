import ScaffoldDetails from "../ScaffoldDetails";
import { useScaffoldPresentation } from "../ScaffoldPresentationProvider";
import type {
  FlatRecord,
  ValueComponent,
  XLayoutProps,
} from "../../presentation/interfaces";

interface ScaffoldDetailsPageProps extends XLayoutProps {
  valueComponents?: { [attribute: string]: ValueComponent };
  useData?: () => FlatRecord;
}

const ScaffoldDetailsPage: React.FC<ScaffoldDetailsPageProps> = ({
  schema,
  valueComponents,
  renderActions,
  children,
  useData,
}) => {
  const { Layout } = useScaffoldPresentation();

  return (
    <Layout schema={schema} renderActions={renderActions}>
      <ScaffoldDetails
        schema={schema}
        valueComponents={valueComponents}
        useData={useData}
      >
        {children}
      </ScaffoldDetails>
    </Layout>
  );
};

export default ScaffoldDetailsPage;
