import { IMovie } from "../../interfaces/models/movie.model";

export interface IMovieService {
    searchMovies(query: string, page: number): Promise<{ data: IMovie[]; total: number, message: string }>;
}
