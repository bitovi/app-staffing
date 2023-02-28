import cloneDeep from "lodash/cloneDeep";

import type { Attribute, Schema } from "../../schemas/schemas";
import type {
  CellValue,
  FlatRecord,
  ValueComponent,
} from "../../presentation/interfaces";
import {
  ScaffoldAttributeDisplay,
  ScaffoldExtraDisplay,
} from "../../components/ScaffoldColumns";
import type { Render, RenderValue } from "../../components/ScaffoldColumns";

export interface ScaffoldColumn {
  headerName: string;
  attribute: string;
  renderCell: ({
    value,
    record,
    attributeSchema,
  }: {
    value: CellValue;
    record: FlatRecord;
    attributeSchema?: Attribute;
  }) => React.ReactNode;
}

// @todo refactor the logic around renderCell in this function
export function getScaffoldColumn({
  attribute,
  isRelationship = false,
  isExtraColumn = false, // @todo necessary? should always be covered by `render` or `ValueComponent` case!
  label = null,
  attributeSchema = null,
  ValueComponent = null,
  valueComponents = null,
  render = null,
  renderValue = null,
}: {
  isRelationship?: boolean;
  isExtraColumn?: boolean;
  attribute: string;
  label?: string | null;
  attributeSchema?: Attribute | null;
  ValueComponent?: ValueComponent | null;
  valueComponents?: { [attribute: string]: ValueComponent } | null;
  render?: Render | null;
  renderValue?: RenderValue | null;
}): ScaffoldColumn {
  const column: ScaffoldColumn = {
    headerName: label || attribute,
    attribute: attribute,
    renderCell: ({ value }) => <div>{value}</div>,
  };

  if (typeof attributeSchema === "string") {
    attributeSchema = { type: attributeSchema, allowNull: true };
  }

  /**
   * cell render priority:
   * 1. `renderValue` prop from `ScaffoldExtraDisplay` or `ScaffoldAttributeDisplay`
   * 2. `ValueComponent` prop from `ScaffoldExtraDisplay` or `ScaffoldAttributeDisplay`
   * 3. `valueComponents` prop from `ScaffoldList`
   * 4. attribute is a relationship according to the schema then handle array with map/join
   * 5. attribute is a date according to the schema then format as a date
   * @todo handle schema type boolean
   * 6. default `renderCell` (handle string/number)
   */

  if (render) {
    column.renderCell = ({ record }) => render({ record });
  } else if (renderValue) {
    // @todo attributeSchema!!!!!
    column.renderCell = ({ record, value }) => renderValue({ record, value });
  } else if (ValueComponent) {
    column.renderCell = ({ value, record }) => (
      <ValueComponent
        value={value}
        record={record}
        attributeSchema={attributeSchema}
      />
    );
  } else if (valueComponents && valueComponents[attribute]) {
    const RenderCell = valueComponents[attribute];
    column.renderCell = ({ value, record }) => (
      <RenderCell
        value={value}
        record={record}
        attributeSchema={attributeSchema}
      />
    );
  } else if (isRelationship) {
    column.renderCell = ({ value }) => {
      // eg. `skills` cell data will be [{ id, ...attributes, label: unique attribute }]
      return Array.isArray(value)
        ? value
            .map(
              (value: { [attribute: string]: string | boolean | number }) =>
                value.label,
            )
            .join(",")
        : "";
    };
  } else if (attributeSchema?.type === "date") {
    column.renderCell = ({ value }) => {
      return value ? new Date(value.toString()).toLocaleDateString() : "";
    };
  } else if (attributeSchema?.type === "boolean") {
    column.renderCell = ({ value }) => {
      return value ? "True" : "False";
    };
  } // else use default renderCell

  return column;
}

export function getColumnsFromChildren(
  schema: Schema,
  children: JSX.Element[],
): ScaffoldColumn[] {
  const columns = children
    .filter((child) => child.type.name === ScaffoldAttributeDisplay.name)
    .map((child) => {
      const { props } = child;
      const relationship = (schema?.hasMany || []).find((relationship) => {
        return relationship.target.toLowerCase() === props.attribute;
      });

      return getScaffoldColumn({
        isRelationship: relationship !== undefined,
        attribute: props.attribute,
        label: props.label,
        attributeSchema: relationship
          ? null
          : schema.attributes[props.attribute],
        ValueComponent: props.ValueComponent,
        renderValue: props.renderValue,
      });
    });

  return columns;
}

export function getColumnsFromSchema(
  schema: Schema,
  valueComponents: { [attribute: string]: ValueComponent } | null,
): ScaffoldColumn[] {
  const attributesColumns = Object.entries(schema.attributes).map(
    ([key, value]) => {
      return getScaffoldColumn({
        attribute: key,
        attributeSchema: value,
        valueComponents,
      });
    },
  );

  const hasManyColumns = Object.values(schema?.hasMany || []).map((value) => {
    return getScaffoldColumn({
      isRelationship: true,
      attribute: value.target.toLowerCase(),
      label: value.target,
      attributeSchema: null, // the schema in this case is a "relationship"
      valueComponents,
    });
  });

  return [...attributesColumns, ...hasManyColumns];
}

export function injectExtraColumns(
  columns: ScaffoldColumn[],
  children: JSX.Element[],
): ScaffoldColumn[] {
  const updatedColumns = cloneDeep(columns);

  for (let i = 0; i < children.length; i++) {
    if (children[i].type.name !== ScaffoldExtraDisplay.name) continue;
    const { props } = children[i];

    // @todo add according to props.after property
    updatedColumns.push(
      getScaffoldColumn({
        isExtraColumn: true,
        label: props.label,
        attribute: props.label,
        render: props.render,
        ValueComponent: props.ValueComponent,
      }),
    );
  }

  return updatedColumns;
}

export function hasValidChildren(
  name: string,
  children: JSX.Element[],
): boolean {
  return children.some((child) => child.type.name === name);
}
