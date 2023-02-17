import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { Flex, Box } from "@chakra-ui/layout";

import Employees from "./Employees";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Pages/Employees/List",
  component: Employees,
} as ComponentMeta<typeof Employees>;

const backgroundColor = "gray.10";

export const nonEmpty: ComponentStory<typeof Employees> = NonEmptyEmployeesPage;

// @todo add msw-storybook-addon for dummy storybook api data after data layer is added
// export const Empty: ComponentStory<typeof Employees> = () => (
//   <Flex height="100%" width="100%" overflow="hidden">
//     <Box backgroundColor={backgroundColor} flex="1 1" padding="40px">
//       <Employees />
//     </Box>
//   </Flex>
// );

// @todo loading state when data layer is added
// export const Loading: ComponentStory<typeof Flex> = ({ ...props }) => (
//   <Flex height="100%" width="100%" overflow="hidden">
//     <Box backgroundColor={backgroundColor} flex="1 1" padding="40px">
//       <EmployeePageLoadingLayout {...props} />
//     </Box>
//   </Flex>
// );

function NonEmptyEmployeesPage() {
  return (
    <BrowserRouter>
      <Flex height="100%" width="100%" overflow={"visible"}>
        <Box backgroundColor={backgroundColor} flex="1 1" padding="40px">
          <Employees />
        </Box>
      </Flex>
    </BrowserRouter>
  );
}
