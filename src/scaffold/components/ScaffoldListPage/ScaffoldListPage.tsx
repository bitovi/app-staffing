import React from "react";
import type { Schema } from "../../schemas/schemas";

import ScaffoldList from "../ScaffoldList";
import styles from "./ScaffoldListPage.module.css";

export type ValueComponent = React.FC<{
  // value can be array of objects w/ label for join fields
  value: string | number | { [label: string]: string | number }[];
}>;

const ScaffoldListPage: React.FC<{
  schema: Schema;
  valueComponents?: { [field: string]: ValueComponent };
  renderActions?: () => JSX.Element;
  children?: React.ReactNode | null;
}> = ({ schema, valueComponents, renderActions, children }) => {
  return (
    <div>
      <div className={styles.headerRow}>
        <h1 className={styles.header}>{schema.name}</h1>
        {/* @todo Filters */}
        <div>{renderActions && renderActions()}</div>
      </div>
      <div>
        <ScaffoldList schema={schema} valueComponents={valueComponents}>
          {children}
        </ScaffoldList>
      </div>
    </div>
  );
};

export default ScaffoldListPage;
