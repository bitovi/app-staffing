import type { ComponentStory, ComponentMeta } from "@storybook/react";
import React, { useState } from "react";
import { DatePicker } from "./DatePicker";


export default {
  component: DatePicker,
  title: 'Components/DatePicker'
} as ComponentMeta<typeof DatePicker>

export const Basic: ComponentStory<typeof DatePicker> = () => {
  const [currentValue, setCurrentValue] = useState<string>();

  const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setCurrentValue(evt.currentTarget.value)
  }

  return (
    <DatePicker
      label="Date-Picker"
      selectedDate={currentValue}
      onChange={handleChange}
    />
  )
}
