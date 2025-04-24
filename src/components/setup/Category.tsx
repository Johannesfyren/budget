import { useQuery, useMutation } from "@tanstack/react-query";
import Input from "./Input";
import styles from "./setup.module.css";
import Modal from "./Modal";

interface InputProps {
	categoryID: number;
	categoryName: string;
}

export default function Category({ categoryName, categoryID }: InputProps) {
	const query = useQuery({
		queryKey: ["expenses", categoryID],
		queryFn: () => getExpenses(),
	});

	const mutation = useMutation({
		mutationFn: () => createExpense(categoryID, "", 0, 1),
		onSuccess: (data) => {
			query.refetch();

			// Optionally reset the changed input state

			// Perform any additional actions, like invalidating queries or showing a success message
		},
		onError: (error) => {
			// Handle the error case here
			console.error("Mutation failed:", error);
		},
	});
	const getExpenses = async () => {
		try {
			const response = await fetch(
				`http://127.0.0.1:3001/setup/getExpenses/${categoryID}`,
				{
					headers: {
						authorization: `authorization ${localStorage.getItem(
							"accessToken"
						)}`,
					},
				}
			);

			// if (response.status >= 401) {
			// 	navigate("/login");
			// }

			const data = await response.json();

			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const createExpense = async (
		categoryID: number,
		name: string,
		value: number,
		payrate: number
	) => {
		try {
			const response = await fetch(
				`http://127.0.0.1:3001/setup/newExpense`,
				{
					headers: {
						authorization: `authorization ${localStorage.getItem(
							"accessToken"
						)}`,
						"content-type": "application/json",
					},
					method: "POST",

					body: JSON.stringify({
						categoryID: categoryID,
						name: name,
						value: value,
						payrate: payrate,
					}),
				}
			);
			const data = await response.text();
			return data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	return (
		<>
			<div className={styles["category-wrapper"]}>
				<h2>{categoryName}</h2>
				<article className={styles["section-container"]}>
					{query.data &&
						query.data.map((expense) => {
							return (
								<Input
									inputName={expense.name}
									payRate={expense.FKPayRate}
									amount={expense.value}
									categoryID={expense.categoryID}
									expenseID={expense.id}
									key={expense.id}
								/>
							);
						})}

					<button onClick={() => mutation.mutate()}>
						Add expense
					</button>
				</article>
			</div>
		</>
	);
}
