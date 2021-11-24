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
  isBefore,
} from "date-fns";

import {
  getStartOfWeek,
  getEndOfMonth,
  getEndOfNextMonth,
  getStartOfMonth,
  getEndOfQuarter,
  getEndOfNextQuarter,
  getNextMonth,
  getCannonMonth,
} from "./utilities";

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
    remainingWeeks >= 3 ? getEndOfMonth(date) : getEndOfNextMonth(date),
  );
};

// always show at least two full months that aren't broken down. if the last month
// being displayed breaks
// into the next quarter then show the entire wuarter broken down into months
export const getMonths = (date: Date): TimescaleData[] => {
  const numberOfMonthsInQuarter = 3;
  const currentMonth = getCannonMonth(date) % numberOfMonthsInQuarter;

  const numberMonthsRemainingInQuarter = numberOfMonthsInQuarter - currentMonth;

  let start = getStartOfMonth(date);
  const end =
    numberMonthsRemainingInQuarter >= 2
      ? getEndOfQuarter(date)
      : getEndOfNextQuarter(date);

  const time: TimescaleData[] = [];
  while (isBefore(start, end)) {
    time.push({
      startDate: start,
      endDate: getEndOfMonth(start),
      type: TimescaleType.month,
    });

    start = getNextMonth(start);
  }

  return time;
};
