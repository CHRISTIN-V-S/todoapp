import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"

export default function ViewTask(){
    const {id}=useParams()
    const [task,setTask]=useState({})

    useEffect(()=>{
        getTask()
    },[])

    async function getTask(){
        try {
            const response=await axios.get(`https://todoapp-v7pm.vercel.app//api/todoapp/view/${id}`)
            setTask(response.data)
        } catch (error) {
                console.log(error)
        }
    }
    return(
        <div>
            <h2>{task.task}</h2>
            <h3>Created: {task.createdAt}</h3>
            <h3>Updated: {task.updatedAt}</h3>
            <p>Status: {task.completed?"completed":"pending"}</p>
            <p>Name: {task.userId?.name}</p>
        </div>
    )
}