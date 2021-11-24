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
} from "../../constants";

import {
  isBeginningOfWeek,
  isEndOfWeek,
  addWeek,
  getStartOfWeek,
} from "../weeks";

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
    const isBeginning = isBeginningOfWeek(endOfGMonth);

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
  const cannonQuarter = getCannonQuarter(date);
  const quarter = getQuarter(date);

  const dateInCannonQuarter = new Date(
    getYear(quarter, cannonQuarter, date.getFullYear()),
    getMiddleOfQuarter(getCannonQuarter(date)),
  );

  const firstOfQuarter = startOfQuarter(dateInCannonQuarter);
  const wednesday = setDay(firstOfQuarter, 3, { weekStartsOn: 1 });

  const start =
    getQuarter(wednesday) === getQuarter(firstOfQuarter)
      ? getStartOfWeek(firstOfQuarter)
      : getStartOfWeek(addWeek(firstOfQuarter));

  return start;
};

export const getNextQuarter = (date: Date): Date => {
  // to avoid figuring out where the start of the month is just pick
  // a date in the middle since were going to use the `getStartOfMonth`
  // function to find the start
  const DAY_IN_THE_MIDDLE_OF_THE_MONTH = 15;

  const datesYear = date.getFullYear();
  const currentQuarter = getCannonQuarter(date);

  const nextQuarter = (currentQuarter % NUMBER_OF_QUARTERS) + 1;

  const dateInNextMonth = new Date(
    currentQuarter == Q4 ? datesYear + 1 : datesYear,
    getMiddleOfQuarter(nextQuarter || nextQuarter + 1),
    DAY_IN_THE_MIDDLE_OF_THE_MONTH,
  );

  return getStartOfQuarter(dateInNextMonth);
};

export const getEndOfQuarter = (date: Date): Date => {
  const cannonQuarter = getCannonQuarter(date);
  const quarter = getQuarter(date);

  const dateInCannonQuarter = new Date(
    getYear(quarter, cannonQuarter, date.getFullYear()),
    getMiddleOfQuarter(cannonQuarter),
  );

  const lastOfQuarter = endOfQuarter(dateInCannonQuarter);
  const wednesday = setDay(lastOfQuarter, 3, { weekStartsOn: 1 });

  const beginningOfNextMonth =
    getQuarter(wednesday) === getQuarter(lastOfQuarter)
      ? startOfWeek(addWeek(lastOfQuarter), { weekStartsOn: 1 })
      : startOfWeek(lastOfQuarter, { weekStartsOn: 1 });

  return new Date(beginningOfNextMonth.getTime() - MILLISECOND);
};

export const getEndOfNextQuarter = (date: Date): Date => {
  return getEndOfQuarter(getNextQuarter(date));
};
