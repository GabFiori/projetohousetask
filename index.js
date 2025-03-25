import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';  // Importando o arquivo de configuração do Sequelize
import User from './models/User.js';   // Importando o modelo User

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Criando a aplicação Express
const app = express();

// Configuração da porta
const PORT = process.env.PORT || 3000;

// Middleware para analisar os dados do corpo da requisição
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Teste de conexão com o banco de dados
async function connectDB() {
  try {
    await sequelize.authenticate();  // Testa a conexão
    console.log('Conexão com o banco de dados bem-sucedida!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

// Rota de teste
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Exemplo de rota para criar um usuário
app.post('/create-user', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email, password });
    res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Rodar o servidor
app.listen(PORT, async () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
  await connectDB();  // Conectar ao banco ao iniciar o servidor
});
