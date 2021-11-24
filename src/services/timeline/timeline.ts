import type { TimelineData, TimelineConfiguration } from "./interfaces";

import {
  getWeeksInMonth,
  getWeekOfMonth,
  isBefore,
  format,
  setMonth,
} from "date-fns";

import { TimescaleType } from "./interfaces";

import {
  MILLISECOND,
  MIN_AMOUNT_MONTHS_SHOWN,
  MIN_AMOUNT_WEEKS_SHOWN,
  MIN_NUMBER_TOTAL_MONTHS,
  Monday,
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
} from "./utilities";

/**
 * Gets a minimum of two weeks. If the second week breaks into the next month, all of
 * the following months weeks will be returned as well
 */
export const getWeeks = (
  date: Date,
  minimumWeeksShown = MIN_AMOUNT_WEEKS_SHOWN,
): TimelineData[] => {
  const numberWeeksInMonth = getWeeksInMonth(date, { weekStartsOn: Monday });
  const currentWeekNumber = getWeekOfMonth(date, { weekStartsOn: Monday });
  const remainingWeeks = numberWeeksInMonth - (currentWeekNumber - 1); // minus one to count the current week

  const timeline: TimelineData[] = [];

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
      type: TimescaleType.week,
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
): TimelineData[] => {
  const currentMonth = getStaffingMonth(date) % NUMBER_MONTHS_IN_QUARTERS;

  const numberMonthsRemainingInQuarter =
    NUMBER_MONTHS_IN_QUARTERS - currentMonth;

  const timeline: TimelineData[] = [];

  let start = getStartOfMonth(date);
  const end =
    numberMonthsRemainingInQuarter >= minimumMonthsShown
      ? getEndOfQuarter(date)
      : getEndOfNextQuarter(date);

  while (isBefore(start, end)) {
    timeline.push({
      startDate: start,
      endDate: getEndOfMonth(start),
      type: TimescaleType.month,
    });

    start = getNextMonth(start);
  }

  return timeline;
};

/** Gets one full quarter */
export const getQuarter = (date: Date): TimelineData => {
  return {
    startDate: getStartOfQuarter(date),
    endDate: getEndOfQuarter(date),
    type: TimescaleType.quarter,
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
export const getTimeline = (
  date: Date,
  { minimumMonthsShown, minimumWeeksShown }: TimelineConfiguration = {},
): TimelineData[] => {
  console.log({ minimumMonthsShown, minimumWeeksShown });
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

  return [...weeks, ...months, ...quarters];
};

/** creates and formats a description for the timeline data */
export const getTimelineDataDescription = ({
  type,
  startDate,
}: TimelineData): string => {
  switch (type) {
    case TimescaleType.week:
      const month = format(
        setMonth(new Date(), getStaffingMonth(startDate)),
        "MMM",
      ).toUpperCase();

      return `${month} ${format(startDate, "do")}`;

    case TimescaleType.month:
      return format(
        setMonth(new Date(), getStaffingMonth(startDate)),
        "MMM",
      ).toUpperCase();

    case TimescaleType.quarter:
      return `Q${getStaffingQuarter(startDate)} ${startDate.getFullYear()}`;

    default:
      return format(startDate, "MMM do");
  }
};
