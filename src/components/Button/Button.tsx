import { Button as ChakraButton } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  tabIndex?: number;
  variant?: "primary" | "secondary" | "link";
  onClick(): void;
  isLoading?: boolean;
}

export default function Button({
  children,
  className,
  disabled,
  tabIndex,
  variant = "primary",
  onClick,
  isLoading = false,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <ChakraButton
      {...props}
      variant={variant}
      tabIndex={tabIndex}
      onClick={onClick}
      isLoading={isLoading}
      isDisabled={disabled}
    >
      {children}
    </ChakraButton>
  );
}
