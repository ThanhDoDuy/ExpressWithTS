import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { UserDocument } from "./user.models";

// create user type
export interface SchemaDocument extends UserDocument, mongoose.Document {
    user: UserDocument["_id"];
    valid: boolean;
    // we have createdAt field because we have timestamps field
    createdAt: Date;
    updatedAt: Date;
}

const sessionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String}
},
    { timestamps: true }
);

const SessionModel = mongoose.model("User", sessionSchema);

export default SessionModel;