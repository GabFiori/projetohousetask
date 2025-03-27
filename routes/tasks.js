import express from "express";
import { Task } from "../models/index.js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Recebi uma requisição de criação de tarefa!", req.body);
  try {
    const { title, description, status, UserId } = req.body;
    const task = await Task.create({ title, description, status, UserId });
    res.status(201).json(task);
  } catch (err) {
    console.error("Erro ao criar tarefa:", err);
    res.status(500).json({ message: "Erro ao criar tarefa" });
  }
});

export default router;
