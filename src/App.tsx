import { Switch, Route } from "react-router-dom";
import Employees from "./components/Employees";

import Layout from "./components/Layout";

import Hello from "./pages/Hello";

export default function App(): JSX.Element {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Hello name="World" />
        </Route>
        <Route path="/employees">
          <Employees />
        </Route>
        <Route>
          <Hello name="Error" />
        </Route>
      </Switch>
    </Layout>
  );
}
