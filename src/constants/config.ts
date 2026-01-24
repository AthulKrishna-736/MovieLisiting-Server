import dotenv from 'dotenv';
dotenv.config();

export const CONFIGS = {
    PORT: process.env.PORT,
    CLIENT_URL: process.env.CLIENT_URL,
    OMDB_API_KEY: process.env.OMDB_API_KEY,
    OMDB_URL: process.env.OMDB_URL,
    SESSION_SECRET: process.env.SESSION_SECRET,
}

