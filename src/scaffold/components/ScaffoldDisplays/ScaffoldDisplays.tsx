import type {
  ValueComponent,
  FlatRecord,
  CellValue,
  FieldComponent,
} from "../../presentation/interfaces";
import type { Attribute } from "../../schemas/schemas";
import type { Render as FieldRender } from "../../services/formFields/scaffoldFormFields";

export type Render = ({ record }: { record: FlatRecord }) => JSX.Element;

export type RenderValue = ({
  value,
  record,
  attributeSchema,
}: {
  value: CellValue;
  record: FlatRecord;
  attributeSchema?: Attribute;
}) => JSX.Element;

export type ScaffoldExtraDisplayProps = {
  label: string;
  after?: string;
} & ({ render: Render } | { ValueComponent: ValueComponent });

export const ScaffoldExtraDisplay: React.FC<ScaffoldExtraDisplayProps> = () => {
  return null;
};

export type ScaffoldAttributeDisplayProps = {
  attribute: string;
  label?: string;
} & ({ renderValue?: RenderValue } | { ValueComponent?: ValueComponent });

export const ScaffoldAttributeDisplay: React.FC<
  ScaffoldAttributeDisplayProps
> = () => {
  return null;
};

export type ScaffoldAttributeFieldProps = {
  attribute: string;
  label?: string;
} & ({ render?: FieldRender } | { FieldComponent?: FieldComponent });

export const ScaffoldAttributeField: React.FC<
  ScaffoldAttributeFieldProps
> = () => {
  return null;
};
