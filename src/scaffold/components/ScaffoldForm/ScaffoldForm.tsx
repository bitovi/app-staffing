import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import {
  FormFieldValueType,
  getFormFields,
  ScaffoldFormField,
} from "../../services/formFields/scaffoldFormFields";
import { useScaffoldPresentation } from "../ScaffoldPresentationProvider";
import { createOne } from "../../services/api/api";
import type { FieldComponent, Primitive } from "../../presentation/interfaces";
import type { Schema } from "../../schemas/schemas";

export type FormState = { [key: string]: Primitive | string[] };
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
  const [formFields, setFormFields] = useState<ScaffoldFormField[]>([]);
  const [formState, setFormState] = useState<FormState>({});

  useEffect(() => {
    getFormFields(
      schema,
      fieldComponents || {},
      defaultFieldComponents,
      children,
    ).then((formFields) => {
      setFormFields(formFields);
      setFormState(getDefaultFormState(formFields));
    });
  }, []);

  const onSave = async () => {
    try {
      await createOne(schema, formFields, formState);
      routeOnSuccess();
    } catch (error) {
      console.error("failed to create", error);
    }
  };

  const onUpdateField = ({
    key,
    value,
  }: {
    key: string;
    value: FormFieldValueType;
  }) => {
    setFormState({ ...formState, [key]: value });
  };

  return (
    <Form
      isEdit={isEdit}
      fields={!isEmpty(formState) ? formFields : []}
      formState={formState}
      onUpdateField={onUpdateField}
      onSave={onSave}
    />
  );
};

export default ScaffoldForm;

function getDefaultFormState(formFields: ScaffoldFormField[]): FormState {
  return formFields.reduce((acc, next) => {
    return {
      ...acc,
      // set default value
      [next.key]:
        next.attributeSchema.type === "relationship"
          ? []
          : next.attributeSchema.type === "boolean"
          ? false
          : next.attributeSchema.type === "number"
          ? 0
          : "",
    };
  }, {});
}
