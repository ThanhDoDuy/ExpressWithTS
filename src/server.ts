import express from "express";
import config from "config";
import connect from "./utils/connectDB";
import logger from "./utils/logger";
import routes from "./routes";

const PORT = config.get<number>('port');

const server = express();

server.use(express.json());

server.listen(PORT, async () =>{
    logger.info(`Server is running at port ${PORT}`);
    await connect();
    routes(server);
})