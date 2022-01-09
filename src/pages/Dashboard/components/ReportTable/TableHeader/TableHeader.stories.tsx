import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { useProjection } from "../../../../../services/projection";
import TableHeader from "./TableHeader";

export default {
  title: "Components/ReportTableHeader",
  component: TableHeader,
} as ComponentMeta<typeof TableHeader>;

export const Basic: ComponentStory<typeof TableHeader> = ({ columnLabel }) => {
  const { timeline } = useProjection();
  return (
    <TableHeader timeline={timeline} columnLabel={columnLabel}></TableHeader>
  );
};

Basic.args = {
  columnLabel: "DEPARTMENT",
};
