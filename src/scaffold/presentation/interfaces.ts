import type { Attribute, Schema } from "../schemas/schemas";
import type { ScaffoldDisplay } from "../services/displays/scaffoldDisplays";

export type Primitive = string | boolean | number;

export type Relationship = {
  id: string;
  label: string;
  [field: string]: Primitive;
};

export type CellValue = Primitive | Relationship | Relationship[];

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
  children?: any; // @todo required for layout, but not for Scaffold implementation
}

export interface XListProps {
  displays: ScaffoldDisplay[];
  useData: () => FlatRecord[];
}

export interface XDetailsProps {
  displays: ScaffoldDisplay[];
  useData: () => FlatRecord;
}

export interface XProviderProps<T> {
  theme?: T;
  children: React.ReactNode;
}