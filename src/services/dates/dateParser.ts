// Currently the APIs format is: “YYYY-MM-DD“
// we want to disregard the time without changing the date to a local timezone
export function StringToDate(dateString: string): Date {
  const date = new Date(dateString + "T00:00:00Z");
  return DatetimeToDate(date);
}

export function DatetimeToDate(date: Date): Date {
  date.setHours(-date.getTimezoneOffset() / 60, 0, 0, 0);
  return date;
}
