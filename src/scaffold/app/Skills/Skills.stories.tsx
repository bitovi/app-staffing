import { useEffect } from "react";
import { rest } from "msw";
import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { Flex, Box } from "@chakra-ui/layout";

import Skills from "./Skills";

export default {
  title: "Pages/Skills/List",
  component: Skills,
  // workaround to reset msw data between stories
  decorators: [
    (Story) => {
      useEffect(() => {
        return () => window.location.reload();
      }, []);

      return <Story />;
    },
  ],
} as ComponentMeta<typeof Skills>;

const backgroundColor = "gray.10";

const mswHandlers = [
  rest.post(/skills/, (_, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({ data: { attributes: { name: "msw skill" } } }),
    );
  }),
  rest.patch(/skills/, (_, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({ data: { attributes: { name: "msw skill" } } }),
    );
  }),
  rest.delete(/skills/, (_, res, ctx) => {
    return res(ctx.status(201), ctx.json({ data: {} }));
  }),
];

export const Empty: ComponentStory<typeof Skills> = () => (
  <Flex height="100%" width="100%" overflow="hidden">
    <Box backgroundColor={backgroundColor} flex="1 1" padding="40px">
      <Skills />
    </Box>
  </Flex>
);

Empty.parameters = {
  msw: {
    handlers: [
      ...mswHandlers,
      rest.get(/skills/, (_, res, ctx) => {
        return res(ctx.json({ data: [] }));
      }),
    ],
  },
};

export const Loading: ComponentStory<typeof Skills> = () => (
  <Flex height="100%" width="100%" overflow="hidden">
    <Box backgroundColor={backgroundColor} flex="1 1" padding="40px">
      <Skills />
    </Box>
  </Flex>
);

Loading.parameters = {
  msw: {
    handlers: [
      ...mswHandlers,
      rest.get(/skills/, (_, res, ctx) => {
        return res(ctx.delay("infinite"));
      }),
    ],
  },
};

export const WithData: ComponentStory<typeof Skills> = () => {
  return (
    <Flex height="100%" width="100%" overflow={"visible"}>
      <Box backgroundColor={backgroundColor} flex="1 1" padding="40px">
        <Skills />
      </Box>
    </Flex>
  );
};

WithData.parameters = { msw: { handlers: mswHandlers } };
