import { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Loading from "./pages/Loading";

import ProjectDetails from "./pages/Projects/components/ProjectDetail";

import "./App.scss";

const Hello = lazy(() => import("./pages/Hello"));
const Employees = lazy(() => import("./pages/Employees"));
const Projects = lazy(() => import("./pages/Projects"));

export default function App(): JSX.Element {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" exact>
            <Hello name="World" />
          </Route>
          <Route path="/employees">
            <Employees />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/project/:id">
            <ProjectDetails />
          </Route>
          <Route>
            <Hello name="Error" />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}
