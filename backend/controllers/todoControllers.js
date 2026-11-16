
const Todo = require("../models/TodoTask");


const addTodoTask = async (req, res) => {
    try {
        const { task, completed } = req.body;

        console.log(req.userId)
        const newTask = new Todo({
            task,
            completed: completed || false,
            userId: req.userId
        });

        await newTask.save();

        res.status(201).json({
            success: true,
            message: "New Task Has Been Added",
            todo: newTask
        });

    } catch (error) {
        console.log(error);
        // res.status(500).json({ message: error.message });
    }
};



const getTodoTasks = async (req, res) => {
    try {
        const TodoTasks = await Todo.find({
            userId: req.userId
        }).sort({completed:1})

        res.status(200).json(TodoTasks);

    } catch (error) {
        console.log(error);
        // res.status(500).json({ message: error.message });
    }
};



const updateTodoTask = async (req, res) => {
    try {
        const { task, complete} = req.body;
        const { taskId } = req.params;

        const updatedTask = await Todo.findOneAndUpdate(
            {
                _id: taskId,
                userId: req.userId
            },
            { task, completed:complete },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "The Task Has Been Updated",
            todo: updatedTask
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};



const deleteTodoTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Todo.findOneAndDelete({
            _id: id,
            userId: req.userId
        });

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "The Task Has Been Deleted"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};



const viewTodoTask=async (req,res) => {
    try{
        const{id}=req.params;
        const todoTask=await Todo.findById(id)
        .populate("userId", "name email")
        console.log(todoTask) 
        res.send(todoTask)
    } catch (error) {
        console.log(error)
    }
    }
    


module.exports = {
    addTodoTask,
    getTodoTasks,
    updateTodoTask,
    deleteTodoTask,
    viewTodoTask
};
