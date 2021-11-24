import {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  October,
  November,
  December,
} from "./constants";
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
    weeks: [
      [new Date(2018, January, 15), new Date(2018, January, 22)],
      [new Date(2018, January, 22), new Date(2018, January, 29)],
      [new Date(2018, January, 29), new Date(2018, February, 5)],
    ],
    months: [
      [new Date(2018, February, 5), new Date(2018, March, 5)],
      [new Date(2018, March, 5), new Date(2018, April, 2)],
    ],
    quarters: [
      [new Date(2018, April, 2), new Date(2018, July, 2)],
      [new Date(2018, July, 2), new Date(2018, October, 1)],
    ],
  },
  {
    date: new Date(2018, January, 22),
    weeks: [
      [new Date(2018, January, 22), new Date(2018, January, 29)],
      [new Date(2018, January, 29), new Date(2018, February, 5)],
      [new Date(2018, February, 5), new Date(2018, February, 12)],
      [new Date(2018, February, 12), new Date(2018, February, 19)],
      [new Date(2018, February, 19), new Date(2018, February, 26)],
      [new Date(2018, February, 26), new Date(2018, March, 5)],
    ],
    months: [
      [new Date(2018, March, 5), new Date(2018, April, 2)],
      [new Date(2018, April, 2), new Date(2018, April, 30)],
      [new Date(2018, April, 30), new Date(2018, June, 4)],
      [new Date(2018, June, 4), new Date(2018, July, 2)],
    ],
    quarters: [[new Date(2018, July, 2), new Date(2018, October, 1)]],
  },
  {
    date: new Date(2021, November, 24),
    weeks: [
      [new Date(2021, November, 22), new Date(2021, November, 29)],
      [new Date(2021, November, 29), new Date(2021, December, 6)],
      [new Date(2021, December, 6), new Date(2021, December, 13)],
      [new Date(2021, December, 13), new Date(2021, December, 20)],
      [new Date(2021, December, 20), new Date(2021, December, 27)],
      [new Date(2021, December, 27), new Date(2022, January, 3)],
    ],
    months: [
      [new Date(2022, January, 3), new Date(2022, January, 31)],
      [new Date(2022, January, 31), new Date(2022, February, 28)],
      [new Date(2022, February, 28), new Date(2022, April, 4)],
    ],
    quarters: [
      [new Date(2022, April, 4), new Date(2022, July, 4)],
      [new Date(2022, July, 4), new Date(2022, October, 3)],
    ],
  },
];
