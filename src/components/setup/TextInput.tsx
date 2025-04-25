import { useState, useRef, useEffect } from "react";
import styles from "./setup.module.css";
import createOutlineIcon from "../../assets/create-outline.svg";
import createCheckmarkIcon from "../../assets/checkmark-outline.svg";
import createTrashcanIcon from "../../assets/trash.svg";

// interface textinput{
// 	expenseName:string;
// 	setExpenseName:string;
// 	handleMutation:
// }
export default function TextInput({
	expenseName = "",
	setExpenseName,
	handleMutation,
	handleDeletion,
}) {
	const [editable, setEditable] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (editable) {
			console.log(inputRef.current); // Focus the input when it becomes editable
			inputRef.current?.focus();
		}
	}, [editable]); // Run this effect whenever `editable` changes

	return (
		<div className={styles["textinput-wrapper"]}>
			{editable && (
				<input
					ref={inputRef}
					defaultValue={expenseName}
					onBlur={() => setEditable(false)}
					onChange={(e) => {
						setExpenseName(e.target.value);
						handleMutation();
					}}
				></input>
			)}

			{!editable && <p>{expenseName}</p>}

			<img
				src={editable ? createCheckmarkIcon : createOutlineIcon}
				alt=""
				width={"20px"}
				height={"20px"}
				onClick={() => {
					setEditable(!editable);
				}}
			/>

			{editable && (
				<img
					src={createTrashcanIcon}
					alt=""
					width={"20px"}
					height={"20px"}
					onClick={() => {
						const deleteConfirmation = confirm(
							`Do you want to delete "${expenseName}"?`
						);
						if (deleteConfirmation == true) {
							handleDeletion();
						} else return null;
					}}
				/>
			)}
		</div>
	);
}
