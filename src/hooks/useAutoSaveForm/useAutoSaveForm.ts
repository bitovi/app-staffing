import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useDebounce, usePrevious } from "react-use";

interface IProps<T> {
  initialFormData: T;
  onSave: (formData: T) => void;
  autoSaveDebounceDelay?: number;
}

/*
  This hook is used to auto save form data after a short delay.
*/
export default function <T>({
  initialFormData,
  onSave,
  autoSaveDebounceDelay = 500,
}: IProps<T>): [formData: T, setFormData: (formData: T) => void] {
  const [formData, setFormData] = useState<T>(initialFormData);
  const prevFormData = usePrevious(formData);

  // Auto save on change of data
  useDebounce(
    () => {
      if (prevFormData && !isEqual(formData, prevFormData)) {
        onSave(formData);
      }
    },
    autoSaveDebounceDelay,
    [formData, prevFormData, onSave],
  );

  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  return [formData, setFormData];
}
