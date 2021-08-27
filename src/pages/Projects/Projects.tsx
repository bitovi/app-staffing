import ProjectCard from "./components/ProjectCard";

import { useProjects } from "../../services/api";

import styles from "./Projects.module.scss";

export default function Projects(): JSX.Element {
  const { data: projects } = useProjects();

  return (
    <div className={styles.wrapper}>
      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
