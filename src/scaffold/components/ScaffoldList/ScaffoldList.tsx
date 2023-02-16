import React from "react";

import {
  getColumnsFromChildren,
  getColumnsFromSchema,
  hasValidChildren,
  injectExtraColumns,
} from "../../services/columns/scaffoldColumns";
import { useScaffoldDesign } from "../ScaffoldDesignProvider";
import type { Schema } from "../../schemas/schemas";
import type { ValueComponent } from "../ScaffoldListPage";
import type { ScaffoldColumn } from "../../services/columns/scaffoldColumns";

interface ScaffoldListProps {
  schema: Schema;
  valueComponents?: { [field: string]: ValueComponent };
  useData?: () => any[];
  children?: React.ReactNode | null;
}

const ScaffoldList: React.FC<ScaffoldListProps> = ({
  schema,
  valueComponents,
  useData,
  children,
}) => {
  const columns = getColumns(schema, valueComponents, children);
  const { List } = useScaffoldDesign();

  if (!useData) {
    useData = () => [];
  }

  return <List columns={columns as ScaffoldColumn[]} useData={useData} />;
};

function getColumns(
  schema: Schema,
  valueComponents: { [field: string]: ValueComponent } | undefined,
  children: React.ReactNode | null,
) {
  const childArray = React.Children.toArray(children);

  let columns = hasValidChildren("ScaffoldAttributeDisplay", childArray)
    ? getColumnsFromChildren(schema, childArray)
    : getColumnsFromSchema(schema, valueComponents || null);

  if (hasValidChildren("ScaffoldExtraDisplay", childArray)) {
    columns = injectExtraColumns(columns, childArray);
  }

  return columns;
}

export default ScaffoldList;
