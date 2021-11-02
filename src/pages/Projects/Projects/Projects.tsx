import { Suspense } from "react";
import ProjectList from "./components/ProjectList";
import { useProjects as defaultUseProjects } from "../../../services/api";
import { LoadingProjectList } from "./components/LoadingProjectList";

export default function Projects({
  useProjects = defaultUseProjects,
}: {
  useProjects?: typeof defaultUseProjects;
}): JSX.Element {
  const { projects } = useProjects();

  return (
    <>
      <Suspense fallback={<LoadingProjectList />}>
        <ProjectList projects={projects} />
      </Suspense>
    </>
  );
}
