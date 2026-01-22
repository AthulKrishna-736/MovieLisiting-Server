import { IMovie } from "../models/movie.model";

export interface IFavoriteService {
    getAllUserFavorites(): { movies: IMovie[] | null, message: string };
    favoriteMovieToggle(id: string, data: IMovie): { message: string };
}