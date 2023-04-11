import ScaffoldList from "../ScaffoldList";
import { useScaffoldPresentation } from "../ScaffoldPresentationProvider";
import type {
  FlatRecord,
  ValueComponent,
  XLayoutProps,
} from "../../presentation/interfaces";

interface ScaffoldListPageProps extends XLayoutProps {
  valueComponents?: { [attribute: string]: ValueComponent };
  listActions?: {
    delete?: () => void;
  };
  useData?: () => FlatRecord[];
}

const ScaffoldListPage: React.FC<ScaffoldListPageProps> = ({
  schema,
  valueComponents,
  renderActions,
  listActions,
  children,
  useData,
}) => {
  const { Layout } = useScaffoldPresentation();

  return (
    <Layout schema={schema} renderActions={renderActions}>
      <ScaffoldList
        schema={schema}
        valueComponents={valueComponents}
        actions={listActions}
        useData={useData}
      >
        {children}
      </ScaffoldList>
    </Layout>
  );
};

export default ScaffoldListPage;
