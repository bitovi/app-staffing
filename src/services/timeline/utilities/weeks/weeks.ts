import { add, setDay } from "date-fns";
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
