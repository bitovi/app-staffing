import type {
  ValueComponent,
  FlatRecord,
  CellValue,
} from "../../design/interfaces";
import type { Attribute } from "../../schemas/schemas";

export type Render = ({ record }: { record: FlatRecord }) => JSX.Element;

export type ScaffoldExtraDisplayProps = {
  label: string;
  after?: string;
} & ({ render: Render } | { ValueComponent: ValueComponent });

export const ScaffoldExtraDisplay: React.FC<ScaffoldExtraDisplayProps> = () => {
  return null;
};

export type RenderValue = ({
  value,
  record,
  attributeSchema,
}: {
  value: CellValue;
  record: FlatRecord;
  attributeSchema?: Attribute;
}) => JSX.Element;

export type ScaffoldAttributeDisplayProps = {
  attribute: string;
  label?: string;
} & ({ renderValue?: RenderValue } | { ValueComponent?: ValueComponent });

export const ScaffoldAttributeDisplay: React.FC<
  ScaffoldAttributeDisplayProps
> = () => {
  return null;
};
