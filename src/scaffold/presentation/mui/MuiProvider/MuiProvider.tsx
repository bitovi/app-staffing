import { createTheme, ThemeProvider } from "@mui/material";
import type { Theme } from "@mui/material";

import ScaffoldPresentationProvider, {
  ScaffoldPresentationDefaultValueComponents,
  ScaffoldPresentationDefaultFieldComponents,
} from "../../../components/ScaffoldPresentationProvider";
import MuiLayout from "../MuiLayout";
import MuiList from "../MuiList";
import MuiForm from "../MuiForm";
import MuiDetails from "../MuiDetails";
import { Relationship, RelationshipList } from "./DefaultDisplayComponents";
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
        Form={MuiForm}
        defaultValueComponents={{
          ...ScaffoldPresentationDefaultValueComponents,
          Relationship,
          RelationshipList,
        }}
        defaultFieldComponents={{
          ...ScaffoldPresentationDefaultFieldComponents,
        }}
      >
        {children}
      </ScaffoldPresentationProvider>
    </ThemeProvider>
  );
};

export default MuiProvider;
