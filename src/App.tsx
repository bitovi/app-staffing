import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Hello from "./pages/Hello";

export default function App(): JSX.Element {
  return (
    <Layout>
      <Switch>
        <Route path="/">
          <Hello name="World" />
        </Route>
        <Route path="/bob">
          <Hello name="Bob" />
        </Route>
      </Switch>
    </Layout>
  );
}
