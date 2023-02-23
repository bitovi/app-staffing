import { cloneDeep } from "lodash";

import { ScaffoldExtraDisplay } from "../../components/ScaffoldDisplays";
import { ScaffoldAttributeDisplay } from "../../components/ScaffoldDisplays";
import {
  getScaffoldColumn,
  getDisplaysFromChildren,
  getDisplaysFromSchema,
  injectExtraDisplays,
  hasValidChildren,
} from "./scaffoldDisplays";
import type { Schema } from "../../schemas/schemas";
import type { ScaffoldDisplay } from "./scaffoldDisplays";

const TestSchema: Schema = {
  name: "Test",
  attributes: { id: "string", name: "string" },
  hasMany: [{ target: "TestRelationship", options: { through: "", as: "" } }],
  displayField: "test",
  jsonApiField: "tests",
};

// @todo removing render function from objects because jest is giving
// an error when comparing an array of objects with functions (even if equal)
// https://stackoverflow.com/a/60989588/4781945
const removeRenderCellFn = (item: any) => {
  const clone = cloneDeep(item);
  delete clone.render;
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

  describe("injectExtraDisplays", () => {
    it("adds ScaffoldExtraDisplay to the end of the mui column array", () => {
      const initialColumns: ScaffoldDisplay[] = [
        { attribute: "one", label: "one", render: jest.fn() },
        { attribute: "two", label: "two", render: jest.fn() },
        { attribute: "three", label: "three", render: jest.fn() },
      ];

      const extraColumns = [
        <ScaffoldExtraDisplay label="four" render={() => <div>extra</div>} />,
        <ScaffoldExtraDisplay
          label="five"
          ValueComponent={({ value }) => <div>{value}</div>}
        />,
      ];

      const expectedColumns: ScaffoldDisplay[] = [
        { attribute: "one", label: "one", render: jest.fn() },
        { attribute: "two", label: "two", render: jest.fn() },
        { attribute: "three", label: "three", render: jest.fn() },
        { attribute: "four", label: "four", render: jest.fn() },
        { attribute: "five", label: "five", render: jest.fn() },
      ].map(removeRenderCellFn);

      const result = injectExtraDisplays(initialColumns, extraColumns).map(
        removeRenderCellFn,
      );

      expect(result).toEqual(expectedColumns);
    });
  });

  describe("getScaffoldColumn", () => {
    // @todo this test returns different render (fn), not sure how to
    // test this with jest
    it("returns ScaffoldDisplay", () => {
      const expected = { attribute: "test", label: "test" };
      const result = getScaffoldColumn({
        label: "test",
        attribute: "test",
        attributeSchema: "string",
      });
      const resultWithoutRenderCell: any = cloneDeep(result);
      delete resultWithoutRenderCell.render;

      expect(resultWithoutRenderCell).toEqual(expected);
    });
  });

  describe("getDisplaysFromChildren", () => {
    it("returns ScaffoldDisplay[] for the ScaffoldAttributeDisplay items", () => {
      const children = [
        <ScaffoldExtraDisplay label="one" render={jest.fn()} />,
        <ScaffoldAttributeDisplay label="two" attribute="two" />,
        <ScaffoldExtraDisplay label="three" render={jest.fn()} />,
      ];

      const expected = [{ attribute: "two", label: "two" }];
      const result = getDisplaysFromChildren(TestSchema, children).map(
        removeRenderCellFn,
      );

      expect(result).toEqual(expected);
    });

    it("returns empty if no ScaffoldAttributeDisplay items are passed", () => {
      const children = [
        <ScaffoldExtraDisplay label="one" render={() => <div />} />,
        <ScaffoldExtraDisplay label="three" render={() => <div />} />,
      ];

      const expected: ScaffoldDisplay[] = [];
      const result = getDisplaysFromChildren(TestSchema, children).map(
        removeRenderCellFn,
      );

      expect(result).toEqual(expected);
    });
  });

  describe("getDisplaysFromSchema", () => {
    it("returns ScaffoldDisplay[] for a given schema", () => {
      const result = getDisplaysFromSchema(TestSchema, null).map(
        removeRenderCellFn,
      );
      const expected = [
        { attribute: "id", label: "id" },
        { attribute: "name", label: "name" },
        { attribute: "testrelationship", label: "TestRelationship" },
      ];

      expect(result).toEqual(expected);
    });
  });
});
