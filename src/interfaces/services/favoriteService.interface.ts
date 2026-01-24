import { IMovie } from "../models/movie.model";

export interface IFavoriteService {
    getAllUserFavorites(userId: string): { movies: IMovie[] | null, message: string };
    favoriteMovieToggle(userId: string, data: IMovie): { message: string };
}