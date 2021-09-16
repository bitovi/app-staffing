import { ReactNode } from "react";
import ReactSelect from "react-select";

import styles from "./Select.module.scss";

interface SelectProps {
  "data-testid"?: string;
  className?: string;
  disabled?: boolean;
  name: string;
  label: string;
  value?: string;
  options: Array<{
    value?: string;
    label: ReactNode;
  }>;
  onChange(value?: string): void;
  onBlur?(): void;
  onFocus?(): void;
}

export function Select({
  className,
  disabled,
  name,
  label,
  value,
  options,
  onChange,
  onBlur,
  onFocus,
  ...restOfProps
}: SelectProps): JSX.Element {
  const activeOption = options.find((option) => option.value === value);

  return (
    <label data-testid={restOfProps["data-testid"]} className={className}>
      <div className={styles.label}>{label}</div>
      <ReactSelect
        className={styles.select}
        classNamePrefix="react-select" // https://react-select.com/styles#using-classnames
        isDisabled={disabled}
        name={name}
        value={activeOption}
        options={options}
        onBlur={onBlur}
        onChange={(option) => onChange(option?.value ?? undefined)}
        onFocus={onFocus}
      />
    </label>
  );
}
