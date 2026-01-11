import dotenv from 'dotenv';

dotenv.config();

export const CONFIGS = {
    PORT: process.env.PORT,
    CLIENT_URL: process.env.CLIENT_URL,
}
