import { Router } from "express";
import taskListController from "../controllers/taskListController.js";
import checkToken from "../middlewares/authMiddleware.js";
import TaskList from "../models/TaskList.js";

const router = Router();

// // GET: Listar todos as taskLists
// router.get("/", async (req, res) => {
//   try {
//     const taskLists = await TaskList.find();
//     res.status(200).json(taskLists);
//   } catch (err) {
//     res.status(500).json({ message: "Erro ao buscar serviços", error: err });
//   }
// });

router.use(checkToken);
router.post("/", taskListController.createList);
router.delete("/:id", taskListController.deleteTaskList);
router.get("/", taskListController.getLists);
router.patch("/:id", taskListController.updateList);

export default router;
// {
//     "name": "Enzo Sühnel",
//         "email": "enzogsuhnel@gmail.com",
//         "password": "admin",
//         "confirmPassword": "admin"
//     }
