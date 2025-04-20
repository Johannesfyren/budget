import { useState } from "react";
import styles from "./setup.module.css";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";

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
	const [changedInput, setChangedInput] = useState(false);

	const saveChangeToDB = async (amount: number, payRate: number) => {
		if (!changedInput) return;
		console.log(inputName, amount, payRate, categoryID);
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
					name: inputName,
					amount: amount,
					payRate: payRate,
					categoryID: categoryID,
				}),
			}
		);
		const data = await response.json();
		return data;
	};

	const mutation = useMutation({
		mutationFn: () => saveChangeToDB(selectedAmount, selectedPayrate),
	});

	return (
		<div className={styles["input-container"]}>
			<label htmlFor={inputName}>{inputName}</label>
			<div className={styles["input-select-wrapper"]}>
				<input
					type="number"
					name={inputName}
					id={inputName}
					defaultValue={amount}
					onChange={(e) => {
						setSelectedAmount(Number(e.target.value));
						setChangedInput(true);
					}}
					onBlur={(e) => mutation.mutate()}
				/>

				<select
					name="select1"
					defaultValue={payRate}
					onChange={(e) => {
						setSelectedPayrate(Number(e.target.value));
						setChangedInput(true);
					}}
					onBlur={() => mutation.mutate()}
				>
					<option value={1}>DKK/Mth</option>
					<option value={2}>DKK/Qtr</option>
					<option value={3}>DKK/Yr</option>
				</select>
			</div>
		</div>
	);
}
