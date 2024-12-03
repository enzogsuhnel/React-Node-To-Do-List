import { Router } from "express";
import userController from "../controllers/userController.js";
import checkToken from "../middlewares/authMiddleware.js";
import User from "../models/User.js";

const router = Router();

// GET: Listar todos os usuarios
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar serviços", error: err });
  }
});

router.post("/auth/register", userController.registerUser);
router.post("/auth/login", userController.loginUser);
router.use(checkToken);
router.get("/:id", userController.getUserById);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
