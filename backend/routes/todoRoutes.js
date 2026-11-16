const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const todoControllers = require("../controllers/todoControllers");

router.post("/add",authMiddleware , todoControllers.addTodoTask);
router.get("/", authMiddleware, todoControllers.getTodoTasks);
router.put("/update/:taskId", authMiddleware, todoControllers.updateTodoTask);
router.delete("/delete/:id", authMiddleware, todoControllers.deleteTodoTask);
router.get("/view/:id",todoControllers.viewTodoTask);

module.exports = router;