import { Container } from "inversify";
import { TOKENS } from "../constants/tokens";
import { MovieService } from "../services/movie.service";
import { IMovieService } from "../services/interfaces/movieService.interface";
import { FavoritesRepository } from "../repositories/favorites.repository";
import { IRepository } from "../repositories/interfaces/repository.interface";
import { IMovie } from "../models/movie.model";
import { MovieController } from "../controllers/movieController";
import { IMovieController } from "../controllers/interfaces/movieController.interface";

export const container: Container = new Container();

container.bind<IMovieService>(TOKENS.MovieService).to(MovieService);
container.bind<IRepository<IMovie>>(TOKENS.FavoritesRepository).to(FavoritesRepository);
container.bind<IMovieController>(TOKENS.MovieController).to(MovieController);