import { Flex, Box } from "@chakra-ui/layout";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { Employees, EmployeePageLoadingLayout } from "./Employees";

export default {
  title: "Pages/Employees",
  component: Employees,
} as ComponentMeta<typeof Employees>;

const backgroundColor = "gray.10";

export const nonEmpty: ComponentStory<typeof Employees> = ({ ...props }) => (
  <Flex height="100%" width="100%" overflow="hidden">
    <Box
      backgroundColor={backgroundColor}
      flex="1 1"
      padding="40px"
      overflow="auto"
    >
      <Employees
        {...props}
        useEmployees={() => []}
        useEmployeeMutations={() => {
          return {
            createEmployee: (employee) => Promise.resolve(""),
            updateEmployee: (id) => Promise.resolve(),
            destroyEmployee: (id) => Promise.resolve(),
          };
        }}
        useSkills={() => []}
      />
    </Box>
  </Flex>
);

export const Empty: ComponentStory<typeof Employees> = ({ ...props }) => (
  <Flex height="100%" width="100%" overflow="hidden">
    <Box
      backgroundColor={backgroundColor}
      flex="1 1"
      padding="40px"
      overflow="auto"
    >
      <Employees
        {...props}
        useEmployees={() => []}
        useEmployeeMutations={() => {
          return {
            createEmployee: (employee) => Promise.resolve(""),
            updateEmployee: (id) => Promise.resolve(),
            destroyEmployee: (id) => Promise.resolve(),
          };
        }}
        useSkills={() => []}
      />
    </Box>
  </Flex>
);

export const Loading: ComponentStory<any> = ({ ...props }) => (
  <Flex height="100%" width="100%" overflow="hidden">
    <Box
      backgroundColor={backgroundColor}
      flex="1 1"
      padding="40px"
      overflow="auto"
    >
      <EmployeePageLoadingLayout {...props} />
    </Box>
  </Flex>
);
