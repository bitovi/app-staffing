import { ReactNode } from "react";
import ReactSelect from "react-select";

import styles from "./Select.module.scss";

interface SelectProps {
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
}: SelectProps): JSX.Element {
  const activeOption = options.find((option) => option.value === value);

  return (
    <label className={className}>
      {label && <div className={styles.label}>{label}</div>}
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
