import { useDisclosure } from "@chakra-ui/hooks";
import { Flex } from "@chakra-ui/layout";
import Button from "../../../components/Button";
import { useProjects } from "../../../services/api";
import AddProjectModal from "./components/AddProjectModal";
import ProjectList from "./components/ProjectList";

export default function Projects(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { projects } = useProjects();

  return (
    <>
      <Flex justifyContent="flex-end">
        <Button variant="primary" onClick={onOpen}>
          Create a new project
        </Button>
      </Flex>
      <ProjectList projects={projects} />
      <AddProjectModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
