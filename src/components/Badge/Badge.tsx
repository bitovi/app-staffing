import React from "react";
import { Tag as ChakraTag } from "@chakra-ui/tag";
import { Text, TextProps } from "@chakra-ui/react";

type BadgeProps = {
  size: "sm" | "md" | "lg";
  maxWidth?: string;
  background?: string;
  isTruncated?: boolean;
  children: React.ReactNode;
  whiteSpace?: TextProps["whiteSpace"];
  textAlign?: TextProps["textAlign"];
  display?: TextProps["display"];
};

function Badge({
  background,
  size,
  maxWidth,
  children,
  isTruncated = true,
  whiteSpace = undefined,
  textAlign = undefined,
  display = undefined,
}: BadgeProps): JSX.Element {
  return (
    <ChakraTag bg={background} variant="solid" color="white" size={size}>
      <Text
        textAlign={textAlign}
        isTruncated={isTruncated}
        whiteSpace={whiteSpace}
        maxWidth={maxWidth || "200px"}
        display={display}
      >
        {children}
      </Text>
    </ChakraTag>
  );
}

export default Badge;
