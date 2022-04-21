import ReportTable from "./components/ReportTable";
import { Flex } from "@chakra-ui/layout";
import Heading from "../../components/Typography/Heading";
import { Suspense } from "react";

export function DashboardLoadingLayout(): JSX.Element {
  return (
    <Flex flexDirection="column" py={16} px={4}>
      <Flex alignItems="center" marginBottom={12}>
        <Heading variant="h2">Bitovi Staff Management</Heading>
      </Flex>
    </Flex>
  );
}

export function Dashboard(): JSX.Element {
  return (
    <Flex flexDirection="column" py={16} px={4}>
      <Flex alignItems="center" marginBottom={12}>
        <Heading variant="h2" data-testid="dashboardTitle">
          Bitovi Staff Management
        </Heading>
      </Flex>
      <ReportTable />
    </Flex>
  );
}

export default function DashboardWrapper(): JSX.Element {
  return (
    <Suspense fallback={<DashboardLoadingLayout />}>
      <Dashboard />
    </Suspense>
  );
}
