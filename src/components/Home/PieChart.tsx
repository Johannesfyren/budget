import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AgCharts } from "ag-charts-react";
import styles from "./home.module.css";

interface chartTypes {
	sectionID: number;
	chartName: string;
}

export default function PieChart({ sectionID, chartName }: chartTypes) {
	const params = useParams();
	const navigate = useNavigate();
	const queryGetCategories = useQuery({
		queryKey: ["categoriesSumBySection", sectionID],
		queryFn: () => getCategories(Number(sectionID)),
	});
	const [pieChartOptions, setPieChartOptions] = useState({
		// Data: Data to be displayed in the chart
		data: queryGetCategories.data,
		// Series: Defines which chart type and data to use
		series: [
			{
				type: "donut",
				angleKey: "totalExpenses",
				calloutLabelKey: "categoryName",
				innerLabels: [
					{
						text: "Total Expense",
						fontWeight: "bold",
					},
					{
						text: "$100,000",
						spacing: 4,
						fontSize: 48,
						color: "blue",
					},
				],
				innerCircle: {
					fill: "#000",
				},
			},
		],
		theme: "ag-vivid",
	});

	useEffect(() => {
		if (queryGetCategories.isSuccess && queryGetCategories.data) {
			setPieChartOptions({
				data: queryGetCategories.data,
				series: [
					{
						type: "donut",
						angleKey: "totalExpenses",
						calloutLabelKey: "categoryName",
						innerLabels: [
							{
								text: "Total Expense",
								fontWeight: "bold",
							},
							{
								text: "$100,",
								spacing: 4,
								fontSize: 48,
								color: "blue",
							},
						],
						innerCircle: {
							fill: "#000",
						},
					},
				],
				theme: "ag-vivid",
			});
		}
	}, [queryGetCategories.data, queryGetCategories.isSuccess]);

	const getCategories = async (sectionID: number) => {
		try {
			const response = await fetch(
				`http://127.0.0.1:3001/overview/getCategorySum/${sectionID}`,
				{
					headers: {
						authorization: `authorization ${localStorage.getItem(
							"accessToken"
						)}`,
					},
				}
			);

			if (response.status >= 401 && response.status < 500) {
				navigate("/login");
			}

			const data = await response.json();

			return data;
		} catch (error) {
			console.log(error);
			return [];
		}
	};

	return (
		<>
			<h2>{chartName}</h2>
			{queryGetCategories.data && (
				<AgCharts
					options={pieChartOptions}
					className={styles["donut-chart"]}
				/>
			)}
		</>
	);
}
