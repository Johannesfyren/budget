import { ReactNode } from "react"
import styles from "./setup.module.css"

interface InputProps{
    children: ReactNode
    categoryName: string
}

export default function Category({children, categoryName}:InputProps){
    return(
        <>    
            <h2>{categoryName}</h2>
            <article className={styles["section-container"]}>
                {children}
                <button>Tilføj</button>
            </article>
        </>
    )
}