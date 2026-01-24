import { IDatabase, IFavoriteRepository } from "../interfaces/repositories/repository.interface";
import { IMovie } from "../interfaces/models/movie.model";
import { injectable } from "inversify";
import { FavoritesDatabase } from "../database/database";

@injectable()
export class FavoritesRepository implements IFavoriteRepository {
    private _movieDb: IDatabase<string, string, IMovie>;

    constructor() {
        this._movieDb = new FavoritesDatabase<string, string, IMovie>();
    }

    addFavorite(userId: string, movie: IMovie): void {
        this._movieDb.add(userId, movie.imdbID, movie);
    }

    removeFavorite(userId: string, movieId: string): boolean {
        return this._movieDb.remove(userId, movieId);
    }

    getFavorites(userId: string): IMovie[] {
        return this._movieDb.getAll(userId);
    }

    getFavoriteById(userId: string, movieId: string): IMovie | null {
        return this._movieDb.get(userId, movieId);
    }

    isFavorite(userId: string, movieId: string): boolean {
        return this._movieDb.has(userId, movieId);
    }

    clearFavorites(userId: string): boolean {
        return this._movieDb.clearUser(userId);
    }
}