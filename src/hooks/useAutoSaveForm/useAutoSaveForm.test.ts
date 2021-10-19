import { act, renderHook } from "@testing-library/react-hooks";
import useAutoSaveForm from ".";

const onSave = jest.fn();

interface IForm {
  foo: string;
}

const initialFormData: IForm = {
  foo: "bar",
};

jest.useFakeTimers("modern");

describe("useAutoSaveForm", () => {
  it("form data initializes", async () => {
    const { result } = renderHook(() =>
      useAutoSaveForm<IForm>({
        initialFormData,
        onSave,
      }),
    );

    const [formData] = result.current;

    expect(formData).toEqual(initialFormData);
  });

  it("form data updates", async () => {
    const { result } = renderHook(() =>
      useAutoSaveForm<IForm>({
        initialFormData,
        onSave,
      }),
    );
    const newFormData: IForm = {
      foo: "baz",
    };

    const [, setFormData] = result.current;

    await act(async () => {
      setFormData(newFormData);
    });

    const [formData] = result.current;

    expect(formData).toEqual(newFormData);
  });

  it("calls onSave after delay", async () => {
    const autoSaveDebounceDelay = 500;
    const newFormData: IForm = {
      foo: "baz",
    };

    const { result } = renderHook(() =>
      useAutoSaveForm<IForm>({
        initialFormData,
        onSave,
        autoSaveDebounceDelay,
      }),
    );

    const [, setFormData] = result.current;

    await act(async () => {
      setFormData(newFormData);
    });

    expect(onSave).not.toHaveBeenCalled();

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(onSave).toHaveBeenCalledTimes(1);
  });
});
