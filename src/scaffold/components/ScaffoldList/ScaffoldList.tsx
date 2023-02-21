import { Children as ReactChildren } from "react";

import {
  getColumnsFromChildren,
  getColumnsFromSchema,
  hasValidChildren,
  injectExtraColumns,
} from "../../services/columns/scaffoldColumns";
import { useScaffoldDesign } from "../ScaffoldDesignProvider";
import {
  ScaffoldAttributeDisplay,
  ScaffoldExtraDisplay,
} from "../ScaffoldColumns";
import { fetchData } from "../../services/api/api";

import type { Schema } from "../../schemas/schemas";
import type { FlatRecord, ValueComponent } from "../../design/interfaces";

interface ScaffoldListProps {
  schema: Schema;
  valueComponents?: { [attribute: string]: ValueComponent };
  useData?: () => FlatRecord[];
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

  // @todo implement this in a better way when data layer is implemented
  if (!useData) {
    const resource = fetchData(schema);
    useData = () => resource.read();
  }

  return <List columns={columns} useData={useData} />;
};

function getColumns(
  schema: Schema,
  valueComponents: { [field: string]: ValueComponent } | undefined,
  children: React.ReactNode | null,
) {
  // casting as JSX.Element because helper functions require access to
  // `child.type.name` and `child.props`
  const childArray = ReactChildren.toArray(children) as JSX.Element[];

  let columns = hasValidChildren(ScaffoldAttributeDisplay.name, childArray)
    ? getColumnsFromChildren(schema, childArray)
    : getColumnsFromSchema(schema, valueComponents || null);

  if (hasValidChildren(ScaffoldExtraDisplay.name, childArray)) {
    columns = injectExtraColumns(columns, childArray);
  }

  return columns;
}

export default ScaffoldList;
