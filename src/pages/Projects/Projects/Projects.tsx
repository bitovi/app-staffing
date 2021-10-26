import { Flex } from "@chakra-ui/layout";
import { useProjects } from "../../../services/api";
import ProjectAddButton from "./components/ProjectAddButton";
import ProjectList from "./components/ProjectList";

export default function Projects(): JSX.Element {
  const { projects } = useProjects();

  return (
    <>
      <Flex justifyContent="flex-end">
        <ProjectAddButton />
      </Flex>
      <ProjectList projects={projects} />
    </>
  );
}
