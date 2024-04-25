import express from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createClient, deleteClient, getAllClients, getClientById, getClientsByUserId, updateClient } from "../controllers/client.controller.js";


const router = express.Router();

// PROTECTED ROUTES
router.route("/create").post(verifyJWT, createClient);
router.route("").get(verifyJWT, getAllClients);
router.route("/:clientId").get(verifyJWT, getClientById);
router.route("/user/:userId").get(verifyJWT, getClientsByUserId);
router.route("/update/:clientId").put(verifyJWT, updateClient);
router.route("/delete/:clientId").delete(verifyJWT, deleteClient);


export { router as clientRouter }