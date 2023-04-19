import { rest } from "msw";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter, Route } from "react-router-dom";

import { Flex, Box } from "@chakra-ui/layout";

import EditEmployee from "./Edit";

export default {
  title: "Pages/Employees/Edit",
  component: EditEmployee,
  // workaround to reset msw data between stories
  decorators: [
    (Story) => {
      return (
        <MemoryRouter initialEntries={["/edit/1234"]}>
          <Route exact component={() => <Story />} path="/edit/:id" />
        </MemoryRouter>
      );
    },
  ],
} as ComponentMeta<typeof EditEmployee>;

const backgroundColor = "gray.10";

export const Edit: ComponentStory<typeof EditEmployee> = () => {
  return (
    <Flex height="100%" width="100%" overflow={"visible"}>
      <Box backgroundColor={backgroundColor} flex="1 1" padding="40px">
        <EditEmployee />
      </Box>
    </Flex>
  );
};

Edit.parameters = {
  msw: {
    handlers: [
      rest.get(/skills/, (_, res, ctx) => {
        return res(
          ctx.json({
            jsonapi: { version: "1.0" },
            links: { self: "/skills" },
            data: [
              {
                type: "Skill",
                id: "000c1c23-2cf4-4519-98ac-d87b3851e12e",
                attributes: { name: "Project Management" },
              },
              {
                type: "Skill",
                id: "f36b4fc3-87df-4f27-9f0c-84d4d816839d",
                attributes: { name: "Angular" },
              },
              {
                type: "Skill",
                id: "00503e61-f594-41c9-96db-fb99986e4e0f",
                attributes: { name: "Backend" },
              },
              {
                type: "Skill",
                id: "eb21e68b-909b-4566-ab42-73f38842fbf1",
                attributes: { name: "DevOps" },
              },
              {
                type: "Skill",
                id: "1e74cf4c-8945-48c4-8367-3456c0e54416",
                attributes: { name: "React" },
              },
              {
                type: "Skill",
                id: "bda673fd-a87b-4bf7-bb33-171bd0a0507b",
                attributes: { name: "Product Design" },
              },
            ],
          }),
        );
      }),
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
                      id: "eb21e68b-909b-4566-ab42-73f38842fbf1",
                    },
                  ],
                },
              },
            },
            included: [
              {
                type: "Skill",
                id: "eb21e68b-909b-4566-ab42-73f38842fbf1",
                attributes: { name: "DevOps" },
              },
            ],
          }),
        );
      }),
      rest.patch(/employees/, (_, res, ctx) => {
        return res(
          ctx.status(201),
          ctx.json({ data: { attributes: { name: "msw user" } } }),
        );
      }),
    ],
  },
};
