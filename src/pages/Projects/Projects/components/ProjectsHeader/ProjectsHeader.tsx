import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import SingleProjectBreadCrumb from "../../../../../components/Breadcrumbs/SingleProjectBreadCrumb";
import ProjectsBreadCrumb from "../../../../../components/Breadcrumbs/ProjectsBreadCrumb";

export default function ProjectsHeader({
  loading,
  name,
}: {
  loading?: boolean;
  name?: string;
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
          <BreadcrumbLink href="/" data-testid="home">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Conditionals for Breadcrumb focus */}
        {name ? (
          <SingleProjectBreadCrumb name={name} loading={loading} />
        ) : (
          <ProjectsBreadCrumb loading={loading} />
        )}
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
