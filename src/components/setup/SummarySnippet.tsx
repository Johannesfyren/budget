import styles from "./setup.module.css";
import { useQuery } from "@tanstack/react-query";
import { setCurrencyPeriod } from "../../utils/helper";

export default function SummarySnippet() {
	const querySummary = useQuery({
		queryKey: ["expenseSummary"],
		queryFn: () => getExpenseSummary(),
	});
	let expenseTotal = querySummary.data?.expenseSum?.[0]?.total || 0;
	let incomeTotal = querySummary.data?.incomeSum?.[0]?.total || 0;

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
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles["summary-container"]}>
			<h3>
				<span>Expenses:</span> {setCurrencyPeriod(expenseTotal, true)}
			</h3>

			<span className={styles["divider"]}>|</span>
			<h3>
				<span>Income:</span> {setCurrencyPeriod(incomeTotal, true)}
			</h3>
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
