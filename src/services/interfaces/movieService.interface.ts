import { IMovie } from "../../models/movie.model";

export interface IMovieService {
    searchMovies(query: string, page: number, limit: number): Promise<{ data: IMovie[]; total: number, message: string }>;
    getFavorites(): { movies: IMovie[], message: string };
    toggleFavorite(movie: IMovie): { movies: IMovie[], message: string };
}
