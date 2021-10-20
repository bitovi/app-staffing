import { lazy, Suspense } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import Loading from "../Loading";

const Projects = lazy(() => import("./Projects"));
const ProjectDetail = lazy(() => import("./ProjectDetail"));

export default function ProjectRouter(): JSX.Element {

  const { path } = useRouteMatch();

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path={path} component={Projects} />
        <Route path={`${path}/:id`} component={ProjectDetail} />
      </Switch>
    </Suspense>
  );
}
