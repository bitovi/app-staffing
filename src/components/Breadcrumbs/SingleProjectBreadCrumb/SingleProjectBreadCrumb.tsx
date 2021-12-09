import { ChevronRightIcon } from "@chakra-ui/icons";
import { BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/spinner";

export default function SingleProjectBreadCrumb({
  name,
  loading,
}: {
  name?: string;
  loading?: boolean;
}): JSX.Element {
  return (
    <>
      <BreadcrumbItem separator={<ChevronRightIcon />} spacing="8px">
        <BreadcrumbLink href="/projects" data-testid="projectsBreadcrumb">
          Projects
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage color="gray.800">
        <BreadcrumbLink
          as={Link}
          to={"#"}
          data-testid="singleProjectBreadcrumb"
        >
          {name}
          {loading ? <Spinner size="xs" ml="0.5rem" /> : null}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </>
  );
}
