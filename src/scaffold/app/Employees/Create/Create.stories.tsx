import { rest } from "msw";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import { Flex, Box } from "@chakra-ui/layout";

import CreateEmployee from "./Create";

export default {
  title: "Pages/Employees/Create",
  component: CreateEmployee,
  // workaround to reset msw data between stories
  decorators: [
    (Story) => {
      return (
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      );
    },
  ],
} as ComponentMeta<typeof CreateEmployee>;

const backgroundColor = "gray.10";

const mswHandlers = [
  rest.post(/employees/, (_, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({ data: { attributes: { name: "msw user" } } }),
    );
  }),
];

export const Create: ComponentStory<typeof CreateEmployee> = () => (
  <Flex height="100%" width="100%" overflow="hidden">
    <Box backgroundColor={backgroundColor} flex="1 1" padding="40px">
      <CreateEmployee />
    </Box>
  </Flex>
);

Create.parameters = { msw: { handlers: mswHandlers } };
