import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import Button from "../../../../components/Button";
import { NewSkill } from "../../../../services/api";

interface SkillsHeaderProps {
  createSkill?: (skill: NewSkill) => void;
}

export default function SkillsHeader({
  createSkill,
}: SkillsHeaderProps): JSX.Element {
  const { onOpen } = useDisclosure();

  return (
    <Box
      position="sticky"
      top="0"
      background="gray.10"
      padding="40px"
      paddingBottom="1em"
      zIndex="10"
    >
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
            Skills
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Flex
        width="full"
        fontFamily="Arial, Helvetica, sans-serif"
        display="flex"
        justifyContent="space-between"
      >
        <Heading as="h1" textStyle="title" color="gray.700">
          Skills
        </Heading>

        <Button size="lg" variant="primary" onClick={onOpen}>
          Add Skill
        </Button>
      </Flex>
    </Box>
  );
}
