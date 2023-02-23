import { createContext, useContext } from "react";

import {
  XListProps,
  XLayoutProps,
  XDetailsProps,
  Relationship as RelationshipType,
} from "../../presentation/interfaces";
import {
  Boolean,
  BooleanList,
  DefaultDate,
  DateList,
  List as DefaultList,
  Number,
  NumberList,
  Relationship,
  RelationshipList,
  String,
  StringList,
} from "./defaultComponents";

export interface DefaultValueComponents {
  List: React.FC<{ children: React.ReactNode[] }>;
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

export interface ScaffoldPresentationContextProps {
  List: React.FC<XListProps>;
  Layout: React.FC<XLayoutProps>;
  Details: React.FC<XDetailsProps>;
  // @todo Form
  defaultValueComponents: DefaultValueComponents;
}

export const ScaffoldPresentationDefaultValueComponents = {
  List: DefaultList,
  String,
  StringList,
  Number,
  NumberList,
  Boolean,
  BooleanList,
  Date: DefaultDate,
  DateList,
  Relationship,
  RelationshipList,
};

export const ScaffoldPresentationContext =
  createContext<ScaffoldPresentationContextProps>({
    // @todo default/headless components?
    List: ({ displays, useData }) => null,
    Layout: ({ schema, children }) => null,
    Details: ({ displays, useData }) => null,
    defaultValueComponents: ScaffoldPresentationDefaultValueComponents,
  });

export const useScaffoldPresentation = (): ScaffoldPresentationContextProps =>
  useContext(ScaffoldPresentationContext);

interface ScaffoldPresentationProviderProps
  extends ScaffoldPresentationContextProps {
  children: React.ReactNode;
}

const ScaffoldPresentationProvider: React.FC<
  ScaffoldPresentationProviderProps
> = ({ List, Layout, Details, defaultValueComponents, children }) => {
  return (
    <ScaffoldPresentationContext.Provider
      value={{
        List,
        Layout,
        Details,
        defaultValueComponents,
      }}
    >
      {children}
    </ScaffoldPresentationContext.Provider>
  );
};

export default ScaffoldPresentationProvider;
