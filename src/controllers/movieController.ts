import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS_CODES } from "../constants/statusCodes";
import { IMovieController } from "../interfaces/controllers/movieController.interface";
import { inject, injectable } from "inversify";
import { TOKENS } from "../constants/tokens";
import { responseHandler } from "../utils/ResponseHandler";
import { IMovieService } from "../interfaces/services/movieService.interface";
import { IFavoriteService } from "../interfaces/services/favoriteService.interface";


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
            const movie = req.body;
            const userId = req.session.user?.id;

            if (!movie?.imdbID) {
                throw new Error('Invalid movie data');
            }

            if (!userId) {
                return next({ message: 'Session expired. Please refresh the page.', statusCode: HTTP_STATUS_CODES.unauthorized });
            }

            const { message } = this._favoritesService.favoriteMovieToggle(userId, movie);
            responseHandler(res, message, null, HTTP_STATUS_CODES.success, null)
        } catch (error) {
            next({ message: "Failed to update favorites", statusCode: HTTP_STATUS_CODES.serverError, error });
        }
    };
}
