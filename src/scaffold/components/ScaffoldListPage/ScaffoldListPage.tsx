import React from "react";

import { useScaffoldDesign } from "../ScaffoldDesignProvider";
import type { Schema } from "../../schemas/schemas";

export type ValueComponent = React.FC<{
  // value can be array of objects w/ label for join fields
  value: string | number | { [label: string]: string | number }[];
}>;

const ScaffoldListPage: React.FC<{
  schema: Schema;
  valueComponents?: { [field: string]: ValueComponent };
  renderActions?: () => JSX.Element;
  children?: React.ReactNode | null;
  useData?: () => any[];
}> = ({ schema, valueComponents, renderActions, children, useData }) => {
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
