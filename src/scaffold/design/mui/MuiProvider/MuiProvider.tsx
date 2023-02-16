import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";

import ScaffoldDesignProvider from "../../../components/ScaffoldDesignProvider";
import MuiLayout from "../MuiLayout";
import MuiList from "../MuiList";
import type { XProviderProps } from "../../interfaces";

const defaultTheme = createTheme();

const MuiProvider: React.FC<XProviderProps> = ({
  theme = defaultTheme,
  children,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <ScaffoldDesignProvider List={MuiList} Layout={MuiLayout}>
        {children}
      </ScaffoldDesignProvider>
    </ThemeProvider>
  );
};

export default MuiProvider;
