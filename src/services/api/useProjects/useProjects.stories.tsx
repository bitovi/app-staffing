import type { Story, Meta } from "@storybook/react";

import useProjects from "./useProjects";

export default {
  title: "Services/API/getData",
} as Meta<{ id: string }>;

export const Basic: Story<{ id: string }> = (args) => {
  const { data } = useProjects();

  return (
    <ul>
      {data?.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
};

Basic.args = {
  id: "hello",
};
