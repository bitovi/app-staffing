import SideNav from "../../components/SideNav/SideNav";
import styles from "./Layout.module.css";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <SideNav />

      <div>{children}</div>
    </div>
  );
}
