import { Box } from "@chakra-ui/layout";

export default function Loading(): JSX.Element {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      Loading...
    </Box>
  );
}
