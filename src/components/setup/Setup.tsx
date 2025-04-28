import Category from "./Category";
import styles from "./setup.module.css";
import SetupNavigation from "./SetupNavigation";
import SummarySnippet from "./SummarySnippet";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";

export default function Setup() {
	const params = useParams();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const query = useQuery({
		queryKey: ["categories", params.ID],
		queryFn: () => getCategories(Number(params.ID)),
	});

	const mutation = useMutation({
		mutationFn: (name: string) => createCategory(Number(params.ID), name), //Tjek liiiiige at dette (name) er korret
	});

	const getCategories = async (params: number) => {
		try {
			const response = await fetch(
				`http://127.0.0.1:3001/setup/${params}`,
				{
					headers: {
						authorization: `authorization ${localStorage.getItem(
							"accessToken"
						)}`,
					},
				}
			);

			if (response.status >= 401) {
				navigate("/login");
			}

			const data = await response.json();

			return data;
		} catch (error) {
			console.log(error);
			return [];
		}
	};

	const createCategory = async (sectionID: number, name: string) => {
		try {
			const response = await fetch(
				`http://127.0.0.1:3001/setup/createCategory/${params.ID}`,
				{
					headers: {
						authorization: `authorization ${localStorage.getItem(
							"accessToken"
						)}`,
						"content-type": "application/json",
					},
					method: "POST",

					body: JSON.stringify({
						name: name,
						sectionID: sectionID,
					}),
				}
			);
			if (response.status >= 401) {
				navigate("/login");
			}
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			const data = await response;
			console.log(data);
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<main className={styles["container"]}>
			<h1>Setup</h1>
			<SetupNavigation />

			{query.data &&
				query.data.map((category) => {
					return (
						<Category
							categoryName={category.category}
							categoryID={category.categoryID}
							key={category.categoryID}
						></Category>
					);
				})}
			{query.isLoading && <p>Loading...</p>}
			<button
				onClick={() => {
					const catName = prompt("Add new category");
					if (!catName) return;
					mutation.mutate(String(catName ? catName : ""));
				}}
				className={styles["category-button"]}
			>
				Add category
			</button>
			<SummarySnippet />
		</main>
	);
}
