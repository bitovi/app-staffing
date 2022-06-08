//Currently using date-fns, which format function only accepts a Date or a number. I made this function to create a Date of the UTC from the original date.
export const formatDateToUTC = (date: Date): Date => {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
};

export default formatDateToUTC;
