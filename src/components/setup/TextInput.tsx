import { useState } from "react";
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

	return (
		<div className={styles["textinput-wrapper"]}>
			{editable && (
				<input
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
				onClick={() =>
					editable ? setEditable(false) : setEditable(true)
				}
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
