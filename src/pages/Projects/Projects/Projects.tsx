import { useHistory } from "react-router-dom";
import { Suspense } from "react";
import ProjectList from "./components/ProjectList";
import { useProjects as defaultUseProjects } from "../../../services/api";
import { LoadingProjectList } from "./components/LoadingProjectList";

// import styles from "./Projects.module.scss";

export default function Projects({
  useProjects = defaultUseProjects,
}: {
  useProjects?: typeof defaultUseProjects;
}): JSX.Element {
  const { projects, addProject } = useProjects();
  const history = useHistory();

  const addNewProject = async () => {
    const newProjectId = await addProject({
      name: "New Project",
      description: "click to edit",
      roles: [],
    });

    history.push(`/projects/${newProjectId}`);
  };

  return (
    <>
      {/* <ProjectsHeader></ProjectsHeader> */}

      <Suspense fallback={<LoadingProjectList />}>
        <ProjectList onAddNew={addNewProject} projects={projects} />
      </Suspense>
    </>
  );
}
