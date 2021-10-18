import type { ReactNode } from "react";
import classnames from "classnames";

import styles from "./Cell.module.scss";

type Cell = {
  className?: string;
  children?: ReactNode;
  align?: "left" | "center" | "right";
};

/**
 * To be used as part of a Table.
 *
 * First child/children under Row or Header.
 * Can contain plain text or a component.
 *
 */
export default function Cell({
  align = "left",
  className,
  children,
}: Cell): JSX.Element {
  return (
    <div
      className={classnames(
        styles.cell,
        {
          [styles.alignLeft]: align === "left",
          [styles.alignCenter]: align === "center",
          [styles.alignRight]: align === "right",
        },
        className,
      )}
    >
      {children}
    </div>
  );
}
