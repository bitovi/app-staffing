import {
  startOfWeek,
  setDay,
  getMonth,
  add,
  startOfMonth,
  sub,
  endOfMonth,
} from "date-fns";

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
  const firstOfMonth = startOfMonth(date);
  const wednesday = setDay(firstOfMonth, 3, { weekStartsOn: 1 });

  return getMonth(wednesday) === getMonth(firstOfMonth)
    ? startOfWeek(firstOfMonth, { weekStartsOn: 1 })
    : startOfWeek(add(firstOfMonth, { weeks: 1 }), { weekStartsOn: 1 });
}

function isBegginningOfWeek(date: Date): boolean {
  return date.getDay() > 0 && date.getDay() < 3;
}

function getCannonMonth(date: Date): number {
  const beginningOfFirstWeek = getStartOfWeek(startOfMonth(date));
  const endOfFirstWeek = add(beginningOfFirstWeek, { weeks: 1 });

  const beginningOfLastWeek = getStartOfWeek(endOfMonth(date));
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
    const endOfGMonth = endOfMonth(date);
    const isBeginning = isBegginningOfWeek(endOfGMonth);

    month = !isBeginning
      ? endOfMonth(sub(endOfGMonth, { weeks: 1 }))
      : endOfGMonth;
  }

  return month.getMonth();
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
  // date jan 31
  const _d = new Date(date.getFullYear(), getCannonMonth(date));
  const lastOfMonth = endOfMonth(_d); // jan 31 should b 28th of feb
  const wednesday = setDay(lastOfMonth, 3, { weekStartsOn: 1 });

  // console.log({
  //   date,
  //   lastOfMonth,
  //   wednesday,
  //   bool: getMonth(wednesday) === getMonth(lastOfMonth),
  //   math: startOfWeek(lastOfMonth, { weekStartsOn: 1 }),
  // });

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
  // We can't rely on adding durations since the duration of a month
  // under the timeline rules vary.

  const MAX_NUMBER_WEEKS_IN_A_MONTH = 5;
  const currentMonth = getStartOfMonth(date);

  const dateInNextMonth = startOfWeek(
    add(currentMonth, { weeks: MAX_NUMBER_WEEKS_IN_A_MONTH + 1 }),
    { weekStartsOn: 1 },
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

export const getEndOfQuarter = (date: Date): Date => {};

export const getEndOfNextQuarter = (date: Date): Date => {};
