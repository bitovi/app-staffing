import { Input as ChakraInput } from "@chakra-ui/input";
import { format } from "date-fns";

type DatePickerProps = {
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
}: DatePickerProps): JSX.Element => {
  const formattedDate = selectedDate
    ? format(new Date(selectedDate), "yyyy-MM-dd")
    : "";

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const dateString: string = evt.target.value;
    const dateValues = dateString.split("-");

    const year = parseInt(dateValues[0]);
    const month = parseInt(dateValues[1]) - 1;
    const day = parseInt(dateValues[2]);
    const date = new Date(year, month, day);

    onChange(date);
  };

  return (
    <ChakraInput
      {...props}
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
