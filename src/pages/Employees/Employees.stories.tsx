import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { useEffect } from "react";
import { Flex, Box } from "@chakra-ui/layout";

import { Employees, EmployeePageLoadingLayout } from "./Employees";
import { useEmployees } from "../../services/api";

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

export const Loading: ComponentStory<typeof Flex> = ({ ...props }) => (
  <Flex height="100%" width="100%" overflow="hidden">
    <Box backgroundColor={backgroundColor} flex="1 1" padding="40px">
      <EmployeePageLoadingLayout {...props} />
    </Box>
  </Flex>
);

function NonEmptyEmployeesPage({ ...props }) {
  // STAF-90: Prevent an "extra vertical scrollbar" in the storybook canvas to
  // show up; the non-empty employees page adds a scrollable table section and
  // having two vertical scrollbars is undesirable.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, []);

  return (
    <Flex height="100%" width="100%" overflow="hidden">
      <Box backgroundColor={backgroundColor} flex="1 1" padding="40px">
        <Employees
          {...props}
          useEmployees={useEmployees}
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
}
