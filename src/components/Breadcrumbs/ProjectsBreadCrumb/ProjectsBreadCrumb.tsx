import { BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

export default function ProjectsBreadCrumb({
  loading,
}: {
  loading?: boolean;
}): JSX.Element {
  return (
    <>
      <BreadcrumbItem
        isCurrentPage={loading ? true : false}
        color={loading ? "" : "gray.800"}
      >
        <BreadcrumbLink href="/projects" data-testid="projectsBreadcrumb">
          Projects
        </BreadcrumbLink>
      </BreadcrumbItem>
    </>
  );
}
