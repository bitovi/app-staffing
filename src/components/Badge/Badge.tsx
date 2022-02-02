import React from "react";
import { Tag as ChakraTag } from "@chakra-ui/tag";

type BadgeProps = {
  size: "sm" | "md" | "lg";
  background?: string;
  children: React.ReactNode;
};

function Badge({ background, size, children }: BadgeProps): JSX.Element {
  return (
    <ChakraTag bg={background} variant="solid" color="white" size={size}>
      {children}
    </ChakraTag>
  );
}

export default Badge;
