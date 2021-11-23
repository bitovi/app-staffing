import {
  startOfWeek,
  setDay,
  getMonth,
  add,
  startOfMonth,
  endOfMonth,
  sub,
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

/**
 * Returns date of the first week for the given month.
 * NB: a week belongs to a month if midweek(Wednesday) falls in month.
 * @param date
 */
export function getEndOfMonth(date: Date): Date {
  const lastOfMonth = endOfMonth(date);
  const midWeek = setDay(lastOfMonth, 3, { weekStartsOn: 1 });

  const beginningOfNextMonth =
    getMonth(midWeek) === getMonth(lastOfMonth)
      ? startOfWeek(add(lastOfMonth, { weeks: 1 }), { weekStartsOn: 1 })
      : startOfWeek(lastOfMonth, { weekStartsOn: 1 });

  return new Date(beginningOfNextMonth.getTime() - 1);
}

export const endOfNextMonth = (date: Date): Date => {
  return getEndOfMonth(add(startOfMonth(date), { months: 1 }));
};

// export function getEndOfMonth(date: Date): Date {
//   const lastOfMonth = endOfMonth(date);
//   const midWeek = setDay(lastOfMonth, 3, { weekStartsOn: 1 });

//   const beginningOfNextMonth =
//     getMonth(midWeek) === getMonth(lastOfMonth)
//       ? startOfWeek(lastOfMonth, { weekStartsOn: 1 })
//       : startOfWeek(sub(lastOfMonth, { weeks: 1 }), { weekStartsOn: 1 });

//   return new Date(beginningOfNextMonth.getTime() - 1);
// }
