import { render, screen } from "@testing-library/react";

import ErrorBoundary from "./ErrorBoundary";

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

    const errorMessage = screen.getByText(
      "Sorry... there was an error.",
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
