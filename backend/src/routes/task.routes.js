import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    getTasksByAssignedUserId,
    getTasksByCreatedUserId,
    getTasksByClientId,
    getTasksByProccessId
} from "../controllers/task.controller.js";

const router = express.Router();

// PROTECTED ROUTES
router.post("/create", verifyJWT, createTask);
router.get("/", verifyJWT, getTasks);
router.get("/:id", verifyJWT, getTaskById);
router.put("/update/:id", verifyJWT, updateTask);
router.delete("/delete/:id", verifyJWT, deleteTask);

// Additional routes
router.get("/assigned-to/:assignedUserId", verifyJWT, getTasksByAssignedUserId);
router.get("/created-by/:createdUserId", verifyJWT, getTasksByCreatedUserId);
router.get("/client/:clientId", verifyJWT, getTasksByClientId);
router.get("/process/:processId", verifyJWT, getTasksByProccessId);

export { router as taskRouter };
