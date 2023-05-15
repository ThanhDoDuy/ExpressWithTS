import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";
import { signJWT, verifyJWT } from "../utils/jwt.utils";
import {get} from "lodash";
import { findUser } from "./user.service";
import config from "config";

export async function createSession(userID: string, userAgent: string) {
    try {
        const session = await SessionModel.create({user: userID, userAgent});
        return session.toJSON();
    } catch (e: any) {
        throw new Error(e);
    }

}

export async function findSession(query: FilterQuery<SessionDocument>) {
    return SessionModel.find(query).lean();
}

export async function updateSession(
    query: FilterQuery<SessionDocument>,
    update: UpdateQuery<SessionDocument>
  ) {
    return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken(
    {refreshToken} : {refreshToken: string}
  ) {
    const {decoded} = verifyJWT(refreshToken);

    if (!decoded || !get(decoded, 'session')){
        return "";
    }

    const session = await SessionModel.findById(get(decoded, "session"));

    if (!session || !session.valid){
        return "";
    }

    const user = await findUser({_id: session.user});

    if (!user){
        return "";
    }

     // create an access token
     const accessToken = signJWT({
        ...user,
        session: (await session)._id
    },
        //options
        { expiresIn: config.get("accessTokenTimeLife") },
    );

    return accessToken;
}