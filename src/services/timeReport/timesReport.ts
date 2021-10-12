import {
  startOfWeek,
  lastDayOfWeek,
  setDay,
  getMonth,
  add,
  startOfMonth,
  getQuarter,
  endOfMonth,
  addQuarters, endOfQuarter, setQuarter,
} from "date-fns";

export type TimescaleData = {
  startDate: Date,
  endDate: Date,
  type: TimescaleType
}

export enum TimescaleType {
  week,
  month,
  quarter
}


const MIN_WEEKS_FOR_MONTH = 3; // min amount of weeks to show for a month.
const MIN_MONTH_FOR_QUARTER = 2; // min amount of months to show for quarter.
const MIN_QUARTERS = 2; // min amount of quarters


/**
 * Gets the column heading for the
 *
 * * RULES:
 * * A week begins on Monday and ends on Sunday.
 * * A week belongs to the month, quarter, and year that matches its earliest middle workday. (For a week starting on Monday, that would be Wednesday. The effect of this is that it belongs to the month with the most days in that week.)
 * * Always show at least three weeks. If the last week being displayed breaks into the next month, then show the entire month broken down into weeks.
 * * Always show at least two full months that aren't broken down. If the last month being displayed breaks into the next quarter, then show the entire quarter broken down into months.
 * * Always show at least one full quarter that is not broken down. If the last quarter being display breaks into the next year, then show the entire year broken down into months.
 * * Always show at least 6 months total. Additional quarters may be needed to complete the display.
 */
export function getTimescaleData(date: Date): TimescaleData[] {

  const timescales: TimescaleData[] = [];

  //  Get week Data.
  let weekStart = startOfWeek(date, { weekStartsOn: 1 });
  let midWeek = setDay(date, 2, { weekStartsOn: 1 });
  let weekEnd = lastDayOfWeek(date, { weekStartsOn: 1 });

  let weeksForMonth = MIN_WEEKS_FOR_MONTH;
  let currentMonth = getMonth(midWeek); // NB: the month is determined by which ever month midweek falls
  // always show three weeks in a months;
  while (weeksForMonth > 0) {
    // loop until we satisfy rule for weeks. ie. we should show at least `3` weeks.
    // However if we go into a month we should should 3 weeks for that month.

    const columnHeading: TimescaleData = {
      startDate: weekStart,
      endDate: weekEnd,
      type: TimescaleType.week,
    };
    timescales.push(columnHeading);


    // if week falls into next month then reset `weekForMonth` count.
    const isNewMonth = currentMonth !== getMonth(midWeek);
    if (isNewMonth) {
      weeksForMonth = MIN_WEEKS_FOR_MONTH;
      currentMonth = getMonth(midWeek); // set to current month;
    }

    //  go to next week
    weekStart = add(weekStart, { weeks: 1 });
    weekEnd = add(weekEnd, { weeks: 1 });
    midWeek = add(midWeek, { weeks: 1 });

    weeksForMonth--;
  }

  // Get months Data
  let month = add(startOfMonth(weekStart), { months: 1 });
  let monthsForQuarter = MIN_MONTH_FOR_QUARTER;
  let currentQuarter = getQuarter(month);
  while (monthsForQuarter > 0) {
    const timescale: TimescaleData = {
      startDate: month,
      endDate: endOfMonth(month),
      type: TimescaleType.month,
    };
    timescales.push(timescale);

    const isNewQuarter = currentQuarter !== getQuarter(month);
    if (isNewQuarter) {
      // if the quarter changes then show all the months that quarter.
      monthsForQuarter = 3;
      currentQuarter = getQuarter(month);
    }

    month = startOfMonth(add(month, { months: 1 })) ;
    monthsForQuarter--;
  }

  // Get Quarter Data
  let quarterStart = setQuarter(month, currentQuarter + 1);
  let quarterEnd = endOfQuarter(quarterStart);
  let numQuarters = MIN_QUARTERS;
  while (numQuarters > 0) {
    // Get Quarter Data; show the new quarter data.
    const columnHeading: TimescaleData = {
      startDate: quarterStart,
      endDate: quarterEnd,
      type: TimescaleType.quarter,
    };
    timescales.push(columnHeading);


    quarterStart = addQuarters(quarterStart, 1);
    quarterEnd = addQuarters(quarterEnd, 1);
    numQuarters--;
  }


  return timescales;
}
