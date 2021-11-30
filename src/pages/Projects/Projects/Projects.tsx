import Button from "../../../components/Button";
import { Flex, Text } from "@chakra-ui/layout";
import ProjectList from "./components/ProjectList";
import { useProjects as defaultUseProjects } from "../../../services/api";
import { LoadingProjectList } from "./components/LoadingProjectList";
import { ServiceError } from "../../../components/ServiceError";

export default function Projects({
  useProjects = defaultUseProjects,
}: {
  useProjects?: typeof defaultUseProjects;
}): JSX.Element {
  const { projects, isLoading, error } = useProjects();

  return (
    <>
      <Flex
        width="full"
        fontFamily="Arial, Helvetica, sans-serif"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text textStyle="title" color="gray.700" lineHeight="1">
          Projects
        </Text>

        <Button
          size="lg"
          variant="primary"
          onClick={() => null} // Need to pass in an actual function here
          arialabel="Add Employee"
        >
          Add A Project
        </Button>
      </Flex>

      {isLoading ? (
        <LoadingProjectList />
      ) : error ? (
        <ServiceError />
      ) : (
        <ProjectList mt="48px" projects={projects} />
      )}
    </>
  );
}
