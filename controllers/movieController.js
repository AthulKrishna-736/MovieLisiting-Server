import fs from "fs";
import path from "path";
import axios from "axios";
import { CONFIGS, HTTP_STATUS_CODES } from "../config.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const favoritesFile = path.join(__dirname, "../database/favorites.json");

const readFavorites = () => {
    const data = fs.readFileSync(favoritesFile, "utf-8");
    return JSON.parse(data);
};

const writeFavorites = (data) => {
    fs.writeFileSync(favoritesFile, JSON.stringify(data, null, 2));
};

export const searchMovies = async (req, res, next) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(HTTP_STATUS_CODES.badRequest).json({ message: "Search query is required" });
        }

        const response = await axios.get(`${CONFIGS.OMDB_URL}/?apikey=${CONFIGS.OMDB_API_KEY}&s=${query}`);
        res.status(HTTP_STATUS_CODES.success).json({ message: 'Movies Fetched Successfully', data: response.data });
    } catch (error) {
        next({ message: "Failed to fetch movies", statusCode: HTTP_STATUS_CODES.serverError });
    }
};

export const getFavorites = (req, res, next) => {
    try {
        const favorites = readFavorites();
        res.status(HTTP_STATUS_CODES.success).json({ message: 'Favorites fetched successfully', data: favorites });
    } catch (error) {
        next({ message: "Failed to fetch favorites", statusCode: HTTP_STATUS_CODES.serverError });
    }
};

export const toggleFavorite = (req, res, next) => {
    try {
        const movie = req.body;

        if (!movie || !movie.imdbID) {
            return res.status(HTTP_STATUS_CODES.badRequest).json({ message: "Invalid movie data" });
        }

        let favorites = readFavorites();
        const exists = favorites.find((m) => m.imdbID === movie.imdbID);

        if (exists) {
            favorites = favorites.filter((m) => m.imdbID !== movie.imdbID);
        } else {
            favorites.push(movie);
        }

        writeFavorites(favorites);
        res.status(HTTP_STATUS_CODES.success).json({ message: 'Updated favorites successfully', data: favorites });
    } catch (error) {
        next({ message: "Failed to update favorites", statusCode: HTTP_STATUS_CODES.serverError });
    }
};
