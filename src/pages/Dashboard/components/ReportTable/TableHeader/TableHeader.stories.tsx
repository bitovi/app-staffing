import type { ComponentStory, ComponentMeta } from "@storybook/react";
import TableHeader from "./TableHeader";

export default {
  title: "Components/ReportTableHeader",
  component: TableHeader,
} as ComponentMeta<typeof TableHeader>;

export const Basic: ComponentStory<typeof TableHeader> = ({
  timeline,
  columnLabel,
}) => {
  return <TableHeader timeline={[]} columnLabel={columnLabel}></TableHeader>;
};

Basic.args = {
  timeline: [],
  columnLabel: "DEPARTMENT",
};
