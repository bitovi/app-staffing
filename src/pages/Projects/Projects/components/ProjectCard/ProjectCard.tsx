import type { Project } from "../../../../../services/api";
import { Link as ReactRouterLink } from "react-router-dom";
import { Flex, Heading, Text, Link } from "@chakra-ui/react";

const ProjectCard = ({ project }: { project: Project }): JSX.Element => {
  return (
    <Flex
      bg="white"
      p="6"
      marginBottom="6"
      alignItems="center"
      boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
    >
      <Heading fontSize="sm" width={400}>
        {project.name}
      </Heading>
      <Text fontSize="xs">{project.description}</Text>
      <Link
        as={ReactRouterLink}
        to={`projects/${project.id}`}
        color="teal.500"
        fontWeight="bold"
      >
        View
      </Link>
    </Flex>
  );
};

export default ProjectCard;
