import styles from "./setup.module.css";
import { createPortal } from "react-dom";
export default function SummarySnippet() {
	return (
		<div className={styles["summary-container"]}>
			<h3>Expenses: 200DKK</h3>
			<span>|</span>
			<h3>Income</h3>
			<span>|</span>
			<h3>Surplus</h3>
		</div>
	);
}
