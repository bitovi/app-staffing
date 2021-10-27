import { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

import useDataPreloader from "./useDataPreloader";
import Layout from "./components/Layout";
import Loading from "../pages/Loading";
import Error from "../pages/Error";
import { ProjectRouter } from "../pages/Projects";

import "./App.scss";

const Employees = lazy(() => import("../pages/Employees"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

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
          <ProjectRouter />
          <Route>
            <Error />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}
