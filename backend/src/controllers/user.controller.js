import jwt from 'jsonwebtoken';

import { Role } from "../models/role.model.js";
import { User } from "../models/user.model.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefreshToken = async (user) => {
    try {
        // Generate the accessToken
        const accessToken = user.generateAccessToken();

        // Generate the refreshToken
        const refreshToken = user.generateRefreshToken();

        // Save the refreshToken to the database
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong, unable to login");
    }
}

export const createUser = asyncHandler(async (req, res, next) => {
    const { username, email, password, role } = req.body;

    // Validate the fields
    if ([username, email, password, role].some((field) => field.trim() === "")) {
        res.status(400).json(new ApiResponse(
            400, "Bad request, please provide the valid fields"
        ));
    }

    try {
        // Return if the user already exist
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json(new ApiResponse(
                409, "User with the given email already exist!"
            ));
        }
        // Create an user
        const createdUser = await User.create({ username, email, password });
        // Create the user's role
        const createdRole = await Role.create({ roleName: role, userId: createdUser._id });

        return res.status(201).json(new ApiResponse(201, "USER CREATED!", {
            _id: createdUser._id,
            username,
            email,
            userProfileImage: createdUser.userProfileImage,
            role: createdRole.roleName
        }));

    } catch (error) {
        return res.status(500).json(new ApiError(500, "UNABLE TO CREATE USER!"));
    }
})

export const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if ([email, password].some((field) => field.trim === "")) {
        res.status(400).json(new ApiResponse(
            400, "Bad request, please provide the valid fields"
        ));
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json(new ApiResponse(401, "Invalid email or password!"));
        }
        const isValidPassword = await user.isPasswordCorrect(password);
        if (!isValidPassword) {
            res.status(400).json(new ApiResponse(401, "Invalid email or password!"));
        }

        // Fetch the user's role
        const roles = await Role.find({ userId: user._id });

        // Generate accessToken and refreshToken
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user);

        // Cookie Options
        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, "LOGGED IN!", { accessToken, refreshToken, roles }));


    } catch (error) {
        console.log(error)
        return res.status(500).json(new ApiError(500, "UNABLE TO LOGGED IN USER!"));
    }
})

export const googleLogin = asyncHandler(async (req, res, next) => {
    const { email, userProfileImage } = req.body;
    console.log(email, userProfileImage)
    if ([email, userProfileImage].some((field) => (field.trim === ""))) {
        res.status(400).json(new ApiResponse(
            400, "Bad request, please provide the valid fields"
        ));
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json(new ApiResponse(401, "Invalid email or password!"));
        }

        user.userProfileImage = userProfileImage;
        await user.save();

        // Fetch the user's role
        const roles = await Role.find({ userId: user._id });

        // Generate accessToken and refreshToken
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user);

        // Cookie Options
        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, "LOGGED IN!", { accessToken, refreshToken, roles }));

    } catch (error) {
        console.log(error)
        return res.status(500).json(new ApiError(500, "UNABLE TO LOGGED IN USER!"));
    }
})

export const logoutUser = asyncHandler(async (req, res) => {
    try {
        // Logout the user
        await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: "" } }, { new: true });

        // Cookie Options
        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new ApiResponse(200, "LOGGED OUT!", null));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiError(500, "LOGOUT USER ERROR!"));
    }
})

export const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

        if (!incomingRefreshToken) {
            return res.status(401).json(new ApiError(401, "Unauthorized request!"));
        }

        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            return res.status(401).json(new ApiError(401, "Invalid request!"));
        }

        // Check if the refresh token is expired
        const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decodedToken.exp && decodedToken.exp < currentTimestamp) {
            return res.status(401).json(new ApiError(401, "Refresh token has expired!"));
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            return res.status(401).json(new ApiError(401, "Refresh token is expired or used!"));
        }

        // Cookie Options
        const options = {
            httpOnly: true,
            secure: true
        }
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user);

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, "Refresh Token Success!", { accessToken, refreshToken }));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiError(500, "Refresh token error!"));
    }
})

export const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();

        for (let i = 0; i < users.length; i++) {
            users[i]["roles"] = await Role.find({ _id: users[i]._id });
        }

        return res.status(200).json(new ApiResponse(200, "All Users", users));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiError(500, "Cannot fetch the users!"));
    }
})

export const updateUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { username, email, password } = req.body;

    try {
        // Check if the user exists
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json(new ApiResponse(404, "User not found"));
        }

        // Update user fields
        user.username = username || user.username;
        user.email = email || user.email;
        user.password = password || user.password;

        // Save the updated user
        await user.save();

        return res.status(200).json(new ApiResponse(200, "User updated successfully", user));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiError(500, "Unable to update user"));
    }
});

export const getUserById = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    try {
        // Check if the user exists
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json(new ApiResponse(404, "User not found"));
        }

        return res.status(200).json(new ApiResponse(200, "User fetched successfully", user));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiError(500, "Unable to delete user"));
    }
});



export const deleteUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    try {
        // Check if the user exists
        console.log(userId);
        let user;
        try {
            user = await User.findById(userId);
            if (!user) {
                return res.status(404).json(new ApiResponse(404, "User not found"));
            }
        } catch (error) {
            return res.status(404).json(new ApiResponse(404, "User not found"));
        }

        // Remove user from associated roles
        await Role.updateMany({ users: user._id }, { $pull: { users: user._id } });

        // Delete the user
        await User.findByIdAndDelete(userId);

        return res.status(200).json(new ApiResponse(200, "User deleted successfully"));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiError(500, "Unable to delete user"));
    }
});


