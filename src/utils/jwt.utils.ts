import jwt, { Secret } from "jsonwebtoken";
import fs from "fs";

const privateKey: Secret = fs.readFileSync("private.key");
const publicKey: Secret = fs.readFileSync("public.key");

export function signJWT(
    object: Object,
    options?:jwt.SignOptions | undefined
){
    return jwt.sign(object, privateKey,{
        ...options,
        algorithm: "RS256"
    })
}

export function verifyJWT(token: string){
    try {
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded: decoded
        };
    }
    catch (e: any) {
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null
        }
    }
}