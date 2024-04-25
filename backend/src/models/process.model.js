import mongoose from "mongoose";

const processSchema = mongoose.Schema(
    {
        processTitle: {
            type: String,
            required: true,
            default: ""
        },
        processDescription: {
            type: String,
            default: ""
        },
        isProcessDone: {
            type: Boolean,
            default: false
        },
        processStatus: {
            type: String,
            default: "IN_PROGRESS"
        },
        processCreatedByUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        processAssignedToUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        processBelongsToClient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
        },
        finishedDate: {
            type: Date,
            default: null,
        },
    },
    {
        timeStamps: true
    }
);

export const Process = mongoose.model("Process", processSchema);