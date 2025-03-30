import bcrypt from "bcryptjs";
import { User, Task } from "../models/index.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.render("register", {
        message: "E-mail já cadastrado!",
        messageType: "error",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashedPassword });

    res.render("register", {
      message: "Usuário cadastrado com sucesso!",
      messageType: "success",
    });
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    res.render("register", {
      message: "Erro ao criar usuário!",
      messageType: "error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.render("login", {
        message: "E-mail ou senha incorretos",
        messageType: "error",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", {
        message: "E-mail ou senha incorretos",
        messageType: "error",
      });
    }

    req.session.userId = user.id;
    res.redirect("/tasks");
  } catch (err) {
    console.error("Erro ao fazer login:", err);
    res.render("login", {
      message: "Erro ao fazer login",
      messageType: "error",
    });
  }
};

export const renderLoginPage = (req, res) => {
  res.render("login", { message: null, messageType: null });
};

export const logout = (req, res) => {
  if (!req.session) {
    return res.status(400).json({ message: "Nenhuma sessão ativa" });
  }

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao fazer logout" });
    }
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
};
