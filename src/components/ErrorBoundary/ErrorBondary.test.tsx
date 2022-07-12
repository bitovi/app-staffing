import { BrowserRouter, Switch, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import ErrorBoundary from "./ErrorBoundary";
import NotFound from "../../pages/NotFound";

describe("Components/ErrorBoundary", () => {
  it("should show error message", () => {
    const BuggyComponent = () => {
      throw new Error("This component is throwing an error.");
    };

    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>,
    );

    const errorMessage = screen.getByText(
      "This component is throwing an error.",
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("should show default error message", () => {
    const BuggyComponent = () => {
      throw new Error();
    };

    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>,
    );

    const errorMessage = screen.getByText("Sorry... there was an error.");
    expect(errorMessage).toBeInTheDocument();
  });

  describe("should redirect to '404 Page Not Found", () => {
    it("when error message contains 'An error occurred while fetching: GET /projects/'", () => {
      const ProjectErrorComponent = () => {
        throw new Error(
          "An error occurred while fetching: GET /projects/ripproject",
        );
      };

      const { getByText } = render(
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <ErrorBoundary>
                <ProjectErrorComponent />
              </ErrorBoundary>
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </BrowserRouter>,
      );

      expect(getByText("404 PAGE NOT FOUND")).toBeInTheDocument();
    });
  });
});
