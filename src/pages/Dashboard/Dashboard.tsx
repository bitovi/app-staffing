import ReportTable from "./components/ReportTable";
import { Flex } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";

const reportDate = new Date();

export default function Dashboard(): JSX.Element {
  return (
    <Flex flexDirection="column" py={20} px={14}>
      <Flex alignItems="center" marginBottom={10}>
        <Text textStyle="h1" >Bitovi Staff Management</Text>
      </Flex>

      <ReportTable reportDate={reportDate} />
    </Flex>
  );
}
