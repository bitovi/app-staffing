import { add, setDay } from "date-fns";

/**
 * Determines the beginning of the week given a date. This functions
 * finds the beginning of the week thorugh the timeline rules described in
 * `timeReport.ts`
 * > TL;DR
 * > weeks begin on monday
 *
 * @param date date to find the beginning of the week from
 * @returns the begginning of the week
 */
export function getStartOfWeek(date: Date): Date {
  return setDay(date, 1, { weekStartsOn: 1 });
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

export function isBeginningOfWeek(date: Date): boolean {
  const Wednesday = 3;
  const Sunday = 0;
  return date.getDay() > Sunday && date.getDay() <= Wednesday;
}

export function isEndOfWeek(date: Date): boolean {
  const Wednesday = 3;
  return date.getDay() > Wednesday;
}
