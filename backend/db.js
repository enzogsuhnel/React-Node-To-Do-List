import mongoose from 'mongoose';

// Conexão com o Banco de Dados
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const connectDB = async () => {
    try {
        console.log(process.env.DB_USER);
        
      await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.y9k1d.mongodb.net/todolist?retryWrites=true&w=majority&appName=Cluster0`);
      console.log('Conectado ao MongoDB Atlas');
    } catch (err) {
      console.error('Erro ao conectar ao MongoDB:', err);
      process.exit(1);
    }
};

export default connectDB;