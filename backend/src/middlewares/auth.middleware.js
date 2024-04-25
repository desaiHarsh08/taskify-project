import jwt from 'jsonwebtoken';

import { User } from '../models/user.model.js';

import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if(!token) {
            return res.status(401).json(new ApiResponse(401, "Use validation got failed!"));
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decodedToken)
        const existingUser = await User.findById(decodedToken._id).select("-password -refreshToken");
        // Check if the auth token is expired
        const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
        console.log(decodedToken.exp < currentTimestamp);
        if (decodedToken.exp && decodedToken.exp < currentTimestamp) {
            return res.status(401).json(new ApiError(401, "Access token has expired!"));
        }

        if(!existingUser) {
            return res.status(401).json(new ApiResponse(401, "Use validation got failed!"));
        }

        req.user = existingUser;

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiError(500, "INTERNAL SERVER ERROR"));
    }
})