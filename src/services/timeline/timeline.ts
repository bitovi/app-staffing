import type { TimescaleData } from "./interfaces";

import { getWeeksInMonth, getWeekOfMonth, isBefore } from "date-fns";

import { TimescaleType } from "./interfaces";

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
  getCannonMonth,
  getStartOfQuarter,
  getNumberMonthsBetween,
  addWeek,
} from "./utilities";

export const getWeeks = (date: Date): TimescaleData[] => {
  const numberWeeksInMonth = getWeeksInMonth(date, { weekStartsOn: 1 });
  const currentWeekNumber = getWeekOfMonth(date, { weekStartsOn: 1 });
  const remainingWeeks = numberWeeksInMonth - (currentWeekNumber - 1); // minus one to count the current week

  let start = getStartOfWeek(date);
  const end =
    remainingWeeks >= MIN_AMOUNT_WEEKS_SHOWN
      ? getEndOfMonth(date)
      : getEndOfNextMonth(date);

  const time: TimescaleData[] = [];
  while (isBefore(start, end)) {
    const startOfNextWeek = addWeek(start);

    time.push({
      startDate: start,
      endDate: new Date(startOfNextWeek.getTime() - MILLISECOND),
      type: TimescaleType.week,
    });

    start = startOfNextWeek;
  }

  return time;
};

// always show at least two full months that aren't broken down. if the last month
// being displayed breaks
// into the next quarter then show the entire wuarter broken down into months
export const getMonths = (date: Date): TimescaleData[] => {
  const currentMonth = getCannonMonth(date) % NUMBER_MONTHS_IN_QUARTERS;

  const numberMonthsRemainingInQuarter =
    NUMBER_MONTHS_IN_QUARTERS - currentMonth;

  let start = getStartOfMonth(date);
  const end =
    numberMonthsRemainingInQuarter >= MIN_AMOUNT_MONTHS_SHOWN
      ? getEndOfQuarter(date)
      : getEndOfNextQuarter(date);

  const time: TimescaleData[] = [];
  while (isBefore(start, end)) {
    time.push({
      startDate: start,
      endDate: getEndOfMonth(start),
      type: TimescaleType.month,
    });

    start = getNextMonth(start);
  }

  return time;
};

export const getQuarter = (date: Date): TimescaleData => {
  return {
    startDate: getStartOfQuarter(date),
    endDate: getEndOfQuarter(date),
    type: TimescaleType.quarter,
  };
};

export const getTimeline = (date: Date): TimescaleData[] => {
  const weeks = getWeeks(date);

  const months = getMonths(
    new Date(weeks[weeks.length - 1].endDate.getTime() + MILLISECOND),
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
