import { Route } from "react-router-dom";

import ProjectDetail from "./ProjectDetail";
import Projects from "./Projects";

export default function ProjectRouter(): JSX.Element {
  return (
    <>
      <Route exact path="/projects">
        <Projects />
      </Route>
      <Route path="/projects/:id">
        <ProjectDetail />
      </Route>
    </>
  );
}
