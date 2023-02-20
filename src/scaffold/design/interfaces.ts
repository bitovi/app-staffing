import type { Attribute, Schema } from "../schemas/schemas";
import type { ScaffoldColumn } from "../services/columns/scaffoldColumns";

export type Primitive = string | boolean | number;

export type Relationship = {
  id: string;
  label: string;
  [field: string]: Primitive;
}[];

export type CellValue = Primitive | Relationship;

export interface FlatRecord {
  id: string | number;
  [field: string]: CellValue;
}

export type ValueComponent = React.FC<{
  value: CellValue;
  record: FlatRecord;
  attributeSchema: Attribute | null;
}>;

export interface XLayoutProps {
  schema: Schema;
  renderActions?: () => JSX.Element;
  children: any;
}

export interface XListProps {
  columns: ScaffoldColumn[];
  useData: () => FlatRecord[];
}

export interface XProviderProps<T> {
  theme?: T;
  children: React.ReactNode;
}
