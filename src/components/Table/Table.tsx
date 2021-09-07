import type { ReactNode } from "react";
import classnames from "classnames";

import styles from "./Table.module.scss";

type Cell = {
  className?: string;
  children?: ReactNode;
};

type Row = {
  className?: string;
  children?: ReactNode | ReactNode[];
};

interface TableProps {
  className?: string;
  children?: ReactNode | ReactNode[];
}

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

/**
 * To be used as part of a Table.
 *
 * Top-level child of Table.
 * Functionally identical to Row but with different styling.
 * Should contain one or more Cell components as children.
 * Header and Rows of the same Table should contain the same number of Cell components.
 *
 */
export function Header({ className, children }: Row): JSX.Element {
  return <div className={classnames(styles.header, className)}>{children}</div>;
}

/**
 * To be used as part of a Table.
 *
 * Top-level child of Table.
 * Should contain one or more Cell components as children.
 * Header and Rows of the same Table should contain the same number of Cell components.
 *
 */
export function Row({ className, children }: Row): JSX.Element {
  return <div className={classnames(styles.row, className)}>{children}</div>;
}

/**
 * Table > Header/Row > Cell
 *
 * Should contain Header and Row components as top-level children.
 *
 */
export function Table(props: TableProps): JSX.Element {
  return (
    <div className={classnames(styles.table, props.className)}>
      <div className={styles.rows}>{props.children}</div>
    </div>
  );
}
