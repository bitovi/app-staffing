// Currently the APIs format is: “YYYY-MM-DD“
// we want to disregard the time without changing the date from any timezone
// we will 
export function StringToDate(dateString: string): Date {
  return new Date(dateString + "T00:00:00Z");
}

export function DatetimeToDate(date: Date): Date {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
}
