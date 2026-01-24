import { Container } from "inversify";
import { TOKENS } from "../constants/tokens";
import { MovieService } from "../services/movie.service";
import { IMovieService } from "../interfaces/services/movieService.interface";
import { FavoritesRepository } from "../repositories/favorites.repository";
import { IFavoriteRepository } from "../interfaces/repositories/repository.interface";
import { MovieController } from "../controllers/movieController";
import { IMovieController } from "../interfaces/controllers/movieController.interface";
import { IFavoriteService } from "../interfaces/services/favoriteService.interface";
import { FavoritesService } from "../services/favorites.service";

export const container: Container = new Container();

container.bind<IMovieService>(TOKENS.MovieService).to(MovieService);
container.bind<IFavoriteService>(TOKENS.FavortiesService).to(FavoritesService);
container.bind<IFavoriteRepository>(TOKENS.FavoritesRepository).to(FavoritesRepository);
container.bind<IMovieController>(TOKENS.MovieController).to(MovieController);