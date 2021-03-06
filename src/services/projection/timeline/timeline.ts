import { isBefore, format, setMonth } from "date-fns";

import {
  MILLISECOND,
  MIN_AMOUNT_MONTHS_SHOWN,
  MIN_AMOUNT_WEEKS_SHOWN,
  MIN_NUMBER_TOTAL_MONTHS,
  NUMBER_MONTHS_IN_QUARTERS,
} from "./constants";

import {
  getStartOfWeek,
  getEndOfMonth,
  getEndOfNextMonth,
  getStartOfMonth,
  getEndOfQuarter,
  getEndOfNextQuarter,
  getNextMonth,
  getStaffingMonth,
  getStartOfQuarter,
  getNumberMonthsBetween,
  addWeek,
  getStaffingQuarter,
  getNumberOfStaffingWeeksInMonth,
  getStaffingWeekNumber,
} from "./utilities";

export interface TimelineRange {
  type: string;
  title: string;
  startDate: Date;
  endDate: Date;
}

/**
 * Gets a minimum of two weeks. If the second week breaks into the next month, all of
 * the following months weeks will be returned as well
 */
export const getWeeks = (
  date: Date,
  minimumWeeksShown = MIN_AMOUNT_WEEKS_SHOWN,
): Array<Omit<TimelineRange, "title">> => {
  const numberWeeksInMonth = getNumberOfStaffingWeeksInMonth(date);
  const currentWeekNumber = getStaffingWeekNumber(date);
  const remainingWeeks = numberWeeksInMonth - (currentWeekNumber - 1);

  const timeline: Omit<TimelineRange, "title">[] = [];

  let start = getStartOfWeek(date);
  const end =
    remainingWeeks >= minimumWeeksShown
      ? getEndOfMonth(date)
      : getEndOfNextMonth(date);

  while (isBefore(start, end)) {
    const startOfNextWeek = addWeek(start);

    timeline.push({
      startDate: start,
      endDate: new Date(startOfNextWeek.getTime() - MILLISECOND),
      type: "week",
    });

    start = startOfNextWeek;
  }

  return timeline;
};

/**
 * Gets at least two months. If the last month breaks into the next quarter then
 * all of the following quarters months will be returned as well
 */
export const getMonths = (
  date: Date,
  minimumMonthsShown = MIN_AMOUNT_MONTHS_SHOWN,
): Array<Omit<TimelineRange, "title">> => {
  const currentMonth = getStaffingMonth(date) % NUMBER_MONTHS_IN_QUARTERS;

  const numberMonthsRemainingInQuarter =
    NUMBER_MONTHS_IN_QUARTERS - currentMonth;

  const timeline: Omit<TimelineRange, "title">[] = [];

  let start = getStartOfMonth(date);
  const end =
    numberMonthsRemainingInQuarter >= minimumMonthsShown
      ? getEndOfQuarter(date)
      : getEndOfNextQuarter(date);

  while (isBefore(start, end)) {
    timeline.push({
      startDate: start,
      endDate: getEndOfMonth(start),
      type: "month",
    });

    start = getNextMonth(start);
  }

  return timeline;
};

/** Gets one full quarter */
export const getQuarter = (date: Date): Omit<TimelineRange, "title"> => {
  return {
    startDate: getStartOfQuarter(date),
    endDate: getEndOfQuarter(date),
    type: "quarter",
  };
};

/**
 * Generates a timeline given a date. The rules for generating a timeline are as follows:
 *
 * 1. A unit of time may not be displayed in partial. A displayed month always represents all the weeks in it,
 *    a displayed quarter always represents all the months in it, etc.
 * 2. A week begins on Monday and ends on Sunday.
 * 3. A week belongs to the month, quarter, and year that matches its earliest middle workday.
 *    (For a week starting on Monday, that would be Wednesday. The effect of this is that it belongs
 *    to the month with the most days in that week.)
 * 4. Always show at least three weeks. If the last week being displayed breaks into the next month, then show the
 *    entire month broken down into weeks.
 * 5. Always show at least two full months that aren't broken down. If the last month being displayed breaks into the
 *    next quarter, then show the entire quarter broken down into months.
 * 6. Always show at least one full quarter that is not broken down.
 * 7. Always show at least 6 months total. Additional quarters may be needed to complete the display.
 *
 * @param date The date to create the timeline from
 * @returns The timeline data
 */
export default function getTimeline(
  date: Date,
  {
    minimumMonthsShown,
    minimumWeeksShown,
  }: {
    minimumWeeksShown?: number;
    minimumMonthsShown?: number;
  } = {},
): TimelineRange[] {
  const weeks = getWeeks(date, minimumWeeksShown);

  const months = getMonths(
    new Date(weeks[weeks.length - 1].endDate.getTime() + MILLISECOND),
    minimumMonthsShown,
  );

  const quarters = [
    getQuarter(
      new Date(months[months.length - 1].endDate.getTime() + MILLISECOND),
    ),
  ];

  if (
    getNumberMonthsBetween(weeks[0].startDate, quarters[0].endDate) <=
    MIN_NUMBER_TOTAL_MONTHS
  ) {
    quarters.push(
      getQuarter(
        new Date(quarters[quarters.length - 1].endDate.getTime() + MILLISECOND),
      ),
    );
  }

  return getTimelineDescriptions([...weeks, ...months, ...quarters]);
}

/** gets the title to displays */
const getTimelineDescriptions = (
  timeline: Array<Omit<TimelineRange, "title">>,
): TimelineRange[] => {
  return timeline.map((data, i) => {
    let title = "";
    switch (data.type) {
      case "week":
        title = format(data.startDate, "MMM do");
        break;
      case "month":
        title = format(
          setMonth(new Date(), getStaffingMonth(data.startDate)),
          "MMM",
        ).toUpperCase();
        break;
      case "quarter":
        title = `Q${getStaffingQuarter(
          data.startDate,
        )} ${data.startDate.getFullYear()}`;
        break;
      default:
        title = format(data.startDate, "MMM do");
    }

    return {
      ...data,
      title,
    };
  });
};
