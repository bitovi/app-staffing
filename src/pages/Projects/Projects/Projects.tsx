import { Suspense } from "react";
import { Skeleton, Stack } from "@chakra-ui/react";

import ProjectsHeader from "./components/ProjectsHeader";
import {
  useProjects as defaultUseProjects,
  useProjectMutations as defaultUseProjectMutations,
  Project,
} from "../../../services/api";
import ProjectList from "./components/ProjectList";

interface ProjectProps {
  useProjects: typeof defaultUseProjects;
  useProjectMutations: typeof defaultUseProjectMutations;
}

const mockEndDate = "8/24/22";
const mockStartDate = "8/1/22";
const mockRole = {
  assignments: [
    {
      employee: {
        assignments: ["1234"],
        endDate: new Date(mockEndDate),
        id: "5555",
        name: "Jimmy Smitts",
        skills: [{ id: "1002", name: "React" }],
        startDate: new Date(mockStartDate),
      },
      endConfidence: 0.6,
      endDate: new Date(mockEndDate),
      id: "9876",
      project: {
        descrption:
          "blah blah this is a description of the project. we're going to do wthings and maybe write some code, who knows",
        id: "5353",
        name: "Andrews Test Project",
      },
      skills: [{ id: "1002", name: "React" }],
      startConfidence: 0.9,
      startDate: new Date(mockStartDate),
    },
  ],
};

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
