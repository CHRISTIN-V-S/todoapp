import { useEffect ,useState} from "react";
import axios from "axios"

export function useTasks(){
    const [todo,setTodo]=useState([])

    const token=localStorage.getItem("token")

    useEffect(()=>{
        getALLTask()
    },[])

     async function getALLTask() {
        try {
            const res = await axios.get("https://todoapp-backend-tau-lemon.vercel.app/api/todoapp", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res.data)
            setTodo(res.data)
        } catch (error) {
            console.log(error)
        }

    }
    return todo

}