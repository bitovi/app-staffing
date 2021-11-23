import {
  startOfWeek,
  setDay,
  getMonth,
  add,
  startOfMonth,
  sub,
  endOfMonth,
} from "date-fns";

import { isBegginningOfWeek, isEndOfWeek } from "../weeks";

/**
 * Determines which month according to the timeline rules a date is in
 *
 * @param date date to find the month of
 * @returns the month number
 */
export function getCannonMonth(date: Date): number {
  const beginningOfFirstWeek = startOfWeek(startOfMonth(date));
  const endOfFirstWeek = add(beginningOfFirstWeek, { weeks: 1 });

  const beginningOfLastWeek = startOfWeek(endOfMonth(date));
  const endOfLastWeek = add(beginningOfLastWeek, { weeks: 1 });

  const dateIsInLastWeek =
    date.getTime() <= endOfLastWeek.getTime() &&
    date.getTime() >= beginningOfLastWeek.getTime();

  const dateIsInFirstWeek =
    date.getTime() <= endOfFirstWeek.getTime() &&
    date.getTime() >= beginningOfFirstWeek.getTime();

  let month = date;

  if (dateIsInLastWeek) {
    const endOfGMonth = endOfMonth(date);
    const isBeginning = isBegginningOfWeek(endOfGMonth);

    month = isBeginning
      ? endOfMonth(add(endOfGMonth, { weeks: 1 }))
      : endOfGMonth;
  }

  if (dateIsInFirstWeek) {
    const startOfGMonth = startOfMonth(date);
    const isEnd = isEndOfWeek(startOfGMonth);

    month = isEnd
      ? startOfMonth(sub(startOfGMonth, { weeks: 1 }))
      : startOfGMonth;
  }

  return month.getMonth();
}

/**
 * Determines the beginning of the month given a date. This function calculates the
 * beginning of the month through the timeline rules discribed in `timeReport.ts`
 *
 * > TL;DR
 * > a week belongs to the month that exists most in that week.
 *
 * **Examples:**
 *  * The week of March 28, 2021, belongs to March even though April 1, 2021, is on that week as well since the 31st is on a Wednesday.
 *  * The week of August 29, 2021, belongs to September even though August 31, 2021, is on that week since the 1st is on a Wednesday
 *
 * @param date - date value to determine the start of the month
 * @returns the start date of the first day of the first week of the given dates month
 */
export function getStartOfMonth(date: Date): Date {
  const _d = new Date(date.getFullYear(), getCannonMonth(date));
  const firstOfMonth = startOfMonth(_d);
  const wednesday = setDay(firstOfMonth, 3, { weekStartsOn: 1 });

  return getMonth(wednesday) === getMonth(firstOfMonth)
    ? startOfWeek(firstOfMonth, { weekStartsOn: 1 })
    : startOfWeek(add(firstOfMonth, { weeks: 1 }), { weekStartsOn: 1 });
}

/**
 * Determines the last day of the month. This function calculates the end of the month
 * through the timeline rules described in `timeReport.ts`
 *
 * > TL;DR
 * > a week belongs to the month that exists most in that week.
 *
 * **Examples:**
 *  * The week of March 28, 2021, belongs to March even though April 1, 2021, is on that week as well since the 31st is on a Wednesday.
 *  * The week of August 29, 2021, belongs to September even though August 31, 2021, is on that week since the 1st is on a Wednesday
 *
 * @param date - date value to determine the end of the month
 * @returns the end date of the last day of the last week of the given dates month
 */
export function getEndOfMonth(date: Date): Date {
  const _d = new Date(date.getFullYear(), getCannonMonth(date));
  const lastOfMonth = endOfMonth(_d);
  const wednesday = setDay(lastOfMonth, 3, { weekStartsOn: 1 });

  const beginningOfNextMonth =
    getMonth(wednesday) === getMonth(lastOfMonth)
      ? startOfWeek(add(lastOfMonth, { weeks: 1 }), { weekStartsOn: 1 })
      : startOfWeek(lastOfMonth, { weekStartsOn: 1 });

  return new Date(beginningOfNextMonth.getTime() - 1);
}

/**
 * Gets the start of the next month following the timeline rules.
 *
 * @param date - date value to determine the next month from
 * @returns The start of the nextMonth
 */
export const getNextMonth = (date: Date): Date => {
  // to avoid figuring out where the start of the month is just pick
  // a date in the middle since were going to use the `getStartOfMonth`
  // function to find the start
  const DAY_IN_THE_MIDDLE_OF_THE_MONTH = 15;

  const datesYear = date.getFullYear();
  const currentMonth = getCannonMonth(date);

  const dateInNextMonth = new Date(
    currentMonth == 11 ? datesYear + 1 : datesYear,
    (currentMonth + 1) % 12,
    DAY_IN_THE_MIDDLE_OF_THE_MONTH,
  );

  return getStartOfMonth(dateInNextMonth);
};

/**
 * A utility function to find the end of the following month given a date and the time
 * line rules.
 *
 * @param date - date to determine the end of the next month from
 * @returns the end of the following month
 */
export const getEndOfNextMonth = (date: Date): Date => {
  return getEndOfMonth(getNextMonth(date));
};
