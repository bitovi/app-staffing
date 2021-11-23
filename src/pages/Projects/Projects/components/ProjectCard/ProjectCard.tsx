import { Text } from "@chakra-ui/layout";
import {
  Link,
  Td,
  Tr,
} from "@chakra-ui/react";
import type { Project } from "../../../../../services/api";
import { Link as ReactRouterLink } from "react-router-dom";

const ProjectCard = ({
  project
}: {
  project: Project
}): JSX.Element => {
  return (
    <>
      <Tr
        alignItems="center"
        backgroundColor="white"
        boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
        border="2px solid #f2f2f2"
      >
        <Td
          pt="21px"
          px="25px"
          pb="34px"
        >
          <Text
            color="black"
            fontWeight="700"
            fontSize="18px"
            lineHeight="29.5px"
            letterSpacing="0.33px"
          >
            {project.name}
          </Text>
        </Td>
        <Td
          pt="21px"
          px="25px"
          pb="34px"
        >
          <Text
            color="black"
            fontWeight="400"
            fontSize="14px"
            lineHeight="20px"
            letterSpacing="0.25px"
          >
            {project.description}
          </Text>
        </Td>
        <Td
          pt="21px"
          px="25px"
          pb="34px"
        >
          <Link
            as={ReactRouterLink}
            to={`projects/${project.id}`}
            color="teal.500"
            fontWeight="bold"
          >
            View
          </Link>
        </Td>
      </Tr>
    </>
  );
};

export default ProjectCard;
