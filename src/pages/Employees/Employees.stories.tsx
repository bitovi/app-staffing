import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { Flex, Box } from "@chakra-ui/layout";

import Employees, { EmployeePageLoadingLayout } from "./Employees";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Pages/Employees",
  component: Employees,
} as ComponentMeta<typeof Employees>;

const backgroundColor = "gray.10";

export const nonEmpty: ComponentStory<typeof Employees> = NonEmptyEmployeesPage;

export const Empty: ComponentStory<typeof Employees> = ({ ...props }) => (
  <Flex height="100%" width="100%" overflow="hidden">
    <Box backgroundColor={backgroundColor} flex="1 1" padding="40px">
      <Employees
        {...props}
        useEmployeeMutations={() => {
          return {
            createEmployee: (employee) => Promise.resolve(""),
            updateEmployee: (id) => Promise.resolve(),
            destroyEmployee: (id) => Promise.resolve(),
          };
        }}
        useEmployees={() => []}
      />
    </Box>
  </Flex>
);

export const Loading: ComponentStory<typeof Flex> = ({ ...props }) => (
  <Flex height="100%" width="100%" overflow="hidden">
    <Box backgroundColor={backgroundColor} flex="1 1" padding="40px">
      <EmployeePageLoadingLayout {...props} />
    </Box>
  </Flex>
);

function NonEmptyEmployeesPage({ ...props }) {
  return (
    <BrowserRouter>
      <Flex height="100%" width="100%" overflow={"visible"}>
        <Box backgroundColor={backgroundColor} flex="1 1" padding="40px">
          <Employees
            {...props}
            useEmployeeMutations={() => {
              return {
                createEmployee: (employee) => Promise.resolve(""),
                updateEmployee: (id) => Promise.resolve(),
                destroyEmployee: (id) => Promise.resolve(),
              };
            }}
          />
        </Box>
      </Flex>
    </BrowserRouter>
  );
}
