import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import BreadCrumb from "./Breadcrumb";
import { ChevronRightIcon } from "@chakra-ui/icons";

export default {
  title: "Components/Breadcrumb",
  component: BreadCrumb,
} as ComponentMeta<typeof BreadCrumb>;

export const Basic: ComponentStory<typeof BreadCrumb> = () => (
  <Breadcrumb
    fontWeight="medium"
    fontSize="sm"
    separator={<ChevronRightIcon />}
  >
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem>
      <BreadcrumbLink href="#">Projects</BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem isCurrentPage>
      <BreadcrumbLink href="#">Nike Store</BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
);
