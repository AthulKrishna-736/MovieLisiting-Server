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

    getAllUserFavorites(userId: string): { movies: IMovie[] | null, message: string } {
        const movies = this._favoriteRepository.getFavorites(userId);
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

    favoriteMovieToggle(userId: string, data: IMovie): { message: string } {
        const exists = this._favoriteRepository.isFavorite(userId, data.imdbID);
        if (exists) {
            this._favoriteRepository.removeFavorite(userId, data.imdbID);
            return {
                message: 'Movie removed from favorites'
            };
        } else {
            this._favoriteRepository.addFavorite(userId, data);
            return {
                message: 'Movie marked as favorite'
            };
        }
    }
}