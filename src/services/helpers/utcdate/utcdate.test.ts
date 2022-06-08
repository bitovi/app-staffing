import { formatDateToUTC } from "./";

describe("utcdate helper", () => {
  describe("when given a Date constructor", () => {
    describe("created with a timestamp string 'T00:00:00.000Z", () => {
      const dateWithTimestamp = new Date("2023-05-15T00:00:00.000Z");
      it("returns a the day of the same day, regardless of time zone ", () => {
        const result = formatDateToUTC(dateWithTimestamp);
        expect(result.getDate()).toBe(15);
      });
    });
    describe("created with a timestamp string 'T23:59:59.999Z", () => {
      const dateWithTimestamp = new Date("2023-05-15T23:59:59.999Z");
      it("returns a the day of the same day, regardless of time zone ", () => {
        const result = formatDateToUTC(dateWithTimestamp);
        expect(result.getDate()).toBe(15);
      });
    });
  });
});

export {};
