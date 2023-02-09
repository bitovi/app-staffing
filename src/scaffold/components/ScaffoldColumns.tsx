import React from "react";

export const ScaffoldExtraColumn: React.FC<{
  label: string;
  ValueComponent?: React.FunctionComponent<{ value: string | number | object }>;
  after?: string;
}> = () => {
  return null;
};

export const ScaffoldFieldColumn: React.FC<{
  field: string;
  label?: string;
  ValueComponent?: React.FunctionComponent<{ value: string | number }>;
}> = () => {
  return <div />;
};
