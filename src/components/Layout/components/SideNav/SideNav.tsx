import { NavLink } from "react-router-dom";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faHome as homeIcon,
  faUserAlt as userIcon,
  faTasks as tasksIcon,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./SideNav.module.scss";

import BitoviLogo from "./assets/bitovi.png";

export default function SideNav(): JSX.Element {
  const links = [
    {
      exact: true,
      link: "/",
      label: "Dashboard",
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
      icon: tasksIcon,
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
          <Icon icon={icon} />
          {label}
        </NavLink>
      ))}
      <div />
    </div>
  );
}
