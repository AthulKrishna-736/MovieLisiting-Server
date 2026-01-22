import axios from "axios";
import { CONFIGS } from "../constants/config";
import { IMovie } from "../interfaces/models/movie.model";
import { injectable } from "inversify";
import { IMovieService } from "../interfaces/services/movieService.interface";

@injectable()
export class MovieService implements IMovieService {
    async searchMovies(query: string, page: number): Promise<{ data: IMovie[]; total: number; message: string }> {
        const response = await axios.get(`${CONFIGS.OMDB_URL}/?apikey=${CONFIGS.OMDB_API_KEY}&s=${query}&page=${page}`);
        const results = response.data?.Search ?? [];
        const totalResults = Number(response.data?.totalResults ?? results.length);

        return {
            data: results,
            total: totalResults,
            message: "Movies fetched successfully",
        };
    }
}
