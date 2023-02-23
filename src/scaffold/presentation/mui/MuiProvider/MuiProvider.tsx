import { createTheme, ThemeProvider } from "@mui/material";
import type { Theme } from "@mui/material";

import ScaffoldPresentationProvider, {
  ScaffoldPresentationDefaultValueComponents,
} from "../../../components/ScaffoldPresentationProvider";
import MuiLayout from "../MuiLayout";
import MuiList from "../MuiList";
import MuiDetails from "../MuiDetails";
import { Relationship, RelationshipList } from "./defaultComponents";
import type { XProviderProps } from "../../interfaces";

const defaultTheme = createTheme();

const MuiProvider: React.FC<XProviderProps<Theme>> = ({
  theme = defaultTheme,
  children,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <ScaffoldPresentationProvider
        List={MuiList}
        Layout={MuiLayout}
        Details={MuiDetails}
        defaultValueComponents={{
          ...ScaffoldPresentationDefaultValueComponents,
          Relationship,
          RelationshipList,
        }}
      >
        {children}
      </ScaffoldPresentationProvider>
    </ThemeProvider>
  );
};

export default MuiProvider;
