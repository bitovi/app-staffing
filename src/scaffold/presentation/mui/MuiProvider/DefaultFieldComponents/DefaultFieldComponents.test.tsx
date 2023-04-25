import { render, fireEvent } from "@testing-library/react";
import { String, Number, Boolean, Date } from ".";

describe("scaffold/presentation/mui/MuiProvider/DefaultFieldComponents", () => {
  describe("String", () => {
    it("works", async () => {
      const callbackFn = jest.fn();
      const { container } = render(
        <String
          value="some string"
          label="StringInput"
          onUpdate={callbackFn}
        />,
      );
      const input = container.querySelector("input");

      if (input) {
        expect(input.value).toEqual("some string");
        fireEvent.change(input, { target: { value: "" } });
      }
      expect(callbackFn).toHaveBeenCalled();
    });
  });

  describe("Number", () => {
    it("formats numbers for us", async () => {
      const callbackFn = jest.fn();
      const { container } = render(
        <Number value={5} label="NumberInput" onUpdate={callbackFn} />,
      );
      const input = container.querySelector("input");

      if (input) {
        expect(input.value).toEqual("5");
        fireEvent.change(input, { target: { value: 51 } });
      }
      expect(callbackFn).toHaveBeenCalled();
    });
  });

  describe("Boolean", () => {
    it("works", async () => {
      const callbackFn = jest.fn();
      const { container } = render(
        <Boolean value={false} label="BooleanInput" onUpdate={callbackFn} />,
      );
      const input = container.querySelector("input");

      if (input) {
        expect(input.checked).toEqual(false);
        fireEvent.click(input);
      }
      expect(callbackFn).toHaveBeenCalled();
    });
  });

  describe("Date", () => {
    it("formats date for us", async () => {
      const callbackFn = jest.fn();
      const { container } = render(
        <Date value="2023-03-08" label="DateInput" onUpdate={callbackFn} />,
      );
      const input = container.querySelector("input");

      if (input) {
        expect(input.value).toEqual("2023-03-08");
        fireEvent.change(input, { target: { value: "2023-03-10" } });
      }
      expect(callbackFn).toHaveBeenCalled();
    });
  });
});
