import Input from "./Input"
import Category from "./Category"
import styles from "./setup.module.css"
import SetupNavigation from "./SetupNavigation"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"



export default function Setup(){
    const params = useParams();


    const query = useQuery({
        queryKey: ['expenses', params.ID],
        queryFn: () => getExpenses(Number(params.ID)),
        gcTime: 0,
    });




    return(
        <main className={styles["container"]}>
            <h1>Setup</h1>
            <SetupNavigation />

            <Category categoryName="Transport">
               <Input inputName="test"/> 
               <Input inputName="test2"/> 
            </Category>
            {JSON.stringify(query.data)}
       </main>
    )
}

const getExpenses = async (params: number) =>{
    const response = await fetch(`http://127.0.0.1:3001/setup/${params}`);
    return await response.json();
}
