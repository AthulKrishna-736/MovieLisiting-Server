import fs from "fs";
import path from "path";
import { IRepository } from "./interfaces/repository.interface";
import { IMovie } from "../models/movie.model";
import { injectable } from "inversify";

@injectable()
export class FavoritesRepository implements IRepository<IMovie> {
    private readonly filePath = path.join(process.cwd(), "src", "database", "favorites.json");

    constructor() {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, "[]");
        }
    }

    read(): IMovie[] {
        const data = fs.readFileSync(this.filePath, "utf-8");
        return data ? JSON.parse(data) : [];
    }

    write(data: IMovie[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    }

    toggle(movie: IMovie): IMovie[] {
        let favorites = this.read();
        const exists = favorites.find(m => m.imdbID === movie.imdbID);

        if (exists) {
            favorites = favorites.filter(m => m.imdbID !== movie.imdbID);
        } else {
            favorites.push(movie);
        }

        this.write(favorites);
        return favorites;
    }
}
