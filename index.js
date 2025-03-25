import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./models/index.js";
import User from "./models/User.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados bem-sucedida!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
}

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/create-user", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email, password });
    res
      .status(201)
      .json({ message: "Usuário criado com sucesso", user: newUser });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

// Rodar o servidor
app.listen(PORT, async () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
  await connectDB(); // Conectar ao banco ao iniciar o servidor
});
