import { Box, Flex } from "@chakra-ui/react";
import SideNav from "./components/SideNav";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Flex height="100%" width="100%" overflow="hidden">
      <SideNav />

      <Box backgroundColor="gray.10" flex="1 1" padding="40px">
        {children}
      </Box>
    </Flex>
  );
}
