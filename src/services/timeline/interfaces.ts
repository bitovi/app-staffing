export type TimelineData = {
  startDate: Date;
  endDate: Date;
  type: TimescaleType;
  title: string;
};

export enum TimescaleType {
  week,
  month,
  quarter,
}
export interface TimelineConfiguration {
  minimumWeeksShown?: number;
  minimumMonthsShown?: number;
}
