import mongoose from "mongoose";
import { TypeOf, object, string } from "zod";

export const createSessionSchema = object({
    body: object({
        email: string({
            required_error: "Email is required"
        }).email("Not valid email"),
        password: string({
            required_error: "Name is required"
        }).min(6, "Password too short - should be 6 chars minimum")
    })
})