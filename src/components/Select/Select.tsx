import { ReactNode } from "react";
import ReactSelect from "react-select";

import styles from "./Select.module.scss";

interface SelectProps {
  "data-testid"?: string;
  name: string;
  label: string;
  value?: string;
  options: Array<{
    value?: string;
    label: ReactNode;
  }>;
  onChange(value?: string): void;
}

export function Select({
  name,
  label,
  value,
  options,
  onChange,
  ...restOfProps
}: SelectProps): JSX.Element {
  const activeOption = options.find((option) => option.value === value);

  return (
    <label data-testid={restOfProps["data-testid"]}>
      <div className={styles.label}>{label}</div>
      <ReactSelect
        className={styles.select}
        classNamePrefix="react-select" // https://react-select.com/styles#using-classnames
        name={name}
        value={activeOption}
        options={options}
        onChange={(option) => onChange(option?.value ?? undefined)}
      />
    </label>
  );
}
