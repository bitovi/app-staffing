import { NavLink } from "react-router-dom";

import styles from "./SideNav.module.scss";

import bitoviLogo from "./assets/bitovi-logo-text.png";
import dashboardIcon from "./assets/dashboard.svg";
import teamMembersIcon from "./assets/team-members.svg";
import projectsIcon from "./assets/projects.svg";
import skillsIcon from "./assets/skills.svg";

export default function SideNav(): JSX.Element {
  const links = [
    {
      exact: true,
      link: "/",
      label: "Dashboard",
      icon: dashboardIcon,
    },
    {
      link: "/team-members",
      label: "Team Members",
      icon: teamMembersIcon,
    },
    {
      link: "/projects",
      label: "Projects",
      icon: projectsIcon,
    },
    {
      link: "/skills",
      label: "Skills",
      icon: skillsIcon,
    },
  ];

  return (
    <div className={styles.sidenav}>
      <img src={bitoviLogo} alt="Bitovi" className={styles.logo} />

      {links.map(({ exact, link, label, icon }) => (
        <NavLink
          exact={exact}
          key={label}
          to={link}
          activeClassName={styles.active}
          className={styles.link}
        >
          <img src={icon} alt={label} className={styles.icon} />
          {label}
        </NavLink>
      ))}
      <div />
    </div>
  );
}
