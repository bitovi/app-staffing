import {
  TimescaleType,
  getTimescaleData,
  getStartOfMonth,
  getEndOfMonth,
  getMonthForWeek,
} from "./timesReport";

describe("time report time scale logic", () => {
  const JAN_FOURTH_2021 = new Date(2021, 0, 4);
  it("should show at least three weeks", () => {
    const timescaleData = getTimescaleData(JAN_FOURTH_2021);

    expect(timescaleData[0].startDate.toISOString()).toBe(
      "2021-01-04T05:00:00.000Z",
    );
    expect(timescaleData[0].type).toBe(TimescaleType.week);
    expect(timescaleData[1].startDate.toISOString()).toBe(
      "2021-01-11T05:00:00.000Z",
    );
    expect(timescaleData[1].type).toBe(TimescaleType.week);
    expect(timescaleData[2].startDate.toISOString()).toBe(
      "2021-01-18T05:00:00.000Z",
    );
    expect(timescaleData[2].type).toBe(TimescaleType.week);
  });

  const THIRD_WEEK_IN_JAN = new Date(2021, 0, 18);
  it("should show the entire month broken down into weeks if third week breaks into new month", () => {
    const timescaleData = getTimescaleData(THIRD_WEEK_IN_JAN);

    expect(timescaleData[1].startDate.toISOString()).toBe(
      "2021-01-25T05:00:00.000Z",
    );
    expect(timescaleData[2].startDate.toISOString()).toBe(
      "2021-02-01T05:00:00.000Z",
    );
    expect(timescaleData[3].startDate.toISOString()).toBe(
      "2021-02-08T05:00:00.000Z",
    );
    expect(timescaleData[4].startDate.toISOString()).toBe(
      "2021-02-15T05:00:00.000Z",
    );
    expect(timescaleData[5].startDate.toISOString()).toBe(
      "2021-02-22T05:00:00.000Z",
    );
  });

  it("show at least two full months that aren't broken down", () => {
    const timescaleData = getTimescaleData(JAN_FOURTH_2021);

    expect(timescaleData[3].startDate.toISOString()).toBe(
      "2021-02-01T05:00:00.000Z",
    );
    expect(timescaleData[3].type).toBe(TimescaleType.month);

    expect(timescaleData[4].startDate.toISOString()).toBe(
      "2021-03-01T05:00:00.000Z",
    );
    expect(timescaleData[4].type).toBe(TimescaleType.month);
  });

  const FEB_FIRST_2021 = new Date(2021, 1, 1);
  it("should return the entire quarter broken down into months, if the last month breaks into the next quarter", () => {
    const timescaleData = getTimescaleData(FEB_FIRST_2021);

    // month which breaks into second quarter.
    expect(timescaleData[4].startDate.toISOString()).toBe(
      "2021-04-05T05:00:00.000Z",
    );
    expect(timescaleData[4].type).toBe(TimescaleType.month);

    // broken down quarter
    expect(timescaleData[5].startDate.toISOString()).toBe(
      "2021-05-03T05:00:00.000Z",
    );
    expect(timescaleData[5].type).toBe(TimescaleType.month);

    expect(timescaleData[6].startDate.toISOString()).toBe(
      "2021-05-31T05:00:00.000Z",
    );
    expect(timescaleData[5].type).toBe(TimescaleType.month);
  });

  it("should return one full quarter that is not broken down", () => {
    const timescaleData = getTimescaleData(JAN_FOURTH_2021);

    expect(timescaleData[4].type).toBe(TimescaleType.month);
    expect(timescaleData[4].startDate.toISOString()).toBe(
      "2021-03-01T05:00:00.000Z",
    );

    expect(timescaleData[5].type).toBe(TimescaleType.quarter);
    expect(timescaleData[5].startDate.toISOString()).toBe(
      "2021-04-05T05:00:00.000Z",
    );
  });

  const JAN_15_2018 = new Date(2018, 0, 15);
  it("should return minimum(6) timescale data", function () {
    const timescaleData = getTimescaleData(JAN_15_2018);

    expect(timescaleData.length).toBe(7);
    expect(timescaleData[0].startDate.toISOString()).toBe(
      "2018-01-15T05:00:00.000Z",
    );
    expect(timescaleData[1].startDate.toISOString()).toBe(
      "2018-01-22T05:00:00.000Z",
    );
    expect(timescaleData[2].startDate.toISOString()).toBe(
      "2018-01-29T05:00:00.000Z",
    );
    expect(timescaleData[3].startDate.toISOString()).toBe(
      "2018-02-05T05:00:00.000Z",
    );
    expect(timescaleData[4].startDate.toISOString()).toBe(
      "2018-03-05T05:00:00.000Z",
    );
    expect(timescaleData[5].startDate.toISOString()).toBe(
      "2018-04-02T05:00:00.000Z",
    );
    expect(timescaleData[6].startDate.toISOString()).toBe(
      "2018-07-02T05:00:00.000Z",
    );
  });

  const JAN_22_2018 = new Date(2018, 0, 22);
  it("should return maximum(12) timescale data", function () {
    const timescaleData = getTimescaleData(JAN_22_2018);

    expect(timescaleData.length).toBe(12);

    // First Week
    expect(timescaleData[0].startDate.toISOString()).toBe(
      "2018-01-22T05:00:00.000Z",
    );
    // Second Week
    expect(timescaleData[1].startDate.toISOString()).toBe(
      "2018-01-29T05:00:00.000Z",
    );
    // Third Week
    expect(timescaleData[2].startDate.toISOString()).toBe(
      "2018-02-05T05:00:00.000Z",
    );
    // Fourth Week
    expect(timescaleData[3].startDate.toISOString()).toBe(
      "2018-02-12T05:00:00.000Z",
    );
    // Fifth Week
    expect(timescaleData[4].startDate.toISOString()).toBe(
      "2018-02-19T05:00:00.000Z",
    );
    // Fifth Week
    expect(timescaleData[5].startDate.toISOString()).toBe(
      "2018-02-26T05:00:00.000Z",
    );
    // Next Month
    expect(timescaleData[6].startDate.toISOString()).toBe(
      "2018-03-05T05:00:00.000Z",
    );
    // Second Month
    expect(timescaleData[7].startDate.toISOString()).toBe(
      "2018-04-02T05:00:00.000Z",
    );
    // Third Month
    expect(timescaleData[8].startDate.toISOString()).toBe(
      "2018-04-30T05:00:00.000Z",
    );
    // Fourth Month
    expect(timescaleData[9].startDate.toISOString()).toBe(
      "2018-06-04T05:00:00.000Z",
    );
    // Next Quarter
    expect(timescaleData[10].startDate.toISOString()).toBe(
      "2018-07-02T05:00:00.000Z",
    );
    // Second Quarter
    expect(timescaleData[11].startDate.toISOString()).toBe(
      "2018-10-01T05:00:00.000Z",
    );
  });
});

