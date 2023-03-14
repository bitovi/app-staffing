import { Children as ReactChildren } from "react";
import { hasValidChildren } from "../displays/scaffoldDisplays";
import {
  ScaffoldAttributeField,
  ScaffoldAttributeFieldProps,
} from "../../components/ScaffoldDisplays";
import type { FieldComponent, Primitive } from "../../presentation/interfaces";
import type { Attribute, AttributeSchema, Schema } from "../../schemas/schemas";
import type { DefaultFieldComponentsTypes } from "../../components/ScaffoldPresentationProvider";
import { getFlatRecords } from "../api/api";

export type FormFieldValueType = Primitive | string[];

export type FormFieldRender = ({
  value,
  label,
  onUpdate,
}: {
  value: FormFieldValueType;
  label: string;
  onUpdate: (value: FormFieldValueType) => void;
}) => JSX.Element;

export interface ScaffoldFormField {
  key: string;
  label: string;
  attributeSchema: AttributeSchema;
  render: FormFieldRender;
}

export async function getFormFields(
  schema: Schema,
  fieldComponents: { [attribute: string]: FieldComponent },
  defaultFieldComponents: DefaultFieldComponentsTypes,
  children: React.ReactNode | null,
): Promise<ScaffoldFormField[]> {
  const childArray = ReactChildren.toArray(children) as JSX.Element[];

  return hasValidChildren(ScaffoldAttributeField.name, childArray)
    ? getFormFieldsFromChildren(schema, defaultFieldComponents, childArray)
    : getFormFieldsFromSchema(schema, defaultFieldComponents, fieldComponents);
}

export function getFormFieldsFromChildren(
  schema: Schema,
  defaultFieldComponents: DefaultFieldComponentsTypes,
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

export async function getFormFieldsFromSchema(
  schema: Schema,
  defaultFieldComponents: DefaultFieldComponentsTypes,
  fieldComponents?: { [attribute: string]: FieldComponent },
): Promise<ScaffoldFormField[]> {
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

  const hasManyFormFields = await Promise.all(
    Object.values(schema?.hasMany || []).map(async (value) => {
      const raw = await fetch(
        `${window.env.API_BASE_URL}/${value.target.toLowerCase()}`,
      );
      const response = await raw.json();
      const options = getFlatRecords(response).map((item) => ({
        id: item.id as string,
        label: item.name as string,
      }));

      return getScaffoldFormField({
        attribute: value.target.toLowerCase(),
        label: value.target,
        attributeSchema: "relationship",
        defaultFieldComponents,
        fieldComponents,
        options,
      });
    }),
  );

  return [...attributesFormFields, ...hasManyFormFields];
}

export function getScaffoldFormField({
  attribute,
  attributeSchema,
  defaultFieldComponents,
  label = undefined,
  FieldComponent = undefined,
  fieldComponents = undefined,
  render = undefined,
  options = undefined,
}: {
  attribute: string;
  attributeSchema: Attribute;
  defaultFieldComponents: DefaultFieldComponentsTypes;
  label?: string;
  FieldComponent?: FieldComponent;
  fieldComponents?: { [attribute: string]: FieldComponent };
  render?: FormFieldRender;
  options?: { id: string; label: string }[];
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
    attributeSchema,
    render: () => <></>,
  };

  if (render) {
    formField.render = ({ value, label, onUpdate }) =>
      render({
        value,
        label,
        onUpdate: (value) => onUpdate(value),
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
      attributeSchema,
      defaultFieldComponents,
      options,
    );
  }

  return formField;
}

export function getDefaultRender(
  attribute: string,
  attributeSchema: AttributeSchema,
  defaultFieldComponents: DefaultFieldComponentsTypes,
  options: { id: string; label: string }[] = [],
): FormFieldRender {
  const { String, Number, Boolean, Date, Relationship } =
    defaultFieldComponents;

  return ({ value, label, onUpdate }) => {
    if (attributeSchema.type === "date") {
      return <Date label={label} value={value as string} onUpdate={onUpdate} />;
    }

    if (attributeSchema.type === "boolean") {
      return (
        <Boolean label={label} value={value as boolean} onUpdate={onUpdate} />
      );
    }

    if (attributeSchema.type === "number") {
      return (
        <Number label={label} value={value as number} onUpdate={onUpdate} />
      );
    }

    if (attributeSchema.type === "string") {
      return (
        <String label={label} value={value as string} onUpdate={onUpdate} />
      );
    }

    if (attributeSchema.type === "relationship") {
      return (
        <Relationship
          label={label}
          options={options}
          values={value as string[]}
          onUpdate={onUpdate}
        />
      );
    }

    return <String label={label} value={value as string} onUpdate={onUpdate} />;
  };
}
