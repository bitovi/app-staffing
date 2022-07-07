import type { ComponentStory, ComponentMeta } from "@storybook/react";

import ErrorBoundary from "./ErrorBoundary";

export default {
  title: "Components/ErrorBoundary",
  component: ErrorBoundary,
} as ComponentMeta<typeof ErrorBoundary>;

const BuggyComponent = () => {
  throw new Error("This component is throwing an error.");
};

export const Basic: ComponentStory<typeof ErrorBoundary> = () => (
  <ErrorBoundary>
    <BuggyComponent />
  </ErrorBoundary>
);
