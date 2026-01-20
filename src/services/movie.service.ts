import axios from "axios";
import { CONFIGS } from "../constants/config";
import { IMovieService } from "./interfaces/movieService.interface";
import { IMovie } from "../models/movie.model";
import { inject, injectable } from "inversify";
import { TOKENS } from "../constants/tokens";
import { IRepository } from "../repositories/interfaces/repository.interface";

@injectable()
export class MovieService implements IMovieService {
    constructor(
        @inject(TOKENS.FavoritesRepository) private _favoriteRepository: IRepository<IMovie>,
    ) { }

    // async searchMovies(query: string, page: number, limit: number): Promise<{ data: IMovie[]; total: number; message: string }> {
    //     const omdbPage = Math.ceil((page * limit) / 10);

    //     const response = await axios.get(`${CONFIGS.OMDB_URL}/?apikey=${CONFIGS.OMDB_API_KEY}&s=${query}&page=${omdbPage}`);

    //     const results = response.data?.Search ?? [];
    //     const totalResults = Number(response.data?.totalResults ?? results.length);

    //     const startIndex = ((page - 1) * limit) % 10;
    //     const paginated = results.slice(startIndex, startIndex + limit);

    //     return {
    //         data: paginated,
    //         total: totalResults,
    //         message: "Movies fetched successfully",
    //     };
    // }

    getFavorites(): { movies: IMovie[], message: string } {
        const favorites = this._favoriteRepository.read();
        if (!favorites || favorites.length == 0) {
            throw new Error('No favorites found');
        }

        return {
            movies: favorites,
            message: 'Favorites fetched successfully',
        };
    }

    toggleFavorite(movie: IMovie): { movies: IMovie[], message: string } {
        const favorite = this._favoriteRepository.toggle(movie);
        if (!favorite) {
            throw new Error('Error updating favorites');
        }

        return {
            movies: favorite,
            message: 'Updated favorites successfully'
        }
    }
}
