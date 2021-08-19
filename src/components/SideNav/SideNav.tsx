import { NavLink } from 'react-router-dom';
import styles from "./SideNav.module.css";
//NavLinks

export default function SideNav(): JSX.Element {
    return (
        <div className={styles.wrapper}>
            <NavLink to="/" className={styles.links}>
                Dashboard
            </NavLink>
            <NavLink to="/bob" className={styles.links}>
                Employees
            </NavLink>
        </div>
    );
}
