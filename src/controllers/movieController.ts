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
            const { movies, message } = this._movieService.getFavorites();
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

            const { movies, message } = this._movieService.toggleFavorite(movie);
            responseHandler(res, message, movies, HTTP_STATUS_CODES.success, null)
        } catch (error) {
            next({ message: "Failed to update favorites", statusCode: HTTP_STATUS_CODES.serverError, error });
        }
    };
}