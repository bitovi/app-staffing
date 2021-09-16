import { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Loading from "./pages/Loading";
import { ProjectRouter } from "./pages/Projects";

import "./App.scss";

const Hello = lazy(() => import("./pages/Hello"));
const Employees = lazy(() => import("./pages/Employees"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const DataLoader = lazy(() => import("./components/DataLoader"));

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
          <ProjectRouter />
          <Route>
            <Hello name="Error" />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}
