import React from "react";

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
      {children}
    </Layout>
  );
};

export default ScaffoldListPage;
