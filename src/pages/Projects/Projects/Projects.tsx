import { Suspense } from "react";
import { Skeleton, Stack } from "@chakra-ui/react";

import ProjectsHeader from "./components/ProjectsHeader";
import ProjectList from "./components/ProjectList";
import {
  useProjects as defaultUseProjects,
  useProjectMutations as defaultUseProjectMutations,
} from "../../../services/api";

interface ProjectProps {
  useProjects: typeof defaultUseProjects;
  useProjectMutations: typeof defaultUseProjectMutations;
}

function LoadingProjectList(): JSX.Element {
  return (
    <>
      {/* TODO: pull out loading from header to add to skeleton */}
      <ProjectsHeader loading />
      <Stack data-testid="loading-projects-skeleton">
        <Skeleton height="55px" />
        <Skeleton height="55px" />
        <Skeleton height="55px" />
        <Skeleton height="55px" />
      </Stack>
    </>
  );
}

export function Projects({
  useProjects = defaultUseProjects,
  useProjectMutations = defaultUseProjectMutations,
}: ProjectProps): JSX.Element {
  const { createProject } = useProjectMutations();
  const projects = useProjects();

  return (
    <>
      <ProjectsHeader addProject={createProject} />
      <ProjectList projects={projects} />
    </>
  );
}

export default function ProjectsWrapper(): JSX.Element {
  return (
    <Suspense fallback={<LoadingProjectList />}>
      <Projects
        useProjects={defaultUseProjects}
        useProjectMutations={defaultUseProjectMutations}
      />
    </Suspense>
  );
}
