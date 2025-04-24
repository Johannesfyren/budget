import { useState } from "react";

export default function TextInput({
	expenseName = "",
	setExpenseName,
	handleMutation,
}) {
	const [editable, setEditable] = useState(false);

	return (
		<div style={{ display: "flex", flexDirection: "row" }}>
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
