import React from "react";
import { cloneDeep } from "lodash";
import { GridEnrichedColDef } from "@mui/x-data-grid";

import type { Attribute, Relationship, Schema } from "../../schemas/schemas";
import type { ValueComponent } from "../../components/ScaffoldListPage";

export function hasValidChildren(
  name: string,
  children: (React.ReactChild | React.ReactFragment | React.ReactPortal)[],
): boolean {
  return children.some((child) => (child as JSX.Element).type.name === name);
}

export function injectExtraColumns(
  columns: GridEnrichedColDef[],
  children: (React.ReactChild | React.ReactFragment | React.ReactPortal)[],
): GridEnrichedColDef[] {
  const updatedColumns = cloneDeep(columns);

  for (let i = 0; i < children.length; i++) {
    const child = children[i] as JSX.Element;
    if (child.type.name !== "ScaffoldExtraColumn") continue;
    const { props } = child;

    // @todo add according to props.after property
    updatedColumns.push(
      getMuiDataGridColumn({
        isExtra: true,
        label: props.label,
        field: props.label,
        renderValue: props.renderValue,
        ValueComponent: props.ValueComponent,
      }),
    );
  }

  return updatedColumns;
}

export function getMuiDataGridColumn({
  isRelationship = false,
  isExtra = false,
  field,
  label = null,
  schemaDefinition = null,
  valueComponents = null,
  renderValue = null,
  ValueComponent = null,
}: {
  isRelationship?: boolean;
  isExtra?: boolean;
  field: string;
  label?: string | null;
  schemaDefinition?: Attribute | Relationship | null;
  valueComponents?: { [field: string]: ValueComponent } | null;
  renderValue?: (({ value }: { value: string | number }) => JSX.Element) | null;
  ValueComponent?: ValueComponent | null;
}): GridEnrichedColDef {
  const column: GridEnrichedColDef = { field, flex: 1 };

  if (label) {
    column.headerName = label;
  }

  /**
   * cell render priority:
   * 1. `renderValue` prop from `ScaffoldExtraColumn` or `ScaffoldFieldColumn`
   * 2. `ValueComponent` prop from `ScaffoldExtraColumn` or `ScaffoldFieldColumn`
   * 3. `valueComponents` prop from `ScaffoldList`
   * 4. field is a relationship according to the schema then handle array with map/join
   * 5. field is a date according to the schema then format as a date
   * @todo handle schema type boolean
   * 6. default `renderCell` (handle string/number)
   */

  if (renderValue) {
    column.renderCell = ({ formattedValue, row }) =>
      renderValue({ value: isExtra ? row : formattedValue });
  } else if (ValueComponent) {
    column.renderCell = ({ formattedValue, row }) => (
      <ValueComponent value={isExtra ? row : formattedValue} />
    );
  } else if (valueComponents && valueComponents[field]) {
    const RenderCell = valueComponents[field];
    column.renderCell = ({ formattedValue }) => (
      <RenderCell value={formattedValue} />
    );
  } else if (isRelationship) {
    // belongsToMany value should return an array of objects
    column.renderCell = ({ formattedValue }) => {
      // eg. `skills` cell data will be [{ id, ...attributes, label: unique field }]
      return formattedValue
        .map(
          (value: { [field: string]: string | boolean | number }) =>
            value.label,
        )
        .join(",");
    };
  } else if (
    schemaDefinition &&
    (schemaDefinition === "date" ||
      (typeof schemaDefinition === "object" &&
        "type" in schemaDefinition &&
        schemaDefinition.type === "date"))
  ) {
    column.renderCell = ({ formattedValue }) => {
      return formattedValue
        ? new Date(formattedValue).toLocaleDateString()
        : "";
    };
  } // else let default renderCell handle display value

  return column;
}

export function getColumnsFromChildren(
  schema: Schema,
  children: (React.ReactChild | React.ReactFragment | React.ReactPortal)[],
): GridEnrichedColDef[] {
  const columns = children
    .filter(
      (child) => (child as JSX.Element).type.name === "ScaffoldFieldColumn",
    )
    .map((child) => {
      const { props } = child as JSX.Element;
      const relationship = (schema?.belongsToMany || []).find(
        (relationship) => {
          return relationship.target.toLowerCase() === props.field;
        },
      );

      return getMuiDataGridColumn({
        isRelationship: relationship !== undefined,
        field: props.field,
        label: props.label,
        schemaDefinition: relationship || schema.attributes[props.field],
        renderValue: props.renderValue,
        ValueComponent: props.ValueComponent,
      });
    });

  return columns;
}

export function getColumns(
  schema: Schema,
  valueComponents: { [field: string]: ValueComponent } | null,
): GridEnrichedColDef[] {
  const attributesColumns = Object.entries(schema.attributes).map(
    ([key, value]) => {
      return getMuiDataGridColumn({
        field: key,
        schemaDefinition: value,
        valueComponents,
      });
    },
  );

  const hasManyColumns = Object.values(schema?.hasMany || []).map((value) => {
    return getMuiDataGridColumn({
      isRelationship: true,
      field: value.target.toLowerCase(),
      schemaDefinition: value,
      valueComponents,
      label: value.target,
    });
  });
  return [...attributesColumns, ...hasManyColumns];
}
