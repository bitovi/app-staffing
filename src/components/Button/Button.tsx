import { Button as ChakraButton } from "@chakra-ui/react";
import { ReactNode } from "react";

// import styles from "./Button.module.scss";

interface ButtonProps {
  "data-testid"?: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  tabIndex?: number;
  variant?: "primary" | "secondary" | "link";
  onClick(): void;
}

export default function Button({
  children,
  className,
  disabled,
  tabIndex,
  variant = "primary",
  onClick,
  ...restOfProps
}: ButtonProps): JSX.Element {
  return (
    <ChakraButton
      variant={variant}
      data-testid={restOfProps["data-testid"]}
      disabled={disabled}
      tabIndex={tabIndex}
      onClick={onClick}
    >
      {children}
    </ChakraButton>
  );
}
