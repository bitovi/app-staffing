import type { Project, ResponseStatus } from "../../../services/api";
import { useHistory } from "react-router-dom";
import ListProjects from "../components/ListProjects";
import {
  useProjects as useProjectsDefault,
  ProjectActions,
} from "../../../services/api";
import styles from "./Projects.module.scss";
import { Skeleton } from "@chakra-ui/react";
import { QueriableList } from "../../../services/api/shared";

export default function Projects({
  useProjects = useProjectsDefault,
}: {
  useProjects?: (
    queryParams?: QueriableList<Project> | undefined,
  ) => ResponseStatus & ProjectActions;
}): JSX.Element {
  const { projects, addProject, isLoading } = useProjects();
  const history = useHistory();

  const addNewProject = async () => {
    const newProjectId = await addProject({
      name: "New Project",
      description: "click to edit",
      roles: [],
    });

    history.push(`/projects/${newProjectId}`);
  };

  const editProject = (project: Project) => {
    history.push(`/projects/${project.id}`);
  };

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Skeleton data-testid="projects-loading-skeleton" height="50px" />
      ) : (
        <ListProjects
          onAddNew={addNewProject}
          onView={editProject}
          projects={projects}
        />
      )}
    </div>
  );
}
