import styles from "./home.module.css";
import ContentContainer from "./ContentContainer";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

export default function Home() {
	return (
		<div
			style={{ display: "flex", flexDirection: "column", width: "100%" }}
		>
			<h1>Home</h1>

			<div className={styles["container"]}>
				<ContentContainer size="4">
					<BarChart />
				</ContentContainer>
				<ContentContainer size="2">
					<PieChart sectionID={1} chartName={"Fixed Expenses"} />
				</ContentContainer>
				<ContentContainer size="2">
					<PieChart sectionID={2} chartName={"Variable Expenses"} />
				</ContentContainer>
				<ContentContainer size="2">
					<PieChart sectionID={3} chartName={"Seasonal Expenses"} />
				</ContentContainer>
				<ContentContainer size="2">
					<PieChart sectionID={4} chartName={"Savings"} />
				</ContentContainer>
			</div>
		</div>
	);
}
