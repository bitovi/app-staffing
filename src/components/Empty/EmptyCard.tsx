import { Box, Text } from "@chakra-ui/react";
import { EmptyIcon } from "./";

export default function EmptyCard({
  message,
}: {
  message: string;
}): JSX.Element {
  return (
    <Box
      height="400"
      bg="white"
      borderRadius="md"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
    >
      <EmptyIcon />
      <Text fontWeight="bold">{message}</Text>
    </Box>
  );
}
