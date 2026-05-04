import express from "express";
import cors from "cors";
import { requestLogger } from "./middlewares";

export function createApp(): express.Express {
    const app = express();

    const corsOptions = {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    };

    app.use(cors(corsOptions));
    app.use(express.static("public"));
    app.use(express.json());
    app.use(requestLogger);

    app.get("/", (_req, res) => {
        res.send("hello world");
    });

    return app;
}
