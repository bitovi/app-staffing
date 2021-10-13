import React from "react";
import { Input as ChakraInput } from "@chakra-ui/input";
import { format } from "date-fns";

type IProps = {
  children?: React.ReactNode;
  label: string;
  name?: string;
  onChange(date: Date): void;
  selectedDate?: Date;
};

export const DatePicker = ({
  children,
  onChange,
  selectedDate,
  name,
  label,
  ...props
}: IProps): JSX.Element => {
  // format date
  const formattedDate = selectedDate
    ? format(new Date(selectedDate), "yyyy-MM-dd")
    : "";

  const handleChange = (evt: any) => {
    const dateString: string = evt.target.value;
    const dateValues = dateString.split("-");
    console.log("on change", dateString, evt);

    const year = parseInt(dateValues[0]);
    const month = parseInt(dateValues[1]) - 1;
    const day = parseInt(dateValues[2]);
    const date = new Date(year, month, day);

    onChange(date);
  };

  return (
    <ChakraInput
      aria-label={label}
      name={name}
      value={formattedDate}
      onChange={handleChange}
      type="date"
    >
      {children}
    </ChakraInput>
  );
};
