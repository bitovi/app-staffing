import { InputProps } from "@chakra-ui/input";

export type InputControlProps = InputProps & {
  inputLeftElement?: React.ReactNode;
  inputRightElement?: React.ReactNode;
};

export const InputControl = (props: InputControlProps): JSX.Element => {
  return <div></div>;
};
