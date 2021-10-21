import SideNav from "./components/SideNav";

import styles from "./Layout.module.scss";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <SideNav />

      <div className={styles.content}>{children}</div>
    </div>
  );
}
