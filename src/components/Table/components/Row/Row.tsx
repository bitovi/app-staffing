import type { ReactNode } from "react";
import classnames from "classnames";

import styles from "./Row.module.scss";

interface RowProps {
  className?: string;
  children?: ReactNode | ReactNode[];
}

/**
 * To be used as part of a Table.
 *
 * Top-level child of Table.
 * Should contain one or more Cell components as children.
 * Header and Rows of the same Table should contain the same number of Cell components.
 *
 */
export default function Row({ className, children }: RowProps): JSX.Element {
  return <div className={classnames(styles.row, className)}>{children}</div>;
}
