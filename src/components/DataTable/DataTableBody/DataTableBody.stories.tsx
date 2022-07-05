import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import { StylesProvider } from "@chakra-ui/react";
import DataTableBody from "./DataTableBody";
import theme from "../../../theme";
import { useProjects } from "../../../services/api";


export default {
  title: "Components/DataTableBody",
  component: DataTableBody,
  decorators: [
    (Story) => (
      <StylesProvider value={theme}>
        <Suspense fallback={""}>
          <BrowserRouter>
            <Story />
          </BrowserRouter>
        </Suspense>
      </StylesProvider>
    ),
  ],
} as ComponentMeta<typeof DataTableBody>;

export const Basic: ComponentStory<typeof DataTableBody> = () => {
  const project = useProjects()[0];

  return <DataTableBody project={project} />;
};
