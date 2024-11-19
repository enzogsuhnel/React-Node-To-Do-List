import { Router } from "express";
import createTask from "../controllers/taskController.js";
import Task from "../models/Task.js";

const router = Router();

router.post("/create-task", createTask);

router.get("/tasks", async (req, res) => {
  const task = await Task.findById(req.params.id);
  try {
    if (task) {
      res.status(200).json(task);
    } else {
      return res.status(404).json({ msg: "Tarefa não encontrada." });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Erro no servidor" });
  }
});

router.get("/all", async (req, res) => {
  console.log("Passou pelo todas as Tasks");
  try {
    const tasks = await Task.find().select();
    res.status(200).json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao buscar suas tarefas!", error: err });
  }
});

export default router;
