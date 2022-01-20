import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const EmployeesBreadcrumbs = (): JSX.Element => {
  return (
    <Breadcrumb
      spacing="8px"
      marginBottom="16px"
      fontSize="14px"
      color="gray.500"
      separator={<ChevronRightIcon />}
    >
      <BreadcrumbItem>
        <BreadcrumbLink href="/" data-testid="homeBreadcrumb">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage color="gray.800">
        <BreadcrumbLink
          data-testid="employeesBreadcrumb"
          cursor="default"
          _hover={{ textDecoration: "none" }}
        >
          Team Members
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default EmployeesBreadcrumbs;
