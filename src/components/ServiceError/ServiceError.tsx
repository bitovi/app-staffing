import { Box, Text } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

//Need to either extract these Type desconstructs into an interface
//Or figure out how to simplify a catch-all typing for ...props ?

export default function ServiceError({
  name,
  message,
  children,
  iconColor,
  ...props
}: {
  name?: string;
  message?: string;
  children?: JSX.Element;
  bg?: string;
  color?: string;
  iconColor?: string;
  textStyle?: string;
  width?: string;
  h?: string;
  mt?: string;
  mb?: string;
  py?: string;
  px?: string;
}): JSX.Element {
  return (
    <Box
      bg="red.500"
      color="white"
      fontSize="sm"
      p="3"
      borderRadius="md"
      display="flex"
      position="relative"
      alignItems="center"
      {...props}
    >
      {children}
      <WarningIcon color={iconColor || "currentColor"} />
      <Text marginLeft="3" fontWeight="bold">
        {name || "Service Error"}
      </Text>
      {message && (
        <Text marginLeft="3" fontWeight="normal">
          {message}
        </Text>
      )}
    </Box>
  );
}
