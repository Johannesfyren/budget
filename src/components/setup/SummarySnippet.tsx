import styles from "./setup.module.css";
import { useQuery } from "@tanstack/react-query";
import { setCurrencyPeriod } from "../../utils/helper";
import { easeIn, easeInOut, easeOut, motion } from "motion/react";
import { useState } from "react";

export default function SummarySnippet() {
	const querySummary = useQuery({
		queryKey: ["expenseSummary"],
		queryFn: () => getExpenseSummary(),
	});

	let expenseTotal = querySummary.data?.expenseSum?.[0]?.total || 0;
	let incomeTotal = querySummary.data?.incomeSum?.[0]?.total || 0;

	// let previousExpenseTotal = expenseTotal;
	const [expenseChanged, setExpenseChanged] = useState(false);

	const getExpenseSummary = async () => {
		try {
			const response = await fetch(
				`http://127.0.0.1:3001/setup/expenses/getExpenseSummary`,
				{
					headers: {
						authorization: `authorization ${localStorage.getItem(
							"accessToken"
						)}`,
					},
				}
			);

			if (response.status >= 401) {
				console.log("couldnt fetch summary");
			}

			const data = await response.json();

			expenseTotal = data.expenseSum[0].total;
			incomeTotal = data.incomeSum[0].total;
			// if (previousExpenseTotal != expenseTotal) {
			// 	setExpenseChanged(true);
			// }

			return data;
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles["summary-container"]}>
			<motion.h3
				initial={{ opacity: 0.5, scale: 1.2, color: "red" }}
				animate={{ opacity: 1, scale: 1, color: "white" }}
				transition={{ duration: 0.5, ease: easeInOut }}
				key={"expenseTotal"}
			>
				<span>Expenses:</span> {setCurrencyPeriod(expenseTotal, true)}
			</motion.h3>

			<span className={styles["divider"]}>|</span>
			<motion.h3
				initial={{ opacity: 0.5, scale: 1.2, color: "green" }}
				animate={{ opacity: 1, scale: 1, color: "white" }}
				transition={{ duration: 0.5, ease: easeInOut }}
				key={"incomeTotal"}
			>
				<span>Income:</span> {setCurrencyPeriod(incomeTotal, true)}
			</motion.h3>
			<span className={styles["divider"]}>|</span>
			<h3
				className={
					incomeTotal - expenseTotal >= 0
						? styles["summary-surplus"]
						: styles["summary-deficit"]
				}
			>
				<span>
					{incomeTotal - expenseTotal >= 0
						? "Surplus: "
						: "Deficit: "}
				</span>
				{setCurrencyPeriod(incomeTotal - expenseTotal, true)}
			</h3>
		</div>
	);
}
