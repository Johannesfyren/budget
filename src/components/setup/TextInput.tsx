import { useState, useRef, useEffect } from "react";
import styles from "./setup.module.css";
import createOutlineIcon from "../../assets/create-outline.svg";
import createCheckmarkIcon from "../../assets/checkmark-outline.svg";
import createTrashcanIcon from "../../assets/trash.svg";
import { motion } from "motion/react";

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
					onKeyDown={(e) => {
						if (e.key == "Enter" || e.key == "Tab") {
							handleMutation();
							setEditable(false);
						}
					}}
					onChange={(e) => {
						setExpenseName(e.target.value);
					}}
					onClick={(e) => {
						if (e.target != inputRef.current) {
							console.log("not same");
						} else {
							console.log(inputRef.current);
							console.log(e.target);
						}
					}}
				></input>
			)}

			{!editable && <p>{expenseName}</p>}

			<motion.div
				whileHover={{ scale: 1.1 }}
				style={{
					display: "flex",
					flexDirection: "row-reverse",
					gap: "10px",
					border: editable ? "1px solid #00B4D8" : "",
					borderRadius: "5px",
					padding: editable ? "3px" : "",
				}}
			>
				<motion.img
					whileHover={{ scale: 1.1 }}
					src={editable ? createCheckmarkIcon : createOutlineIcon}
					alt=""
					className={editable ? "" : styles["hidden"]}
					width={"20px"}
					height={"20px"}
					onClick={() => {
						setEditable(!editable);
						if (editable) handleMutation();
					}}
				/>

				{editable && (
					<motion.img
						whileHover={{ scale: 1.1 }}
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
			</motion.div>
		</div>
	);
}
