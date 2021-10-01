import React from "react";
import { Input as ChakraInput } from "@chakra-ui/input";
import moment from "moment";

type IProps = {
  children?: React.ReactNode;
  label: string
  name?: string;
  onChange(evt: React.FormEvent<HTMLInputElement>): void,
  selectedDate?: Date | string
}

export const DatePicker = ({ children, onChange, selectedDate, name, label, ...props }: IProps): JSX.Element => {

  // format date
  const formattedDate = moment(selectedDate).format("YYYY-MM-DD");

  return (
    <ChakraInput
      aria-label={label}
      name={name}
      value={formattedDate}
      onChange={onChange}
      type="date"
      {...props}
    >
      {children}
    </ChakraInput>
  );
};
