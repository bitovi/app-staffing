import type { ReactNode } from "react";
import classnames from "classnames";

import styles from "./Table.module.scss";

interface TableProps {
  className?: string;
  children?: ReactNode | ReactNode[];
}

/**
 * Table > Header/Row > Cell
 *
 * Should contain Header and Row components as top-level children.
 *
 */
export default function Table(props: TableProps): JSX.Element {
  return (
    <div className={classnames(styles.table, props.className)}>
      {props.children}
    </div>
  );
}
