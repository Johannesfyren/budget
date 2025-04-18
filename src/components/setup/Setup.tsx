import Input from "./Input";
import Category from "./Category";
import styles from "./setup.module.css";
import SetupNavigation from "./SetupNavigation";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import { useState } from "react";

export default function Setup() {
	const params = useParams();
	const navigate = useNavigate();
	const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
	console.log(uniqueCategories);
	const query = useQuery({
		queryKey: ["expenses", params.ID],
		queryFn: () => getExpenses(Number(params.ID)),
	});

	const getExpenses = async (params: number) => {
		const response = await fetch(`http://127.0.0.1:3001/setup/${params}`, {
			headers: {
				authorization: `authorization ${localStorage.getItem(
					"accessToken"
				)}`,
			},
		});

		if (response.status >= 401) {
			navigate("/login");
		}

		const data = await response.json();
		setUniqueCategories(getUniqueCategories(data));
		console.log(data);
		return await data;
	};

	return (
		<main className={styles["container"]}>
			<h1>Setup</h1>
			<SetupNavigation />

			{uniqueCategories.length > 0 &&
				uniqueCategories.map((category) => {
					return (
						<Category categoryName={category} key={category}>
							{query.data &&
								query.data
									.filter(
										(expense) =>
											expense.category == category
									)
									.map((expense) => {
										return (
											<Input
												inputName={expense.expenseName}
												payRate={expense.payRate}
												amount={expense.expenseValue}
												key={expense.expenseName}
											/>
										);
									})}
						</Category>
					);
				})}
			{query.isLoading && <p>Loading...</p>}
		</main>
	);
}

function getUniqueCategories(data: Array<{ category: string }>) {
	const uniqueCategories: string[] = [];

	for (let i = 0; i < data.length; i++) {
		const currentCategory = data[i].category;

		if (!uniqueCategories.includes(currentCategory)) {
			uniqueCategories.push(currentCategory);
		}
	}
	return uniqueCategories;
}
