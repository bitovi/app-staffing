import React from "react";
import { Tag as ChakraTag } from "@chakra-ui/tag";
import { Text, TextProps } from "@chakra-ui/react";

type BadgeProps = {
  size: "sm" | "md" | "lg";
  maxWidth?: string;
  background?: string;
  isTruncated?:boolean;
  children: React.ReactNode;
  whiteSpace?: TextProps['whiteSpace'];
} ;

function Badge({
  background,
  size,
  maxWidth,
  children,
  isTruncated=true,
  whiteSpace=undefined
}: BadgeProps): JSX.Element {
  return (
    <ChakraTag bg={background} variant="solid" color="white" size={size}>
      <Text textAlign='center' width='80px' isTruncated={isTruncated} whiteSpace={whiteSpace} maxWidth={maxWidth || "200px"}>
        {children}
      </Text>
    </ChakraTag>
  );
}

export default Badge;
