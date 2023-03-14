import { createContext, useContext } from "react";

import type {
  Primitive,
  XListProps,
  XLayoutProps,
  XDetailsProps,
  Relationship as RelationshipType,
  XFormProps,
} from "../../presentation/interfaces";
import {
  Boolean,
  BooleanList,
  Date,
  DateList,
  Number,
  NumberList,
  Relationship,
  RelationshipList,
  String,
  StringList,
} from "./DefaultDisplayComponents";
import {
  Boolean as BooleanInput,
  Date as DateInput,
  Number as NumberInput,
  String as StringInput,
  Relationship as RelationshipInput,
} from "./DefaultFieldComponents";

export interface DefaultValueComponentsTypes {
  String: React.FC<{ value: string }>;
  StringList: React.FC<{ values: string[] }>;
  Number: React.FC<{ value: number }>;
  NumberList: React.FC<{ values: number[] }>;
  Boolean: React.FC<{ value: boolean }>;
  BooleanList: React.FC<{ values: boolean[] }>;
  Date: React.FC<{ value: string }>;
  DateList: React.FC<{ values: string[] }>;
  Relationship: React.FC<{ value: RelationshipType }>;
  RelationshipList: React.FC<{ values: RelationshipType[] }>;
}
export interface DefaultFieldComponentsTypes {
  Boolean: React.FC<{
    value: boolean;
    label: string;
    onUpdate: (value: boolean) => void;
  }>;
  Date: React.FC<{
    value: string;
    label: string;
    onUpdate: (value: string) => void;
  }>;
  Number: React.FC<{
    value: number;
    label: string;
    onUpdate: (value: number) => void;
  }>;
  String: React.FC<{
    value: string;
    label: string;
    onUpdate: (value: string) => void;
  }>;
  Relationship: React.FC<{
    // values: string[];
    values: any;
    options: { id: string; label: string }[];
    label: string;
    onUpdate: (value: string[]) => void;
  }>;
}

export interface ScaffoldPresentationContextProps {
  List: React.FC<XListProps>;
  Layout: React.FC<XLayoutProps>;
  Details: React.FC<XDetailsProps>;
  Form: React.FC<XFormProps>;
  defaultValueComponents: DefaultValueComponentsTypes;
  defaultFieldComponents: DefaultFieldComponentsTypes;
}

export const ScaffoldPresentationDefaultValueComponents = {
  String,
  StringList,
  Number,
  NumberList,
  Boolean,
  BooleanList,
  Date,
  DateList,
  Relationship,
  RelationshipList,
};

export const ScaffoldPresentationDefaultFieldComponents = {
  String: StringInput,
  Number: NumberInput,
  Boolean: BooleanInput,
  Date: DateInput,
  Relationship: RelationshipInput,
};

export const ScaffoldPresentationContext =
  createContext<ScaffoldPresentationContextProps>({
    // @todo default/headless components?
    List: () => null,
    Layout: () => null,
    Details: () => null,
    Form: () => null,
    defaultValueComponents: ScaffoldPresentationDefaultValueComponents,
    defaultFieldComponents: ScaffoldPresentationDefaultFieldComponents,
  });

export const useScaffoldPresentation = (): ScaffoldPresentationContextProps =>
  useContext(ScaffoldPresentationContext);

interface ScaffoldPresentationProviderProps
  extends ScaffoldPresentationContextProps {
  children: React.ReactNode;
}

const ScaffoldPresentationProvider: React.FC<
  ScaffoldPresentationProviderProps
> = ({
  List,
  Layout,
  Details,
  Form,
  defaultValueComponents,
  defaultFieldComponents,
  children,
}) => {
  return (
    <ScaffoldPresentationContext.Provider
      value={{
        List,
        Layout,
        Details,
        Form,
        defaultValueComponents,
        defaultFieldComponents,
      }}
    >
      {children}
    </ScaffoldPresentationContext.Provider>
  );
};

export default ScaffoldPresentationProvider;
