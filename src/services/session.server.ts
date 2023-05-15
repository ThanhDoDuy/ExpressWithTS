import SessionModel from "../models/session.model";

export async function createSession(userID: string, userAgent: string) {
    try {
        const session = await SessionModel.create({user: userID, userAgent});
        return session.toJSON();
    } catch (e: any) {
        throw new Error(e);
    }

}

export async function validatePassword({email: password}:{email: string, password: string}) {
    
}