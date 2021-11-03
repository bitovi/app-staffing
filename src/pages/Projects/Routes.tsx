import { lazy } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { useProjects } from "../../services/api";

const Projects = lazy(() => import("./Projects"));
const ProjectDetail = lazy(() => import("./ProjectDetail"));

export default function ProjectRoutes(): JSX.Element {
  const { path } = useRouteMatch();

  return (
    <>
      <Route exact path={path}>
        <Projects useProjects={useProjects} />
      </Route>
      <Route path={`${path}/:id`}>
        <ProjectDetail />
      </Route>
    </>
  );
}
