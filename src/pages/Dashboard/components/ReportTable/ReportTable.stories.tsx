import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { ReportTable } from "./ReportTable";

export default {
  title: "Components/ReportTable",
  component: ReportTable,
} as ComponentMeta<typeof ReportTable>;


export const Basic: ComponentStory<typeof ReportTable> = (args) => (
  <ReportTable {...args}/>
)

Basic.args = {
  reportDate: new Date(),
};



export const WorstCase: ComponentStory<typeof ReportTable> = (args) => (
  <ReportTable {...args}/>
)

WorstCase.args = {
  reportDate: new Date(2019, 1, 18),
};



export const BestCase: ComponentStory<typeof ReportTable> = (args) => (
  <ReportTable {...args}/>
)

BestCase.args = {
  reportDate: new Date(2019, 0, 1),
};
