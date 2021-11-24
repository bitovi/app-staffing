import {
  startOfWeek,
  startOfMonth,
  sub,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  getQuarter,
  setDay,
} from "date-fns";

import {
  August,
  February,
  May,
  November,
  Q4,
  Q1,
  Q2,
  Q3,
  NUMBER_OF_QUARTERS,
  MILLISECOND,
  Monday,
} from "../../constants";

import {
  isBeginningOfWeek,
  isEndOfWeek,
  addWeek,
  getStartOfWeek,
} from "../weeks";

/** Internal. Gets the month in the middle of the quarter */
const getMiddleOfQuarter = (quarter: number): number => {
  const middle = {
    [Q1]: February,
    [Q2]: May,
    [Q3]: August,
    [Q4]: November,
  }[quarter];

  if (!middle) {
    throw new Error("Invalid Quarter");
  }

  return middle;
};

/**
 * Finds which Staffing Quarter a date is in through the rules described in
 * `rules.md`.
 *
 * >TL;DR
 * > A week belongs to the month, quarter, and year that matches its earliest
 * > middle workday. (For a week starting on Monday, that would be Wednesday.
 *
 * @param date The date to find a quarter for
 * @returns the current staffing quarter
 */
export const getStaffingQuarter = (date: Date): number => {
  const time = date.getTime();

  const startOfFirstWeekOfQuarter = startOfWeek(startOfQuarter(date));
  const endOfFirstWeekOfQuarter = addWeek(startOfFirstWeekOfQuarter);

  const startOfLastWeekOfQuarter = startOfWeek(endOfQuarter(date));
  const endOfLastWeekOfQuarter = addWeek(startOfLastWeekOfQuarter);

  const dateIsInFirstWeek =
    time <= endOfFirstWeekOfQuarter.getTime() &&
    time >= startOfFirstWeekOfQuarter.getTime();

  const dateIsInLastWeek =
    time <= endOfLastWeekOfQuarter.getTime() &&
    time >= startOfLastWeekOfQuarter.getTime();

  let quarter = date;

  if (dateIsInLastWeek) {
    const endOfRegularQuarter = endOfQuarter(date);
    const isBeginning = isBeginningOfWeek(endOfRegularQuarter);

    quarter = isBeginning
      ? endOfMonth(addWeek(endOfRegularQuarter))
      : endOfRegularQuarter;
  }

  if (dateIsInFirstWeek) {
    const startOfRegularQuarter = startOfQuarter(date);
    const isEnd = isEndOfWeek(startOfRegularQuarter);

    quarter = isEnd
      ? startOfMonth(sub(startOfRegularQuarter, { weeks: 1 }))
      : startOfRegularQuarter;
  }

  return getQuarter(quarter);
};

/** Internal. Finds the correct year for the staffing quarter */
function getStaffingQuarterYear(
  quarter: number,
  staffingQuarter: number,
  year: number,
): number {
  if (quarter === Q4 && staffingQuarter == Q1) return year + 1;

  if (quarter === Q1 && staffingQuarter == Q4) return year - 1;

  return year;
}

/**
 * Determines the beginning of the quarter given a date. This function calculates the
 * beginning of the quarter through the timeline rules discribed in `rules.md`
 *
 * @param date - date value to determine the start of the quarter
 * @returns the start date of the first day of the first week of the given dates quarter
 */
export const getStartOfQuarter = (date: Date): Date => {
  const staffingQuarter = getStaffingQuarter(date);
  const quarter = getQuarter(date);

  const dateInStaffingQuarter = new Date(
    getStaffingQuarterYear(quarter, staffingQuarter, date.getFullYear()),
    getMiddleOfQuarter(getStaffingQuarter(date)),
  );

  const firstOfQuarter = startOfQuarter(dateInStaffingQuarter);
  const wednesday = setDay(firstOfQuarter, 3, { weekStartsOn: Monday });

  return getQuarter(wednesday) === getQuarter(firstOfQuarter)
    ? getStartOfWeek(firstOfQuarter)
    : getStartOfWeek(addWeek(firstOfQuarter));
};

/**
 * Gets the start of the next quarter following the timeline rules described
 * in `rules.md`.
 *
 * @param date - date value to determine the next quarter from
 * @returns The start of the next quarter
 */
export const getNextQuarter = (date: Date): Date => {
  const datesYear = date.getFullYear();
  const currentQuarter = getStaffingQuarter(date);

  const nextQuarter = (currentQuarter % NUMBER_OF_QUARTERS) + 1;
  const nextQuarterYear = currentQuarter == Q4 ? datesYear + 1 : datesYear;

  const dateInNextQuarter = new Date(
    nextQuarterYear,
    getMiddleOfQuarter(nextQuarter),
  );

  return getStartOfQuarter(dateInNextQuarter);
};

/**
 * Determines the last day of the quarter. This function calculates the end of the quarter
 * through the timeline rules described in `rules.md`. The return value will be 1 millisecond
 * away from the next week.
 *
 * @param date - date value to determine the end of the quarter
 * @returns the end of the last day of the last week of the given dates quarter.
 */
export const getEndOfQuarter = (date: Date): Date => {
  const staffingQuarter = getStaffingQuarter(date);
  const quarter = getQuarter(date);

  const dateInStaffingQuarter = new Date(
    getStaffingQuarterYear(quarter, staffingQuarter, date.getFullYear()),
    getMiddleOfQuarter(staffingQuarter),
  );

  const lastOfQuarter = endOfQuarter(dateInStaffingQuarter);
  const wednesday = setDay(lastOfQuarter, 3, { weekStartsOn: Monday });

  const beginningOfNextMonth =
    getQuarter(wednesday) === getQuarter(lastOfQuarter)
      ? startOfWeek(addWeek(lastOfQuarter), { weekStartsOn: Monday })
      : startOfWeek(lastOfQuarter, { weekStartsOn: Monday });

  return new Date(beginningOfNextMonth.getTime() - MILLISECOND);
};

/**
 * Helper function to get the end of the following quarter.
 *
 * @param date
 * @returns the end of the last day of the last week of the given dates next quarter.
 */
export const getEndOfNextQuarter = (date: Date): Date => {
  return getEndOfQuarter(getNextQuarter(date));
};
