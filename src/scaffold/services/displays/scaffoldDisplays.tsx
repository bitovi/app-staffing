import { Children as ReactChildren } from "react";
import { v4 as uuidv4 } from "uuid";
import cloneDeep from "lodash/cloneDeep";

import type { Attribute, Schema } from "../../schemas/schemas";
import type {
  Relationship as RelationshipType,
  FlatRecord,
  ValueComponent,
} from "../../presentation/interfaces";
import {
  ScaffoldAttributeDisplay,
  ScaffoldExtraDisplay,
} from "../../components/ScaffoldDisplays";
import type { Render, RenderValue } from "../../components/ScaffoldDisplays";
import type { DefaultValueComponents } from "../../components/ScaffoldPresentationProvider";

export interface ScaffoldDisplay {
  key: string;
  label: string;
  render: ({ record }: { record: FlatRecord }) => React.ReactNode;
}

export function getDefaultRender(
  attribute: string,
  attributeType: string,
  defaultValueComponents: DefaultValueComponents,
): ({ record }: { record: FlatRecord }) => React.ReactNode {
  const { String, Number, Boolean, Relationship, RelationshipList, Date } =
    defaultValueComponents;

  // @todo primitive lists?
  return ({ record }) => {
    const value = record[attribute];

    if (attributeType === "date" && typeof value === "string") {
      return <Date value={value} />;
    }

    if (attributeType === "string" && typeof value === "string") {
      return <String value={value} />;
    }

    if (attributeType === "boolean" && typeof value === "boolean") {
      return <Boolean value={value} />;
    }

    if (attributeType === "number" && typeof value === "number") {
      return <Number value={value} />;
    }

    if (attributeType === "relationship") {
      return Array.isArray(value) ? (
        <RelationshipList values={value} />
      ) : (
        <Relationship value={value as RelationshipType} />
      );
    }

    // fallback
    return <String value=" " />;
  };
}

// @todo refactor the logic around render in this function
export function getScaffoldDisplay({
  attribute,
  isRelationship = false,
  isExtraDisplay = false, // @todo necessary? should always be covered by `render` or `ValueComponent` case!
  label = null,
  attributeSchema = null,
  ValueComponent = null,
  valueComponents = null,
  defaultValueComponents,
  render = null,
  renderValue = null,
}: {
  isRelationship?: boolean;
  isExtraDisplay?: boolean;
  attribute: string;
  label?: string | null;
  attributeSchema?: Attribute | null;
  ValueComponent?: ValueComponent | null;
  valueComponents?: { [attribute: string]: ValueComponent } | null;
  defaultValueComponents: DefaultValueComponents;
  render?: Render | null;
  renderValue?: RenderValue | null;
}): ScaffoldDisplay {
  if (!attributeSchema) {
    attributeSchema = { type: "extra", allowNull: true };
  }

  if (typeof attributeSchema === "string") {
    attributeSchema = { type: attributeSchema, allowNull: true };
  }

  if (isRelationship) {
    attributeSchema = { type: "relationship", allowNull: true };
  }

  const display: ScaffoldDisplay = {
    key: attribute || uuidv4(),
    label:
      label ||
      attribute // convert to "Title Case"
        .replace(/(^\w)/g, (g) => g[0].toUpperCase())
        .replace(/([-_]\w)/g, (g) => " " + g[1].toUpperCase())
        .trim(),
    render: () => null,
  };

  /**
   * cell render priority:
   * 1. `renderValue` prop from `ScaffoldExtraDisplay` or `ScaffoldAttributeDisplay`
   * 2. `ValueComponent` prop from `ScaffoldExtraDisplay` or `ScaffoldAttributeDisplay`
   * 3. `valueComponents` prop from `ScaffoldList`
   * 6. default `render` using presentation's defaultvalueComponents
   */

  if (render) {
    display.render = ({ record }) => render({ record });
  } else if (renderValue) {
    display.render = ({ record }) =>
      renderValue({ record, value: record[attribute] });
  } else if (ValueComponent) {
    display.render = ({ record }) => (
      <ValueComponent
        value={record[attribute]}
        record={record}
        attributeSchema={attributeSchema}
      />
    );
  } else if (valueComponents && valueComponents[attribute]) {
    const RenderCell = valueComponents[attribute];
    display.render = ({ record }) => (
      <RenderCell
        value={record[attribute]}
        record={record}
        attributeSchema={attributeSchema}
      />
    );
  } else {
    display.render = getDefaultRender(
      attribute,
      attributeSchema.type,
      defaultValueComponents,
    );
  }

  return display;
}

export function getDisplaysFromChildren(
  schema: Schema,
  defaultValueComponents: DefaultValueComponents,
  children: JSX.Element[],
): ScaffoldDisplay[] {
  const displays = children
    .filter((child) => child.type.name === ScaffoldAttributeDisplay.name)
    .map((child) => {
      const { props } = child;
      const relationship = (schema?.hasMany || []).find((relationship) => {
        return relationship.target.toLowerCase() === props.attribute;
      });

      return getScaffoldDisplay({
        isRelationship: relationship !== undefined,
        attribute: props.attribute,
        label: props.label,
        attributeSchema: relationship
          ? null
          : schema.attributes[props.attribute],
        ValueComponent: props.ValueComponent,
        defaultValueComponents,
        renderValue: props.renderValue,
      });
    });

  return displays;
}

export function getDisplaysFromSchema(
  schema: Schema,
  defaultValueComponents: DefaultValueComponents,
  valueComponents: { [attribute: string]: ValueComponent } | null,
): ScaffoldDisplay[] {
  const attributesDisplays = Object.entries(schema.attributes).map(
    ([key, value]) => {
      return getScaffoldDisplay({
        attribute: key,
        attributeSchema: value,
        valueComponents,
        defaultValueComponents,
      });
    },
  );

  const hasManyDisplays = Object.values(schema?.hasMany || []).map((value) => {
    return getScaffoldDisplay({
      isRelationship: true,
      attribute: value.target.toLowerCase(),
      label: value.target,
      attributeSchema: null, // the schema in this case is a "relationship"
      valueComponents,
      defaultValueComponents,
    });
  });

  return [...attributesDisplays, ...hasManyDisplays];
}

export function injectExtraDisplays(
  displays: ScaffoldDisplay[],
  defaultValueComponents: DefaultValueComponents,
  children: JSX.Element[],
): ScaffoldDisplay[] {
  const updatedDisplays = cloneDeep(displays);

  for (let i = 0; i < children.length; i++) {
    if (children[i].type.name !== ScaffoldExtraDisplay.name) continue;
    const { props } = children[i];

    // @todo add according to props.after property
    updatedDisplays.push(
      getScaffoldDisplay({
        isExtraDisplay: true,
        label: props.label,
        attribute: props.label,
        render: props.render,
        ValueComponent: props.ValueComponent,
        defaultValueComponents,
      }),
    );
  }

  return updatedDisplays;
}

export function hasValidChildren(
  name: string,
  children: JSX.Element[],
): boolean {
  return children.some((child) => child.type.name === name);
}

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
