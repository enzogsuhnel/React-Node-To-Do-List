import express, { json } from "express";
import connectDB from "./db.js";
import cors from "cors";

// Rotas
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Conectar banco de dados
connectDB();

// Middleware para parsear JSON
app.use(json());

// Use CORS middleware
app.use(cors());

// Rotas
app.use("/user", userRoutes);
app.use("/task", taskRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
