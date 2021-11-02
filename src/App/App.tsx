import { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

import useDataPreloader from "./useDataPreloader";
import Layout from "./components/Layout";
import Loading from "../pages/Loading";
import Error from "../pages/Error";

import "./App.scss";

const Employees = lazy(() => import("../pages/Employees"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const ProjectRoutes = lazy(() => import("../pages/Projects/Routes"));
// const Projects = lazy(() => import("../pages/Projects/Projects"));

export default function App(): JSX.Element {
  useDataPreloader();

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" exact>
            <Dashboard />
          </Route>
          <Route path="/team-members">
            <Employees />
          </Route>
          <Route path="/projects">
            {/* <Projects /> */}
            <ProjectRoutes />
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}
