import { cloneDeep } from "lodash";

import { ScaffoldExtraDisplay } from "../../components/ScaffoldDisplays";
import { ScaffoldAttributeDisplay } from "../../components/ScaffoldDisplays";
import {
  getDefaultRender,
  getScaffoldDisplay,
  getDisplaysFromChildren,
  getDisplaysFromSchema,
  injectExtraDisplays,
  hasValidChildren,
} from "./scaffoldDisplays";
import type { Schema } from "../../schemas/schemas";
import type { ScaffoldDisplay } from "./scaffoldDisplays";
import { ScaffoldPresentationDefaultValueComponents } from "../../components/ScaffoldPresentationProvider";

const TestSchema: Schema = {
  name: "Person",
  attributes: {
    id: "string",
    firstName: "string",
    lastName: "string",
    age: "number",
  },
  displayField: "firstName",
  jsonApiField: "persons",
};

// @todo removing render function from objects because jest is giving
// an error when comparing an array of objects with functions (even if equal)
// https://stackoverflow.com/a/60989588/4781945
export const removeRenderFn = (item: any) => {
  const clone = cloneDeep(item);
  delete clone.render;
  return clone;
};

describe("scaffold/services/scaffoldDisplays", () => {
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
    it("adds ScaffoldExtraDisplay to the end of the mui display array", () => {
      const initialDisplays: ScaffoldDisplay[] = [
        { key: "one", label: "one", render: jest.fn() },
        { key: "two", label: "two", render: jest.fn() },
        { key: "three", label: "three", render: jest.fn() },
      ];

      const extraDisplays = [
        <ScaffoldExtraDisplay label="four" render={() => <div>extra</div>} />,
        <ScaffoldExtraDisplay
          label="five"
          ValueComponent={({ value }) => <div>{value}</div>}
        />,
      ];

      const expectedDisplays: ScaffoldDisplay[] = [
        { key: "one", label: "one", render: jest.fn() },
        { key: "two", label: "two", render: jest.fn() },
        { key: "three", label: "three", render: jest.fn() },
        { key: "four", label: "four", render: jest.fn() },
        { key: "five", label: "five", render: jest.fn() },
      ].map(removeRenderFn);

      const result = injectExtraDisplays(
        initialDisplays,
        ScaffoldPresentationDefaultValueComponents,
        extraDisplays,
      ).map(removeRenderFn);

      expect(result).toEqual(expectedDisplays);
    });
  });

  describe("getScaffoldDisplay", () => {
    it("returns ScaffoldDisplay", () => {
      const expected = { key: "test", label: "Test" };
      const result = getScaffoldDisplay({
        attribute: "test",
        attributeSchema: "string",
        defaultValueComponents: ScaffoldPresentationDefaultValueComponents,
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

      const expected = [{ key: "two", label: "two" }];
      const result = getDisplaysFromChildren(
        TestSchema,
        ScaffoldPresentationDefaultValueComponents,
        children,
      ).map(removeRenderFn);

      expect(result).toEqual(expected);
    });

    it("returns empty if no ScaffoldAttributeDisplay items are passed", () => {
      const children = [
        <ScaffoldExtraDisplay label="one" render={() => <div />} />,
        <ScaffoldExtraDisplay label="three" render={() => <div />} />,
      ];

      const expected: ScaffoldDisplay[] = [];
      const result = getDisplaysFromChildren(
        TestSchema,
        ScaffoldPresentationDefaultValueComponents,
        children,
      ).map(removeRenderFn);

      expect(result).toEqual(expected);
    });
  });

  describe("getDisplaysFromSchema", () => {
    it("returns ScaffoldDisplay[] for a given schema", () => {
      const result = getDisplaysFromSchema(
        TestSchema,
        ScaffoldPresentationDefaultValueComponents,
        null,
      ).map(removeRenderFn);
      const expected = [
        { key: "id", label: "Id" },
        { key: "firstName", label: "FirstName" },
        { key: "lastName", label: "LastName" },
        { key: "age", label: "Age" },
      ];

      expect(result).toEqual(expected);
    });
  });
});
