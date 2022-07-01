import { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Loading from "../pages/Loading";
import Error from "../pages/Error";
import ErrorBoundary from "../components/ErrorBoundary";

import "./App.scss";

const Employees = lazy(() => import("../pages/Employees"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const ProjectRoutes = lazy(() => import("../pages/Projects/Routes"));
const Skills = lazy(() => import("../pages/Skills"));

export default function App(): JSX.Element {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" exact>
            <ErrorBoundary>
              <Dashboard />
            </ErrorBoundary>
          </Route>
          <Route path="/team-members">
            <ErrorBoundary>
              <Employees />
            </ErrorBoundary>
          </Route>
          <Route path="/projects">
            <ErrorBoundary>
              <ProjectRoutes />
            </ErrorBoundary>
          </Route>
          <Route path="/skills">
            <ErrorBoundary>
              <Skills />
            </ErrorBoundary>
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}
