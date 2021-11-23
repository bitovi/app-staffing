import {
  startOfWeek,
  lastDayOfWeek,
  setDay,
  getMonth,
  add,
  isAfter,
  startOfMonth,
  getQuarter,
  endOfMonth,
  addQuarters,
  endOfQuarter,
  setQuarter,
  getWeeksInMonth,
  getWeekOfMonth,
  sub,
  startOfQuarter,
} from "date-fns";

import { getStartOfWeek, getEndOfMonth, endOfNextMonth } from "./utilities";

export type TimescaleData = {
  startDate: Date;
  endDate: Date;
  type: TimescaleType;
};

export enum TimescaleType {
  week,
  month,
  quarter,
}

const timescaleToDuration = {
  weeks: TimescaleType.week,
  months: TimescaleType.month,
  years: TimescaleType.month,
  days: TimescaleType.month,
  hours: TimescaleType.month,
  minutes: TimescaleType.month,
  seconds: TimescaleType.month,
};

const endOfNextQuarter = (date: Date) => {
  return endOfQuarter(add(startOfQuarter(date), { months: 3 }));
};

const gather = (
  type: keyof Duration,
  start: Date,
  end: Date,
): Array<TimescaleData> => {
  if (isAfter(start, end)) {
    return [];
  }

  return [
    {
      startDate: start,
      endDate: new Date(add(start, { [type]: 1 }).getTime() - 1), // minus one milisecond to line up times
      type: timescaleToDuration[type],
    },
    ...gather(type, add(start, { [type]: 1 }), end),
  ];
};

export const getWeeks = (date: Date): TimescaleData[] => {
  const numberWeeksInMonth = getWeeksInMonth(date, { weekStartsOn: 1 });
  const currentWeekNumber = getWeekOfMonth(date, { weekStartsOn: 1 });
  const remainingWeeks = numberWeeksInMonth - currentWeekNumber;

  return gather(
    "weeks",
    getStartOfWeek(date),
    remainingWeeks >= 3 ? getEndOfMonth(date) : endOfNextMonth(date),
  );
};
