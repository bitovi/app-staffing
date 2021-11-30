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
