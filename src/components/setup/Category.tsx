import { useQuery } from "@tanstack/react-query";
import Input from "./Input";
import styles from "./setup.module.css";

interface InputProps {
	categoryID: number;
	categoryName: string;
}

export default function Category({ categoryName, categoryID }: InputProps) {
	const query = useQuery({
		queryKey: ["expenses", categoryID],
		queryFn: () => getExpenses(),
	});
	console.log("mycatID", categoryID);
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
			console.log("expenses", data);
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
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

				<button>Tilføj</button>
			</article>
		</>
	);
}

// export default function Category({ children, categoryName }: InputProps) {
// 	return (
// 		<>
// 			<h2>{categoryName}</h2>
// 			<article className={styles["section-container"]}>
// 				{children}
// 				<button>Tilføj</button>
// 			</article>
// 		</>
// 	);
// }
