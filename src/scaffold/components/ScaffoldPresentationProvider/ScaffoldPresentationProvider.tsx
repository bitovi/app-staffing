import { createContext, useContext } from "react";

<<<<<<< HEAD
import type {
  Primitive,
=======
import {
>>>>>>> main
  XListProps,
  XLayoutProps,
  XDetailsProps,
  Relationship as RelationshipType,
<<<<<<< HEAD
  XFormProps,
=======
>>>>>>> main
} from "../../presentation/interfaces";
import {
  Boolean,
  BooleanList,
<<<<<<< HEAD
  Date,
=======
  DefaultDate,
>>>>>>> main
  DateList,
  Number,
  NumberList,
  Relationship,
  RelationshipList,
  String,
  StringList,
} from "./DefaultComponents";
<<<<<<< HEAD
import {
  Boolean as BooleanInput,
  Date as DateInput,
  Number as NumberInput,
  String as StringInput,
} from "./DefaultFieldComponents";
=======
>>>>>>> main

export interface DefaultValueComponents {
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
<<<<<<< HEAD
export interface DefaultFieldComponents {
  Boolean: React.FC<{
    value: boolean;
    onUpdate: (value: Primitive) => void;
  }>;
  Date: React.FC<{
    value: string;
    onUpdate: (value: Primitive) => void;
  }>;
  Number: React.FC<{
    value: number;
    onUpdate: (value: Primitive) => void;
  }>;
  String: React.FC<{
    value: string;
    onUpdate: (value: Primitive) => void;
  }>;
}
=======
>>>>>>> main

export interface ScaffoldPresentationContextProps {
  List: React.FC<XListProps>;
  Layout: React.FC<XLayoutProps>;
  Details: React.FC<XDetailsProps>;
<<<<<<< HEAD
  Form: React.FC<XFormProps>;
  defaultValueComponents: DefaultValueComponents;
  defaultFieldComponents: DefaultFieldComponents;
=======
  // @todo Form
  defaultValueComponents: DefaultValueComponents;
>>>>>>> main
}

export const ScaffoldPresentationDefaultValueComponents = {
  String,
  StringList,
  Number,
  NumberList,
  Boolean,
  BooleanList,
<<<<<<< HEAD
  Date,
=======
  Date: DefaultDate,
>>>>>>> main
  DateList,
  Relationship,
  RelationshipList,
};

<<<<<<< HEAD
export const ScaffoldPresentationDefaultFieldComponents = {
  String: StringInput,
  Number: NumberInput,
  Boolean: BooleanInput,
  Date: DateInput,
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
=======
export const ScaffoldPresentationContext =
  createContext<ScaffoldPresentationContextProps>({
    // @todo default/headless components?
    List: ({ displays, useData }) => null,
    Layout: ({ schema, children }) => null,
    Details: ({ displays, useData }) => null,
    defaultValueComponents: ScaffoldPresentationDefaultValueComponents,
>>>>>>> main
  });

export const useScaffoldPresentation = (): ScaffoldPresentationContextProps =>
  useContext(ScaffoldPresentationContext);

interface ScaffoldPresentationProviderProps
  extends ScaffoldPresentationContextProps {
  children: React.ReactNode;
}

const ScaffoldPresentationProvider: React.FC<
  ScaffoldPresentationProviderProps
<<<<<<< HEAD
> = ({
  List,
  Layout,
  Details,
  Form,
  defaultValueComponents,
  defaultFieldComponents,
  children,
}) => {
=======
> = ({ List, Layout, Details, defaultValueComponents, children }) => {
>>>>>>> main
  return (
    <ScaffoldPresentationContext.Provider
      value={{
        List,
        Layout,
        Details,
<<<<<<< HEAD
        Form,
        defaultValueComponents,
        defaultFieldComponents,
=======
        defaultValueComponents,
>>>>>>> main
      }}
    >
      {children}
    </ScaffoldPresentationContext.Provider>
  );
};

export default ScaffoldPresentationProvider;
