import { getMonths, getWeeks, TimescaleType } from "./timeline";
import { weeksFixtures, monthFixtures } from "./fixtures";

describe("timeline", () => {
  it.each(weeksFixtures)(
    "should get the correct weeks %s",
    ({ date, weeks }) => {
      const timeline = getWeeks(date);
      expect(timeline.length).toBe(weeks.length);

      for (const [index, [start, end]] of weeks.entries()) {
        expect(timeline[index].startDate).toEqual(start);
        expect(timeline[index].endDate).toEqual(new Date(end.getTime() - 1)); // minus one milisecond
        expect(timeline[index].type).toEqual(TimescaleType.week);
      }
    },
  );

  it.each(monthFixtures)(
    "should get the correct months %s",
    ({ date, months }) => {
      const timeline = getMonths(date);
      console.log(timeline);
      expect(timeline.length).toBe(months.length);

      for (const [index, [start, end]] of months.entries()) {
        expect(timeline[index].startDate).toEqual(start);
        expect(timeline[index].endDate).toEqual(new Date(end.getTime() - 1)); // minus one milisecond
        expect(timeline[index].type).toEqual(TimescaleType.month);
      }
    },
  );
});
