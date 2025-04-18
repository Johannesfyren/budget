import styles from "./setup.module.css";

interface InputProps {
	inputName: string;
	payRate: string;
	amount: number;
}

export default function Input({ inputName, payRate, amount }: InputProps) {
	return (
		<div className={styles["input-container"]}>
			<label htmlFor={inputName}>{inputName}</label>
			<div className={styles["input-select-wrapper"]}>
				<input
					type="number"
					name={inputName}
					id={inputName}
					defaultValue={amount}
				/>

				<select id="select1" defaultValue={payRate}>
					<option value={1}>Mth</option>
					<option value={2}>Qtr</option>
					<option value={3}>Yr</option>
				</select>
			</div>
		</div>
	);
}

function selectValue() {
	select1;
}
