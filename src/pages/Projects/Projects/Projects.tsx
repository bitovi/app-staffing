import { Suspense } from "react";
import { Skeleton, Stack } from "@chakra-ui/react";

import ProjectsHeader from "./components/ProjectsHeader";
import {
  useProjects as defaultUseProjects,
  useProjectMutations as defaultUseProjectMutations,
} from "../../../services/api";
import ProjectList from "./components/ProjectList";

interface ProjectProps {
  useProjects: typeof defaultUseProjects;
  useProjectMutations: typeof defaultUseProjectMutations;
}

export function LoadingProjectList(): JSX.Element {
  return (
    <>
      <ProjectsHeader loading />
      <Stack
        data-testid="loading-projects-skeleton"
        paddingInline="40px"
        marginBottom="40px"
      >
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
  const projects = useProjects({
    include: ["roles.skills", "roles.assignments.employee"],
    sort: "name",
  });
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
