import { Text } from "@chakra-ui/layout";
import {
  Link,
  Td,
  Tr,
} from "@chakra-ui/react";
import type { Project } from "../../../../../services/api";
import { Link as ReactRouterLink } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({
  project
}: ProjectCardProps): JSX.Element => {
  return (
    <>
      <Tr
        p="16px"
        alignItems="center"
        backgroundColor="white"
        boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
      >
        <Td>
          <Text
            color="gray.600"
            fontWeight="600"
            fontSize="16px"
            lineHeight="20px"
            letterSpacing="0.25px"
          >
            {project.name}
          </Text>
        </Td>
        <Td>
          <Text
            color="gray.600"
            fontWeight="400"
            fontSize="14px"
            lineHeight="20px"
            letterSpacing="0.25px"
          >
            {project.description}
          </Text>
        </Td>
        <Td>
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
