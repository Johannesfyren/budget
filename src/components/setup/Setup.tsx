import Input from "./Input"
import Category from "./Section"
import styles from "./setup.module.css"
import SetupNavigation from "./SetupNavigation"

export default function Setup(){
    return(
        <main className={styles["container"]}>
            <h1>Setup</h1>
            <SetupNavigation />

            <Category sectionName="Transport">
               <Input inputName="test"/> 
               <Input inputName="test2"/> 
            </Category>
       </main>
    )
}