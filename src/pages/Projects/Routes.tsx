import { lazy } from "react";
import { Route, useRouteMatch } from "react-router-dom";
// import Loading from "../Loading";
// import { LoadingProjectList } from "./Projects/components/LoadingProjectList";

import { useProjects } from "../../services/api";

const Projects = lazy(() => import("./Projects"));
const ProjectDetail = lazy(() => import("./ProjectDetail"));

export default function ProjectRoutes(): JSX.Element {
  const { path } = useRouteMatch();

  return (
    <>
      {/* // <Suspense fallback={<Loading />}> */}
      <Route exact path={path}>
        <Projects useProjects={useProjects} />
      </Route>
      <Route path={`${path}/:id`}>
        <ProjectDetail />
      </Route>
    </>
  );
}
