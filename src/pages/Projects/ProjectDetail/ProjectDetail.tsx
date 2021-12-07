import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link , useParams } from "react-router-dom";
import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import type { Project } from "../../../services/api";
import { useProjects } from "../../../services/api";
import ProjectDeleteButton from "../components/ProjectDeleteButton";
import ProjectDescription from "../components/ProjectDescription";
import RoleList from "../components/RoleList";

export default function ProjectDetail(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { projects, updateProject } = useProjects();

  const [projectData, setProjectData] = useState<Project | undefined>(
    projects?.find((p) => p.id === id),
  );

  useEffect(() => {
    if (!projects) return;

    setProjectData(projects.find((p) => p.id === id));
  }, [projects, id]);

  const onSave = (project: Project) => {
    updateProject(project.id, project);
  };

  return (
    <div>
      {projectData && (
        <>
        <Breadcrumb fontWeight="medium" fontSize="sm" separator={<ChevronRightIcon/>}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to={"/"}>Home</BreadcrumbLink>
        </BreadcrumbItem>
      
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to={"/projects"}>Projects</BreadcrumbLink>
        </BreadcrumbItem>
      
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink as={Link} to={"#"}>{projectData.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

          <ProjectDescription onEdit={onSave} project={projectData} />
          <RoleList onEdit={onSave} project={projectData} />
          <Box mt={10}>
            <ProjectDeleteButton
              projectName={projectData.name}
              projectId={projectData.id}
            />
          </Box>
        </>
      )}
    </div>
  );
}
