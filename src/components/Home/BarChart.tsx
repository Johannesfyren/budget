import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AgCharts } from "ag-charts-react";
import styles from "./home.module.css";
import { motion } from "motion/react";

export default function BarChart() {
	const params = useParams();
	const navigate = useNavigate();
	const queryGetCategories = useQuery({
		queryKey: ["categoriess", params.ID],
		queryFn: () => getCategories(Number(params.ID)),
	});
	const [barChartOptions, setBarChartOptions] = useState({
		// Data: Data to be displayed in the chart
		data: queryGetCategories.data,
		// Series: Defines which chart type and data to use
		series: [{ type: "bar", xKey: "sectionID", yKey: "total" }],
		theme: "ag-vivid",
	});

	useEffect(() => {
		if (queryGetCategories.isSuccess && queryGetCategories.data) {
			setBarChartOptions({
				data: queryGetCategories.data,
				series: [{ type: "bar", xKey: "sectionID", yKey: "total" }],
				theme: "ag-vivid",
			});
		}
	}, [queryGetCategories.data, queryGetCategories.isSuccess]);

	const getCategories = async (params: number) => {
		try {
			const response = await fetch(`http://127.0.0.1:3001/overview`, {
				headers: {
					authorization: `authorization ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			});

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
		<motion.div
			className={styles["chart-container"]}
			initial={{ opacity: 0.5, scale: 0.99 }}
			animate={{ opacity: 1, scale: 1 }}
		>
			<h2>Expenses overview</h2>
			{queryGetCategories.data && <AgCharts options={barChartOptions} />}
		</motion.div>
	);
}
