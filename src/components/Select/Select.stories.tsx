import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";

import { Select } from "./Select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default {
  title: "Components/Select",
  component: Select,
} as ComponentMeta<typeof Select>;

export const Basic: ComponentStory<typeof Select> = (args) => {
  const [currentValue, setCurrentValue] = useState<string>("");

  const handleChange = (value: string) => setCurrentValue(value);

  return (
    <Select
      name="favoriteFlavor"
      label="Favorite flavor"
      value={currentValue}
      options={options}
      onChange={handleChange}
    />
  );
};

Basic.args = {
  options,
  value: "chocolate",
  label: "Flavors",
};
