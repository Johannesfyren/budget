import {ß NavLink } from "react-router";
import styles from "./setup.module.css";

export default function SetupNavigation() {
  const testQuery = async () => {
    const data = await fetch("http://127.0.0.1:3001/setup/1");
    const dataJson = await data.json();
    console.log(dataJson);
  };

  return (
    <nav className={styles["nav-container"]}>
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
        Incomes
      </NavLink>
    </nav>
  );
}
