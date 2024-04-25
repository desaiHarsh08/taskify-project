import { Task } from "../models/task.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createTask = asyncHandler(async (req, res) => {
    const {
        taskTitle,
        taskDescription,
        taskNote,
        taskCreatedByUser,
        taskAssignedToUser,
        taskBelongsToClient,
        taskForProcess,
        finishedDate,
        taskMetadata
    } = req.body;

    if ([taskTitle, taskDescription, taskNote].some(field => field.trim() === '')) {
        return res.status(400).json(new ApiError(400, "Please provide the valid fields!"));
    }

    try {
        const task = await Task.create({
            taskTitle,
            taskDescription,
            taskNote,
            taskCreatedByUser,
            taskAssignedToUser,
            taskBelongsToClient,
            taskForProcess,
            finishedDate,
            taskMetadata
        });

        return res.status(201).json(new ApiResponse(201, "Task created successfully", task));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Unable to create task"));
    }
});

export const getTasks = asyncHandler(async (req, res) => {
    try {
        const tasks = await Task.find();
        return res.status(200).json(new ApiResponse(200, "All tasks", tasks));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Unable to fetch tasks"));
    }
});

export const getTaskById = asyncHandler(async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json(new ApiResponse(404, "Task not found"));
        }
        return res.status(200).json(new ApiResponse(200, "Task found", task));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Unable to fetch task"));
    }
});

// Get tasks by assigned to user ID
export const getTasksByAssignedUserId = asyncHandler(async (req, res) => {
    const assignedUserId = req.params.assignedUserId;

    try {
        const tasks = await Task.find({ taskAssignedToUser: assignedUserId });
        return res.status(200).json(new ApiResponse(200, "Tasks by assigned user id", tasks));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Unable to fetch tasks by user ID"));
    }
});

// Get tasks by process id
export const getTasksByProccessId = asyncHandler(async (req, res) => {
    const processId = req.params.processId;
    console.log("processId:", processId);

    try {
        const tasks = await Task.find({ taskForProcess: processId });
        console.log(tasks);
        return res.status(200).json(new ApiResponse(200, "Tasks by processId", tasks));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Unable to fetch tasks by processId"));
    }
});

// Get tasks by created user ID
export const getTasksByCreatedUserId = asyncHandler(async (req, res) => {
    const createdUserId = req.params.createdUserId;

    try {
        const tasks = await Task.find({ taskCreatedByUser: createdUserId });
        return res.status(200).json(new ApiResponse(200, "Tasks by created user id", tasks));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Unable to fetch tasks by user ID"));
    }
});

// Get tasks by client ID
export const getTasksByClientId = asyncHandler(async (req, res) => {
    const clientId = req.params.clientId;

    try {
        const tasks = await Task.find({ taskBelongsToClient: clientId });
        return res.status(200).json(new ApiResponse(200, "Tasks by client id", tasks));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Unable to fetch tasks by client ID"));
    }
});


export const updateTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const updateData = req.body;

    try {
        const task = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
        if (!task) {
            return res.status(404).json(new ApiResponse(404, "Task not found"));
        }
        return res.status(200).json(new ApiResponse(200, "Task updated successfully", task));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Unable to update task"));
    }
});

export const deleteTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) {
            return res.status(404).json(new ApiResponse(404, "Task not found"));
        }
        return res.status(200).json(new ApiResponse(200, "Task deleted successfully"));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Unable to delete task"));
    }
});
