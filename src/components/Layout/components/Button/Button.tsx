import { ReactNode } from "react";
import classnames from "classnames";

import styles from "./Button.module.scss";

interface ButtonProps {
  "data-testid"?: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  tabIndex?: number;
  title?: string;
  variant?: "basic" | "primary" | "link";
  onClick(): void;
  onKeyDown?(): void;
}

export function Button({
  children,
  className,
  disabled,
  tabIndex,
  title,
  variant = "basic",
  onClick,
  onKeyDown,
  ...restOfProps
}: ButtonProps): JSX.Element {
  return (
    <button
      data-testid={restOfProps["data-testid"]}
      className={classnames(
        styles.button,
        {
          [styles.primary]: variant === "primary",
          [styles.link]: variant === "link",
        },
        className,
      )}
      disabled={disabled}
      tabIndex={tabIndex}
      title={title}
      onClick={onClick}
      onKeyDown={onKeyDown || onClick}
    >
      {children}
    </button>
  );
}
