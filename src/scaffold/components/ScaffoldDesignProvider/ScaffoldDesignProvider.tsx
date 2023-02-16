import React, { createContext, useContext } from "react";
import { XListProps, XLayoutProps } from "../../design/interfaces";

interface ScaffoldDesignContextProps {
  List: React.FC<XListProps>;
  Layout: React.FC<XLayoutProps>;
  // @todo Form, Details
}

export const ScaffoldDesignContext = createContext<ScaffoldDesignContextProps>({
  // @todo have default/headless components?
  List: ({ columns, useData }) => null,
  Layout: ({ schema, children }) => null,
});

export const useScaffoldDesign = () => useContext(ScaffoldDesignContext);

interface ScaffoldDesignProviderProps extends ScaffoldDesignContextProps {
  children: any;
}

const ScaffoldDesignProvider: React.FC<ScaffoldDesignProviderProps> = ({
  List,
  Layout,
  children,
}) => {
  return (
    <ScaffoldDesignContext.Provider
      value={{
        List,
        Layout,
      }}
    >
      {children}
    </ScaffoldDesignContext.Provider>
  );
};

export default ScaffoldDesignProvider;
