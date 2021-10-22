import { Button as ChakraButton } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ButtonProps extends React.ComponentProps<typeof ChakraButton> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "link";
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
