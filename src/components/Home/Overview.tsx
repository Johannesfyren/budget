import styles from "./home.module.css";
import ContentContainer from "./ContentContainer";
import { AgCharts } from "ag-charts-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQueryClient, useQuery } from "@tanstack/react-query";
export default function Home() {
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
		<div
			style={{ display: "flex", flexDirection: "column", width: "100%" }}
		>
			<h1>Home</h1>

			<div className={styles["container"]}>
				<ContentContainer size="4">
					<h2>Expenses overview</h2>
					{queryGetCategories.data && (
						<AgCharts
							options={barChartOptions}
							className={styles["barChart"]}
						/>
					)}
				</ContentContainer>
				<ContentContainer size="2">
					<p>content</p>
				</ContentContainer>
				<ContentContainer size="1">
					<p>content</p>
				</ContentContainer>
			</div>
		</div>
	);
}

// function adjustDataToGrid(data) {
// 	const updatedData = newData.map((item) => {
// 		switch (item.sectionID) {
// 			case 1:
// 				return { ...item, sectionID: "Fixed" };
// 				break;
// 			case 2:
// 				return { ...item, sectionID: "Varialbe" };
// 				break;
// 			case 3:
// 				return { ...item, sectionID: "Seasonal" };
// 				break;
// 			case 4:
// 				return { ...item, sectionID: "Savings" };
// 			default:
// 				return item;
// 		}
// 	});
// 	return updatedData;
// }
