import { Client } from "../models/client.model.js";
import { Process } from "../models/process.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// import { createActivityLog } from "./today_activity_log.controller.js";

export const createClient = asyncHandler(async (req, res) => {
    const {
        clientName,
        clientDescription,
        clientEmail,
        clientPhone,
        clientAddress,
        clientStatus,
        clientCreatedByUser,
        finishedDate,
        clientBill,
        clientCreatedDate
    } = req.body;
console.log(req.body);
    if([clientName, clientDescription, clientEmail, clientPhone, clientAddress].some(field => field.trim() ==='')) {
        return res.status(400).json(new ApiError(400, "Please provide the valid fields!"));
    }

    try {
        const client = await Client.create({
            clientName,
            clientDescription,
            clientEmail,
            clientPhone,
            clientAddress,
            clientStatus,
            clientCreatedByUser,
            finishedDate,
            clientBill,
            clientCreatedDate
        });

        // const user = await User.findOne({_id: clientCreatedByUser });
        // createActivityLog({
        //     todaysDate: Date.now,
        //     logDescription: `New client(${clientName}) got created by ${user.username}`,
        //     logUserId: clientCreatedByUser
        // });

        return res.status(201).json(new ApiResponse(201, "Client created successfully", client));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Unable to create client"));
    }
});

export const getAllClients = asyncHandler(async (req, res) => {
    try {
        const clients = await Client.find();
        return res.status(200).json(new ApiResponse(200, "All clients", clients));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Unable to fetch clients"));
    }
});

export const getClientById = asyncHandler(async (req, res) => {
    const clientId = req.params.clientId;

    try {
        const client = await Client.findById(clientId);
        if (!client) {
            return res.status(404).json(new ApiResponse(404, "Client not found"));
        }
        return res.status(200).json(new ApiResponse(200, "Client found", client));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Unable to fetch client"));
    }
});

export const getClientsByUserId = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    try {
        const clients = await Client.findOne({userId});
        return res.status(200).json(new ApiResponse(200, "Client by userid", clients));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Unable to fetch client"));
    }
});

export const updateClient = asyncHandler(async (req, res) => {
    const clientId = req.params.id;
    const updateData = req.body;

    try {
        const client = await Client.findByIdAndUpdate(clientId, updateData, { new: true });
        if (!client) {
            return res.status(404).json(new ApiResponse(404, "Client not found"));
        }

        // const user = await User.findOne({_id: client.clientCreatedByUser });
        // createActivityLog({
        //     todaysDate: Date.now,
        //     logDescription: `Client (${clientName}) details got updated by ${user.username}`,
        //     logUserId: clientCreatedByUser
        // });

        return res.status(200).json(new ApiResponse(200, "Client updated successfully", client));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Unable to update client"));
    }
});

export const deleteClient = asyncHandler(async (req, res) => {
    const clientId = req.params.id;

    try {
        // Delete the client
        const client = await Client.findByIdAndDelete(clientId);
        
        if (!client) {
            return res.status(404).json(new ApiResponse(404, "Client not found"));
        }

        // Delete all processes associated with the client
        await Process.deleteMany({ clientId: client._id });

        return res.status(200).json(new ApiResponse(200, "Client deleted successfully"));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Unable to delete client"));
    }
});