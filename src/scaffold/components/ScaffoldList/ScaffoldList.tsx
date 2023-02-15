import React, { useState, useEffect } from "react";
import { DataGrid, GridEnrichedColDef } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material";
import type {} from "@mui/x-data-grid/themeAugmentation";

import { getData } from "../../services/api/api";
import {
  getColumnsFromChildren,
  getColumns,
  hasValidChildren,
  injectExtraColumns,
} from "../../services/columns/columns";
import type { Schema } from "../../schemas/schemas";
import type { ValueComponent } from "../ScaffoldListPage";
import type { FlatData } from "../../services/api/api";

const ScaffoldList: React.FC<{
  schema: Schema;
  valueComponents?: { [field: string]: ValueComponent };
  children?: React.ReactNode | null;
}> = ({ schema, children, valueComponents }) => {
  const [rows, setRows] = useState<FlatData[]>([]);

  useEffect(() => {
    getData(schema).then((data) => {
      setRows(data);
    });
  }, []);

  const childArray = React.Children.toArray(children);

  const hasScaffoldListColumnChildren = hasValidChildren(
    "ScaffoldFieldColumn",
    childArray,
  );

  const hasScaffoldExtraColumnChildren = hasValidChildren(
    "ScaffoldExtraColumn",
    childArray,
  );

  let columns: GridEnrichedColDef[];
  if (hasScaffoldListColumnChildren) {
    columns = getColumnsFromChildren(schema, childArray);
  } else if (valueComponents) {
    columns = getColumns(schema, valueComponents);
  } else {
    columns = getColumns(schema, null);
  }
  if (hasScaffoldExtraColumnChildren) {
    columns = injectExtraColumns(columns, childArray);
  }

  return (
    // wrapping only DataGrid and not ScaffoldListPage because the existing
    // edit/create/delete modals rely on Chakra and using Theme at that level
    // will break the styles
    <ThemeProvider theme={createTheme()}>
      <DataGrid
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          margin: 2.5,
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
        }}
        autoHeight
        rows={rows}
        columns={columns}
      />
    </ThemeProvider>
  );
};

export default ScaffoldList;
