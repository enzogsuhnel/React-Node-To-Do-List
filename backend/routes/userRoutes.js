import { Router } from "express";
import userController from "../controllers/userController.js";
import checkToken from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/auth/register", userController.registerUser);
router.post("/auth/login", userController.loginUser);
router.use(checkToken);
router.get("/share", userController.getUsersToShare);
router.get("/:id", userController.getUserById);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
