import { cloneDeep } from "lodash";

import { ScaffoldExtraDisplay } from "../../components/ScaffoldColumns";
import { ScaffoldAttributeDisplay } from "../../components/ScaffoldColumns";
import {
  getScaffoldColumn,
  getColumnsFromChildren,
  getColumnsFromSchema,
  injectExtraColumns,
  hasValidChildren,
} from "./scaffoldColumns";
import type { Schema } from "../../schemas/schemas";
import type { ScaffoldColumn } from "./scaffoldColumns";

const TestSchema: Schema = {
  name: "Test",
  attributes: { id: "string", name: "string" },
  hasMany: [{ target: "TestRelationship", options: { through: "", as: "" } }],
  displayField: "test",
  jsonApiField: "tests",
};

// @todo removing renderCell function from objects because jest is giving
// an error when comparing an array of objects with functions (even if equal)
// https://stackoverflow.com/a/60989588/4781945
const removeRenderCellFn = (item: any) => {
  const clone = cloneDeep(item);
  delete clone.renderCell;
  return clone;
};

describe("scaffold/services/scaffoldColumns", () => {
  describe("hasValidChildren", () => {
    it("returns true if name matches a child", () => {
      const children = [
        <ScaffoldExtraDisplay label="one" render={() => <div />} />,
        <ScaffoldAttributeDisplay attribute="two" />,
        <ScaffoldExtraDisplay label="three" render={() => <div />} />,
      ];

      expect(hasValidChildren("ScaffoldAttributeDisplay", children)).toEqual(
        true,
      );
    });

    it("returns false if name does not match a child", () => {
      const children = [
        <ScaffoldExtraDisplay label="one" render={() => <div />} />,
        <ScaffoldExtraDisplay label="two" render={() => <div />} />,
        <ScaffoldExtraDisplay label="three" render={() => <div />} />,
      ];

      expect(hasValidChildren("ScaffoldAttributeDisplay", children)).toEqual(
        false,
      );
    });
  });

  describe("injectExtraColumns", () => {
    it("adds ScaffoldExtraDisplay to the end of the mui column array", () => {
      const initialColumns: ScaffoldColumn[] = [
        { attribute: "one", headerName: "one", renderCell: jest.fn() },
        { attribute: "two", headerName: "two", renderCell: jest.fn() },
        { attribute: "three", headerName: "three", renderCell: jest.fn() },
      ];

      const extraColumns = [
        <ScaffoldExtraDisplay label="four" render={() => <div>extra</div>} />,
        <ScaffoldExtraDisplay
          label="five"
          ValueComponent={({ value }) => <div>{value}</div>}
        />,
      ];

      const expectedColumns: ScaffoldColumn[] = [
        { attribute: "one", headerName: "one", renderCell: jest.fn() },
        { attribute: "two", headerName: "two", renderCell: jest.fn() },
        { attribute: "three", headerName: "three", renderCell: jest.fn() },
        { attribute: "four", headerName: "four", renderCell: jest.fn() },
        { attribute: "five", headerName: "five", renderCell: jest.fn() },
      ].map(removeRenderCellFn);

      const result = injectExtraColumns(initialColumns, extraColumns).map(
        removeRenderCellFn,
      );

      expect(result).toEqual(expectedColumns);
    });
  });

  describe("getScaffoldColumn", () => {
    // @todo this test returns different renderCell (fn), not sure how to
    // test this with jest
    it("returns ScaffoldColumn", () => {
      const expected = { attribute: "test", headerName: "test" };
      const result = getScaffoldColumn({
        label: "test",
        attribute: "test",
        attributeSchema: "string",
      });
      const resultWithoutRenderCell: any = cloneDeep(result);
      delete resultWithoutRenderCell.renderCell;

      expect(resultWithoutRenderCell).toEqual(expected);
    });
  });

  describe("getColumnsFromChildren", () => {
    it("returns ScaffoldColumn[] for the ScaffoldAttributeDisplay items", () => {
      const children = [
        <ScaffoldExtraDisplay label="one" render={jest.fn()} />,
        <ScaffoldAttributeDisplay label="two" attribute="two" />,
        <ScaffoldExtraDisplay label="three" render={jest.fn()} />,
      ];

      const expected = [{ attribute: "two", headerName: "two" }];
      const result = getColumnsFromChildren(TestSchema, children).map(
        removeRenderCellFn,
      );

      expect(result).toEqual(expected);
    });

    it("returns empty if no ScaffoldAttributeDisplay items are passed", () => {
      const children = [
        <ScaffoldExtraDisplay label="one" render={() => <div />} />,
        <ScaffoldExtraDisplay label="three" render={() => <div />} />,
      ];

      const expected: ScaffoldColumn[] = [];
      const result = getColumnsFromChildren(TestSchema, children).map(
        removeRenderCellFn,
      );

      expect(result).toEqual(expected);
    });
  });

  describe("getColumnsFromSchema", () => {
    it("returns ScaffoldColumn[] for a given schema", () => {
      const result = getColumnsFromSchema(TestSchema, null).map(
        removeRenderCellFn,
      );
      const expected = [
        { attribute: "id", headerName: "id" },
        { attribute: "name", headerName: "name" },
        { attribute: "testrelationship", headerName: "TestRelationship" },
      ];

      expect(result).toEqual(expected);
    });
  });
});
