import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import UserModel from "./User.js";
import TaskModel from "./Task.js";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    logging: false,
  }
);

const User = UserModel(sequelize);
const Task = TaskModel(sequelize);

User.hasMany(Task, {
  foreignKey: "UserId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Task.belongsTo(User, { foreignKey: "UserId" });

sequelize
  .sync({ alter: true })
  .then(() => console.log("Banco de dados sincronizado!"))
  .catch((err) => console.error("Erro ao sincronizar o banco:", err));

export { sequelize, User, Task };
