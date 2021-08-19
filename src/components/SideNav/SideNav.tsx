// import MenuIcon from "../../Icons/menu.svg";
import styles from "./SideNav.module.css";
//NavLinks

export default function SideNav(): JSX.Element {
    return (
        <div className={styles.Wrapper}>
            <a href="/">
                Dashboard
            </a>
            <a href="/bob">
                Employees
            </a>
        </div>
    );
}
