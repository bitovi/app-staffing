import { Suspense, useEffect, useMemo, useState } from "react";
import { Skeleton, Stack } from "@chakra-ui/react";

import ProjectsHeader from "./components/ProjectsHeader";
import {
  useProjects as defaultUseProjects,
  useProjectMutations as defaultUseProjectMutations,
} from "../../../services/api";
import ProjectList from "./components/ProjectList";
import { orderBy } from "lodash";
import { useSort } from "../../../services/helpers/useSort/useSort";

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
  const [filters, setFilters] = useState<string[]>([]);
  const { createProject } = useProjectMutations();

  const { sortData, updateSortData } = useSort();

  const projectsFetched = useProjects({
    include: ["roles.skills", "roles.assignments.employee"],
  });

  const projects = useMemo(() => {
    return orderBy(projectsFetched, [sortData.iteratee], [sortData.order]);
  }, [sortData]);

  return (
    <>
      <ProjectsHeader
        addProject={createProject}
        changeSort={updateSortData}
        sortData={sortData}
        onFilterChange={(arr: string[]) => setFilters(arr)}
      />
      <ProjectList projects={projects} filters={filters} />
    </>
  );
}

export default function ProjectsWrapper(): JSX.Element {
  useEffect(() => {
    document.title = "Projects - Staffing App";
  }, []);

  return (
    <Suspense fallback={<LoadingProjectList />}>
      <Projects
        useProjects={defaultUseProjects}
        useProjectMutations={defaultUseProjectMutations}
      />
    </Suspense>
  );
}
