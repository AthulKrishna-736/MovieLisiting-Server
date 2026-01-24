import { injectable } from "inversify";
import { IDatabase } from "../interfaces/repositories/repository.interface";

@injectable()
export class FavoritesDatabase<U extends string, M extends string, D> implements IDatabase<U, M, D> {
    private store: Map<U, Map<M, D>>;

    constructor() {
        this.store = new Map();
    }

    private getUserMap(userId: U): Map<M, D> {
        let userMap = this.store.get(userId);
        if (!userMap) {
            userMap = new Map<M, D>();
            this.store.set(userId, userMap);
        }
        return userMap;
    }

    add(userId: U, movieId: M, data: D): void {
        this.getUserMap(userId).set(movieId, data);
    }

    remove(userId: U, movieId: M): boolean {
        return this.getUserMap(userId).delete(movieId);
    }

    get(userId: U, movieId: M): D | null {
        return this.getUserMap(userId).get(movieId) ?? null;
    }

    getAll(userId: U): D[] {
        return Array.from(this.getUserMap(userId).values());
    }

    has(userId: U, movieId: M): boolean {
        return this.getUserMap(userId).has(movieId);
    }

    clearUser(userId: U): boolean {
        return this.store.delete(userId);
    }
}
