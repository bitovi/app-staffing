import { Children as ReactChildren } from "react";

import {
  getDisplaysFromChildren,
  getDisplaysFromSchema,
  hasValidChildren,
  injectExtraDisplays,
  ScaffoldDisplay,
} from "../../services/displays/scaffoldDisplays";
import { useScaffoldPresentation } from "../ScaffoldPresentationProvider";
import {
  ScaffoldAttributeDisplay,
  ScaffoldExtraDisplay,
} from "../ScaffoldDisplays";
import { fetchData } from "../../services/api/api";

import type { Schema } from "../../schemas/schemas";
import type { FlatRecord, ValueComponent } from "../../presentation/interfaces";
import { DefaultValueComponents } from "../ScaffoldPresentationProvider/ScaffoldPresentationProvider";

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
  const { List, defaultValueComponents } = useScaffoldPresentation();
  const displays = getDisplays(
    schema,
    valueComponents,
    defaultValueComponents,
    children,
  );

  // @todo implement this in a better way when data layer is implemented
  if (!useData) {
    const resource = fetchData(schema);
    useData = () => resource.read();
  }

  return <List displays={displays} useData={useData} />;
};

export function getDisplays(
  schema: Schema,
  valueComponents: { [field: string]: ValueComponent } | undefined,
  defaultValueComponents: DefaultValueComponents,
  children: React.ReactNode | null,
): ScaffoldDisplay[] {
  // casting as JSX.Element because helper functions require access to
  // `child.type.name` and `child.props`
  const childArray = ReactChildren.toArray(children) as JSX.Element[];

  let displays = hasValidChildren(ScaffoldAttributeDisplay.name, childArray)
    ? getDisplaysFromChildren(schema, defaultValueComponents, childArray)
    : getDisplaysFromSchema(
        schema,
        defaultValueComponents,
        valueComponents || null,
      );

  if (hasValidChildren(ScaffoldExtraDisplay.name, childArray)) {
    displays = injectExtraDisplays(
      displays,
      defaultValueComponents,
      childArray,
    );
  }

  return displays;
}

export default ScaffoldList;
