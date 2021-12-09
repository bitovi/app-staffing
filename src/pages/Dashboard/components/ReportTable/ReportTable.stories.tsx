import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { useState } from "react";
import { Flex } from "@chakra-ui/layout";

import { DatePicker } from "../../../../components/DatePicker";
import Text from "../../../../components/Typography/Heading";
import { ReportTable } from "./ReportTable";

export default {
  title: "Components/ReportTable",
  component: ReportTable,
} as ComponentMeta<typeof ReportTable>;

export const Basic: ComponentStory<typeof ReportTable> = (args) => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <Text variant="h2" my="6">
        Select a Date to Change the Timeline.
      </Text>
      <DatePicker label="Pick a date" selectedDate={date} onChange={setDate} />
      <Flex my="6" />
      <hr />
      <Flex my="6" />
      <ReportTable reportDate={date} />
    </>
  );
};
