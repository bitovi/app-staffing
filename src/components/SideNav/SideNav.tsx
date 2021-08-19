import { NavLink } from "react-router-dom";
import styles from "./SideNav.module.css";

export default function SideNav(): JSX.Element {
  const links = [
    {
      link: "/",
      label: "Dashboard",
    },
    {
      link: "/bob",
      label: "Employees",
    },
    {
      link: "/dylan",
      label: "Clients",
    },
  ];
  return (
    <div className={styles.wrapper}>
      {links.length === 0
        ? "Error"
        : links.map(({ link, label }) => (
            <NavLink
              exact
              key={label}
              to={link}
              activeClassName={styles.activeLink}
              className={styles.links}
            >
              {label}
            </NavLink>
          ))}
      <div />
    </div>
  );
}
