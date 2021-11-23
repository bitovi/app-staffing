import {
  getStartOfMonth,
  getStartOfWeek,
  getEndOfMonth,
  getEndOfNextMonth,
  getNextMonth,
} from "./utilities";

import {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
} from "../fixtures";
import { getCannonMonth } from ".";

describe.only("timeline utilities logic", () => {
  it.each([
    [new Date(2021, May, 31), June],
    [new Date(2022, January, 31), February],
    [new Date(2021, July, 18), July],
    [new Date(2021, June, 18), June],
    [new Date(2021, August, 18), August],
    [new Date(2021, October, 18), October],
    [new Date(2021, May, 18), May],
    [new Date(2021, December, 1), December],
    [new Date(2021, October, 1), September],
  ])("should get cannon month %s", (date, month) => {
    expect(getCannonMonth(date)).toBe(month);
  });
  it.each([
    [new Date(2021, February, 18), new Date(2021, February, 15)],
    [new Date(2021, March, 15), new Date(2021, March, 15)],
    [new Date(2021, April, 6), new Date(2021, April, 5)],
    [new Date(2021, May, 16), new Date(2021, May, 10)],
  ])("finds the start of a week for %s", (date, startOfWeek) => {
    expect(getStartOfWeek(date)).toEqual(startOfWeek);
  });

  it.each([
    [new Date(2021, July, 18), new Date(2021, July, 5)],
    [new Date(2021, September, 29), new Date(2021, August, 30)],
    [new Date(2022, January, 13), new Date(2022, January, 3)],
    [new Date(2025, January, 15), new Date(2024, December, 30)],
    [new Date(2021, May, 31), new Date(2021, May, 31)],
    [new Date(2022, January, 31), new Date(2022, January, 31)],
  ])("finds the start of a month for %s", (date, startOfMonth) => {
    expect(getStartOfMonth(date)).toEqual(startOfMonth);
  });

  it.each([
    [new Date(2022, January, 31), new Date(2022, February, 28)],
    [new Date(2021, July, 18), new Date(2021, August, 2)],
    [new Date(2021, June, 18), new Date(2021, July, 5)],
    [new Date(2021, August, 18), new Date(2021, August, 30)],
    [new Date(2021, October, 18), new Date(2021, November, 1)],
    [new Date(2021, May, 18), new Date(2021, May, 31)],
    [new Date(2021, May, 31), new Date(2021, July, 5)],
  ])("finds the end of month for %s", (date, endOfMonth) => {
    expect(getEndOfMonth(date)).toEqual(new Date(endOfMonth.getTime() - 1));
  });

  it.each([
    [new Date(2021, May, 18), new Date(2021, May, 31)],
    [new Date(2021, May, 31), new Date(2021, July, 5)],
    [new Date(2021, June, 12), new Date(2021, July, 5)],
    [new Date(2021, December, 20), new Date(2022, January, 3)],
  ])("gets next month %s", (date, nextMonth) => {
    expect(getNextMonth(date)).toEqual(nextMonth);
  });

  it.each([
    [new Date(2021, June, 6), new Date(2021, August, 2)],
    [new Date(2021, May, 18), new Date(2021, July, 5)],
    [new Date(2021, July, 18), new Date(2021, August, 30)],
    [new Date(2021, September, 18), new Date(2021, November, 1)],
  ])("finds end of next month %s", (date, endOfNextMonth) => {
    expect(getEndOfNextMonth(date)).toEqual(
      new Date(endOfNextMonth.getTime() - 1),
    );
  });

  // it.skip.each([])("finds end of quarter %s", () => {});

  // it.skip.each([])("finds end of next quarter %s", () => {});
});
