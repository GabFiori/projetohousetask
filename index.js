import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import { sequelize } from "./models/index.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados bem-sucedida!");

    await sequelize.sync();
    console.log("Banco de dados sincronizado!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(1);
  }
}

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/auth/login", (req, res) => {
  res.render("login", { message: null, messageType: null });
});

app.get("/auth/register", (req, res) => {
  res.render("register");
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
  });
});
