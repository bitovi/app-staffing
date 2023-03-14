import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import {
  FormFieldValueType,
  getFormFields,
  ScaffoldFormField,
} from "../../services/formFields/scaffoldFormFields";
import { useScaffoldPresentation } from "../ScaffoldPresentationProvider";
import { createOne, getOne, updateOne } from "../../services/api/api";
import type {
  FieldComponent,
  FlatRecord,
  Primitive,
} from "../../presentation/interfaces";
import type { Relationship, Schema } from "../../schemas/schemas";
import { useParams } from "react-router-dom";

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
  const { id } = useParams<{ id: string }>();
  const { Form, defaultFieldComponents } = useScaffoldPresentation();
  const [formFields, setFormFields] = useState<ScaffoldFormField[]>([]);
  const [formState, setFormState] = useState<FormState>({});

  useEffect(() => {
    getFormFields(
      schema,
      fieldComponents || {},
      defaultFieldComponents,
      children,
    ).then(async (formFields) => {
      setFormFields(formFields);
      const defaultValues = isEdit && id ? await getOne(schema, id) : undefined;
      setFormState(getDefaultFormState(formFields, defaultValues));
    });
  }, [id]);

  const onSave = async () => {
    try {
      if (isEdit) await updateOne(schema, id, formFields, formState);
      else await createOne(schema, formFields, formState);

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

function getDefaultFormState(
  formFields: ScaffoldFormField[],
  defaultValues?: FlatRecord,
): FormState {
  return formFields.reduce((acc, next) => {
    // edge-case, input expects array of ids but default returns array of objects
    let defaultRelationshipValue = null;
    if (defaultValues && next.attributeSchema.type === "relationship") {
      const relationship = defaultValues[next.key];
      defaultRelationshipValue = Array.isArray(relationship)
        ? relationship.map((item) => item.id)
        : null;
    }

    return {
      ...acc,
      // set default value
      [next.key]: defaultRelationshipValue
        ? defaultRelationshipValue
        : defaultValues
        ? defaultValues[next.key]
        : next.attributeSchema.type === "relationship"
        ? []
        : next.attributeSchema.type === "boolean"
        ? false
        : next.attributeSchema.type === "number"
        ? 0
        : next.attributeSchema.type === "date"
        ? ""
        : "",
    };
  }, {});
}
