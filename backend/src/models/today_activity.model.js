import mongoose from "mongoose";

const todayActivityLog = mongoose.Schema(
    {
        todaysDate: {
            type: Date,
            required: true,
            default: Date.now
        },
        logDescription: {
            type: String,
            default: ""
        },
        logUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    },
    {
        timeStamps: true
    }
);

export const TodaysActivityLog = mongoose.model("TodaysActivityLog", todayActivityLog);