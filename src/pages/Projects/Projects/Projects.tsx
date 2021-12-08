import BreadCrumb from "../../../components/Breadcrumb/Breadcrumb";
import { LoadingProjectList } from "./components/LoadingProjectList";
import ProjectList from "./components/ProjectList";
import { ServiceError } from "../../../components/ServiceError";
import { useProjects as defaultUseProjects } from "../../../services/api";

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
        <div>
          <BreadCrumb />
          <ProjectList mt="48px" projects={projects} />
        </div>
      )}
    </>
  );
}
