import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

type BreadcrumbProps = {
  name?: string;
};

export default function BreadCrumb({ name }: BreadcrumbProps): JSX.Element {
  return (
    <>
      {name ? (
        <div>
          <Breadcrumb
            fontWeight="medium"
            fontSize="sm"
            separator={<ChevronRightIcon />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to={"/"}>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to={"/projects"}>
                Projects
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink as={Link} to={"#"}>
                {name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      ) : (
        <div>
          <Breadcrumb
            fontWeight="medium"
            fontSize="sm"
            separator={<ChevronRightIcon />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to={"/"}>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to={"/projects"}>
                Projects
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      )}
    </>
  );
}
