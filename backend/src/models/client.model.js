import mongoose from "mongoose";

const clientSchema = mongoose.Schema(
    {
        clientName: {
            type: String,
            required: true,
            default: ""
        },
        clientDescription: {
            type: String,
            default: ""
        },
        clientCreatedDate: {
            type: Date,
            default: Date.now
        },
        isClientDone: {
            type: Boolean,
            default: false
        },
        clientBill: {
            type: Number,
            default: 0
        },
        clientEmail: {
            type: String,
            default: "",
        },
        clientPhone: {
            type: String,
            default: ""
        },
        clientAddress: {
            type: String,
            default: ""
        },
        clientStatus: {
            type: String,
            default: "IN_PROGRESS"
        },
        clientCreatedByUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
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

export const Client = mongoose.model("Client", clientSchema);