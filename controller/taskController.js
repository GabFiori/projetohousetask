import { Task } from "../models/index.js";

export const getAllTasks = async (req, res) => {
    if (!req.session.userId) {
      return res.redirect("/auth/login");
    }
  
    try {
      const tasks = await Task.findAll({
        where: { UserId: req.session.userId },
        attributes: ["id", "title", "createdAt"]
      });
  
      res.render("tasks", { tasks });
    } catch (err) {
      console.error("Erro ao buscar tarefas:", err);
      res.status(500).json({ message: "Erro ao buscar tarefas" });
    }
  };
  
  export const getTaskById = async (req, res) => {
    try {
      const task = await Task.findByPk(req.params.id);
      if (!task) return res.status(404).json({ message: "Tarefa não encontrada" });
  
      res.render("taskDetails", { task });
    } catch (err) {
      console.error("Erro ao buscar tarefa:", err);
      res.status(500).json({ message: "Erro ao buscar tarefa" });
    }
  };
  
  export const createTask = async (req, res) => {
    try {
      const { title, description } = req.body;
      const task = await Task.create({
        title,
        description,
        status: "pendente",
        UserId: req.session.userId
      });
  
      res.redirect("/tasks");
    } catch (err) {
      console.error("Erro ao criar tarefa:", err);
      res.status(500).json({ message: "Erro ao criar tarefa" });
    }
  };
  
  export const updateTask = async (req, res) => {
    try {
      const { title, description } = req.body;
      const task = await Task.findByPk(req.params.id);
      if (!task) return res.status(404).json({ message: "Tarefa não encontrada" });
  
      await task.update({ title, description });
      res.redirect(`/tasks/${task.id}`);
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err);
      res.status(500).json({ message: "Erro ao atualizar tarefa" });
    }
  };
  
  export const deleteTask = async (req, res) => {
    try {
      const task = await Task.findByPk(req.params.id);
      if (!task) return res.status(404).json({ message: "Tarefa não encontrada" });
  
      await task.destroy();
      res.redirect("/tasks");
    } catch (err) {
      console.error("Erro ao excluir tarefa:", err);
      res.status(500).json({ message: "Erro ao excluir tarefa" });
    }
  };
  
  export const markTaskAsCompleted = async (req, res) => {
    try {
      const task = await Task.findByPk(req.params.id);
      if (!task) return res.status(404).json({ message: "Tarefa não encontrada" });
  
      await task.update({ status: "concluída" });
      res.redirect(`/tasks/${task.id}`);
    } catch (err) {
      console.error("Erro ao marcar como concluída:", err);
      res.status(500).json({ message: "Erro ao marcar tarefa como concluída" });
    }
  };