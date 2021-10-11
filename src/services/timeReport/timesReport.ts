import moment from "moment";

export type ColumnHeading = {
  startDate: Date,
  endDate: Date,
  columnType: ColumnType
  title: string,
}

export enum ColumnType {
  week,
  month,
  quarter
}


const MIN_WEEKS_FOR_MONTH = 3; // min amount of weeks to show for a month.
const MIN_MONTH_FOR_QUARTER = 2; // min amount of months to show for quarter.
const MIN_QUARTERS = 2; // min amount of quarters


moment.updateLocale("en", {
  week: {
    dow: 1, // sets the first day of the week to be monday.
    doy: 7,  // set the weeks to contain seven days
  },
});


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
export function getTimeColumns(date: Date): ColumnHeading[] {

  const columnHeadings: ColumnHeading[] = [];
  const currentDateMoment = moment(date)

  //  Get week Data.
  const weekStart = moment(currentDateMoment).startOf("week");
  const midWeek = moment(currentDateMoment).weekday(2);
  const weekEnd = moment(currentDateMoment).endOf("week");

  let weeksForMonth = MIN_WEEKS_FOR_MONTH;
  let currentMonth = midWeek.month(); // NB: the month is determined by which ever month midweek falls
  // always show three weeks in a months;
  while (weeksForMonth > 0) {
    // loop until we satisfy rule for weeks. ie. we should show at least `3` weeks.
    // However if we go into a month we should should 3 weeks for that month.

    const columnHeading: ColumnHeading = {
      startDate: weekStart.toDate(),
      endDate: weekEnd.toDate(),
      columnType: ColumnType.week,
      title: weekStart.format("MMM Do"),
    };
    columnHeadings.push(columnHeading);


    // if week falls into next month then reset `weekForMonth` count.
    const isNewMonth = currentMonth !== midWeek.month();
    if (isNewMonth) {
      weeksForMonth = MIN_WEEKS_FOR_MONTH;
      currentMonth = midWeek.month(); // set to current month;
    }

    //  go to next week
    weekStart.add(1, "week");
    weekEnd.add(1, "week");
    midWeek.add(1, "week");

    weeksForMonth--;
  }

  // Get months Data
  const month = moment(weekStart).startOf("month").add(1, "month");
  let monthsForQuarter = MIN_MONTH_FOR_QUARTER;
  let currentQuarter = month.quarter();
  while (monthsForQuarter > 0) {
    const columnHeading: ColumnHeading = {
      startDate: month.toDate(),
      endDate: moment(month).endOf("month").toDate(),
      columnType: ColumnType.month,
      title: month.format("MMM YYYY"),
    };
    columnHeadings.push(columnHeading);

    const isNewQuarter = currentQuarter !== month.quarter();
    if (isNewQuarter) {
      // if the quarter changes then show all the months that quarter.
      monthsForQuarter = 3;
      currentQuarter = month.quarter();
    }

    month.add(1, "month").startOf("month");
    monthsForQuarter--;
  }

  // Get Quarter Data
  const quarterStart = moment(month).quarter(currentQuarter + 1);
  const quarterEnd = moment(month).quarter(currentQuarter + 1).add(3, "month").endOf("month");
  let numQuarters = MIN_QUARTERS;
  while (numQuarters > 0) {
    // Get Quarter Data; show the new quarter data.
    const columnHeading: ColumnHeading = {
      startDate: quarterStart.toDate(),
      endDate: quarterEnd.endOf("month").toDate(),
      columnType: ColumnType.quarter,
      title: ` Q${quarterStart.quarter()} ${quarterStart.format("YYYY")}`,
    };
    columnHeadings.push(columnHeading);


    quarterStart.add(1, "quarter");
    quarterEnd.add(1, "quarter");
    numQuarters--;
  }


  return columnHeadings;
}
