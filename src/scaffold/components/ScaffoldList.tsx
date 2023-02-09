import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";

import type { Schema } from "../schemas";
import { getData } from "../services/api";
import {
  getColumnsFromChildren,
  getColumns,
  hasValidChildren,
  injectExtraColumns,
} from "../services/helpers";
import { createTheme, ThemeProvider } from "@mui/material";

export const ScaffoldList: React.FC<{
  schema: Schema;
  valueComponents?: { [field: string]: React.FC<{ value: string | number }> };
  children?: React.ReactNode | null;
}> = ({ schema, children, valueComponents }) => {
  let columns;
  const [rows, setRows] = useState<{}[]>([]);

  useEffect(() => {
    getData(schema).then((data: {}[]) => setRows(data));
  }, []);

  const hasScaffoldListColumnChildren = hasValidChildren(
    "ScaffoldFieldColumn",
    children,
  );

  const hasScaffoldExtraColumnChildren = hasValidChildren(
    "ScaffoldExtraColumn",
    children,
  );

  if (hasScaffoldListColumnChildren) {
    columns = getColumnsFromChildren(children);
  } else if (valueComponents) {
    columns = getColumns(schema, valueComponents);
  } else {
    columns = getColumns(schema, null);
  }

  if (hasScaffoldExtraColumnChildren) {
    columns = injectExtraColumns(columns, children);
  }

  return (
    // wrapping only DataGrid and not ScaffoldListPage because the existing
    // edit/create/delete modals rely on Chakra and using Theme at that level
    // will break the styles
    // <ThemeProvider theme={createTheme()}>
    <DataGrid autoHeight rows={rows} columns={columns} />
    // </ThemeProvider>
  );
};
