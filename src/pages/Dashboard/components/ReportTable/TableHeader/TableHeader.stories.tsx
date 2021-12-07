import type { ComponentStory, ComponentMeta } from "@storybook/react";
import TableHeader from "./TableHeader";

export default {
  title: "Components/ReportTableHeader",
  component: TableHeader,
} as ComponentMeta<typeof TableHeader>;

export const Basic: ComponentStory<typeof TableHeader> = ({
  date,
  columnLabel,
}) => {
  return <TableHeader date={date} columnLabel={columnLabel}></TableHeader>;
};

Basic.args = {
  date: new Date(),
  columnLabel: "DEPARTMENT",
};
