import type { ComponentStory, ComponentMeta } from "@storybook/react";
import React, { useState } from "react";
import { DatePicker } from "./DatePicker";

export default {
  component: DatePicker,
  title: "Components/DatePicker",
} as ComponentMeta<typeof DatePicker>;

export const Basic: ComponentStory<typeof DatePicker> = () => {
  const [currentValue, setCurrentValue] = useState<Date>();

  const handleChange = (date: Date) => {
    setCurrentValue(date);
  };

  return (
    <DatePicker
      label="Date-Picker"
      selectedDate={currentValue}
      onChange={handleChange}
    />
  );
};
