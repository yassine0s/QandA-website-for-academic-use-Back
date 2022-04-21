import express from "express";
import BaseRouter from "../routes";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import {accessLogStream, handler} from "./logger";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Setting up cors
const corsOptions = {
    // origin: process.env.CLIENT_ORIGIN || "http://localhost:8081",
};

app.use(cors(corsOptions));

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Logger
if (process.env.NODE_ENV === 'development') {
    app.use(morgan(handler,{ stream: accessLogStream }));
}

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to stackoverflow uni." });
});

app.use(BaseRouter);

// swagger
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);


export default app;


