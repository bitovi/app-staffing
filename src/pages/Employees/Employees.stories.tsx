import { Flex, Box } from "@chakra-ui/layout";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { employeeMockData } from "../../services/api/employees/fixtures";
import { skills } from "../../services/api/skills/fixtures";
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
        useEmployees={employeeMockData}
        useSkills={() => {
          return { skills, isLoading: false };
        }}
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
        useEmployees={() => {
          return {
            isLoading: false,
            employees: [],
            addEmployee: (employee) => new Promise((resolve) => resolve("")),
            deleteEmployee: (employeeId) => new Promise((resolve) => resolve()),
            updateEmployee: (employeeId) => new Promise((resolve) => resolve()),
            reset: () => undefined,
          };
        }}
        useSkills={() => {
          return { skills: [], isLoading: false };
        }}
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
