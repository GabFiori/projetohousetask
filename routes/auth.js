import express from "express";
import bcrypt from "bcryptjs";
import { User, Task } from "../models/index.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "E-mail já cadastrado!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json(user);
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    res.status(500).json({ message: "Erro ao criar usuário" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "E-mail ou senha incorretos" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "E-mail ou senha incorretos" });
    }

    req.session.userId = user.id;
    res.status(200).json({ message: "Login bem-sucedido!" });
  } catch (err) {
    console.error("Erro ao fazer login:", err);
    res.status(500).json({ message: "Erro ao fazer login" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao fazer logout" });
    }
    res.status(200).json({ message: "Logout bem-sucedido!" });
  });
});

export default router;
