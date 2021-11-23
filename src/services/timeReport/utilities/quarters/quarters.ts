import {
  startOfWeek,
  add,
  startOfMonth,
  sub,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  getQuarter,
} from "date-fns";

import { isBegginningOfWeek, isEndOfWeek } from "../weeks";

export const getCannonQuarter = (date: Date): number => {
  const time = date.getTime();

  const startOfFirstWeekOfQuarter = startOfWeek(startOfQuarter(date));
  const endOfFirstWeekOfQuarter = add(startOfFirstWeekOfQuarter, { weeks: 1 });

  const startOfLastWeekOfQuarter = startOfWeek(endOfQuarter(date));
  const endOfLastWeekOfQuarter = add(startOfLastWeekOfQuarter, { weeks: 1 });

  const dateIsInFirstWeek =
    time <= endOfFirstWeekOfQuarter.getTime() &&
    time >= startOfFirstWeekOfQuarter.getTime();

  const dateIsInLastWeek =
    time <= endOfLastWeekOfQuarter.getTime() &&
    time >= startOfLastWeekOfQuarter.getTime();

  let quarter = date;

  if (dateIsInLastWeek) {
    const endOfGMonth = endOfQuarter(date);
    const isBeginning = isBegginningOfWeek(endOfGMonth);

    quarter = isBeginning
      ? endOfMonth(add(endOfGMonth, { weeks: 1 }))
      : endOfGMonth;
  }

  if (dateIsInFirstWeek) {
    const startOfGMonth = startOfQuarter(date);
    const isEnd = isEndOfWeek(startOfGMonth);

    quarter = isEnd
      ? startOfMonth(sub(startOfGMonth, { weeks: 1 }))
      : startOfGMonth;
  }

  return getQuarter(quarter);
};

export const getStartOfQuarter = (date: Date): Date => {};

export const getEndOfQuarter = (date: Date): Date => {};

export const getEndOfNextQuarter = (date: Date): Date => {};
