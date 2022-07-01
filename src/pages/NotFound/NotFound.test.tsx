import { BrowserRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Link, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NotFound from "./NotFound";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/me">Click Me!</Link>
          </li>
        </ul>
      </nav>
      <div>
        <Route path="/" exact>
          <h2>Home page</h2>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </div>
    </div>
  );
}

test("should redirect and update history", () => {
  const history = createMemoryHistory();

  render(
    <Router history={history}>
      <App />
    </Router>,
  );

  userEvent.click(screen.getByText(/Click Me!/));

  expect(history.location.pathname).toEqual("/me");
});

test("should redirect and update dom and show error not found page", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  userEvent.click(screen.getByText(/Click Me!/));

  expect(screen.getByText(/404 PAGE NOT FOUND/i)).toBeInTheDocument();
});
