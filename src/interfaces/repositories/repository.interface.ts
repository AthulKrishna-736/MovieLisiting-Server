import { IMovie } from "../models/movie.model";

export interface IDatabase<U, M, D> {
    add(userId: U, movieId: M, data: D): void;
    remove(userId: U, movieId: M): boolean;
    get(userId: U, movieId: M): D | null;
    getAll(userId: U): D[];
    has(userId: U, movieId: M): boolean;
    clearUser(userId: U): boolean;
}

export interface IFavoriteRepository {
    addFavorite(userId: string, movie: IMovie): void
    removeFavorite(userId: string, movieId: string): boolean;
    getFavorites(userId: string): IMovie[];
    getFavoriteById(userId: string, movieId: string): IMovie | null
    isFavorite(userId: string, movieId: string): boolean;
    clearFavorites(userId: string): boolean;
}
