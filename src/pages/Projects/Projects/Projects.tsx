import { useHistory } from "react-router-dom";
import type { Project } from "../../../services/api";

import ProjectList from "./components/ProjectList";
import { useProjects } from "../../../services/api";
import { useDisclosure } from "@chakra-ui/hooks";
import Button from "../../../components/Button";
// import ProjectDescription from "../components/ProjectDescription";
import Modal from "../../../components/Modal";
import useState from "react";
// import { Button as ChakraButton } from "@chakra-ui/react";
import styles from "./Projects.module.scss";
import { useSetState } from "react-use";

export default function Projects(): JSX.Element {
  const { projects, addProject } = useProjects();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newProject, setNewProject] = useState<Omit<Project, "id">>();

  const addNewProject = async () => {
    const newProjectId = await addProject({
      name: "New Project",
      description: "click to edit",
      roles: [],
    });

    history.push(`/${newProjectId}`);
  };
// TODO: Save the user's entry for project name and description
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement> | ) => {
    if(e.target.name === "name"){
      setNewProject({name: e.target.value, ...newProject});
    } else if (e.target.name === "description") {
      setNewProject({description: e.target.value, ...newProject});
  
    }
  }

  return (
    <div className={styles.wrapper}>
      <Button variant="link" onClick={onOpen}>
        Create a new project
      </Button>
      <ProjectList onAddNew={addNewProject} projects={projects} />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={"Enter Project Name and Description"}
      >
          <div className={styles.projectDescription}>
            <p>Name: </p>
      <input
        className={styles.sectionLabel}
        value={newProject.name}
        name="name"

      />
      <div>
        <p className={styles.sectionLabel}>Description:</p>
        <textarea
          onChange={handleChange}
          value={newProject.description}
          name="description"
        ></textarea>
      </div>
    </div>
    <Button onClick={onClose}>
        Cancel
      </Button>
    <Button onClick={addNewProject}>
        Save 
      </Button>
      </Modal>
    </div>
  );
}
