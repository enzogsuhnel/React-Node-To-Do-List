import { Router } from "express";
import taskController from "../controllers/taskController.js";
import checkToken from "../middlewares/authMiddleware.js";

const router = Router();

router.use(checkToken);
router.post("/", taskController.createTask);
router.delete("/:id", taskController.deleteTask);
router.patch("/:id", taskController.updateTask);
router.get("/:listId", taskController.getTasks);

export default router;

