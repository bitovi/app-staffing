import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { ReactNode } from "react";

interface LinkProps extends React.ComponentProps<typeof ChakraLink>{
  children: ReactNode;
  to: string;
}

export default function Link({
  children,
  to,
  ...props
}: LinkProps): JSX.Element {
  return (
    <ChakraLink
      as={ReactRouterLink} 
      to={to}
      {...props}
    >
      {children}
    </ChakraLink>
  );
}
