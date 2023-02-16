import type { Schema } from "../schemas/schemas";
import type { ScaffoldColumn } from "../services/columns/scaffoldColumns";

export interface XLayoutProps {
  // schemas?: any[];
  // children?: any;
  schema: Schema;
  valueComponents: any;
  renderActions: any;
  useData: any;
  children: any;
}

export interface XListProps {
  columns: ScaffoldColumn[];
  useData: () => any[];
}

export interface XProviderProps {
  theme?: any;
  children?: any;
}
