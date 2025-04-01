import { ReactNode } from "react"
import styles from "./setup.module.css"

interface InputProps{
    children: ReactNode
    sectionName: string
}

export default function Category({children, sectionName}:InputProps){
    return(
        <>    
            <h2>{sectionName}</h2>
            <article className={styles["section-container"]}>
                {children}
                <button>Tilføj</button>
            </article>
        </>
    )
}