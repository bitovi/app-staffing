import { NavLink } from "react-router-dom";
import styles from "./SideNav.module.css";
import BitoviLogo from "../../Icons/Bitovi.png";

export default function SideNav(): JSX.Element {
  const links = [
    {
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
