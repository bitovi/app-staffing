import ScaffoldList from "../ScaffoldList";
import { useScaffoldDesign } from "../ScaffoldDesignProvider";
import type {
  FlatRecord,
  ValueComponent,
  XLayoutProps,
} from "../../design/interfaces";

interface ScaffoldListPageProps extends XLayoutProps {
  valueComponents?: { [attribute: string]: ValueComponent };
  useData?: () => FlatRecord[];
}

const ScaffoldListPage: React.FC<ScaffoldListPageProps> = ({
  schema,
  valueComponents,
  renderActions,
  children,
  useData,
}) => {
  const { Layout } = useScaffoldDesign();

  return (
    <Layout schema={schema} renderActions={renderActions}>
      <ScaffoldList
        schema={schema}
        valueComponents={valueComponents}
        useData={useData}
      >
        {children}
      </ScaffoldList>
    </Layout>
  );
};

export default ScaffoldListPage;
