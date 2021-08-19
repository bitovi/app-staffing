import React, { Suspense } from "react";

import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";
import "./App.css";

import Loading from "./components/Loading";

const Hello = React.lazy(() => import("./pages/Hello"));

export default function App(): JSX.Element {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" exact>
            <Hello name="World" />
          </Route>
          <Route path="/bob">
            <Hello name="Bob" />
          </Route>
          <Route path="/dylan">
            <Hello name="Dylan" />
          </Route>
          <Route>
            <Hello name="Error" />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}
