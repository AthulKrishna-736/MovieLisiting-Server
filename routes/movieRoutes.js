import express from 'express';
import { getFavorites, searchMovies, toggleFavorite } from '../controllers/movieController.js';

const router = express.Router();

router.get("/search", searchMovies);
router.get("/favorites", getFavorites);
router.post("/favorites", toggleFavorite);

export default router;
