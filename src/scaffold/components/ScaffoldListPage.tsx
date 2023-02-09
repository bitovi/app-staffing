import React from "react";
import type { Schema } from "../schemas";

import { ScaffoldList } from "./ScaffoldList";

export const ScaffoldListPage: React.FC<{
  schema: Schema;
  valueComponents?: { [field: string]: React.FC<{ value: string | number }> };
  ActionComponents?: any;
  // filterComponents?:
  children?: React.ReactNode | null;
}> = ({ schema, valueComponents, ActionComponents, children }) => {
  return (
    <div>
      <div
        style={{ display: "flex", flex: 1, justifyContent: "space-between" }}
      >
        <h1>{schema.name}</h1>
        {/* @todo Filters */}
        <div>{ActionComponents && <ActionComponents />}</div>
      </div>
      <div>
        <ScaffoldList schema={schema} valueComponents={valueComponents}>
          {children}
        </ScaffoldList>
      </div>
    </div>
  );
};
