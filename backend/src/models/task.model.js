import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
    {
        taskTitle: {
            type: String,
            required: true,
            default: ""
        },
        taskDescription: {
            type: String,
            default: ""
        },
        taskNote: {
            type: String,
            default: ""
        },
        isTaskDone: {
            type: Boolean,
            default: false
        },
        taskStatus: {
            type: String,
            default: "IN_PROGRESS"
        },
        taskCreatedDate: {
            type: Date,
            default: Date.now
        },
        taskCreatedByUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        taskAssignedToUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        taskBelongsToClient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
        },
        taskForProcess: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Process",
        },
        finishedDate: {
            type: Date,
            default: null,
        },
        taskMetadata: {
            type: [],
        }
    },
    {
        timeStamps: true
    }
);

export const Task = mongoose.model("Task", taskSchema);