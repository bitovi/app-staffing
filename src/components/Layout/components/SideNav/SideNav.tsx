import { NavLink } from "react-router-dom";

import styles from "./SideNav.module.scss";

import BitoviLogo from "./assets/bitovi.png";

export default function SideNav(): JSX.Element {
  const links = [
    {
      exact: true,
      link: "/",
      label: "Dashboard",
    },
    {
      link: "/employees",
      label: "Employees",
    },
    {
      link: "/dylan",
      label: "Clients",
    },
  ];
  return (
    <div className={styles.wrapper}>
      <img src={BitoviLogo} alt="Bitovi" className={styles.image} />

      {links.map(({ exact, link, label }) => (
        <NavLink
          exact={exact}
          key={label}
          to={link}
          activeClassName={styles.activeLink}
          className={styles.inactiveLink}
        >
          {label}
        </NavLink>
      ))}
      <div />
    </div>
  );
}
