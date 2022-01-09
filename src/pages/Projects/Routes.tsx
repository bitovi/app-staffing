import { lazy } from "react";
import { Route, useRouteMatch } from "react-router-dom";

const Projects = lazy(() => import("./Projects"));
const ProjectDetail = lazy(() => import("./ProjectDetail"));

export default function ProjectRoutes(): JSX.Element {
  const { path } = useRouteMatch();

  return (
    <>
      <Route exact path={path}>
        <Projects />
      </Route>
      <Route path={`${path}/:id`}>
        <ProjectDetail />
      </Route>
    </>
  );
}
