import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { useProjection } from "../../../../../services/projection";
import TableHeader from "./TableHeader";

export default {
  title: "Components/ReportTableHeader",
  component: TableHeader,
} as ComponentMeta<typeof TableHeader>;

export const Basic: ComponentStory<typeof TableHeader> = ({ columnLabel }) => {
  const skills = [
    {
      id: "1001",
      name: "Angular",
    },
    {
      id: "1002",
      name: "React",
    },
    {
      id: "1003",
      name: "DevOps",
    },
    {
      id: "1004",
      name: "Node",
    },
    {
      id: "1005",
      name: "Product",
    },
    {
      id: "1006",
      name: "Project Management",
    },
  ];
  const { timeline } = useProjection(new Date(), skills);
  return (
    <TableHeader timeline={timeline} columnLabel={columnLabel}></TableHeader>
  );
};

Basic.args = {
  columnLabel: "DEPARTMENT",
};
