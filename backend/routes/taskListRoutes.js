import { Router } from "express";
import taskListController from "../controllers/taskListController.js";
import checkToken from "../middlewares/authMiddleware.js";

const router = Router();

router.use(checkToken);
router.post("/", taskListController.createList);
router.post("/share/:id", taskListController.shareTaskList);
router.get("/share/:id", taskListController.getSharedUsers);
router.patch("/unshare/:id", taskListController.unshareTaskList);
router.delete("/:id", taskListController.deleteTaskList);
router.get("/", taskListController.getLists);
router.get("/shared", taskListController.getTaskListsShared);
router.patch("/:id", taskListController.updateList);

export default router;
