import express from 'express';
import cors from 'cors';
import { CONFIGS, HTTP_STATUS_CODES } from './config.js';
import routes from './routes/movieRoutes.js';

const app = express();

app.use(cors({
    origin: CONFIGS.CLIENT_URL,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
}))

app.use(express.json());

app.use('/api/movies', routes);

app.use((err, req, res, next) => {
    console.error('Error: ', err);

    res.status(err.statusCode || HTTP_STATUS_CODES.serverError).json({
        ok: false,
        message: err.message || "Internal Server Error",
    });
});

app.listen(CONFIGS.PORT, () => {
    console.log(`Server is Running http://localhost:${CONFIGS.PORT}`);
})
