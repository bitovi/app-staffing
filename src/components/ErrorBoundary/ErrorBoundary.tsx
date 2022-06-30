import React, { Component, ReactNode } from "react";
import AlertBar from "../AlertBar";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.state?.error?.message) {
        return (
          <AlertBar description={this.state.error.message} status="error" />
        );
      }

      return <h1>Sorry... there was an error</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
