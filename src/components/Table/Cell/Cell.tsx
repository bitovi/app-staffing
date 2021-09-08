import type { ReactNode } from "react";
import classnames from "classnames";

import styles from "./Cell.module.scss";

type Cell = {
  className?: string;
  children?: ReactNode;
};

/**
 * To be used as part of a Table.
 *
 * First child/children under Row or Header.
 * Can contain plain text or a component.
 *
 */
export function Cell({ className, children }: Cell): JSX.Element {
  return <div className={classnames(styles.cell, className)}>{children}</div>;
}
