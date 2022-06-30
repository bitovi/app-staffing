import DataTimelineHeader from "./DataTimelineHeader";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useTimeline } from "../../../services/projection";

export default {
  title: "Component/DataTimelineHeader",
  component: DataTimelineHeader,
} as ComponentMeta<typeof DataTimelineHeader>;

export const Basic: ComponentStory<typeof DataTimelineHeader> = ({
  heading,
}) => {
  const { timeline } = useTimeline(new Date());

  return <DataTimelineHeader timeline={timeline} heading={heading} />;
};

Basic.args = {
  heading: "DEPARTMENT",
};
