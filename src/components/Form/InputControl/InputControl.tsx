// eslint-disable-next-line import/no-extraneous-dependencies
import { InputProps } from "@chakra-ui/input";

export type InputControlProps = InputProps & {
  inputLeftElement?: React.ReactNode;
  inputRightElement?: React.ReactNode;
};

export const InputControl = (props: InputControlProps) => {
  return <div></div>;
};
