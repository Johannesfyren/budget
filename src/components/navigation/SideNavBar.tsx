import styles from "./navbar.module.css";
import { NavLink } from "react-router";

export default function SideNavBar() {
    return(
        <nav className={styles["container"]}>
            <NavLink to={'/'} end>
                Home
            </NavLink>
            <NavLink to={'/setup/1'} end>
                Opsætning
            </NavLink>
        </nav>
    )



}
