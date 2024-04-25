import express from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";

import { createUser, deleteUser, getAllUsers, getUserById, googleLogin, loginUser, logoutUser, refreshAccessToken, updateUser } from "../controllers/user.controller.js";


const router = express.Router();


router.route("/create").post(createUser);

router.route("/login").post(loginUser);
router.route("/google-login").post(googleLogin);

// PROTECTED ROUTES
router.route("/logout").get(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/").get(verifyJWT, getAllUsers);
router.route("/:userId").get(verifyJWT, getUserById);
router.route("/update/:userId").put(verifyJWT, updateUser);
router.route("/delete/:userId").delete(verifyJWT, deleteUser);



export { router as userRouter }