import { NextFunction, Request, Response } from "express";

export interface IMovieController {
    searchMovies(req: Request, res: Response, next: NextFunction): Promise<void>;
    getFavorites(req: Request, res: Response, next: NextFunction): Promise<void>;
    toggleFavorite(req: Request, res: Response, next: NextFunction): Promise<void>;
}