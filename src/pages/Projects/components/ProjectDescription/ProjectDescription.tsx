import type { Project } from "../../../../services/api";
import { Text } from "@chakra-ui/react";

export default function ProjectDescription({
  project,
}: {
  project: Project;
}): JSX.Element {
  return <Text name="project-description">{project.description}</Text>;
}
