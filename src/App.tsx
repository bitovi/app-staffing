import { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Loading from "./pages/Loading";
import Error from "./pages/Error";
import DataLoader from "./services/DataLoader";

import "./App.scss";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Employees = lazy(() => import("./pages/Employees"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Projects = lazy(() => import("./pages/Projects"));

export default function App(): JSX.Element {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <DataLoader />
        <Switch>
          <Route path="/" exact>
            <Dashboard />
          </Route>
          <Route path="/employees">
            <Employees />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/projects/:id">
            <ProjectDetail />
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}
