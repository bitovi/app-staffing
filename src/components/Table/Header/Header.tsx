import type { ReactNode } from "react";
import classnames from "classnames";

import styles from "./Header.module.scss";

type Header = {
  className?: string;
  children?: ReactNode | ReactNode[];
};

/**
 * To be used as part of a Table.
 *
 * Top-level child of Table.
 * Functionally identical to Row but with different styling.
 * Should contain one or more Cell components as children.
 * Header and Rows of the same Table should contain the same number of Cell components.
 *
 */
export function Header({ className, children }: Header): JSX.Element {
  return <div className={classnames(styles.header, className)}>{children}</div>;
}
