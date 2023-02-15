import React from "react";

import type { ValueComponent } from "../ScaffoldListPage";

export type ScaffoldExtraColumnProps = {
  label: string;
  after?: string;
} & (
  | { renderValue: ({ value }: { value: string | number }) => JSX.Element }
  | { ValueComponent: ValueComponent }
);

export const ScaffoldExtraColumn: React.FC<ScaffoldExtraColumnProps> = () => {
  return null;
};

export type ScaffoldFieldColumnProps = {
  field: string;
  label?: string;
} & (
  | { renderValue?: ({ value }: { value: string | number }) => JSX.Element }
  | { ValueComponent?: ValueComponent }
);

export const ScaffoldFieldColumn: React.FC<ScaffoldFieldColumnProps> = () => {
  return null;
};
