import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useDebounce, usePrevious } from "react-use";

/*
  This hook is used to auto save form data after a short delay.
*/
export default function useAutoSaveForm<T>({
  initialFormData,
  onSave,
  autoSaveDebounceDelay = 500,
}: {
  initialFormData: T;
  onSave: (formData: T) => void;
  autoSaveDebounceDelay?: number;
}): [formData: T, setFormData: (formData: T) => void] {
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
