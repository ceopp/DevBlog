import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import typeRoutes from "./routes/Type";

const router = express();

/** connect to mongo */
/** TODO: use custom Logging.ts instead console.log*/
mongoose.connect(config.mongo.url, { retryWrites: true, w: "majority"})
.then(() => {
    console.log("connected to DB")
    StartServer()
})
.catch(error => {
    console.log("error connecting to mongo: ", error)
})


/** start sever if mongo connected */
const StartServer = () => {
    router.use((req, res, next) => {
        console.log(`Incoming method: [${req.method}) - url: [${req.url}]`);
        res.on('finish', () => {
            console.log(`Incoming method: [${req.method}] - url: [${req.url}] - status: [${res.status}]`);
        });
        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json()); 

    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /** Routes */
    router.use('/types', typeRoutes);
    router.use('/articles', typeRoutes);
    router.use('/mainPage', typeRoutes);

    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'PONG'}));

    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('not Found');
        console.log(error);

        return res.status(400).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => console.log(`Server is running on port: ${config.server.port}`));
}

