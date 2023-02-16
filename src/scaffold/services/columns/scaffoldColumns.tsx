import cloneDeep from "lodash/cloneDeep";

import type { Schema } from "../../schemas/schemas";
import type { ValueComponent } from "../../components/ScaffoldListPage";

export interface ScaffoldColumn {
  headerName: string;
  attribute: string;
  renderCell: ({
    value,
    record,
    attributeSchema,
  }: {
    value: any;
    record: any;
    attributeSchema: any;
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
}: {
  isRelationship?: boolean;
  isExtraColumn?: boolean;
  attribute: any;
  label?: string | null;
  attributeSchema?: any;
  ValueComponent?: any;
  valueComponents?: any;
  render?: any;
}) {
  const column: ScaffoldColumn = {
    headerName: label || attribute,
    attribute: attribute,
    renderCell: ({ value }) => <div>{value}</div>,
  };

  /**
   * cell render priority:
   * 1. `renderValue` prop from `ScaffoldExtraDisplay` or `ScaffoldAttributeDisplay`
   * 2. `ValueComponent` prop from `ScaffoldExtraDisplay` or `ScaffoldAttributeDisplay`
   * 3. `valueComponents` prop from `ScaffoldList`
   * 4. field is a relationship according to the schema then handle array with map/join
   * 5. field is a date according to the schema then format as a date
   * @todo handle schema type boolean
   * 6. default `renderCell` (handle string/number)
   */

  if (render) {
    column.renderCell = ({ value, record }) =>
      render({ value, record, attributeSchema });
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
      // eg. `skills` cell data will be [{ id, ...attributes, label: unique field }]
      return value
        .map(
          (value: { [field: string]: string | boolean | number }) =>
            value.label,
        )
        .join(",");
    };
  } else if (
    attributeSchema &&
    (attributeSchema === "date" ||
      (typeof attributeSchema === "object" &&
        "type" in attributeSchema &&
        attributeSchema.type === "date"))
  ) {
    column.renderCell = ({ value }) => {
      return value ? new Date(value).toLocaleDateString() : "";
    };
  } // else use default renderCell

  return column;
}

export function getColumnsFromChildren(
  schema: Schema,
  children: (React.ReactChild | React.ReactFragment | React.ReactPortal)[],
): ScaffoldColumn[] {
  const columns = children
    .filter(
      (child) =>
        (child as JSX.Element).type.name === "ScaffoldAttributeDisplay",
    )
    .map((child) => {
      const { props } = child as JSX.Element;
      const relationship = (schema?.hasMany || []).find((relationship) => {
        return relationship.target.toLowerCase() === props.field;
      });

      return getScaffoldColumn({
        isRelationship: relationship !== undefined,
        attribute: props.field,
        label: props.label,
        attributeSchema: relationship || schema.attributes[props.field],
        ValueComponent: props.ValueComponent,
      });
    });

  return columns;
}

export function getColumnsFromSchema(
  schema: Schema,
  valueComponents: { [field: string]: ValueComponent } | null,
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
      attributeSchema: value,
      valueComponents,
    });
  });

  return [...attributesColumns, ...hasManyColumns];
}

export function injectExtraColumns(
  columns: ScaffoldColumn[],
  children: (React.ReactChild | React.ReactFragment | React.ReactPortal)[],
): ScaffoldColumn[] {
  const updatedColumns = cloneDeep(columns);

  for (let i = 0; i < children.length; i++) {
    const child = children[i] as JSX.Element;
    if (child.type.name !== "ScaffoldExtraDisplay") continue;
    const { props } = child;

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
  children: (React.ReactChild | React.ReactFragment | React.ReactPortal)[],
): boolean {
  return children.some((child) => (child as JSX.Element).type.name === name);
}
