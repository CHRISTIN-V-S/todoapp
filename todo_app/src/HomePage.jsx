
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTasks } from "./useTasks";

export default function HomePage() {
    const [newTask, setNewTask] = useState("")
    const [TodoTask, setTodoTask] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editTask, setEditTask] = useState("");
    const [complete, setComplete] = useState(false)

    const navigate = useNavigate();

    const todos = useTasks()


    const token = localStorage.getItem("token")


    async function handleDeleteTodo(todoId) {
        try {
            const res = await axios.delete(`https://todoapp-v7pm.vercel.app/api/todoapp/delete/${todoId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(res);
            getALLTask();
        } catch (error) {
            console.log(error);
        }
    }
    function handleEditTodo(todo) {
        setEditingTaskId(todo._id);
        setEditTask(todo.task);
    }


    async function handleUpdateTodo(e, taskId) {
        e.preventDefault()
        try {
            const res = await axios.put(`https://todoapp-v7pm.vercel.app/api/todoapp/update/${taskId}`,
                {
                    task: editTask,
                    complete
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            )

            // getALLTask()
            setEditingTaskId(null)
        } catch (error) {
            console.log(error)
        }
    }


    async function handleAdd(e) {
        e.preventDefault();

        // const token = localStorage.getItem("token");
        console.log("my token", token)

        if (!token) {
            alert("Please login first");
            navigate("/user");
            return;
        }

        if (!newTask.trim()) {
            alert("Please enter a task");
            return;
        }

        try {
            const res = await axios.post(
                "https://todoapp-v7pm.vercel.app/api/todoapp/add",
                {
                    task: newTask
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(res.data);
            alert("Todo Added Successfully");
            getALLTask()
            setTodoTask("");

        } catch (error) {
            console.log(error.response?.data || error.message);

            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                alert("Please login first");
                navigate("/user");
            } else {
                // alert(error.response?.data?.message || "Login first");
                console.log(error)
            }
        }
    }

    function handleLogout() {
        localStorage.clear()
        window.location.reload()

    }

    function handleLogin() {
        navigate("/user")
        window.location.reload()
    }

    function handleView(todoId) {
        navigate(`/view/${todoId}`)
    }
    return (

        <div>
            {
                token ?
                    <button onClick={handleLogout}>Logout</button>
                    :
                    <button onClick={handleLogin}>Login</button>
            }

            {token ? (
                <form onSubmit={handleAdd}>
                    <input
                        type="text"
                        placeholder="Enter Task"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <br />
                    <button type="submit">Save</button>
                </form>
            ) : (
                <h1>Please login to add and view tasks!</h1>
            )}

            <div>
                {token && (
                    <div>
                        {
                            todos.length > 0 ? (
                                <>
                                    <h1>Todo List</h1>

                                    {todos.map(todo =>
                                        todo._id === editingTaskId ? (
                                            <div key={todo._id}>
                                                <form onSubmit={(e) => handleUpdateTodo(e, todo._id)}>
                                                    <input
                                                        type="text"
                                                        value={editTask}
                                                        onChange={e => setEditTask(e.target.value)}
                                                    />
                                                    <input type="checkbox" onChange={() => setComplete(!complete)} />
                                                    <span>{complete ? "complete" : "pending"}</span>
                                                    <button type="submit">Update</button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditingTaskId(null)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </form>
                                            </div>
                                        ) : (
                                            <div key={todo._id}>
                                                <h3>{todo.task}</h3>
                                                <h4>Status:{todo.completed ? "completed" : "Pending"}</h4>
                                                <button onClick={() => handleView(todo._id)}>View</button>
                                                <button onClick={() => handleEditTodo(todo)}>
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDeleteTodo(todo._id)}>
                                                    Delete
                                                </button>
                                            </div>
                                        )
                                    )}
                                </>
                            ) : (
                                <h2>Please add task to display here</h2>
                            )}
                    </div>
                )}
            </div>
        </div>

    );
}
