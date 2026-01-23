import express from "express";
import cors from "cors";
import session from 'express-session';
import { CONFIGS } from "./constants/config";
import router from "./routes/movieRoutes";
import { errorHandler } from "./utils/errorHandler";

const app = express();

// Middlewares
app.use(
    cors({
        origin: CONFIGS.CLIENT_URL,
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(session({
    secret: CONFIGS.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,          
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24,
    }
}))

app.use(express.json());

// Routes
app.use("/api/movies", router);

// Error Handler 
app.use(errorHandler);

export default app;
