import ReportTable from "./components/ReportTable";
import { Flex } from "@chakra-ui/layout";
import Heading from "../../components/Typography/Heading";

const reportDate = new Date();

export default function Dashboard(): JSX.Element {
  return (
    <Flex flexDirection="column" py={20} px={14}>
      <Flex alignItems="center" marginBottom={10}>
        <Heading variant="h1">Bitovi Staff Management</Heading>
      </Flex>
      <ReportTable reportDate={reportDate} />
    </Flex>
  );
}
