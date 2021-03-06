import getTimeline, { getMonths, getWeeks } from "./timeline";
import { weeksFixtures, monthFixtures, timeLineFixtures } from "./fixtures";
import { MILLISECOND } from "./constants";

describe("timeline", () => {
  it.each(weeksFixtures)(
    "should get the correct weeks %s",
    ({ date, weeks }) => {
      const timeline = getWeeks(date);
      expect(timeline.length).toBe(weeks.length);

      for (const [index, [start, end]] of weeks.entries()) {
        expect(timeline[index].startDate).toEqual(start);
        expect(timeline[index].endDate).toEqual(
          new Date(end.getTime() - MILLISECOND),
        );
        expect(timeline[index].type).toEqual("week");
      }
    },
  );

  it.each(monthFixtures)(
    "should get the correct months %s",
    ({ date, months }) => {
      const timeline = getMonths(date);
      expect(timeline.length).toBe(months.length);

      for (const [index, [start, end]] of months.entries()) {
        expect(timeline[index].startDate).toEqual(start);
        expect(timeline[index].endDate).toEqual(
          new Date(end.getTime() - MILLISECOND),
        );
        expect(timeline[index].type).toEqual("month");
      }
    },
  );

  it.each(timeLineFixtures)(
    "should get timeline %o",
    ({ date, weeks, months, quarters }) => {
      const timeline = getTimeline(date);

      const tlWeeks = timeline.filter(({ type }) => {
        return type === "week";
      });
      const tlMonths = timeline.filter(({ type }) => {
        return type === "month";
      });
      const tlQuarters = timeline.filter(({ type }) => {
        return type === "quarter";
      });

      expect(tlWeeks.length).toBe(weeks.length);
      expect(tlMonths.length).toBe(months.length);
      expect(tlQuarters.length).toBe(quarters.length);

      for (const [index, [start, end]] of weeks.entries()) {
        expect(tlWeeks[index].startDate).toEqual(start);
        expect(tlWeeks[index].endDate).toEqual(
          new Date(end.getTime() - MILLISECOND),
        );
        expect(tlWeeks[index].type).toEqual("week");
      }

      for (const [index, [start, end]] of months.entries()) {
        expect(tlMonths[index].startDate).toEqual(start);
        expect(tlMonths[index].endDate).toEqual(
          new Date(end.getTime() - MILLISECOND),
        );
        expect(tlMonths[index].type).toEqual("month");
      }

      for (const [index, [start, end]] of quarters.entries()) {
        expect(tlQuarters[index].startDate).toEqual(start);
        expect(tlQuarters[index].endDate).toEqual(
          new Date(end.getTime() - MILLISECOND),
        );
        expect(tlQuarters[index].type).toEqual("quarter");
      }
    },
  );

  it.todo("creates descriptions");
});
