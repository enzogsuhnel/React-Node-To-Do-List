import { Router } from "express";
import userController from "../controllers/userController.js";
import checkToken from "../middlewares/authMiddleware.js";
import User from "../models/User.js";

const router = Router();

// Rotas de autenticação
router.post("/auth/register", userController.registerUser);
router.post("/auth/login", userController.loginUser);

// Rota privada
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      return res.status(404).json({ msg: "Usuário nao encontrado!" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Erro no servidor" });
  }
});

// GET: Listar todos os usuarios
router.get("/all", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar serviços", error: err });
  }
});

export default router;