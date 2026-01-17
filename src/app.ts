import express from "express";
import cors from "cors";
import { CONFIGS } from "./constants/config";
import router from "./routes/movieRoutes";
import { errorHandler } from "./utils/errorHandler";

const app = express();

// Middlewares
app.use(
    cors({
        origin: CONFIGS.CLIENT_URL,
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"]
    })
);

app.use(express.json());

// Routes
app.use("/api/movies", router);

// Error Handler 
app.use(errorHandler);

export default app;
