import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

export default function ProjectsHeader({
  loading,
}: {
  loading?: boolean;
}): JSX.Element {
  return (
    <Box mb="48px">
      <Breadcrumb
        spacing="8px"
        marginBottom="16px"
        fontSize="14px"
        color="gray.500"
        separator={<ChevronRightIcon />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/app-staffing/#">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage color="gray.800">
          <BreadcrumbLink href="#">Projects</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Flex
        width="full"
        fontFamily="Arial, Helvetica, sans-serif"
        display="flex"
        justifyContent="space-between"
      >
        <Text textStyle="title" color="gray.700">
          Projects
        </Text>

        <Button size="lg" variant="primary" arialabel="Add Project">
          Add Project
        </Button>
      </Flex>
    </Box>
  );
}
