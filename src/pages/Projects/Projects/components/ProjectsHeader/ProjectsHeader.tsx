import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/spinner";
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
        {!name && !loading ? (
          <BreadcrumbItem isCurrentPage color="gray.800">
            <BreadcrumbLink href="/projects" data-testid="projects">
              Projects
            </BreadcrumbLink>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbLink href="/projects" data-testid="projects">
              Projects
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}

        {name && loading ? (
          <BreadcrumbItem isCurrentPage color="gray.800">
            <BreadcrumbLink as={Link} to={"#"} data-testid="project">
              {name}
              <Spinner size="xs" ml="0.5rem" />
            </BreadcrumbLink>
          </BreadcrumbItem>
        ) : name && !loading ? (
          <BreadcrumbItem isCurrentPage color="gray.800">
            <BreadcrumbLink as={Link} to={"#"} data-testid="project">
              {name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ) : (
          ""
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
