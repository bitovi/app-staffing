import { add, isBefore, setDay } from "date-fns";
import { getNextMonth, getStartOfMonth } from "../months";
import { Monday, Wednesday } from "../../constants";

/**
 * Determines the beginning of the week given a date. This functions
 * finds the beginning of the week thorugh the timeline rules described in
 * `rules.md`
 *
 * > TL;DR
 * > weeks begin on monday
 *
 * @param date date to find the beginning of the week from
 * @returns the begginning of the week
 */
export function getStartOfWeek(date: Date): Date {
  return setDay(date, Monday, { weekStartsOn: Monday });
}

/**
 * Helper function that wraps date-fns add to add
 * a week to a date
 *
 * @param date the date to add a week to
 * @returns date plus a week
 */
export function addWeek(date: Date): Date {
  return add(date, { weeks: 1 });
}

/** Determines if the day of a date is wednesday or before */
export function isBeginningOfWeek(date: Date): boolean {
  return date.getDay() <= Wednesday;
}

/** Determines if the day of a date is after wednesday */
export function isEndOfWeek(date: Date): boolean {
  return !isBeginningOfWeek(date);
}

/**
 * Determines the number of weeks in a "staffing month" given a date within that month.
 * A staffing month is determined by the start and end of month defined in the `rules.md`
 * file.
 *
 * @param date the date to get the month of to count the weeks
 * @returns the number of months
 */
export function getNumberOfStaffingWeeksInMonth(date: Date): number {
  const startOfMonth = getStartOfMonth(date);
  const startOfNextMonth = getNextMonth(date);

  let current = startOfMonth;
  let weeks = 0;

  while (isBefore(current, startOfNextMonth)) {
    weeks++;
    current = addWeek(current);
  }

  return weeks;
}

/**
 * Determines the week number of the given date in the date's "staffing month".
 * A staffing month is determined by the start and end of month defined in the `rules.md`
 * file.
 *
 * @param date the date to get the week number of
 * @returns the week number
 */
export function getStaffingWeekNumber(date: Date): number {
  const startOfMonth = getStartOfMonth(date);
  const startOfNextMonth = getNextMonth(date);

  const dateTime = date.getTime();

  let current = startOfMonth;
  let weekNumber = 1;

  while (isBefore(current, startOfNextMonth)) {
    const nextWeek = addWeek(current);

    if (dateTime >= current.getTime() && dateTime < nextWeek.getTime()) {
      break;
    }

    weekNumber++;
    current = nextWeek;
  }

  return weekNumber;
}
