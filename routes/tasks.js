import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  markTaskAsCompleted,
} from "../controller/taskController.js";

const router = express.Router();

router.get("/", getAllTasks);
router.post("/", createTask);
router.get("/:id", getTaskById);
router.post("/:id/update", updateTask);
router.post("/:id/delete", deleteTask);
router.post("/:id/complete", markTaskAsCompleted);

export default router;

/*import express from "express";
import { Task } from "../models/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/auth/login");
  }

  try {
    const tasks = await Task.findAll({ where: { UserId: req.session.userId } });
    res.render("tasks", { tasks });
  } catch (err) {
    console.error("Erro ao buscar tarefas:", err);
    res.status(500).json({ message: "Erro ao buscar tarefas" });
  }
});

export default router;*/
