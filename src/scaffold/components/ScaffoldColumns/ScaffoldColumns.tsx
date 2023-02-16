import React from "react";

import type { ValueComponent } from "../ScaffoldListPage";

export type ScaffoldExtraDisplayProps = {
  label: string;
  after?: string;
} & (
  | {
      render: ({
        record,
        attributeSchema,
      }: {
        record: any;
        attributeSchema: any;
      }) => JSX.Element;
    }
  | { ValueComponent: ValueComponent }
);

export const ScaffoldExtraDisplay: React.FC<ScaffoldExtraDisplayProps> = () => {
  return null;
};

export type ScaffoldAttributeDisplayProps = {
  field: string;
  label?: string;
} & (
  | { renderValue?: ({ value }: { value: string | number }) => JSX.Element }
  | { ValueComponent?: ValueComponent }
);

export const ScaffoldAttributeDisplay: React.FC<
  ScaffoldAttributeDisplayProps
> = () => {
  return null;
};
