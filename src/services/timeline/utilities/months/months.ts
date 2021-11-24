import {
  startOfWeek,
  setDay,
  getMonth,
  startOfMonth,
  sub,
  endOfMonth,
} from "date-fns";

import { December, January, Monday, MONTHS_IN_YEAR } from "../../constants";

import { isBeginningOfWeek, isEndOfWeek, addWeek } from "../weeks";

/**
 * Finds which Staffing Month a date is in through the rules described in
 * `rules.md`.
 *
 * >TL;DR
 * > A week belongs to the month, quarter, and year that matches its earliest
 * > middle workday. (For a week starting on Monday, that would be Wednesday.
 *
 * @param date The date to find a month for
 * @returns the current staffing month
 */
export function getStaffingMonth(date: Date): number {
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
    const endOfRegularMonth = endOfMonth(date);
    const isBeginning = isBeginningOfWeek(endOfRegularMonth);

    month = isBeginning
      ? endOfMonth(addWeek(endOfRegularMonth))
      : endOfRegularMonth;
  }

  if (dateIsInFirstWeek) {
    const startOfRegularMonth = startOfMonth(date);
    const isEnd = isEndOfWeek(startOfRegularMonth);

    month = isEnd
      ? startOfMonth(sub(startOfRegularMonth, { weeks: 1 }))
      : startOfRegularMonth;
  }

  return month.getMonth();
}

/** Internal. Finds the correct year for the staffing month. */
function getStaffingMonthYear(
  month: number,
  staffingMonth: number,
  year: number,
): number {
  if (month === December && staffingMonth === January) return year + 1;

  if (month === January && staffingMonth === December) return year - 1;

  return year;
}

/**
 * Determines the beginning of the month given a date. This function calculates the
 * beginning of the month through the timeline rules discribed in `rules.md`
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
  const staffingMonth = getStaffingMonth(date);
  const month = getMonth(date);

  const dateInCanonMonth = new Date(
    getStaffingMonthYear(month, staffingMonth, date.getFullYear()),
    staffingMonth,
  );

  const firstOfMonth = startOfMonth(dateInCanonMonth);
  const wednesday = setDay(firstOfMonth, 3, { weekStartsOn: Monday });

  return getMonth(wednesday) === getMonth(firstOfMonth)
    ? startOfWeek(firstOfMonth, { weekStartsOn: Monday })
    : startOfWeek(addWeek(firstOfMonth), { weekStartsOn: Monday });
}

/**
 * Gets the start of the next month following the timeline rules described
 * in `rules.md`.
 *
 * @param date - date value to determine the next month from
 * @returns The start of the next month
 */
export const getNextMonth = (date: Date): Date => {
  // to avoid figuring out where the start of the month is just pick
  // a date in the middle since were going to use the `getStartOfMonth`
  // function to find the start
  const DAY_IN_THE_MIDDLE_OF_THE_MONTH = 15;

  const datesYear = date.getFullYear();
  const currentMonth = getStaffingMonth(date);

  const nextYear = currentMonth == December ? datesYear + 1 : datesYear;
  const nextMonth = (currentMonth + 1) % MONTHS_IN_YEAR;

  const dateInNextMonth = new Date(
    nextYear,
    nextMonth,
    DAY_IN_THE_MIDDLE_OF_THE_MONTH,
  );

  return getStartOfMonth(dateInNextMonth);
};

/**
 * Determines the last day of the month. This function calculates the end of the month
 * through the timeline rules described in `rules.md`. The return value will be 1 millisecond
 * away from the next month.
 *
 * @param date - date value to determine the end of the month
 * @returns the end date of the last day of the last week of the given dates month
 */
export function getEndOfMonth(date: Date): Date {
  const staffingMonth = getStaffingMonth(date);
  const month = getMonth(date);

  const dateInCanonMonth = new Date(
    getStaffingMonthYear(month, staffingMonth, date.getFullYear()),
    staffingMonth,
  );

  const lastOfMonth = endOfMonth(dateInCanonMonth);
  const wednesday = setDay(lastOfMonth, 3, { weekStartsOn: Monday });

  const beginningOfNextMonth =
    getMonth(wednesday) === getMonth(lastOfMonth)
      ? startOfWeek(addWeek(lastOfMonth), { weekStartsOn: Monday })
      : startOfWeek(lastOfMonth, { weekStartsOn: Monday });

  return new Date(beginningOfNextMonth.getTime() - 1);
}

/**
 * Helper function to find the end of the following month.
 *
 * @param date
 * @returns the end of the following month
 */
export const getEndOfNextMonth = (date: Date): Date => {
  return getEndOfMonth(getNextMonth(date));
};

/**
 * Gets the number of months between two. This is a modified version of a stack overflow
 * result to use the staffing rules.
 *
 * @see https://stackoverflow.com/a/2536445
 *
 * @param firstDate
 * @param secondDate
 * @returns how many months are between the two dates
 */
export function getNumberMonthsBetween(
  firstDate: Date,
  secondDate: Date,
): number {
  let months =
    (firstDate.getFullYear() - secondDate.getFullYear()) * MONTHS_IN_YEAR;
  months -= getStaffingMonth(firstDate);
  months += getStaffingMonth(secondDate);

  return months <= 0 ? 0 : months;
}
