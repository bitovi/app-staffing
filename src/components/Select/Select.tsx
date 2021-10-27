import { ReactNode } from "react";
import ReactSelect from "react-select";

import styles from "./Select.module.scss";

interface SelectProps<Type> {
  className?: string;
  disabled?: boolean;
  name: string;
  label: string;
  value?: Type;
  options: Array<{
    value?: Type;
    label: ReactNode;
  }>;
  onChange(value?: Type): void;
  onBlur?(): void;
  onFocus?(): void;
  placeholder?: string;
}

export default function Select<Type>({
  className,
  disabled,
  name,
  label,
  value,
  options,
  onChange,
  onBlur,
  onFocus,
  placeholder = "Select...",
}: SelectProps<Type>): JSX.Element {
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
        onChange={(option) => onChange(option?.value)}
        onFocus={onFocus}
        placeholder={placeholder}
      />
    </label>
  );
}
