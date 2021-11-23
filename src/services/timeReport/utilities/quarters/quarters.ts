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
import { August, February, May, November, Q4, Q1 } from "../../fixtures";

import { isBegginningOfWeek, isEndOfWeek, addWeek } from "../weeks";

export const getCannonQuarter = (date: Date): number => {
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
    const endOfGMonth = endOfQuarter(date);
    const isBeginning = isBegginningOfWeek(endOfGMonth);

    quarter = isBeginning ? endOfMonth(addWeek(endOfGMonth)) : endOfGMonth;
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

function getYear(quarter: number, cannonQuarter: number, year: number): number {
  if (quarter === Q4 && cannonQuarter == Q1) return year + 1;

  if (quarter === Q1 && cannonQuarter == Q4) return year - 1;

  return year;
}

export const getStartOfQuarter = (date: Date): Date => {
  const middleOfQuarter = {
    1: February,
    2: May,
    3: August,
    4: November,
  };

  const cannonQuarter = getCannonQuarter(date);
  const quarter = getQuarter(date);

  const dateInCannonQuarter = new Date(
    getYear(quarter, cannonQuarter, date.getFullYear()),
    // @ts-ignore
    middleOfQuarter[getCannonQuarter(date)],
  );

  const firstOfQuarter = startOfQuarter(dateInCannonQuarter);
  const wednesday = setDay(firstOfQuarter, 3, { weekStartsOn: 1 });

  const start =
    getQuarter(wednesday) === getQuarter(firstOfQuarter)
      ? startOfWeek(firstOfQuarter, { weekStartsOn: 1 })
      : startOfWeek(addWeek(firstOfQuarter), { weekStartsOn: 1 });

  return start;
};

export const getEndOfQuarter = (date: Date): Date => {};

export const getEndOfNextQuarter = (date: Date): Date => {};
