import { useState } from "react";
import styles from "./setup.module.css";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import TextInput from "./TextInput";

interface InputProps {
	inputName: string;
	payRate: number;
	amount: number;
	categoryID: number;
	expenseID: number;
}

export default function Input({
	inputName,
	payRate,
	amount,
	categoryID,
	expenseID,
}: InputProps) {
	const [selectedPayrate, setSelectedPayrate] = useState(payRate);
	const [selectedAmount, setSelectedAmount] = useState(amount);
	const [expenseName, setExpenseName] = useState(inputName ? inputName : "");

	const [error, setError] = useState(false);

	const saveChangeToDB = async (amount: number, payRate: number) => {
		try {
			const response = await fetch(
				`http://127.0.0.1:3001/setup/postExpense/${expenseID}`,
				{
					headers: {
						authorization: `authorization ${localStorage.getItem(
							"accessToken"
						)}`,
						"content-type": "application/json",
					},
					method: "POST",

					body: JSON.stringify({
						name: expenseName,
						amount: amount,
						payRate: payRate,
						categoryID: categoryID,
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

	const mutation = useMutation({
		mutationFn: () => saveChangeToDB(selectedAmount, selectedPayrate),
		onSuccess: (data) => {
			// Handle the success case here
			console.log("Mutation successful:", data);

			// Optionally reset the changed input state

			// Perform any additional actions, like invalidating queries or showing a success message
		},
		onError: (error) => {
			// Handle the error case here
			console.error("Mutation failed:", error);
			setError(true);
		},
	});
	const triggerMutate = () => {
		mutation.mutate();
	};
	return (
		<div className={styles["input-container"]}>
			<label htmlFor={expenseName}>
				<TextInput
					expenseName={expenseName}
					setExpenseName={setExpenseName}
					handleMutation={triggerMutate}
				/>
			</label>
			<div className={styles["input-select-wrapper"]}>
				<input
					type="number"
					name={expenseName}
					id={expenseName}
					defaultValue={amount}
					onChange={(e) => {
						setSelectedAmount(Number(e.target.value));
					}}
					onBlur={() => {
						mutation.mutate();
					}}
				/>

				<select
					name="select1"
					defaultValue={payRate}
					onChange={(e) => {
						setSelectedPayrate(Number(e.target.value));
					}}
					onBlur={() => mutation.mutate()}
				>
					<option value={1}>DKK/Mth</option>
					<option value={2}>DKK/Qtr</option>
					<option value={3}>DKK/Yr</option>
				</select>
			</div>
			{error && <p>Something went wrong</p>}
		</div>
	);
}
