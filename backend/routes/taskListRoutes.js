import { Router } from "express";
import taskListController from "../controllers/taskListController.js";
import checkToken from "../middlewares/authMiddleware.js";

const router = Router();

router.use(checkToken)
router.post('/', taskListController.createList);
router.delete('/:id', taskListController.deleteTaskList);
router.get('/', taskListController.getLists);
router.put('/:id', taskListController.updateList);

export default router;
// {
//     "name": "Enzo Sühnel",
//         "email": "enzogsuhnel@gmail.com",
//         "password": "admin",
//         "confirmPassword": "admin"
//     }