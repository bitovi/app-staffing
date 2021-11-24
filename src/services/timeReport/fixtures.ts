export const January = 0;
export const February = 1;
export const March = 2;
export const April = 3;
export const May = 4;
export const June = 5;
export const July = 6;
export const August = 7;
export const September = 8;
export const October = 9;
export const November = 10;
export const December = 11;

export const Q1 = 1;
export const Q2 = 2;
export const Q3 = 3;
export const Q4 = 4;

/**
 * Weeks must have a minimum of 3 shown. The maximum
 * number of weeks possible to show is 6.
 */
export const weeksFixtures = [
  {
    date: new Date(2021, January, 6),
    weeks: [
      [new Date(2021, January, 4), new Date(2021, January, 11)],
      [new Date(2021, January, 11), new Date(2021, January, 18)],
      [new Date(2021, January, 18), new Date(2021, January, 25)],
      [new Date(2021, January, 25), new Date(2021, February, 1)],
    ],
  },
  {
    date: new Date(2021, January, 20),
    weeks: [
      [new Date(2021, January, 18), new Date(2021, January, 25)],
      [new Date(2021, January, 25), new Date(2021, February, 1)],
      [new Date(2021, February, 1), new Date(2021, February, 8)],
      [new Date(2021, February, 8), new Date(2021, February, 15)],
      [new Date(2021, February, 15), new Date(2021, February, 22)],
      [new Date(2021, February, 22), new Date(2021, February, 29)],
    ],
  },
  {
    date: new Date(2021, May, 10),
    weeks: [
      [new Date(2021, May, 10), new Date(2021, May, 17)],
      [new Date(2021, May, 17), new Date(2021, May, 24)],
      [new Date(2021, May, 24), new Date(2021, May, 31)],
    ],
  },
  {
    date: new Date(2022, January, 25),
    weeks: [
      [new Date(2022, January, 24), new Date(2022, January, 31)],
      [new Date(2022, January, 31), new Date(2022, February, 7)],
      [new Date(2022, February, 7), new Date(2022, February, 14)],
      [new Date(2022, February, 14), new Date(2022, February, 21)],
      [new Date(2022, February, 21), new Date(2022, February, 28)],
    ],
  },
];

/**
 * min 2 max 4
 */
export const monthFixtures = [
  {
    date: new Date(2021, February, 10),
    months: [
      [new Date(2021, February, 1), new Date(2021, March, 1)],
      [new Date(2021, March, 1), new Date(2021, April, 5)],
    ],
  },
  {
    date: new Date(2021, April, 14),
    months: [
      [new Date(2021, April, 5), new Date(2021, May, 3)],
      [new Date(2021, May, 3), new Date(2021, May, 31)],
      [new Date(2021, May, 31), new Date(2021, July, 5)],
    ],
  },
  {
    date: new Date(2021, June, 14),
    months: [
      [new Date(2021, May, 31), new Date(2021, July, 5)],
      [new Date(2021, July, 5), new Date(2021, August, 2)],
      [new Date(2021, August, 2), new Date(2021, August, 30)],
      [new Date(2021, August, 30), new Date(2021, October, 4)],
    ],
  },
];

export const timeLineFixtures = [
  {
    date: new Date(2018, January, 15),
    weeks: [],
    months: [],
    quarters: [],
  },
];
