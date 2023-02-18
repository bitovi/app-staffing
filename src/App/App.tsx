import { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Loading from "../pages/Loading";
import NotFound from "../pages/NotFound";
import ErrorBoundary from "../components/ErrorBoundary";

import "./App.scss";

const Employees = lazy(() => import("../pages/Employees"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const ProjectRoutes = lazy(() => import("../pages/Projects/Routes"));
const Skills = lazy(() => import("../pages/Skills"));
const EmployeesListPage = lazy(() => import("../scaffold/app/Employees"));
const SkillsListPage = lazy(() => import("../scaffold/app/Skills"));

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
          <Route path="/legacy/team-members">
            <ErrorBoundary>
              <Employees />
            </ErrorBoundary>
          </Route>
          <Route path="/team-members">
            <ErrorBoundary>
              <EmployeesListPage />
            </ErrorBoundary>
          </Route>
          <Route path="/projects">
            <ErrorBoundary>
              <ProjectRoutes />
            </ErrorBoundary>
          </Route>
          <Route path="/legacy/skills">
            <ErrorBoundary>
              <Skills />
            </ErrorBoundary>
          </Route>
          <Route path="/skills">
            <ErrorBoundary>
              <SkillsListPage />
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
