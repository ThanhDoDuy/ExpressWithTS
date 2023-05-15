import mongoose from "mongoose";
import config from "config";
import logger from './logger';

async function connect(){
    try {
        const dbUrl = config.get<string>("dbURI");
        await mongoose.connect(dbUrl);
        logger.info("Database connected")
    } catch (err) {
        logger.error(err);
        process.exit(1);
    };
};

export default connect;