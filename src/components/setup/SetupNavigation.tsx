import { NavLink } from "react-router";
import styles from "./setup.module.css";
import { motion } from "motion/react";

export default function SetupNavigation() {
	return (
		<>
			<motion.nav
				className={styles["nav-container"]}
				whileHover={{ scale: 1.02 }}
			>
				<NavLink
					to={"/setup/1"}
					className={({ isActive }) =>
						isActive ? styles["nav-item-active"] : ""
					}
				>
					Fixed expenses
				</NavLink>
				<NavLink
					to={"/setup/2"}
					className={({ isActive }) =>
						isActive ? styles["nav-item-active"] : ""
					}
				>
					Variable expenses
				</NavLink>
				<NavLink
					to={"/setup/3"}
					className={({ isActive }) =>
						isActive ? styles["nav-item-active"] : ""
					}
				>
					Seasonal expenses
				</NavLink>
				<NavLink
					to={"/setup/4"}
					className={({ isActive }) =>
						isActive ? styles["nav-item-active"] : ""
					}
				>
					Savings
				</NavLink>
				<NavLink
					to={"/setup/5"}
					className={({ isActive }) =>
						isActive ? styles["nav-item-active"] : ""
					}
				>
					Income
				</NavLink>
			</motion.nav>
		</>
	);
}
