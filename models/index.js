import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import UserModel from './User.js';  // Apenas importa a função do modelo

dotenv.config();

// Configuração do Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: 'postgres', 
    port: process.env.DB_PORT,
    logging: false, 
  }
);

// Definição do modelo User
const User = UserModel(sequelize, DataTypes);

// Sincronizar o banco de dados
sequelize.sync()
  .then(() => console.log('Banco de dados sincronizado!'))
  .catch(err => console.error('Erro ao sincronizar o banco:', err));

// Exportar sequelize e modelos
export { sequelize, User };
