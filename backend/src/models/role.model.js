import mongoose, { Schema } from "mongoose";
import { APP_ROLES } from "../constants.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const roleSchema = mongoose.Schema(
    {
        roleName: {
            type: String,
            default: APP_ROLES.USER
        },
        roleDescription: {
            type: String,
            default: ""
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    },
    { timeStamps: true }
);

roleSchema.plugin(mongooseAggregatePaginate)

export const Role = mongoose.model("Role", roleSchema);