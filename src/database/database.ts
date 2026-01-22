import { injectable } from "inversify";
import { IDatabase } from "../interfaces/repositories/repository.interface";

@injectable()
export class Database<K extends string, D> implements IDatabase<K, D> {
    private _store;
    constructor() {
        this._store = new Map<K, D>();
    }

    set(key: K, data: D): D {
        this._store.set(key, data);
        return data;
    }

    get(key: K): D | null {
        const data = this._store.get(key);
        return data ? data : null;
    }

    getAll(): D[] {
        const data = Array.from(this._store.values());
        return data;
    }

    delete(key: K): boolean {
        const data = this._store.delete(key);
        return data;
    }
}
