import { Route, HashRouter } from "react-router-dom";

import ProjectDetail from "./ProjectDetail";
import Projects from "./Projects";

export default function ProjectRouter(): JSX.Element {
  return (
    <HashRouter basename="/projects">
      <Route exact path="/">
        <Projects />
      </Route>
      <Route path="/:id">
        <ProjectDetail />
      </Route>
    </HashRouter>
  );
}
