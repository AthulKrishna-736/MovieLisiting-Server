import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS_CODES } from "../constants/statusCodes";
import { IMovieController } from "../interfaces/controllers/movieController.interface";
import { inject, injectable } from "inversify";
import { TOKENS } from "../constants/tokens";
import { responseHandler } from "../utils/ResponseHandler";
import { IMovieService } from "../interfaces/services/movieService.interface";
import { IFavoriteService } from "../interfaces/services/favoriteService.interface";
import { IMovie } from "../interfaces/models/movie.model";


@injectable()
export class MovieController implements IMovieController {
    constructor(
        @inject(TOKENS.MovieService) private _movieService: IMovieService,
        @inject(TOKENS.FavortiesService) private _favoritesService: IFavoriteService,
    ) { }

    searchMovies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { query, page = 1 } = req.query;

            if (!query) {
                res.status(HTTP_STATUS_CODES.badRequest).json({ message: "Search query is required" });
                return;
            }

            const searchQuery = query.toString().trim();
            const searchRegex = /^[a-zA-Z0-9\s:'\-.,&()]{2,40}$/;

            if (!searchRegex.test(searchQuery)) {
                return next({ message: "Search can only contain letters, numbers, spaces, and common characters (: - ' . , &)", statusCode: HTTP_STATUS_CODES.badRequest })
            }

            const { message, data, total } = await this._movieService.searchMovies(query as string, page as number);

            responseHandler(res, message, data, HTTP_STATUS_CODES.success, total);
        } catch (error) {
            next({ message: "Failed to fetch movies", statusCode: HTTP_STATUS_CODES.serverError, error });
        }
    };

    getFavorites = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.session.user?.id;
            if (!userId) {
                return next({ message: 'Session expired. Please refresh the page.', statusCode: HTTP_STATUS_CODES.unauthorized });
            }

            const { movies, message } = this._favoritesService.getAllUserFavorites(userId);
            responseHandler(res, message, movies, HTTP_STATUS_CODES.success, null);
        } catch (error) {
            next({ message: 'Failed to fetch favorites', statusCode: HTTP_STATUS_CODES.serverError, error });
        }
    };

    toggleFavorite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const body = req.body;
            const userId = req.session.user?.id;

            if (!userId) {
                return next({ message: 'Session expired. Please refresh the page.', statusCode: HTTP_STATUS_CODES.unauthorized });
            }

            if (!body || typeof body !== 'object') {
                return next({ message: "Invalid request payload", statusCode: HTTP_STATUS_CODES.badRequest });
            }

            const { imdbID, Title, Type, Year, Poster } = body;

            if (typeof imdbID !== "string" || typeof Title !== "string" || typeof Year !== "string") {
                return next({ message: "Invalid movie data", statusCode: HTTP_STATUS_CODES.badRequest });
            }

            const movie: IMovie = { imdbID, Title, Type, Year, Poster };

            const { message } = this._favoritesService.favoriteMovieToggle(userId, movie);
            responseHandler(res, message, null, HTTP_STATUS_CODES.success, null)
        } catch (error) {
            next({ message: "Failed to update favorites", statusCode: HTTP_STATUS_CODES.serverError, error });
        }
    };
}
