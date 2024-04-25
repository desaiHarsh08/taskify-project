import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createProcess,
    getProcesses,
    getProcessById,
    getProcessesByClientId,
    getProcessesByCreatedUserId,
    getProcessesByAssignedUserId,
    updateProcess,
    deleteProcess
} from "../controllers/process.controller.js";

const router = express.Router();

// PROTECTED ROUTES
router.post("/create", verifyJWT, createProcess);
router.get("/", verifyJWT, getProcesses);
router.get("/:id", verifyJWT, getProcessById);
router.get("/client/:clientId", verifyJWT, getProcessesByClientId);
router.get("/created-by/:createdUserId", verifyJWT, getProcessesByCreatedUserId);
router.get("/assigned-to/:assignedUserId", verifyJWT, getProcessesByAssignedUserId);
router.put("/update/:id", verifyJWT, updateProcess);
router.delete("/delete/:id", verifyJWT, deleteProcess);

export { router as processRouter };
