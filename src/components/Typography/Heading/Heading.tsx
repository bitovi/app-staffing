import { Heading as ChakraHeading } from "@chakra-ui/react";
import { ReactNode } from "react";

interface HeadingProps extends React.ComponentProps<typeof ChakraHeading> {
  "data-testid"?: string;
  className?: string;
  children: ReactNode;
  variant?: "h1" | "h2";
}

export function Heading({
  className,
  variant = "h1",
  children,
  ...restOfProps
}: HeadingProps): JSX.Element {
  return (
    <ChakraHeading size={variant} {...restOfProps}>
      {children}
    </ChakraHeading>
  );
}

export default Heading;
