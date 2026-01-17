import { Router } from "express";
import { container } from "../containers/containers";
import { TOKENS } from "../constants/tokens";
import { IMovieController } from "../controllers/interfaces/movieController.interface";

const router = Router();

const movieController = container.get<IMovieController>(TOKENS.MovieController);

router.get("/search", movieController.searchMovies);
router.get("/favorites", movieController.getFavorites);
router.post("/favorites", movieController.toggleFavorite);

export default router;
