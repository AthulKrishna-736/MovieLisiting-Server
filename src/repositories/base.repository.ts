import { IMovie } from "../interfaces/models/movie.model";
import { IBaseRepository, IDatabase } from "../interfaces/repositories/repository.interface";


export class BaseRepository<K extends string, D extends IMovie> implements IBaseRepository<K, D> {
    constructor(
        private _database: IDatabase<K, D>
    ) { }

    create(key: K, data: D): D {
        const create = this._database.set(key, data)
        return create;
    }

    update(key: K, data: D): D {
        const update = this._database.set(key, data);
        return update;
    }

    read(): D[] {
        const data = this._database.getAll();
        return data;
    }

    delete(key: K): boolean {
        const data = this._database.delete(key);
        return data;
    }

    findMovieById(key: K): D | null {
        const data = this._database.get(key);
        return data ? data : null;
    }
}