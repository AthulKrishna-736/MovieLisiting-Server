import dotenv from 'dotenv';
dotenv.config();

export const CONFIGS = {
    PORT: process.env.PORT,
    CLIENT_URL: process.env.CLIENT_URL,
    OMDB_API_KEY: process.env.OMDB_API_KEY,
    OMDB_URL: process.env.OMDB_URL,
}

export const HTTP_STATUS_CODES = {
    created: 201,
    success: 200,

    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    conflict: 409,
    tooManyReqeust: 429,

    serverError: 500,
    badGateway: 502,
}
