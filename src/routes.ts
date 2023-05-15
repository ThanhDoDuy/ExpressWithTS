import {Express, Request, Response} from "express";
import { createUserHandler } from "./controllers/user.controller";
import validate from "./middlewares/validate.resource";
import { createUserSchema } from "./schema/user.schema";
import { createUserSessionHandler, deleteUserSessionHandler, getUserSessionHandler } from "./controllers/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middlewares/require.user";

function routes(app: Express){
    app.get("/health", (req: Request, res: Response) => res.status(200).send("Hello"));
    app.post("/api/users", validate(createUserSchema) ,createUserHandler);
    app.get("/api/sessions", requireUser, getUserSessionHandler);
    app.post("/api/sessions", validate(createSessionSchema), createUserSessionHandler);
    app.delete("/api/sessions", requireUser, deleteUserSessionHandler);
}

export default routes;