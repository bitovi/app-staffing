import { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Loading from "./pages/Loading";

import { ProjectDetail, Projects } from "./pages/Projects";

import "./App.scss";

const Hello = lazy(() => import("./pages/Hello"));
const Employees = lazy(() => import("./pages/Employees"));

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
            <ProjectDetail />
          </Route>
          <Route>
            <Hello name="Error" />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}
