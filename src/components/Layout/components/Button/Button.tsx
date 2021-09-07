import { ReactNode } from "react";
import classnames from "classnames";

import styles from "./Button.module.scss";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "link";
  onClick(): void;
}

export function Button({
  children,
  variant = "primary",
  onClick,
}: ButtonProps): JSX.Element {
  return (
    <button
      className={classnames(styles.button, {
        [styles.primary]: variant === "primary",
        [styles.link]: variant === "link",
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
