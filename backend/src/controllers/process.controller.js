import { Process } from "../models/process.model.js";
import { Task } from "../models/task.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createProcess = asyncHandler(async (req, res) => {
    const {
        processTitle,
        processDescription,
        processCreatedByUser,
        processBelongsToClient,
        processAssignedToUser,
        finishedDate
    } = req.body;

    console.log("Creating process: -");
    console.log(req.body);
    if ([processTitle, processDescription].some(field => field.trim() === '')) {
        return res.status(400).json(new ApiError(400, "Please provide the valid fields!"));
    }

    try {

        const process = await Process.create({
            processTitle,
            processDescription,
            processCreatedByUser,
            processAssignedToUser,
            processBelongsToClient,
            finishedDate
        });



        return res.status(201).json(new ApiResponse(201, "Process created successfully", process));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Unable to create process"));
    }
});

export const getProcesses = asyncHandler(async (req, res) => {
    try {
        const processes = await Process.find();
        return res.status(200).json(new ApiResponse(200, "All processes", processes));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Unable to fetch processes"));
    }
});

export const getProcessById = asyncHandler(async (req, res) => {
    const processId = req.params.id;

    try {
        const process = await Process.findById(processId);
        if (!process) {
            return res.status(404).json(new ApiResponse(404, "Process not found"));
        }
        return res.status(200).json(new ApiResponse(200, "Process found", process));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Unable to fetch process"));
    }
});

// Get processes by client ID
export const getProcessesByClientId = asyncHandler(async (req, res) => {
    const clientId = req.params.clientId;

    try {
        const processes = await Process.find({ processBelongsToClient: clientId });
        return res.status(200).json(new ApiResponse(200, "Processes by client ID", processes));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Unable to fetch processes by client ID"));
    }
});

// Get processes by created user ID
export const getProcessesByCreatedUserId = asyncHandler(async (req, res) => {
    const createdUserId = req.params.createdUserId;

    try {
        const processes = await Process.find({ processCreatedByUser: createdUserId });
        return res.status(200).json(new ApiResponse(200, "Processes by created user id", processes));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Unable to fetch processes by user ID"));
    }
});

// Get processes by assigned user ID
export const getProcessesByAssignedUserId = asyncHandler(async (req, res) => {
    const assignedUserId = req.params.assignedUserId;

    try {
        const processes = await Process.find({ processAssignedToUser: assignedUserId });
        return res.status(200).json(new ApiResponse(200, "Processes by assigned user id", processes));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Unable to fetch processes by user ID"));
    }
});

export const updateProcess = asyncHandler(async (req, res) => {
    const processId = req.params.id;
    const updateData = req.body;
    console.log("updated process:", updateData);

    try {
        const process = await Process.findByIdAndUpdate(processId, updateData, { new: true });
        if (!process) {
            return res.status(404).json(new ApiResponse(404, "Process not found"));
        }
        return res.status(200).json(new ApiResponse(200, "Process updated successfully", process));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Unable to update process"));
    }
});

export const deleteProcess = asyncHandler(async (req, res) => {
    const processId = req.params.id;

    try {
        const process = await Process.findByIdAndDelete(processId);
        if (!process) {
            return res.status(404).json(new ApiResponse(404, "Process not found"));
        }

        // Delete all tasks associated with the process
        await Task.deleteMany({ processId: process._id });

        return res.status(200).json(new ApiResponse(200, "Process deleted successfully"));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Unable to delete process"));
    }
});
