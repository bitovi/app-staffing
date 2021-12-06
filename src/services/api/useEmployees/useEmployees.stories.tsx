import type { Story, Meta } from "@storybook/react";

import useEmployees from "./useEmployees";

export default {
  title: "Services/API/getData",
} as Meta<{ id: string }>;

export const Basic: Story<{ id: string }> = (args) => {
  const { getEmployeeList } = useEmployees();
  const { data: employees } = getEmployeeList();
  return (
    <ul>
      {employees?.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
};

Basic.args = {
  id: "hello",
};
