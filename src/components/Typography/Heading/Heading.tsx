import { Heading as ChakraHeading } from "@chakra-ui/react";

export default function Heading({
  variant = "h1",
  ...restOfProps
}: React.ComponentProps<typeof ChakraHeading>): JSX.Element {
  return <ChakraHeading size={variant} {...restOfProps} />;
}
