import type { ComponentStory, ComponentMeta } from "@storybook/react";
import type { TimelineRange } from ".";

import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/layout";
import { Grid } from "@chakra-ui/react";

import { DatePicker } from "../../../components/DatePicker";
import Text from "../../../components/Typography/Heading";

import { MIN_AMOUNT_MONTHS_SHOWN, MIN_AMOUNT_WEEKS_SHOWN } from "./constants";
import getTimeline from ".";

const TimelineDateDisplay = ({
  startDate,
  endDate,
  type,
  index,
}: TimelineRange & { index: number }) => {
  return (
    <>
      <Flex alignItems="center" m="2">
        <Flex mr="5">{`${type} ${index + 1}`}</Flex>
        <Flex direction="column">
          <p>Start: {startDate.toDateString()} </p>
          <p>End: {endDate.toDateString()}</p>
        </Flex>
      </Flex>
      <hr />
    </>
  );
};

const TimelineContainer = ({
  minimumWeeksShown,
  minimumMonthsShown,
}: {
  minimumWeeksShown: number;
  minimumMonthsShown: number;
}): JSX.Element => {
  const [date, setDate] = useState(new Date());
  const [timeline, setTimeline] = useState<TimelineRange[]>([]);

  useEffect(() => {
    setTimeline(getTimeline(date, { minimumWeeksShown, minimumMonthsShown }));
  }, [minimumMonthsShown, minimumWeeksShown, date]);

  const weeks = timeline.filter(({ type }) => {
    return type === "week";
  });
  const months = timeline.filter(({ type }) => {
    return type === "month";
  });
  const quarters = timeline.filter(({ type }) => {
    return type === "quarter";
  });

  return (
    <div>
      <Text variant="h2" my="4">
        Select a Date.
      </Text>
      <blockquote>
        Note: the controls work, but are limited. right now the maximum number
        of weeks shown will be 6 and the maximum number of months shown will be
        4 due to how the logic is currently implemented
      </blockquote>
      <DatePicker
        selectedDate={date}
        label="Pick a date to regenerate the timeline"
        onChange={setDate}
      />
      <Flex direction="column" my="6">
        Summary:
        <hr />
        {timeline.length > 0 && (
          <p>
            {`Goes from ${timeline[0].startDate.toDateString()} until ${timeline[
              timeline.length - 1
            ].endDate.toDateString()}`}{" "}
          </p>
        )}
        <p>{`weeks: ${weeks.length}`}</p>
        <p>{`months: ${months.length}`}</p>
        <p>{`quarters: ${quarters.length}`}</p>
      </Flex>
      Break Down:
      <hr />
      <Grid templateColumns="repeat(3, 1fr)" gap="6">
        <div>
          {weeks.map((timelineData, i) => {
            return <TimelineDateDisplay key={i} index={i} {...timelineData} />;
          })}
        </div>
        <div>
          {months.map((timelineData, i) => {
            return <TimelineDateDisplay key={i} index={i} {...timelineData} />;
          })}
        </div>
        <div>
          {quarters.map((timelineData, i) => {
            return <TimelineDateDisplay key={i} index={i} {...timelineData} />;
          })}
        </div>
      </Grid>
    </div>
  );
};

export default {
  title: "API/Timeline",
  component: TimelineContainer,
} as ComponentMeta<typeof TimelineContainer>;

export const Standard: ComponentStory<typeof TimelineContainer> = (props) => (
  <TimelineContainer {...props} />
);

Standard.args = {
  minimumWeeksShown: MIN_AMOUNT_WEEKS_SHOWN,
  minimumMonthsShown: MIN_AMOUNT_MONTHS_SHOWN,
};
