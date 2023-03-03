import { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Loading from "../pages/Loading";
import NotFound from "../pages/NotFound";
import ErrorBoundary from "../components/ErrorBoundary";

import "./App.scss";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const ProjectRoutes = lazy(() => import("../pages/Projects/Routes"));
const EmployeesList = lazy(() => import("../scaffold/app/Employees/List"));
const EmployeeDetails = lazy(() => import("../scaffold/app/Employees/Details"));
const SkillsList = lazy(() => import("../scaffold/app/Skills"));

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
          <Route path="/team-members/:id">
            <ErrorBoundary>
              <EmployeeDetails />
            </ErrorBoundary>
          </Route>
          <Route path="/team-members">
            <ErrorBoundary>
              <EmployeesList />
            </ErrorBoundary>
          </Route>
          <Route path="/projects">
            <ErrorBoundary>
              <ProjectRoutes />
            </ErrorBoundary>
          </Route>
          <Route path="/skills">
            <ErrorBoundary>
              <SkillsList />
            </ErrorBoundary>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}