describe("getStartOfMonth", () => {
  it("should return correct start dates", function () {
    const MONTH_OF_MAY = new Date(2018, 4);
    const firstWeekOfMay = getStartOfMonth(MONTH_OF_MAY);
    expect(firstWeekOfMay.toISOString()).toBe("2018-04-30T05:00:00.000Z");

    const MONTH_OF_JAN = new Date(2018, 0);
    const firstWeekOfJan = getStartOfMonth(MONTH_OF_JAN);
    expect(firstWeekOfJan.toISOString()).toBe("2018-01-01T05:00:00.000Z");

    const MONTH_OF_JUNE = new Date(2018, 5);
    const firstWeekOfJune = getStartOfMonth(MONTH_OF_JUNE);
    expect(firstWeekOfJune.toISOString()).toBe("2018-06-04T05:00:00.000Z");
  });
});

describe("getEndOfMonth", () => {
  it("should return correct end dates", function () {
    const MONTH_OF_MAY = new Date(2018, 4);
    const firstWeekOfMay = getEndOfMonth(MONTH_OF_MAY);
    expect(firstWeekOfMay.toISOString()).toBe("2018-05-28T05:00:00.000Z");

    const MONTH_OF_DEC = new Date(2018, 11);
    const firstWeekOfDec = getEndOfMonth(MONTH_OF_DEC);
    expect(firstWeekOfDec.toISOString()).toBe("2018-12-24T05:00:00.000Z");
  });
});

describe("get month", () => {
  it("should return correct months", function () {
    const APRIL_30_2018 = new Date(2018, 3, 30);
    const month1 = getMonthForWeek(APRIL_30_2018);
    expect(month1).toBe(4);

    const APRIL_16_2018 = new Date(2018, 3, 16);
    const month2 = getMonthForWeek(APRIL_16_2018);
    expect(month2).toBe(3);
  });
});
