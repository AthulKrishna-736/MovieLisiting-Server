import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS_CODES } from "../constants/statusCodes";
import { IMovieController } from "./interfaces/movieController.interface";
import { inject, injectable } from "inversify";
import { TOKENS } from "../constants/tokens";
import { IMovieService } from "../services/interfaces/movieService.interface";
import { responseHandler } from "../utils/ResponseHandler";


@injectable()
export class MovieController implements IMovieController {
    constructor(
        @inject(TOKENS.MovieService) private _movieService: IMovieService,
    ) { }

    searchMovies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { query, page = "1", limit = "10" } = req.query;

            if (!query) {
                res.status(HTTP_STATUS_CODES.badRequest).json({ message: "Search query is required" });
                return;
            }

            const { message, data, total } = await this._movieService.searchMovies(
                String(query),
                Number(page),
                Number(limit)
            );

            responseHandler(res, message, data, HTTP_STATUS_CODES.success, total);
        } catch (error) {
            next({ message: "Failed to fetch movies", statusCode: HTTP_STATUS_CODES.serverError, error });
        }
    };

    getFavorites = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { movies, message } = await this._movieService.getFavorites();
            responseHandler(res, message, movies, HTTP_STATUS_CODES.success, null);
        } catch (error) {
            next({ message: 'Failed to fetch favorites', statusCode: HTTP_STATUS_CODES.serverError, error });
        }
    };

    toggleFavorite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const movie = req.body;

            if (!movie?.imdbID) {
                throw new Error('Invalid movie data');
            }

            const { movies, message } = await this._movieService.toggleFavorite(movie);
            responseHandler(res, message, movies, HTTP_STATUS_CODES.success, null)
        } catch (error) {
            next({ message: "Failed to update favorites", statusCode: HTTP_STATUS_CODES.serverError, error });
        }
    };
}



// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const favoritesFile = path.join(__dirname, "../database/favorites.json");

// const readFavorites = () => {
//     try {
//         if (!fs.existsSync(favoritesFile)) {
//             fs.writeFileSync(favoritesFile, "[]");
//         }
//         const data = fs.readFileSync(favoritesFile, "utf-8");
//         return data ? JSON.parse(data) : [];
//     } catch (err) {
//         console.error("Error reading favorites:", err);
//         return [];
//     }
// };

// const writeFavorites = (data) => {
//     fs.writeFileSync(favoritesFile, JSON.stringify(data, null, 2));
// };

// export const searchMovies = async (req, res, next) => {
//     try {
//         const { query, page, limit } = req.query;
//         if (!query) {
//             return res.status(HTTP_STATUS_CODES.badRequest).json({ message: "Search query is required" });
//         }

//         const omdbPage = Math.ceil((page * limit) / 10);
//         const response = await axios.get(`${CONFIGS.OMDB_URL}/?apikey=${CONFIGS.OMDB_API_KEY}&s=${query}&page=${omdbPage}`);

//         if (!response.data) {
//             return res.status(HTTP_STATUS_CODES.success).json({ message: "No movies found", data: [], meta: 0 });
//         }

//         const allResults = response.data.Search || [];
//         const totalResults = parseInt(response.data.totalResults || allResults.length, 10);

//         const startIndex = ((page - 1) * limit) % 10;
//         const paginatedResults = allResults.slice(startIndex, startIndex + parseInt(limit));

//         res.status(HTTP_STATUS_CODES.success).json({ message: "Movies Fetched Successfully", data: paginatedResults, meta: totalResults });
//     } catch (error) {
//         console.error(error);
//         next({ message: "Failed to fetch movies", statusCode: HTTP_STATUS_CODES.serverError });
//     }
// };

// export const getFavorites = (req, res, next) => {
//     try {
//         const favorites = readFavorites();
//         res.status(HTTP_STATUS_CODES.success).json({ message: 'Favorites fetched successfully', data: favorites });
//     } catch (error) {
//         next({ message: "Failed to fetch favorites", statusCode: HTTP_STATUS_CODES.serverError });
//     }
// };

// export const toggleFavorite = (req, res, next) => {
//     try {
//         const movie = req.body;

//         if (!movie || !movie.imdbID) {
//             return res.status(HTTP_STATUS_CODES.badRequest).json({ message: "Invalid movie data" });
//         }

//         let favorites = readFavorites();
//         const exists = favorites.find((m) => m.imdbID === movie.imdbID);

//         if (exists) {
//             favorites = favorites.filter((m) => m.imdbID !== movie.imdbID);
//         } else {
//             favorites.push(movie);
//         }

//         writeFavorites(favorites);

//         res.status(HTTP_STATUS_CODES.success).json({ message: "Updated favorites successfully", data: favorites });
//     } catch (error) {
//         console.error("Toggle favorite error:", error);
//         next({ message: "Failed to update favorites", statusCode: HTTP_STATUS_CODES.serverError });
//     }
// };

