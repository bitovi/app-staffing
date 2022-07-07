import { Link as ReactRouterLink } from "react-router-dom";
import { Text } from "@chakra-ui/layout";
import { Link, Box, Flex } from "@chakra-ui/react";
import { skillBackgrounds } from "../../../pages/Dashboard/components/ReportTable/TableRow/TableRow";
import Badge from "../../Badge";
import { Project } from "../../../services/api";

interface PropjectCardProps {
  project: Project;
  columnCount?: number;
}

const DataTableBody = ({
  project,
  columnCount = 10,
}: PropjectCardProps): JSX.Element => {
  const columnArray: boolean[] = [];

  for (let i = 0; i < columnCount; i++) {
    columnArray.push(true);
  }

  return (
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
          to={`/projects/${project.id}`}
          as={ReactRouterLink}
          color="teal.500"
          fontWeight="bold"
          textDecoration="underline"
          _hover={{ textDecoration: "none" }}
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
                {columnArray.map((item: boolean, index: number) => (
                  <Box
                    textAlign="center"
                    alignSelf="stretch"
                    backgroundColor={
                      index % 2 === 0 ? "rgba(0,0,0,.04)" : "transparent"
                    }
                    flex="1"
                    key={`${!!item}=${index}`}
                  ></Box>
                ))}
              </Flex>
            ))}
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default DataTableBody;