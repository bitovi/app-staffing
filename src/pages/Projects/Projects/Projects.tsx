import { LoadingProjectList } from "./components/LoadingProjectList";
import ProjectList from "./components/ProjectList";
import { ServiceError } from "../../../components/ServiceError";
import { useProjects as defaultUseProjects } from "../../../services/api";
import ProjectsHeader from "./components/ProjectsHeader/ProjectsHeader";

export default function Projects({
  useProjects = defaultUseProjects,
}: {
  useProjects?: typeof defaultUseProjects;
}): JSX.Element {
  const { projects, isLoading, error } = useProjects();

  return (
    <>
      <ProjectsHeader loading={isLoading} />

      {isLoading ? (
        <LoadingProjectList />
      ) : error ? (
        <ServiceError />
      ) : (
        <div>
          <ProjectList projects={projects} />
        </div>
      )}
    </>
  );
}
