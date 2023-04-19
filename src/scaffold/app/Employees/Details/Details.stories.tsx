import { useEffect } from "react";
import { rest } from "msw";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter, Route } from "react-router-dom";

import { Flex, Box } from "@chakra-ui/layout";

import Details from "./Details";

export default {
  title: "Pages/Employees/Details",
  component: Details,
  // workaround to reset msw data between stories
  decorators: [
    (Story) => {
      useEffect(() => {
        return () => window.location.reload();
      }, []);

      return (
        <MemoryRouter initialEntries={["/details/1234"]}>
          <Route exact component={() => <Story />} path="/details/:id" />
        </MemoryRouter>
      );
    },
  ],
} as ComponentMeta<typeof Details>;

const backgroundColor = "gray.10";

export const Loading: ComponentStory<typeof Details> = () => (
  <Flex height="100%" width="100%" overflow="hidden">
    <Box backgroundColor={backgroundColor} flex="1 1" padding="40px">
      <Details />
    </Box>
  </Flex>
);

Loading.parameters = {
  msw: {
    handlers: [
      rest.get(/employees/, (_, res, ctx) => {
        return res(ctx.delay("infinite"));
      }),
    ],
  },
};

export const WithData: ComponentStory<typeof Details> = () => {
  return (
    <Flex height="100%" width="100%" overflow={"visible"}>
      <Box backgroundColor={backgroundColor} flex="1 1" padding="40px">
        <Details />
      </Box>
    </Flex>
  );
};

WithData.parameters = {
  msw: {
    handlers: [
      rest.get(/employees/, (_, res, ctx) => {
        return res(
          ctx.json({
            jsonapi: { version: "1.0" },
            links: {
              self: "/employees/f23140f8-88ee-4b9c-a223-7078a1ee2425?include=skills",
            },
            data: {
              type: "Employee",
              id: "f23140f8-88ee-4b9c-a223-7078a1ee2425",
              attributes: {
                name: "Adolph Kshlerin",
                start_date: "2023-11-14T00:00:00.000Z",
                end_date: null,
              },
              relationships: {
                skills: {
                  data: [
                    {
                      type: "Skill",
                      id: "bbfef8b9-3c73-4ed3-8225-3ef99738a7c1",
                    },
                  ],
                },
              },
            },
            included: [
              {
                type: "Skill",
                id: "bbfef8b9-3c73-4ed3-8225-3ef99738a7c1",
                attributes: { name: "DevOps" },
              },
            ],
          }),
        );
      }),
    ],
  },
};
