import {Express, Request, Response} from "express";
import config from "config";
import logger from "./utils/logger";
import { createUserHandler } from "./controllers/user.controller";
import validate from "./middlewares/validate.resource";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express){
    app.get("/health", (req: Request, res: Response) => res.status(200).send("Hello"));
    app.post("/api/users", validate(createUserSchema) ,createUserHandler)
}

export default routes;