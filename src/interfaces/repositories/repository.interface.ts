import { IMovie } from "../models/movie.model";

export interface IDatabase<K, D> {
    set(key: K, data: D): D
    get(key: K): D | null
    getAll(): D[]
    delete(key: K): boolean
}

export interface IBaseRepository<K extends string, D> {
    create(key: K, data: D): D;
    update(key: K, data: D): D;
    read(): D[];
    delete(key: K): boolean;
    findMovieById(key: string): D | null;
}

export interface IFavoriteRepository {
    createFavorites(key: string, data: IMovie): IMovie;
    updateFavorties(key: string, data: IMovie): IMovie;
    readAllFavorites(): IMovie[];
    deleteFavorites(key: string): boolean;
    findMovieById(key: string): IMovie | null;
}
