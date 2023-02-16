import { GridEnrichedColDef } from "@mui/x-data-grid";
import { cloneDeep } from "lodash";
import { ScaffoldExtraDisplay } from "../../components/ScaffoldColumns";
import { ScaffoldAttributeDisplay } from "../../components/ScaffoldColumns";
import type { Schema } from "../../schemas/schemas";
import {
  getColumns,
  getColumnsFromChildren,
  getMuiDataGridColumn,
  hasValidChildren,
  injectExtraColumns,
} from "./columns";

const TestSchema: Schema = {
  name: "Test",
  attributes: { id: "string", name: "string" },
  belongsToMany: [
    { target: "TestRelationship", options: { through: "", as: "" } },
  ],
  displayField: "test",
  jsonApiField: "tests",
};

// @todo removing renderCell function from objects because jest is giving
// an error when comparing an array of objects with functions (even if equal)
// https://stackoverflow.com/a/60989588/4781945
const removeRenderCellFn = (item: GridEnrichedColDef) => {
  const clone = cloneDeep(item);
  delete clone.renderCell;
  return clone;
};

describe("scaffold/services/columns", () => {
  describe("hasValidChildren", () => {
    it("returns true if name matches a child", () => {
      const children = [
        <ScaffoldExtraDisplay label="one" renderValue={() => <div />} />,
        <ScaffoldAttributeDisplay field="two" />,
        <ScaffoldExtraDisplay label="three" renderValue={() => <div />} />,
      ];

      expect(hasValidChildren("ScaffoldAttributeDisplay", children)).toEqual(
        true,
      );
    });

    it("returns false if name does not match a child", () => {
      const children = [
        <ScaffoldExtraDisplay label="one" renderValue={() => <div />} />,
        <ScaffoldExtraDisplay label="two" renderValue={() => <div />} />,
        <ScaffoldExtraDisplay label="three" renderValue={() => <div />} />,
      ];

      expect(hasValidChildren("ScaffoldAttributeDisplay", children)).toEqual(
        false,
      );
    });
  });

  describe("injectExtraColumns", () => {
    it("adds ScaffoldExtraDisplay to the end of the mui column array", () => {
      const initialColumns: GridEnrichedColDef[] = [
        { field: "one", flex: 1 },
        { field: "two", flex: 1 },
        { field: "three", flex: 1 },
      ];
      const extraColumns = [
        <ScaffoldExtraDisplay
          label="four"
          renderValue={({ value }: { value: any }) => <div>{value}</div>}
        />,
        <ScaffoldExtraDisplay
          label="five"
          ValueComponent={({ value }) => <div>{value}</div>}
        />,
      ];

      const expectedColumns: GridEnrichedColDef[] = [
        { field: "one", flex: 1 },
        { field: "two", flex: 1 },
        { field: "three", flex: 1 },
        { field: "four", flex: 1, headerName: "four", renderCell: jest.fn() },
        { field: "five", flex: 1, headerName: "five", renderCell: jest.fn() },
      ].map(removeRenderCellFn);

      const result = injectExtraColumns(initialColumns, extraColumns).map(
        removeRenderCellFn,
      );

      expect(result).toEqual(expectedColumns);
    });
  });

  describe("getMuiDataGridColumn", () => {
    // @todo this test returns different renderCell (fn), not sure how to
    // test this with jest
    it("returns GridEnrichedColDef", () => {
      const expected = { field: "test", headerName: "test", flex: 1 };
      const result = getMuiDataGridColumn({
        label: "test",
        field: "test",
        schemaDefinition: "string",
      });
      delete result.renderCell;

      expect(result).toEqual(expected);
    });
  });

  describe("getColumnsFromChildren", () => {
    it("returns array of GridEnrichedColDef for the ScaffoldAttributeDisplay items", () => {
      const children = [
        <ScaffoldExtraDisplay label="one" renderValue={() => <div />} />,
        <ScaffoldAttributeDisplay label="two" field="two" />,
        <ScaffoldExtraDisplay label="three" renderValue={() => <div />} />,
      ];

      const expected = [{ field: "two", headerName: "two", flex: 1 }];
      const result = getColumnsFromChildren(TestSchema, children).map(
        removeRenderCellFn,
      );

      expect(result).toEqual(expected);
    });

    it("returns empty if no ScaffoldAttributeDisplay items are passed", () => {
      const children = [
        <ScaffoldExtraDisplay label="one" renderValue={() => <div />} />,
        <ScaffoldExtraDisplay label="three" renderValue={() => <div />} />,
      ];

      const expected: GridEnrichedColDef[] = [];
      const result = getColumnsFromChildren(TestSchema, children).map(
        removeRenderCellFn,
      );

      expect(result).toEqual(expected);
    });
  });

  describe("getColumns", () => {
    const result = getColumns(TestSchema, null).map(removeRenderCellFn);
    const expected = [
      { field: "id", flex: 1 },
      { field: "name", flex: 1 },
      { field: "testrelationship", headerName: "TestRelationship", flex: 1 },
    ];

    expect(result).toEqual(expected);
  });
});
