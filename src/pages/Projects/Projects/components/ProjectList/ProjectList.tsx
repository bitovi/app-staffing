import styles from "./ProjectList.module.scss";
import { Project } from "../../../../../services/api";
import ProjectCard from "../ProjectCard";
// import Button from "../../../../../components/Button";
// import Modal from "../../../../../components/Modal";
// import { useDisclosure } from "@chakra-ui/hooks";
// import ProjectDescription from "../../../components/ProjectDescription";
// import { useState } from "react";
export default function Projects({
  onAddNew,
  projects,
}: {
  onAddNew: () => void;
  projects?: Project[];
}): JSX.Element {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // onClick will open modal
  // modal will render ProjectDescription as it's children
  // The save button of the modal will first invoke onAddNew, then close the modal
  // After the modal closes, the page should be on the project's descripton page
  
  return (
    <div className={styles.container}>


      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
