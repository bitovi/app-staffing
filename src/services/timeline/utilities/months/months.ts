import {
  startOfWeek,
  setDay,
  getMonth,
  startOfMonth,
  sub,
  endOfMonth,
} from "date-fns";

import { December, January, MONTHS_IN_YEAR } from "../../constants";

import { isBeginningOfWeek, isEndOfWeek, addWeek } from "../weeks";

/**
 * Determines which month according to the timeline rules a date is in
 *
 * @param date date to find the month of
 * @returns the month number
 */
export function getCanonMonth(date: Date): number {
  const beginningOfFirstWeek = startOfWeek(startOfMonth(date));
  const endOfFirstWeek = addWeek(beginningOfFirstWeek);

  const beginningOfLastWeek = startOfWeek(endOfMonth(date));
  const endOfLastWeek = addWeek(beginningOfLastWeek);

  const dateIsInLastWeek =
    date.getTime() <= endOfLastWeek.getTime() &&
    date.getTime() >= beginningOfLastWeek.getTime();

  const dateIsInFirstWeek =
    date.getTime() <= endOfFirstWeek.getTime() &&
    date.getTime() >= beginningOfFirstWeek.getTime();

  let month = date;

  if (dateIsInLastWeek) {
    const endOfGMonth = endOfMonth(date);
    const isBeginning = isBeginningOfWeek(endOfGMonth);

    month = isBeginning ? endOfMonth(addWeek(endOfGMonth)) : endOfGMonth;
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
 * internal. Gets the correct year for the month.
 */
function getCanonYear(month: number, canonMonth: number, year: number): number {
  if (month === December && canonMonth === January) return year + 1;

  if (month === January && canonMonth === December) return year - 1;

  return year;
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
  const canonMonth = getCanonMonth(date);
  const month = getMonth(date);

  const dateInCanonMonth = new Date(
    getCanonYear(month, canonMonth, date.getFullYear()),
    canonMonth,
  );

  const firstOfMonth = startOfMonth(dateInCanonMonth);
  const wednesday = setDay(firstOfMonth, 3, { weekStartsOn: 1 });

  return getMonth(wednesday) === getMonth(firstOfMonth)
    ? startOfWeek(firstOfMonth, { weekStartsOn: 1 })
    : startOfWeek(addWeek(firstOfMonth), { weekStartsOn: 1 });
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
  const canonMonth = getCanonMonth(date);
  const month = getMonth(date);

  const dateInCanonMonth = new Date(
    getCanonYear(month, canonMonth, date.getFullYear()),
    canonMonth,
  );

  const lastOfMonth = endOfMonth(dateInCanonMonth);
  const wednesday = setDay(lastOfMonth, 3, { weekStartsOn: 1 });

  const beginningOfNextMonth =
    getMonth(wednesday) === getMonth(lastOfMonth)
      ? startOfWeek(addWeek(lastOfMonth), { weekStartsOn: 1 })
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
  const currentMonth = getCanonMonth(date);

  const dateInNextMonth = new Date(
    currentMonth == December ? datesYear + 1 : datesYear,
    (currentMonth + 1) % MONTHS_IN_YEAR,
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

// https://stackoverflow.com/a/2536445
/**
 * Gets the number of months between two
 * @param firstDate
 * @param secondDate
 * @returns
 */
export function getNumberMonthsBetween(
  firstDate: Date,
  secondDate: Date,
): number {
  let months =
    (firstDate.getFullYear() - secondDate.getFullYear()) * MONTHS_IN_YEAR;
  months -= getCanonMonth(firstDate);
  months += getCanonMonth(secondDate);

  return months <= 0 ? 0 : months;
}
