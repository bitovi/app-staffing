import { Children as ReactChildren } from "react";
import { hasValidChildren } from "../displays/scaffoldDisplays";
import {
  ScaffoldAttributeField,
  ScaffoldAttributeFieldProps,
} from "../../components/ScaffoldDisplays";
import type { FieldComponent, Primitive } from "../../presentation/interfaces";
import type { Attribute, Schema } from "../../schemas/schemas";
import type { DefaultFieldComponents } from "../../components/ScaffoldPresentationProvider/ScaffoldPresentationProvider";

export type Render = ({
  value,
  onUpdate,
}: {
  value: Primitive;
  onUpdate: (value: Primitive) => void;
}) => JSX.Element;

export interface ScaffoldFormField {
  key: string;
  label: string;
  render: Render;
}

export function getFormFields(
  schema: Schema,
  fieldComponents: { [attribute: string]: FieldComponent },
  defaultFieldComponents: DefaultFieldComponents,
  children: React.ReactNode | null,
): ScaffoldFormField[] {
  const childArray = ReactChildren.toArray(children) as JSX.Element[];

  return hasValidChildren(ScaffoldAttributeField.name, childArray)
    ? getFormFieldsFromChildren(schema, defaultFieldComponents, childArray)
    : getFormFieldsFromSchema(schema, defaultFieldComponents, fieldComponents);
}

export function getFormFieldsFromChildren(
  schema: Schema,
  defaultFieldComponents: DefaultFieldComponents,
  children: JSX.Element[],
): ScaffoldFormField[] {
  const formFields = children
    .filter((child) => child.type.name === ScaffoldAttributeField.name)
    .map((child) => {
      const { props }: { props: ScaffoldAttributeFieldProps } = child;

      return getScaffoldFormField({
        attribute: props.attribute,
        attributeSchema: schema.attributes[props.attribute],
        label: props.label,
        defaultFieldComponents,
      });
    });

  return formFields;
}

export function getFormFieldsFromSchema(
  schema: Schema,
  defaultFieldComponents: DefaultFieldComponents,
  fieldComponents?: { [attribute: string]: FieldComponent },
): ScaffoldFormField[] {
  const attributesFormFields = Object.entries(schema.attributes)
    .filter(([_, schema]) => {
      return typeof schema === "object" ? !schema?.primaryKey : true;
    })
    .map(([key, value]) => {
      return getScaffoldFormField({
        attribute: key,
        attributeSchema: value,
        defaultFieldComponents,
        fieldComponents,
      });
    });

  return [...attributesFormFields];
}

export function getScaffoldFormField({
  attribute,
  attributeSchema,
  defaultFieldComponents,
  label = undefined,
  FieldComponent = undefined,
  fieldComponents = undefined,
  render = undefined,
}: {
  attribute: string;
  attributeSchema: Attribute;
  defaultFieldComponents: DefaultFieldComponents;
  label?: string;
  FieldComponent?: FieldComponent;
  fieldComponents?: { [attribute: string]: FieldComponent };
  render?: Render;
}): ScaffoldFormField {
  if (typeof attributeSchema === "string") {
    attributeSchema = { type: attributeSchema, allowNull: false };
  }

  const formField: ScaffoldFormField = {
    key: attribute,
    label:
      label ||
      attribute // convert to "Title Case"
        .replace(/(^\w)/g, (g) => g[0].toUpperCase())
        .replace(/([-_]\w)/g, (g) => " " + g[1].toUpperCase())
        .trim(),
    render: () => <></>,
  };

  if (render) {
    formField.render = ({ value, onUpdate }) =>
      render({
        value,
        onUpdate: (value: Primitive) => onUpdate(value),
      });
  } else if (FieldComponent) {
    formField.render = ({ value, onUpdate }) => (
      <FieldComponent
        attributeSchema={attributeSchema}
        value={value}
        onUpdate={onUpdate}
      />
    );
  } else if (fieldComponents && fieldComponents[attribute]) {
    const RenderFieldComponent = fieldComponents[attribute];
    formField.render = ({ value, onUpdate }) => (
      <RenderFieldComponent
        attributeSchema={attributeSchema}
        value={value}
        onUpdate={onUpdate}
      />
    );
  } else {
    formField.render = getDefaultRender(
      attribute,
      attributeSchema.type,
      defaultFieldComponents,
    );
  }

  return formField;
}

export function getDefaultRender(
  attribute: string,
  attributeType: string,
  defaultFieldComponents: DefaultFieldComponents,
): Render {
  const { String, Number, Boolean, Date } = defaultFieldComponents;

  return ({ value, onUpdate }) => {
    if (attributeType === "date") {
      return <Date value={value as string} onUpdate={onUpdate} />;
    }

    if (attributeType === "boolean") {
      return <Boolean value={value as boolean} onUpdate={onUpdate} />;
    }

    if (attributeType === "Number") {
      return <Number value={value as number} onUpdate={onUpdate} />;
    }

    if (attributeType === "string") {
      return <String value={value as string} onUpdate={onUpdate} />;
    }

    return <String value={value as string} onUpdate={onUpdate} />;
  };
}
