import { getStartOfMonth, getStartOfWeek, getEndOfMonth } from "./utilities";
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

describe("timeline utilities logic", () => {
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
  ])("finds the start of a month for %s", (date, startOfMonth) => {
    expect(getStartOfMonth(date)).toEqual(startOfMonth);
  });

  it.each([
    [new Date(2021, July, 18), new Date(2021, August, 2)],
    [new Date(2021, June, 18), new Date(2021, July, 5)],
    [new Date(2021, August, 18), new Date(2021, August, 30)],
    [new Date(2021, October, 18), new Date(2021, November, 1)],
  ])("finds the end of month for %s", (date, endOfMonth) => {
    expect(getEndOfMonth(date)).toEqual(new Date(endOfMonth.getTime() - 1));
  });
});
