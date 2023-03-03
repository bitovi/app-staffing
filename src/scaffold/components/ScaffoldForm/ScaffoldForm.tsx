import { useState } from "react";
import {
  getFormFields,
  ScaffoldFormField,
} from "../../services/formFields/scaffoldFormFields";
import { useScaffoldPresentation } from "../ScaffoldPresentationProvider";
import type { FieldComponent, Primitive } from "../../presentation/interfaces";
import type { Schema } from "../../schemas/schemas";
import { createOne } from "../../services/api/api";

export type FormState = { [key: string]: Primitive };
interface ScaffoldFormProps {
  isEdit?: boolean;
  schema: Schema;
  fieldComponents?: { [attribute: string]: FieldComponent };
  routeOnSuccess: () => void;
  children?: React.ReactNode | null;
}

const ScaffoldForm: React.FC<ScaffoldFormProps> = ({
  isEdit = false,
  schema,
  fieldComponents,
  routeOnSuccess,
  children,
}) => {
  const { Form, defaultFieldComponents } = useScaffoldPresentation();
  const formFields = getFormFields(
    schema,
    fieldComponents || {},
    defaultFieldComponents,
    children,
  );
  const [formState, setFormState] = useState<FormState>(
    getDefaultFormState(schema, formFields),
  );

  const onSave = async () => {
    try {
      const formattedFormState = formFields.reduce((acc, next) => {
        return { ...acc, [next.key]: formState[next.key] || null };
      }, {});
      await createOne(schema, formattedFormState);
      routeOnSuccess();
    } catch (error) {
      console.error("failed to create", error);
    }
  };

  return (
    <Form
      isEdit={isEdit}
      fields={formFields}
      formState={formState}
      onUpdate={(key: string, value: Primitive) =>
        setFormState({ ...formState, [key]: value })
      }
      onSave={onSave}
    />
  );
};

export default ScaffoldForm;

function getDefaultFormState(
  schema: Schema,
  formFields: ScaffoldFormField[],
): FormState {
  return formFields.reduce((acc, next) => {
    let attributeSchema = schema.attributes[next.key];
    attributeSchema =
      typeof attributeSchema === "object"
        ? attributeSchema.type
        : attributeSchema;

    const defaultValue: Primitive = attributeSchema === "boolean" ? false : "";

    return { ...acc, [next.key]: defaultValue };
  }, {});
}
