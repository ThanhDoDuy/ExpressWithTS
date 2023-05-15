import { Request, Response } from "express";
import { validatePassword } from "../services/user.service";
import { createSession, findSession, updateSession } from "../services/session.server";
import { signJWT } from "../utils/jwt.utils";
import config from "config";

export async function createUserSessionHandler(req: Request, res: Response) {
    // validate the user's password
    const user = await validatePassword(req.body);
    if (!user) {
        return res.status(401).send("Invalid email or password");
    }

    // create a session
    const session = createSession(user._id, req.get("user-agent") || "");

    // create an access token
    const accessToken = signJWT({
        ...user,
        session: (await session)._id
    },
        //options
        { expiresIn: config.get("accessTokenTimeLife") },
    );
    // create a refresh token
    const refreshToken = signJWT({
        ...user,
        session: (await session)._id
    },
        //options
        { expiresIn: config.get("refreshTokenTimeLife") },
    );
    // return access and refresh tokens
    return res.send({ accessToken, refreshToken })
}

export async function getUserSessionHandler(req: Request, res: Response) {
    const userID = res.locals.user._id;
    const sessions = await findSession({ user: userID, valid: true });

    return res.send(sessions)
}

export async function deleteUserSessionHandler(req: Request, res: Response) {
    const sessionID = res.locals.user.session;
    await updateSession({ _id: sessionID }, { valid: false });

    return res.send({
        accessToken: null,
        refreshToken: null
    })
}