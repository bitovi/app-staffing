import { DatetimeToDate } from "./dateParser";

it("removes time from date calculations properly", () => {
  const earlyInDayDate: Date = DatetimeToDate(
    new Date("May 23, 2022 00:00:00"),
  );
  const lateInDayDate: Date = DatetimeToDate(new Date("May 23, 2022 23:59:59"));
  expect(earlyInDayDate).toEqual(lateInDayDate);

  const date1: Date = DatetimeToDate(new Date("May 23, 2022 00:00:00"));
  const date2: Date = DatetimeToDate(new Date("May 24, 2022 23:59:59"));
  expect(date1).not.toEqual(date2);
});

export {};
