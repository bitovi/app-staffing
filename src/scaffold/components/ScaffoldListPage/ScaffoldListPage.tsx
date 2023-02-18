import ScaffoldList from "../ScaffoldList";
import { useScaffoldDesign } from "../ScaffoldDesignProvider";
import type { XLayoutProps } from "../../design/interfaces";

const ScaffoldListPage: React.FC<XLayoutProps> = ({
  schema,
  valueComponents,
  renderActions,
  children,
  useData,
}) => {
  const { Layout } = useScaffoldDesign();

  return (
    <Layout
      schema={schema}
      valueComponents={valueComponents}
      renderActions={renderActions}
      useData={useData}
    >
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
