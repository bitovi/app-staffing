import { useEffect } from "react";
import { rest } from "msw";
import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { Flex, Box } from "@chakra-ui/layout";

import Employees from "./List";

export default {
  title: "Pages/Employees/List",
  component: Employees,
  // workaround to reset msw data between stories
  decorators: [
    (Story) => {
      useEffect(() => {
        return () => window.location.reload();
      }, []);

      return <Story />;
    },
  ],
} as ComponentMeta<typeof Employees>;

const backgroundColor = "gray.10";

const mswHandlers = [
  rest.post(/employees/, (_, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({ data: { attributes: { name: "msw user" } } }),
    );
  }),
  rest.patch(/employees/, (_, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({ data: { attributes: { name: "msw user" } } }),
    );
  }),
  rest.delete(/employees/, (_, res, ctx) => {
    return res(ctx.status(201), ctx.json({ data: {} }));
  }),
];

export const Empty: ComponentStory<typeof Employees> = () => (
  <Flex height="100%" width="100%" overflow="hidden">
    <Box backgroundColor={backgroundColor} flex="1 1" padding="40px">
      <Employees />
    </Box>
  </Flex>
);

Empty.parameters = {
  msw: {
    handlers: [
      ...mswHandlers,
      rest.get(/employees/, (_, res, ctx) => {
        return res(ctx.json({ data: [] }));
      }),
    ],
  },
};

export const Loading: ComponentStory<typeof Employees> = () => (
  <Flex height="100%" width="100%" overflow="hidden">
    <Box backgroundColor={backgroundColor} flex="1 1" padding="40px">
      <Employees />
    </Box>
  </Flex>
);

Loading.parameters = {
  msw: {
    handlers: [
      ...mswHandlers,
      rest.get(/employees/, (_, res, ctx) => {
        return res(ctx.delay("infinite"));
      }),
    ],
  },
};

export const WithData: ComponentStory<typeof Employees> = () => {
  return (
    <Flex height="100%" width="100%" overflow={"visible"}>
      <Box backgroundColor={backgroundColor} flex="1 1" padding="40px">
        <Employees />
      </Box>
    </Flex>
  );
};

WithData.parameters = { msw: { handlers: mswHandlers } };
