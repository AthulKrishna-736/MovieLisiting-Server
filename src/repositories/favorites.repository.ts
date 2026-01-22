import { IBaseRepository, IDatabase, IFavoriteRepository } from "../interfaces/repositories/repository.interface";
import { IMovie } from "../interfaces/models/movie.model";
import { injectable } from "inversify";
import { BaseRepository } from "./base.repository";
import { Database } from "../database/database";

@injectable()
export class FavoritesRepository implements IFavoriteRepository {
    private _movieDb: IDatabase<string, IMovie>;
    private _baseRepository: IBaseRepository<string, IMovie>;

    constructor() {
        this._movieDb = new Database<string, IMovie>();
        this._baseRepository = new BaseRepository<string, IMovie>(this._movieDb);
    }

    createFavorites(key: string, data: IMovie): IMovie {
        const create = this._baseRepository.create(key, data);
        return create;
    }

    updateFavorties(key: string, data: IMovie): IMovie {
        const update = this._baseRepository.update(key, data);
        return update;
    }

    readAllFavorites(): IMovie[] {
        const favorites = this._baseRepository.read();
        return favorites;
    }

    deleteFavorites(key: string): boolean {
        const deleted = this._baseRepository.delete(key);
        return deleted;
    }

    findMovieById(key: string): IMovie | null {
        const movie = this._baseRepository.findMovieById(key);
        return movie;
    }
}
