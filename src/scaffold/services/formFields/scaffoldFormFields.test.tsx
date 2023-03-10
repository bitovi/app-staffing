import cloneDeep from "lodash/cloneDeep";
import type { Schema } from "../../schemas/schemas";
import { ScaffoldPresentationDefaultFieldComponents } from "../../components/ScaffoldPresentationProvider";
import {
  getFormFields,
  getFormFieldsFromChildren,
  getFormFieldsFromSchema,
  getScaffoldFormField,
  getDefaultRender,
} from "./scaffoldFormFields";
import { removeRenderFn } from "../displays/scaffoldDisplays.test";
import {
  ScaffoldAttributeDisplay,
  ScaffoldAttributeField,
  ScaffoldExtraDisplay,
} from "../../components/ScaffoldDisplays";

const TestSchema: Schema = {
  name: "Person",
  attributes: {
    id: { type: "string", primaryKey: true, allowNull: false },
    name: "string",
    age: "number",
    date_of_birth: "date",
    is_employed: "boolean",
  },
  displayField: "name",
  jsonApiField: "persons",
};

describe("scaffold/services/formFields/scaffoldFormFields", () => {
  describe("getScaffoldFormField", () => {
    it("returns a ScaffoldFormField", () => {
      const result = getScaffoldFormField({
        attribute: "name",
        attributeSchema: "string",
        defaultFieldComponents: ScaffoldPresentationDefaultFieldComponents,
      });

      const resultWithoutRender: any = cloneDeep(result);
      delete resultWithoutRender.render;

      expect(resultWithoutRender).toEqual({
        key: "name",
        label: "Name",
        attributeSchema: { type: "string", allowNull: false },
      });
    });
  });

  describe("getFormFieldsFromSchema", () => {
    it("returns ScaffoldFormField[] for a schema", async () => {
      const result = (
        await getFormFieldsFromSchema(
          TestSchema,
          ScaffoldPresentationDefaultFieldComponents,
        )
      ).map(removeRenderFn);

      expect(result).toEqual([
        {
          key: "name",
          label: "Name",
          attributeSchema: { type: "string", allowNull: false },
        },
        {
          key: "age",
          label: "Age",
          attributeSchema: { type: "number", allowNull: false },
        },
        {
          key: "date_of_birth",
          label: "Date Of Birth",
          attributeSchema: { type: "date", allowNull: false },
        },
        {
          key: "is_employed",
          label: "Is Employed",
          attributeSchema: { type: "boolean", allowNull: false },
        },
      ]);
    });
  });

  describe("getFormFieldsFromChildren", () => {
    it("renders ScaffoldFormField[] for ScaffoldAttributeField items", () => {
      const children = [
        <ScaffoldAttributeField
          attribute="name"
          label="Full Name"
          render={jest.fn()}
        />,
        <ScaffoldAttributeField
          attribute="date_of_birth"
          label="DOB"
          render={jest.fn()}
        />,
      ];

      const result = getFormFieldsFromChildren(
        TestSchema,
        ScaffoldPresentationDefaultFieldComponents,
        children,
      ).map(removeRenderFn);

      expect(result).toEqual([
        {
          key: "name",
          label: "Full Name",
          attributeSchema: { type: "string", allowNull: false },
        },
        {
          key: "date_of_birth",
          label: "DOB",
          attributeSchema: { type: "date", allowNull: false },
        },
      ]);
    });
  });

  describe("getFormFields", () => {
    it("returns based on schema if no valid children", async () => {
      const children = (
        <>
          <ScaffoldAttributeDisplay attribute="name" label="Name" />
          <ScaffoldExtraDisplay label="Extra" render={jest.fn()} />
        </>
      );

      const result = (
        await getFormFields(
          TestSchema,
          {},
          ScaffoldPresentationDefaultFieldComponents,
          children,
        )
      ).map(removeRenderFn);

      expect(result).toEqual([
        {
          key: "name",
          label: "Name",
          attributeSchema: { type: "string", allowNull: false },
        },
        {
          key: "age",
          label: "Age",
          attributeSchema: { type: "number", allowNull: false },
        },
        {
          key: "date_of_birth",
          label: "Date Of Birth",
          attributeSchema: { type: "date", allowNull: false },
        },
        {
          key: "is_employed",
          label: "Is Employed",
          attributeSchema: { type: "boolean", allowNull: false },
        },
      ]);
    });

    it("returns based on children", async () => {
      const children = (
        <ScaffoldAttributeField
          attribute="name"
          label="Full Name"
          render={jest.fn()}
        />
      );

      const result = (
        await getFormFields(
          TestSchema,
          {},
          ScaffoldPresentationDefaultFieldComponents,
          children,
        )
      ).map(removeRenderFn);

      expect(result).toEqual([
        {
          key: "name",
          label: "Full Name",
          attributeSchema: { allowNull: false, type: "string" },
        },
      ]);
    });
  });

  it.todo("getDefaultRender");
});
