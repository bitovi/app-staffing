import { Suspense, useEffect, useMemo, useState } from "react";
import { Skeleton, Stack } from "@chakra-ui/react";

import ProjectsHeader from "./components/ProjectsHeader";
import {
  useProjects as defaultUseProjects,
  useProjectMutations as defaultUseProjectMutations,
} from "../../../services/api";
import ProjectList from "./components/ProjectList";
import { orderBy } from "lodash";

interface ProjectProps {
  useProjects: typeof defaultUseProjects;
  useProjectMutations: typeof defaultUseProjectMutations;
}

export interface sortData {
  iteratee: string;
  order: "desc" | "asc" | boolean;
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

  const [sortData, setSortData] = useState<sortData>({
    iteratee: "name",
    order: "desc",
  });

  const projectsFetched = useProjects({
    include: ["roles.skills", "roles.assignments.employee"],
  });

  const projects = useMemo(() => {
    return orderBy(projectsFetched, [sortData.iteratee], [sortData.order]);
  }, [sortData]);

  function updateSortData(field: string) {
    if (!sortData || sortData.iteratee !== field) {
      // if no current sort data or new sort option, set to clicked column
      setSortData({ iteratee: field, order: "desc" });
    } else if (sortData.iteratee === field) {
      // if sort data is the same field as clicked column,
      // switch to descending order,
      // remove if already descending order
      if (sortData.order === "desc") {
        setSortData((sortData) => ({
          iteratee: sortData.iteratee,
          order: "asc",
        }));
      } else {
        setSortData({ iteratee: "", order: false });
      }
    }
  }

  return (
    <>
      <ProjectsHeader
        addProject={createProject}
        changeSort={updateSortData}
        sortData={sortData}
      />
      <ProjectList projects={projects} />
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
