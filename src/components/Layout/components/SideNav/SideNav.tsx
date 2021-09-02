import { NavLink } from "react-router-dom";

import styles from "./SideNav.module.scss";

import BitoviLogo from "./assets/bitovi.png";
import homeIcon from "./assets/Home.svg";
import userIcon from "./assets/User.svg";
import projectIcon from "./assets/Activity.svg";

export default function SideNav(): JSX.Element {
  const links = [
    {
      exact: true,
      link: "/",
      label: "Home",
      icon: homeIcon,
    },
    {
      link: "/employees",
      label: "Employees",
      icon: userIcon,
    },
    {
      link: "/projects",
      label: "Projects",
      icon: projectIcon,
    },
  ];
  return (
    <div className={styles.wrapper}>
      <img src={BitoviLogo} alt="Bitovi" className={styles.image} />

      {links.map(({ exact, link, label, icon }) => (
        <NavLink
          exact={exact}
          key={label}
          to={link}
          activeClassName={styles.activeLink}
          className={styles.inactiveLink}
        >
          <img src={icon} alt={label} className={styles.icon} />
          {label}
        </NavLink>
      ))}
      <div />
    </div>
  );
}
