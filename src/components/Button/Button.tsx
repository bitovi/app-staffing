import { Button as ChakraButton } from "@chakra-ui/react";
import { ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "link"
  | "deleteAction"
  | "modalCancel"
  | "modalConfirm";
interface ButtonProps extends React.ComponentProps<typeof ChakraButton> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export default function Button({
  children,
  variant = "primary",
  ...props
}: ButtonProps): JSX.Element {
  return (
    <ChakraButton {...props} variant={variant}>
      {children}
    </ChakraButton>
  );
}
