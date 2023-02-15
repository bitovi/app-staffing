import React from "react";
import { cloneDeep } from "lodash";
import { GridEnrichedColDef } from "@mui/x-data-grid";

export function hasValidChildren(name: string, children: any): boolean {
  if (React.Children.count(children) === 0) return false;

  if (React.Children.count(children) === 1) {
    return children.type.name === name;
  } else {
    return children.some((child: JSX.Element) => child.type.name === name);
  }
}

export function injectExtraColumns(
  columns: GridEnrichedColDef[],
  children: any,
): GridEnrichedColDef[] {
  const updatedColumns = cloneDeep(columns);

  if (React.Children.count(children) === 1) {
    if (children.type.name !== "ScaffoldExtraColumn") return updatedColumns;

    const { props } = children;
    const column: GridEnrichedColDef = {
      field: props.label,
      headerName: props.label,
      flex: 1, // @todo flex
    };

    if (props.ValueComponent) {
      const RenderCell = props.ValueComponent;
      column.renderCell = ({ row }) => <RenderCell value={row} />;
    }

    updatedColumns.push(column);
  } else {
    children.forEach((child: JSX.Element, index: number) => {
      if (child.type.name !== "ScaffoldExtraColumn") return;

      const { props } = child;
      // @todo flex
      const column: GridEnrichedColDef = { field: props.field, flex: 1 };

      if (props.label) {
        column.headerName = props.label;
      }

      if (props.ValueComponent) {
        const RenderCell = props.ValueComponent;
        column.renderCell = ({ row }) => <RenderCell value={row} />;
      }

      updatedColumns.push(column);
    });
  }

  return updatedColumns;
}

export function getColumnsFromChildren(children: any): GridEnrichedColDef[] {
  const columns: GridEnrichedColDef[] = [];

  children.forEach((child: JSX.Element, index: number) => {
    if (child.type.name !== "ScaffoldFieldColumn") return;

    const { props } = child;
    // @todo flex
    const column: GridEnrichedColDef = { field: props.field, flex: 1 };

    if (props.label) {
      column.headerName = props.label;
    }

    if (props.ValueComponent) {
      const RenderCell = props.ValueComponent;
      column.renderCell = ({ formattedValue }) => (
        <RenderCell value={formattedValue} />
      );
    }

    // since no schema is passed in, rely on typeof params to infer display value
    column.valueGetter = (params) => {
      if (typeof params.value === "object" && params.value?.length >= 1) {
        return params.value.map((value: any) => value.label).join(",");
      }
      return params.value;
    };

    columns.push(column);
  });

  return columns;
}

export function getColumns(
  schema: any,
  valueComponents: any,
): GridEnrichedColDef[] {
  const columns: GridEnrichedColDef[] = [];

  // infer display value based off of schema type
  Object.entries(schema.attributes).forEach(([key, value]: any[]) => {
    const column: GridEnrichedColDef = { field: key, flex: 1 };

    if (valueComponents && valueComponents[key]) {
      const RenderCell = valueComponents[key];
      column.renderCell = ({ formattedValue }) => (
        <RenderCell value={formattedValue} />
      );
    } else if (value === "date" || value.type === "date") {
      column.renderCell = ({ formattedValue }) => {
        return formattedValue
          ? new Date(formattedValue).toLocaleDateString()
          : "";
      };
    } // else let default renderCell handle display value

    columns.push(column);
  });

  Object.entries(schema.belongsToMany).forEach(([key, value]: any[]) => {
    const column: GridEnrichedColDef = {
      field: value.target.toLowerCase(), // @todo a bit hacky
      flex: 1,
    };

    // belongsToMany value should return an object that needs to be handled
    column.renderCell = ({ formattedValue }) => {
      // eg. `skills` cell data will be [{ id, ...attributes, label: unique field }]
      return formattedValue.map((value: any) => value.label).join(",");
    };

    columns.push(column);
  });

  return columns;
}
