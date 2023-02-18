import { rest } from "msw";
import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { Flex, Box } from "@chakra-ui/layout";

import Employees from "./Employees";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Pages/Employees/List",
  component: Employees,
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

// @todo skeleton state when data layer is added
// export const Loading: ComponentStory<typeof Flex> = ({ ...props }) => (
//   <Flex height="100%" width="100%" overflow="hidden">
//     <Box backgroundColor={backgroundColor} flex="1 1" padding="40px">
//       <EmployeePageLoadingLayout {...props} />
//     </Box>
//   </Flex>
// );

export const WithData: ComponentStory<typeof Employees> = () => {
  return (
    <BrowserRouter>
      <Flex height="100%" width="100%" overflow={"visible"}>
        <Box backgroundColor={backgroundColor} flex="1 1" padding="40px">
          <Employees />
        </Box>
      </Flex>
    </BrowserRouter>
  );
};

WithData.parameters = { msw: { handlers: mswHandlers } };
