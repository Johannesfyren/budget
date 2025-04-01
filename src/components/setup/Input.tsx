
import styles from "./setup.module.css"

interface InputProps{
    inputName: string
}

export default function Input({ inputName }: InputProps){

    return (
        <div className={styles["input-container"]}>
            <label htmlFor={inputName}>{inputName}</label>
            <input type="number" name={inputName} id={inputName} />
        </div>
    )
}