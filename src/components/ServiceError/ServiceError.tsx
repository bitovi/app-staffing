import { Box, Text } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

export default function ServiceError({
  name,
  message,
}: {
  name?: string;
  message?: string;
}): JSX.Element {
  return (
    <Box
      bg="red.500"
      color="white"
      fontSize="sm"
      p="3"
      borderRadius="md"
      display="flex"
      alignItems="center"
    >
      <WarningIcon />
      <Text marginLeft="3" fontWeight="bold">
        {name || "Service Error"}
      </Text>
      <Text marginLeft="3" fontWeight="normal">
        {message || "Try again later."}
      </Text>
    </Box>
  );
}
