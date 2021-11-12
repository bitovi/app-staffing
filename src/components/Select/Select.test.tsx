import { render, screen } from "@testing-library/react";
import { select as selectEvent } from "react-select-event";

import Select from "./Select";

describe("Components/Select", () => {
  const mockOnChange = jest.fn();
  it("works like a form input", async () => {
    const testOptions = [
      { value: "--value1--", label: "Value 1" },
      { value: "--value2--", label: <div>Component Value</div> },
    ];

    render(
      <form data-testid="form">
        <Select
          name="fieldName"
          label="Select Test"
          value=""
          options={testOptions}
          onChange={mockOnChange}
        />
      </form>,
    );

    expect(screen.getByTestId("form")).toHaveFormValues({
      fieldName: "",
    });
    await selectEvent(screen.getByLabelText(/Select Test/), "Value 1");
    expect(screen.getByTestId("form")).toHaveFormValues({
      fieldName: "--value1--",
    });
    expect(mockOnChange).toHaveBeenCalledWith("--value1--");
  });
});
