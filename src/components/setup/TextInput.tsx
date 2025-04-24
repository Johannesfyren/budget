import { useState } from "react";

// interface textinput{
// 	expenseName:string;
// 	setExpenseName:string;
// 	handleMutation:
// }
export default function TextInput({
	expenseName = "",
	setExpenseName,
	handleMutation,
}) {
	const [editable, setEditable] = useState(false);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				gap: "10px",
			}}
		>
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
			<button
				onClick={() =>
					editable ? setEditable(false) : setEditable(true)
				}
			>
				{editable ? "√" : "✍️"}
			</button>
		</div>
	);
}
