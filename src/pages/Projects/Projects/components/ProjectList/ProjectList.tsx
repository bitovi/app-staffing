import { Box, BoxProps, Flex, Link, Text } from "@chakra-ui/react";
import { FolderWithFilesIcon } from "../../../../assets/Icons";
import { Link as ReactRouterLink } from "react-router-dom";
import ProjectCard from "../ProjectCard";
import { Project } from "../../../../../services/api";
import { skillBackgrounds } from "../../../../Dashboard/components/ReportTable/TableRow/TableRow";
import Badge from "../../../../../components/Badge";
interface ProjectListProps extends BoxProps {
  projects: Project[] | undefined;
}

export default function ProjectList({
  projects,
  ...rest
}: ProjectListProps): JSX.Element {
  return (
    <>
      <Box {...rest}>
        {projects && projects.length === 0 && (
          <Flex
            width="100%"
            flexDirection="column"
            minHeight="30px"
            boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
            backgroundColor="white"
            padding="82px 30px 153px"
            border="1px solid #eee"
            borderRadius="4px"
            alignItems="center"
          >
            <FolderWithFilesIcon height="100" width="100" />
            <Text fontWeight="bold" fontSize="16px" lineHeight="24px">
              There are currently no projects available.
            </Text>
          </Flex>
        )}

        {projects && projects?.length > 0 && (
          <Box>
            <Flex>{/* TODO sticky header goes here */}</Flex>
            <Flex flexDirection="column">
              {projects?.length &&
                projects.map((project) => (
                  <Box
                    backgroundColor="#FFFFFF"
                    borderRadius="4px"
                    boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
                    key={project.id}
                    margin="15px 51px"
                  >
                    <Flex
                      backgroundColor="#EDF2F7"
                      borderRadius="4px 4px 0px 0px"
                      justify="space-between"
                      padding="6px 10px"
                    >
                      <Text fontWeight="600">{project.name}</Text>
                      <Link
                        to={`projects/${project.id}`}
                        as={ReactRouterLink}
                        color="teal.500"
                        fontWeight="bold"
                      >
                        View Project Detail
                      </Link>
                    </Flex>
                    <Flex direction="column">
                      {project?.roles?.map((role) => (
                        <Box key={role.id}>
                          {role?.skills?.map((skill) => (
                            <Flex
                              alignItems="center"
                              borderBottom="1px solid rgba(0, 0, 0, 0.04)"
                              key={skill.id}
                              minHeight="50px"
                            >
                              <Flex
                                alignItems="center"
                                alignSelf="stretch"
                                flex="0 1 150px"
                                justify="center"
                                padding="0 16px"
                              >
                                <Badge
                                  background={skillBackgrounds[skill.name]}
                                  display="flex"
                                  isTruncated={false}
                                  maxWidth="100px"
                                  size="sm"
                                  textAlign="center"
                                  whiteSpace="break-spaces"
                                >
                                  {skill.name}
                                </Badge>
                              </Flex>
                            </Flex>
                          ))}
                        </Box>
                      ))}
                    </Flex>
                  </Box>
                ))}
            </Flex>
          </Box>
        )}
      </Box>
    </>
  );
}

export const ProjectListRow = ({
  project,
  children,
}: {
  project: Project;
  children: JSX.Element | boolean;
}): JSX.Element => {
  return (
    <>
      <ProjectCard project={project} />
      {children}
    </>
  );
};
