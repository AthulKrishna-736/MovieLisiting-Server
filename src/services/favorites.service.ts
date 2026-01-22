import { inject, injectable } from "inversify";
import { TOKENS } from "../constants/tokens";
import { IFavoriteRepository } from "../interfaces/repositories/repository.interface";
import { IFavoriteService } from "../interfaces/services/favoriteService.interface";
import { IMovie } from "../interfaces/models/movie.model";

@injectable()
export class FavoritesService implements IFavoriteService {
    constructor(
        @inject(TOKENS.FavoritesRepository) private _favoriteRepository: IFavoriteRepository
    ) { }

    getAllUserFavorites(): { movies: IMovie[] | null, message: string } {
        const movies = this._favoriteRepository.readAllFavorites();
        if (!movies || movies.length === 0) {
            return {
                movies: null,
                message: 'No Favorite movies found. Please search and favorite'
            };
        }

        return {
            movies,
            message: 'Fetched Favorite movies successfully',
        };
    }

    favoriteMovieToggle(id: string, data: IMovie): { message: string } {
        const findMovie = this._favoriteRepository.findMovieById(id);

        if (findMovie && findMovie.imdbID) {
            this._favoriteRepository.deleteFavorites(findMovie.imdbID);
            return {
                message: 'Movie removed from favorites'
            };
        } else {
            this._favoriteRepository.updateFavorties(data.imdbID, data);
            return {
                message: 'Movie marked as favorite'
            };
        }
    }
}