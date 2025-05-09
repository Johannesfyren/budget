import styles from "./navbar.module.css";
import { NavLink } from "react-router";
import createLogo from "../../assets/Logo.png";
import createHomeIcon from "../../assets/Home.svg";
import createSetupIcon from "../../assets/settings.svg";
import NavItem from "./NavItem";
import { useState } from "react";

export default function SideNavBar() {
	const [expanded, setExpanded] = useState(true);
	return (
		<nav className={styles["navigation"]}>
			<img src={createLogo} alt="" className={styles["logo"]} />

			<NavLink
				to={"/"}
				className={({ isActive }) =>
					isActive ? styles["nav-item-active"] : ""
				}
				end
			>
				<NavItem
					imgSrc={createHomeIcon}
					itemName={"Overview"}
				></NavItem>
			</NavLink>
			<NavLink
				to={"/setup/1"}
				className={({ isActive }) =>
					isActive ? styles["nav-item-active"] : ""
				}
				end
			>
				<NavItem imgSrc={createSetupIcon} itemName={"Setup"}></NavItem>
			</NavLink>
		</nav>
	);
}
