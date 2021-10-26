import { FormControlProps } from "./FormControl/FormControl";

export interface BaseProps {
  label?: JSX.Element | string;
  name: string;
  testid?: string;
  formControlProps?: Omit<FormControlProps, "children" | "label">;
}
